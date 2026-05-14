import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'

function AnimatedSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.8, 100, 200]}>
        <MeshDistortMaterial
          color="#4f46e5"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive="#2d1b8f"
          emissiveIntensity={0.3}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  )
}

function Ring({ args, color, opacity, rotSpeed }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * rotSpeed
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={args} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#d946ef" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#22d3ee" />
      <AnimatedSphere />
      <Ring args={[2.8, 0.03, 16, 100]} color="#818cf8" opacity={0.4} rotSpeed={0.2} />
      <Ring args={[3.5, 0.02, 16, 100]} color="#d946ef" opacity={0.25} rotSpeed={-0.15} />
      <Stars radius={50} depth={50} count={1000} factor={2} fade speed={1} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}
