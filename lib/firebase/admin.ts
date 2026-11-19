// Server-only Firebase Admin: stores form submissions and verifies admin tokens for instant publishing.
// Needs a service account (FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY). Never import this from client code.
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '';
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL ?? '';
const privateKey = (process.env.FIREBASE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n');

export const adminConfigured = Boolean(projectId && clientEmail && privateKey) && !clientEmail.startsWith('YOUR_') && !projectId.startsWith('YOUR_');

function app() {
  return getApps()[0] ?? initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

export const adminDb = () => getFirestore(app());

/** True when the bearer token belongs to a signed-in user listed in the `admins` collection. */
export async function isAdminToken(token: string) {
  try {
    const { uid } = await getAuth(app()).verifyIdToken(token);
    return (await adminDb().doc(`admins/${uid}`).get()).exists;
  } catch {
    return false;
  }
}
