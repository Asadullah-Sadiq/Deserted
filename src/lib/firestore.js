import { db } from './firebase'
import {
  collection, addDoc, query, where, getDocs,
  serverTimestamp, Timestamp,
} from 'firebase/firestore'

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

/**
 * Check if the same email submitted to this collection in the last 24 hours.
 */
export async function checkDuplicate(collectionName, email) {
  if (!db) return false
  try {
    const cutoff = Timestamp.fromDate(new Date(Date.now() - TWENTY_FOUR_HOURS))
    const q = query(
      collection(db, collectionName),
      where('formData.email', '==', email.toLowerCase().trim()),
      where('submittedAt', '>=', cutoff),
    )
    const snap = await getDocs(q)
    return !snap.empty
  } catch {
    return false
  }
}

/**
 * Save a form submission with the standard document structure:
 * { submittedAt, status, formData, metadata }
 */
export async function saveSubmission(collectionName, data) {
  if (!db) return null
  try {
    const ref = await addDoc(collection(db, collectionName), {
      submittedAt: serverTimestamp(),
      status: 'new',
      formData: {
        ...data,
        email: data.email?.toLowerCase().trim(),
      },
      metadata: {
        userAgent: navigator.userAgent,
        source: 'website',
      },
    })
    return ref.id
  } catch (error) {
    console.error('Firestore save error:', error.message)
    return null
  }
}
