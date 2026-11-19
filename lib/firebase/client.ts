// Browser Firebase (admin console only): auth, Firestore and Storage.
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

export function fb() {
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  return { auth: getAuth(app), db: getFirestore(app), storage: getStorage(app) };
}
