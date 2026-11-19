// Public Firebase web config. These values are safe in the browser; Firestore/Storage security rules protect the data.
// Fill them in .env.local (see .env.example). Until then the site serves its built-in content.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? ''
};

const placeholder = (v: string) => !v || v.startsWith('YOUR_');

export const firebaseConfigured = !placeholder(firebaseConfig.apiKey) && !placeholder(firebaseConfig.projectId);
