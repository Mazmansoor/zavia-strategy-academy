'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { CANON_MODULES } from '@/lib/content/canon/modules';
import { calculateProgress } from '@/lib/utils';
import { BookOpen, CheckCircle, Lock, ArrowRight, Clock } from 'lucide-react';

export default function CanonPage() {
  const { user } = useAuth();

  // If no access, show marketing page
  if (!user?.canonAccess) {
    return <CanonMarketingPage />;
  }

  return (
    <ProtectedRoute requiredLayer="canon">
      <CanonDashboard />
    </ProtectedRoute>
  );
}

function CanonDashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const modules = ['module1', 'module2', 'module3', 'module4', 'module5'] as const;
  const completedModules = modules.filter(
    (mod) => user.canonProgress[mod].assignmentStatus === 'pass'
  ).length;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-canon-primary" />
          <h1 className="font-serif text-3xl font-bold text-zavia-navy">The Canon</h1>
        </div>
        <p className="mt-2 text-slate-600">
          Master the foundational frameworks of strategic thinking
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Overall Progress</p>
              <p className="text-2xl font-bold text-zavia-navy">
                {completedModules} of 5 modules completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-500">Status</p>
              {user.canonProgress.completed ? (
                <Badge variant="success">Canon Complete</Badge>
              ) : (
                <Badge variant="warning">In Progress</Badge>
              )}
            </div>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-canon-primary transition-all"
              style={{ width: `${calculateProgress(completedModules, 5)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-zavia-navy">Modules</h2>
        <div className="grid gap-4">
          {CANON_MODULES.map((module, index) => {
            const moduleKey = `module${module.id}` as keyof typeof user.canonProgress;
            const progress = user.canonProgress[moduleKey];

            if (typeof progress !== 'object' || !('assignmentStatus' in progress)) return null;

            const isCompleted = progress.assignmentStatus === 'pass';
            const isPending = progress.assignmentStatus === 'pending' && progress.assignmentSubmitted;
            const isStarted = progress.started !== null;
            const lessonsCount = module.lessons.length;
            const completedLessons = progress.lessonsCompleted?.length || 0;

            // Lock modules until previous is complete (except module 1)
            const previousModuleKey = `module${module.id - 1}` as keyof typeof user.canonProgress;
            const previousProgress = module.id > 1 ? user.canonProgress[previousModuleKey] : null;
            const isLocked = module.id > 1 && previousProgress &&
              typeof previousProgress === 'object' &&
              'assignmentStatus' in previousProgress &&
              previousProgress.assignmentStatus !== 'pass';

            return (
              <Card
                key={module.id}
                className={`transition ${isLocked ? 'opacity-60' : 'hover:shadow-md'}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          isCompleted
                            ? 'bg-green-100 text-green-600'
                            : isStarted
                            ? 'bg-canon-primary/10 text-canon-primary'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : isLocked ? (
                          <Lock className="h-6 w-6" />
                        ) : (
                          <span className="font-bold">{module.id}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-zavia-navy">
                          Module {module.id}: {module.title}
                        </h3>
                        <p className="text-sm text-canon-secondary">{module.subtitle}</p>
                        <p className="mt-2 text-sm text-slate-600">{module.description}</p>
                        <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {lessonsCount} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {module.lessons.reduce(
                              (acc, l) => acc + parseInt(l.duration),
                              0
                            )}{' '}
                            min total
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isCompleted ? (
                        <StatusBadge status="pass" />
                      ) : isPending ? (
                        <StatusBadge status="pending" />
                      ) : isStarted ? (
                        <Badge variant="warning">
                          {completedLessons}/{lessonsCount} lessons
                        </Badge>
                      ) : isLocked ? (
                        <Badge>Locked</Badge>
                      ) : (
                        <Badge>Not Started</Badge>
                      )}
                      {!isLocked && (
                        <Link href={`/canon/module-${module.id}`}>
                          <Button variant="ghost" size="sm">
                            {isCompleted ? 'Review' : isStarted ? 'Continue' : 'Start'}
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Strategic Doctrine Section */}
      {user.canonProgress.completed && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-green-800">
                  Congratulations! You&apos;ve Completed The Canon
                </h3>
                <p className="mt-1 text-green-700">
                  You are now qualified to apply for The Guild.
                </p>
              </div>
              <Link href="/guild/apply">
                <Button>Apply for The Guild</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function CanonMarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-canon-primary to-canon-secondary py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white">Layer 1</Badge>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">The Canon</h1>
          <p className="mt-4 text-xl text-blue-100">
            Master the 20% of strategic knowledge that drives 80% of results
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-zavia-navy">
                What You&apos;ll Learn
              </h2>
              <ul className="mt-6 space-y-4">
                {CANON_MODULES.map((module) => (
                  <li key={module.id} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canon-primary/10 text-canon-primary">
                      {module.id}
                    </div>
                    <div>
                      <p className="font-medium text-zavia-navy">{module.title}</p>
                      <p className="text-sm text-slate-600">{module.subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-zavia-navy">
                What You Get
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  '5 comprehensive modules',
                  '20 in-depth lessons',
                  '5 practical assignments',
                  'Personal Strategic Doctrine',
                  'Guild application eligibility',
                  'Lifetime access',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl bg-slate-50 p-6">
                <p className="text-3xl font-bold text-zavia-navy">$497</p>
                <p className="text-sm text-slate-600">One-time payment, lifetime access</p>
                <Link href="/signup">
                  <Button className="mt-4 w-full" size="lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
