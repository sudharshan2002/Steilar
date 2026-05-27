"use client";

import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "@/lib/firebase/client";

export function observeAuth(callback: Parameters<typeof onAuthStateChanged>[1]) {
  return onAuthStateChanged(auth, callback);
}

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signInWithApple() {
  return signInWithPopup(auth, appleProvider);
}

export function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function createEmailAccount(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signOutOfSteilar() {
  return signOut(auth);
}
