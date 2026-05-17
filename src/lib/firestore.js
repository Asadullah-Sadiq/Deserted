import { db } from './firebase'
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'

export async function checkDuplicate(collectionName, email) {
  if (!db) return false
  try {
    const q = query(collection(db, collectionName), where('email', '==', email.toLowerCase().trim()))
    const snap = await getDocs(q)
    return !snap.empty
  } catch {
    return false
  }
}

export async function saveSubmission(collectionName, data) {
  if (!db) return null
  try {
    const ref = await addDoc(collection(db, collectionName), {
      ...data,
      email: data.email?.toLowerCase().trim(),
      createdAt: serverTimestamp(),
    })
    return ref.id
  } catch (error) {
    console.error('Firestore save error:', error.message)
    return null
  }
}
