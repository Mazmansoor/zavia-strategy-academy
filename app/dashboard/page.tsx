'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, LayerBadge, StatusBadge } from '@/components/ui/Badge';
import { calculateProgress } from '@/lib/utils';
import {
  BookOpen,
  Users,
  Crown,
  ArrowRight,
  CheckCircle,
  Clock,
  Lock,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  // Calculate Canon progress
  const modules = ['module1', 'module2', 'module3', 'module4', 'module5'] as const;
  const completedModules = modules.filter(
    (mod) => user.canonProgress[mod].assignmentStatus === 'pass'
  ).length;
  const canonProgressPercent = calculateProgress(completedModules, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-zavia-navy">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="mt-2 text-slate-600">
          Continue your strategic journey
        </p>
      </div>

      {/* Current Status Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Canon Status */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <BookOpen className="h-5 w-5 text-canon-primary" />
              <LayerBadge layer="canon" />
            </div>
            <CardTitle className="text-lg">The Canon</CardTitle>
          </CardHeader>
          <CardContent>
            {user.canonAccess ? (
              <>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">{completedModules}/5 modules</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-canon-primary transition-all"
                      style={{ width: `${canonProgressPercent}%` }}
                    />
                  </div>
                </div>
                <Link href="/canon">
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="mt-2 text-sm text-slate-600">
                  Start your strategic foundation with 5 comprehensive modules.
                </p>
                <Link href="/canon">
                  <Button size="sm" className="mt-4 w-full">
                    Unlock for $497
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        {/* Guild Status */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-guild-primary" />
              <LayerBadge layer="guild" />
            </div>
            <CardTitle className="text-lg">The Guild</CardTitle>
          </CardHeader>
          <CardContent>
            {user.guildAccess ? (
              <>
                <p className="mt-2 text-sm text-slate-600">
                  You&apos;re enrolled in a Guild cohort.
                </p>
                <Link href="/guild">
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Go to Guild
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : user.canonProgress.qualifiedForGuild ? (
              <>
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Qualified to apply
                </div>
                <Link href="/guild/apply">
                  <Button size="sm" className="mt-4 w-full">
                    Apply Now
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Lock className="h-4 w-4" />
                  Complete Canon to unlock
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Live cohort experience with 15 peers maximum.
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Fellowship Status */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Crown className="h-5 w-5 text-fellowship-primary" />
              <LayerBadge layer="fellowship" />
            </div>
            <CardTitle className="text-lg">The Fellowship</CardTitle>
          </CardHeader>
          <CardContent>
            {user.fellowshipAccess ? (
              <>
                <p className="mt-2 text-sm text-slate-600">
                  Welcome to the elite network.
                </p>
                <Link href="/fellowship">
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Enter Fellowship
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Lock className="h-4 w-4" />
                  Invitation only
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Top Guild performers receive invitations.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Canon Progress Details */}
      {user.canonAccess && (
        <Card>
          <CardHeader>
            <CardTitle>Canon Progress</CardTitle>
            <CardDescription>
              Complete all modules and assignments to qualify for The Guild
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {modules.map((mod, index) => {
                const moduleNum = index + 1;
                const progress = user.canonProgress[mod];
                const isCompleted = progress.assignmentStatus === 'pass';
                const isPending = progress.assignmentStatus === 'pending';
                const isStarted = progress.started !== null;

                return (
                  <div
                    key={mod}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          isCompleted
                            ? 'bg-green-100 text-green-600'
                            : isStarted
                            ? 'bg-canon-accent/20 text-canon-primary'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="font-semibold">{moduleNum}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Module {moduleNum}</p>
                        <p className="text-sm text-slate-500">
                          {progress.lessonsCompleted.length} lessons completed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {isCompleted ? (
                        <StatusBadge status="pass" />
                      ) : isPending ? (
                        <StatusBadge status="pending" />
                      ) : progress.assignmentSubmitted ? (
                        <StatusBadge status="not_yet" />
                      ) : isStarted ? (
                        <Badge variant="warning">In Progress</Badge>
                      ) : (
                        <Badge>Not Started</Badge>
                      )}
                      <Link href={`/canon/module-${moduleNum}`}>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {!user.canonAccess && (
        <Card className="border-2 border-dashed border-zavia-gold bg-zavia-gold/5">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-zavia-navy">
                Start Your Strategic Journey
              </h3>
              <p className="mt-1 text-slate-600">
                Unlock The Canon and begin building your strategic foundation.
              </p>
            </div>
            <Link href="/canon">
              <Button variant="secondary" size="lg">
                Get The Canon - $497
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
