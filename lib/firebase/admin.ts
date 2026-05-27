import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { serverEnv } from "@/lib/env";

const privateKey = serverEnv.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const hasServiceAccount = Boolean(serverEnv.FIREBASE_PROJECT_ID && serverEnv.FIREBASE_CLIENT_EMAIL && privateKey);
const adminOptions = hasServiceAccount
  ? {
      credential: cert({
        projectId: serverEnv.FIREBASE_PROJECT_ID,
        clientEmail: serverEnv.FIREBASE_CLIENT_EMAIL,
        privateKey
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    }
  : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    ? { storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET }
    : undefined;

export const adminApp = getApps()[0] || initializeApp(adminOptions);

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);
export { FieldValue };
