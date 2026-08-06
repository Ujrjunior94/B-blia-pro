import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInAnonymously as firebaseSignInAnonymously,
  User as FirebaseUser,
  NextOrObserver
} from 'firebase/auth';
import { auth } from './config';

export async function loginWithEmail(email: string, pass: string) {
  return await signInWithEmailAndPassword(auth, email, pass);
}

export async function registerWithEmail(email: string, pass: string) {
  return await createUserWithEmailAndPassword(auth, email, pass);
}

export async function logoutUser() {
  return await firebaseSignOut(auth);
}

export async function loginAnonymously() {
  return await firebaseSignInAnonymously(auth);
}

export function observeAuthState(callback: NextOrObserver<FirebaseUser>) {
  return firebaseOnAuthStateChanged(auth, callback);
}

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  firebaseSignOut as signOut, 
  firebaseOnAuthStateChanged as onAuthStateChanged,
  firebaseSignInAnonymously as signInAnonymously 
};
export type { FirebaseUser };
