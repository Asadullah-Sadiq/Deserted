import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

let app, db, analytics

const hasRealConfig = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith('your_')

if (hasRealConfig) {
  try {
    app = initializeApp(firebaseConfig)
    db  = getFirestore(app)
    isSupported().then((yes) => {
      if (yes) analytics = getAnalytics(app)
    }).catch(() => {})
  } catch (error) {
    console.warn('Firebase init failed:', error.message)
  }
} else {
  console.info('Firebase: using placeholder config — Firestore disabled until real keys are added.')
}

export { app, db, analytics }
export default app
