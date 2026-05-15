import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Vertex shader: size attenuation + color passthrough ─── */
const vertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float dist = -mvPosition.z;
    gl_PointSize = aSize * (280.0 / dist);
    vAlpha = clamp(1.0 - dist / 25.0, 0.0, 1.0);
  }
`

/* ─── Fragment shader: soft round particle ─── */
const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float strength = pow(1.0 - dist * 2.0, 2.0);
    gl_FragColor = vec4(vColor, strength * vAlpha * 0.9);
  }
`

/* ─── Mouse reactive particles ─── */
function ParticleField({ count = 3000, mouse }) {
  const meshRef = useRef()

  const { positions, colors, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)
    const phases    = new Float32Array(count)

    const palette = [
      new THREE.Color('#6C63FF'),
      new THREE.Color('#818cf8'),
      new THREE.Color('#00D4FF'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#67e8f9'),
      new THREE.Color('#c084fc'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i]  = Math.random() * 2.8 + 0.8
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, colors, sizes, phases }
  }, [count])

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent:  true,
    depthWrite:   false,
    blending:     THREE.AdditiveBlending,
    vertexColors: false,
    uniforms:     {},
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t    = state.clock.elapsedTime
    const posAttr = meshRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posAttr.array[i3 + 1] += Math.sin(t * 0.4 + phases[i]) * 0.003
    }
    posAttr.needsUpdate = true

    /* Mouse parallax */
    meshRef.current.rotation.y = mouse.current.x * 0.06
    meshRef.current.rotation.x = -mouse.current.y * 0.04
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aColor',   new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, colors, sizes])

  return <points ref={meshRef} geometry={geometry} material={shaderMaterial} />
}

/* ─── Wireframe floating shape ─── */
function WireShape({ geometry: GeoComponent, args, position, rotSpeed, color, emissive, scale = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x += rotSpeed[0]
    ref.current.rotation.y += rotSpeed[1]
    ref.current.rotation.z += rotSpeed[2]
    /* Subtle color cycling */
    const hue = (t * 0.05) % 1
    ref.current.material.color.setHSL(hue * 0.2 + 0.62, 0.8, 0.65)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <GeoComponent args={args} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </Float>
  )
}

/* ─── Glowing core sphere behind shapes ─── */
function GlowOrb() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.material.emissiveIntensity = 0.5 + Math.sin(t * 0.8) * 0.2
  })
  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <sphereGeometry args={[1.4, 32, 32]} />
      <meshStandardMaterial
        color="#6C63FF"
        emissive="#6C63FF"
        emissiveIntensity={0.6}
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─── Color-cycling lights ─── */
function DynamicLights() {
  const point1 = useRef()
  const point2 = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (point1.current) {
      point1.current.color.setHSL((t * 0.05) % 1, 0.8, 0.6)
      point1.current.position.x = Math.sin(t * 0.3) * 5
      point1.current.position.z = Math.cos(t * 0.3) * 5
    }
    if (point2.current) {
      point2.current.color.setHSL(((t * 0.05) + 0.5) % 1, 0.8, 0.6)
      point2.current.position.x = Math.cos(t * 0.25) * 5
      point2.current.position.y = Math.sin(t * 0.2) * 3
    }
  })
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={point1} intensity={1.2} distance={20} position={[5, 3, 3]} />
      <pointLight ref={point2} intensity={0.8} distance={20} position={[-5, -3, -3]} />
      <pointLight intensity={0.4} position={[0, 8, 0]} color="#00D4FF" />
    </>
  )
}

/* ─── Mouse tracker ─── */
function MouseTracker({ mouse }) {
  const { viewport } = useThree()
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouse, viewport])
  return null
}

/* ─── Full scene ─── */
function Scene({ mouse }) {
  return (
    <>
      <MouseTracker mouse={mouse} />
      <DynamicLights />

      <ParticleField count={3000} mouse={mouse} />

      <GlowOrb />

      {/* Icosahedron — right */}
      <WireShape
        geometry={THREE.IcosahedronGeometry}
        args={[1.2, 0]}
        position={[3.5, 0.5, -2]}
        rotSpeed={[0.003, 0.005, 0.002]}
        color="#6C63FF"
        scale={1}
      />

      {/* Torus — left */}
      <WireShape
        geometry={THREE.TorusGeometry}
        args={[1.1, 0.38, 12, 48]}
        position={[-3.8, -0.8, -1.5]}
        rotSpeed={[0.005, 0.003, 0.001]}
        color="#00D4FF"
        scale={1}
      />

      {/* Octahedron — top center */}
      <WireShape
        geometry={THREE.OctahedronGeometry}
        args={[1.0, 0]}
        position={[0.5, 3.2, -3]}
        rotSpeed={[0.004, 0.006, 0.003]}
        color="#a78bfa"
        scale={1}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

/* ─── Canvas wrapper ─── */
export default function ThreeScene() {
  const mouse = useRef({ x: 0, y: 0 })

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  )
}
