import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser, getUser } from './db';
import { User } from './types';

// Sign up with email and password
export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<{ firebaseUser: FirebaseUser; user: User }> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  // Update display name in Firebase Auth
  await updateProfile(credential.user, { displayName: name });

  // Create user document in Firestore
  const user = await createUser(credential.user.uid, email, name);

  return { firebaseUser: credential.user, user };
}

// Sign in with email and password
export async function signIn(
  email: string,
  password: string
): Promise<{ firebaseUser: FirebaseUser; user: User | null }> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = await getUser(credential.user.uid);

  return { firebaseUser: credential.user, user };
}

// Sign out
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

// Send password reset email
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// Get current Firebase user
export function getCurrentFirebaseUser(): FirebaseUser | null {
  return auth.currentUser;
}

// Subscribe to auth state changes
export function onAuthChange(
  callback: (user: FirebaseUser | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}

// Get user data from Firestore for current auth user
export async function getCurrentUser(): Promise<User | null> {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;

  return getUser(firebaseUser.uid);
}

// Check if user has access to a layer
export function hasLayerAccess(user: User | null, layer: 'canon' | 'guild' | 'fellowship'): boolean {
  if (!user) return false;

  switch (layer) {
    case 'canon':
      return user.canonAccess;
    case 'guild':
      return user.guildAccess;
    case 'fellowship':
      return user.fellowshipAccess;
    default:
      return false;
  }
}

// Check if user is admin
export function isAdmin(user: User | null): boolean {
  return user?.isAdmin === true;
}

// Check if user has completed the Canon
export function hasCompletedCanon(user: User | null): boolean {
  return user?.canonProgress.completed === true;
}

// Check if user is qualified for Guild
export function isQualifiedForGuild(user: User | null): boolean {
  return user?.canonProgress.qualifiedForGuild === true;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
export function isValidPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Auth error messages
export function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/invalid-credential':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    default:
      return 'An error occurred. Please try again';
  }
}
