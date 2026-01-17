'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { Layer } from '@/lib/types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredLayer?: Layer;
  requireAdmin?: boolean;
  fallbackUrl?: string;
}

export function ProtectedRoute({
  children,
  requiredLayer,
  requireAdmin = false,
  fallbackUrl = '/login',
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Not logged in
    if (!user) {
      router.push(fallbackUrl);
      return;
    }

    // Check admin requirement
    if (requireAdmin && !user.isAdmin) {
      router.push('/dashboard');
      return;
    }

    // Check layer access
    if (requiredLayer) {
      const hasAccess =
        requiredLayer === 'canon'
          ? user.canonAccess
          : requiredLayer === 'guild'
          ? user.guildAccess
          : user.fellowshipAccess;

      if (!hasAccess) {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, loading, requiredLayer, requireAdmin, router, fallbackUrl]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Not authorized - will redirect
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Check admin
  if (requireAdmin && !user.isAdmin) {
    return null;
  }

  // Check layer access
  if (requiredLayer) {
    const hasAccess =
      requiredLayer === 'canon'
        ? user.canonAccess
        : requiredLayer === 'guild'
        ? user.guildAccess
        : user.fellowshipAccess;

    if (!hasAccess) {
      return null;
    }
  }

  return <>{children}</>;
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zavia-navy border-t-transparent" />
      <p className="text-sm text-slate-500">Loading...</p>
    </div>
  );
}

// Higher-order component for protecting pages
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requiredLayer?: Layer;
    requireAdmin?: boolean;
    fallbackUrl?: string;
  } = {}
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Component for checking access inline
interface AccessGateProps {
  children: ReactNode;
  layer?: Layer;
  requireAdmin?: boolean;
  fallback?: ReactNode;
}

export function AccessGate({
  children,
  layer,
  requireAdmin = false,
  fallback = null,
}: AccessGateProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <>{fallback}</>;
  }

  if (requireAdmin && !user.isAdmin) {
    return <>{fallback}</>;
  }

  if (layer) {
    const hasAccess =
      layer === 'canon'
        ? user.canonAccess
        : layer === 'guild'
        ? user.guildAccess
        : user.fellowshipAccess;

    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}
