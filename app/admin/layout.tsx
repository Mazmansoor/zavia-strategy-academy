'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Users,
  Crown,
  UserPlus,
  Settings,
} from 'lucide-react';

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Canon Submissions', href: '/admin/canon/submissions', icon: FileText },
  { name: 'Guild Applications', href: '/admin/guild/applications', icon: UserPlus },
  { name: 'Guild Cohorts', href: '/admin/guild/cohorts', icon: Users },
  { name: 'Fellowship Members', href: '/admin/fellowship/members', icon: Crown },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-slate-100">
        {/* Admin Header */}
        <header className="border-b bg-zavia-navy text-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="font-serif text-xl font-bold">
                Admin Panel
              </Link>
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold">
                Admin
              </span>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-slate-300 hover:text-white"
            >
              Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Admin Navigation */}
        <nav className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8 overflow-x-auto">
              {adminNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition',
                      isActive
                        ? 'border-zavia-navy text-zavia-navy'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Admin Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
