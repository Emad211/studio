import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if all required config values are present
const isFirebaseConfigured = 
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.authDomain;

if (isFirebaseConfigured) {
    if (!getApps().length) {
        try {
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
        } catch (e) {
            console.error("Failed to initialize Firebase", e);
        }
    } else {
        app = getApp();
        db = getFirestore(app);
    }
} else {
    console.warn("Firebase configuration is missing or incomplete. Firebase services will be disabled.");
}

export { db };
