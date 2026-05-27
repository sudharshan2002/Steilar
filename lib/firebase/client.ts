"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import { clientEnv } from "@/lib/env";

const firebaseConfig = {
  apiKey: clientEnv.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: clientEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "steilar-demo",
  storageBucket: clientEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "steilar-demo.appspot.com",
  messagingSenderId: clientEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: clientEnv.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:steilar"
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");

export async function messaging() {
  if (await isSupported()) {
    return getMessaging(firebaseApp);
  }
  return null;
}
