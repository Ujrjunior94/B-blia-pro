import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInAnonymously,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0167985385",
  appId: "1:710269410392:web:a26f36e79c3db99e5cbe2d",
  apiKey: "AIzaSyDu4aGG5w7VKzl99YA4k3w_sEQJ8nKfZbA",
  authDomain: "gen-lang-client-0167985385.firebaseapp.com",
  storageBucket: "gen-lang-client-0167985385.firebasestorage.app",
  messagingSenderId: "710269410392"
};

const databaseId = "ai-studio-jornadadabblia-51bec6e5-9b62-4cf5-bca2-e8211ea79079";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app, databaseId);

export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInAnonymously,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  serverTimestamp
};
export type { FirebaseUser };

