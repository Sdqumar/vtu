import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const credential = cert(JSON.parse(process.env.FIREBASE_PRIVATE_KEY!));

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential,
  });
}

const auth = getAuth();
const firestore = getFirestore();

export { auth, firestore };
