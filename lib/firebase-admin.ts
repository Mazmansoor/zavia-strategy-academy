import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (server-side only)
let adminApp: App;
let adminAuth: Auth;
let adminDb: Firestore;

function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    // Use service account from environment variable
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccount) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
    }

    try {
      const parsedServiceAccount = JSON.parse(serviceAccount);

      adminApp = initializeApp({
        credential: cert(parsedServiceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    } catch {
      throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY JSON format');
    }
  } else {
    adminApp = getApps()[0];
  }

  adminAuth = getAuth(adminApp);
  adminDb = getFirestore(adminApp);

  return { adminApp, adminAuth, adminDb };
}

// Lazy initialization for server-side only
export function getAdminAuth(): Auth {
  if (!adminAuth) {
    initializeFirebaseAdmin();
  }
  return adminAuth;
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    initializeFirebaseAdmin();
  }
  return adminDb;
}

export { adminApp, adminAuth, adminDb };
