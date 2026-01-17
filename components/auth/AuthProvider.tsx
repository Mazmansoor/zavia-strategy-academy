'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUser } from '@/lib/db';
import { User } from '@/lib/types';

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  user: null,
  loading: true,
  error: null,
  refreshUser: async () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string) => {
    try {
      const userData = await getUser(uid);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user data'));
      setUser(null);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (firebaseUser) {
      await fetchUserData(firebaseUser.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (fbUser) => {
        setFirebaseUser(fbUser);

        if (fbUser) {
          await fetchUserData(fbUser.uid);
        } else {
          setUser(null);
        }

        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = {
    firebaseUser,
    user,
    loading,
    error,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to require authentication
export function useRequireAuth(redirectUrl: string = '/login') {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = redirectUrl;
    }
  }, [user, loading, redirectUrl]);

  return { user, loading };
}

// Hook to check layer access
export function useLayerAccess(layer: 'canon' | 'guild' | 'fellowship') {
  const { user, loading } = useAuth();

  const hasAccess = user
    ? layer === 'canon'
      ? user.canonAccess
      : layer === 'guild'
      ? user.guildAccess
      : user.fellowshipAccess
    : false;

  return { hasAccess, loading, user };
}
