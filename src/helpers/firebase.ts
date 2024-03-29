import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getMessaging } from "firebase/messaging";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

export * from "firebase/auth";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  //   FIREBASE_DATABASE_URL,
  RECAPTCHA_KEY,
} from "@/helpers/config/env";

const firebaseConfig: FirebaseOptions = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
  //   databaseURL: FIREBASE_DATABASE_URL,
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
// export const messaging = getMessaging(app);
// export const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(RECAPTCHA_KEY),
//   isTokenAutoRefreshEnabled: true,
// });
