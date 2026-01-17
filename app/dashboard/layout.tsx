'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { signOut } from '@/lib/auth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Crown,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'The Canon', href: '/canon', icon: BookOpen, requiresAccess: 'canon' },
  { name: 'The Guild', href: '/guild', icon: Users, requiresAccess: 'guild' },
  { name: 'The Fellowship', href: '/fellowship', icon: Crown, requiresAccess: 'fellowship' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-white">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="font-serif text-lg font-bold text-zavia-navy">
              Zavia Academy
            </Link>
          </div>

          <nav className="flex flex-1 flex-col p-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const hasAccess =
                  !item.requiresAccess ||
                  (item.requiresAccess === 'canon' && user?.canonAccess) ||
                  (item.requiresAccess === 'guild' && user?.guildAccess) ||
                  (item.requiresAccess === 'fellowship' && user?.fellowshipAccess);

                if (!hasAccess && item.requiresAccess) return null;

                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition',
                        isActive
                          ? 'bg-zavia-navy text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto space-y-1">
              {user?.isAdmin && (
                <Link
                  href="/admin"
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition',
                    pathname.startsWith('/admin')
                      ? 'bg-zavia-navy text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  <Shield className="h-5 w-5" />
                  Admin
                </Link>
              )}

              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>

              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="pl-64">
          <div className="min-h-screen p-8">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
