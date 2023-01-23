import { initializeApp } from 'firebase/app';

const {
  VITE_FB_apiKey,
  VITE_FB_authDomain,
  VITE_FB_databaseURL,
  VITE_FB_projectId,
  VITE_FB_storageBucket,
  VITE_FB_messagingSenderId,
  VITE_FB_appId,
  VITE_FB_measurementId,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FB_apiKey,
  authDomain: VITE_FB_authDomain,
  databaseURL: VITE_FB_databaseURL,
  projectId: VITE_FB_projectId,
  storageBucket: VITE_FB_storageBucket,
  messagingSenderId: VITE_FB_messagingSenderId,
  appId: VITE_FB_appId,
  measurementId: VITE_FB_measurementId,
};

export const app = initializeApp(firebaseConfig);
