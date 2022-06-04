import { cert, getApps, initializeApp } from "firebase-admin/app";
import myCredentials from "../credentials.js";
import { getFirestore } from "firebase-admin/firestore";

export const dbConnect = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(myCredentials),
    });
  }
  return getFirestore();
};
