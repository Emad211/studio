import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Your web app's Firebase configuration should be stored in environment variables
// for security and flexibility.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase only if it hasn't been initialized yet
function getFirebaseApp() {
  if (!getApps().length) {
    // Check if all required config values are present
    if (
      !firebaseConfig.apiKey ||
      !firebaseConfig.projectId ||
      !firebaseConfig.authDomain
    ) {
      throw new Error(
        "Firebase configuration is missing or incomplete. Please check your environment variables."
      );
    }
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

const app = getFirebaseApp();
const db = getFirestore(app);

export { db };
