'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Users, Calendar, Video, Lock, CheckCircle, ArrowRight } from 'lucide-react';

export default function GuildPage() {
  const { user } = useAuth();

  // If no access, show info/apply page
  if (!user?.guildAccess) {
    return <GuildInfoPage />;
  }

  return (
    <ProtectedRoute requiredLayer="guild">
      <GuildDashboard />
    </ProtectedRoute>
  );
}

function GuildDashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-guild-primary" />
          <h1 className="font-serif text-3xl font-bold text-zavia-navy">The Guild</h1>
        </div>
        <p className="mt-2 text-slate-600">
          Your cohort-based learning experience
        </p>
      </div>

      {/* Cohort Info */}
      <Card>
        <CardHeader>
          <CardTitle>Your Cohort</CardTitle>
          <CardDescription>
            {user?.guildCohortId ? `Cohort ID: ${user.guildCohortId}` : 'Cohort details'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Welcome to The Guild! Your cohort information and sessions will appear here.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <Calendar className="mx-auto h-6 w-6 text-guild-primary" />
              <p className="mt-2 font-semibold text-zavia-navy">8 Weeks</p>
              <p className="text-sm text-slate-500">Duration</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <Video className="mx-auto h-6 w-6 text-guild-primary" />
              <p className="mt-2 font-semibold text-zavia-navy">16 Sessions</p>
              <p className="text-sm text-slate-500">Live Sessions</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <Users className="mx-auto h-6 w-6 text-guild-primary" />
              <p className="mt-2 font-semibold text-zavia-navy">15 Max</p>
              <p className="text-sm text-slate-500">Cohort Size</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">
            Session schedule will be available once your cohort begins.
          </p>
        </CardContent>
      </Card>

      {/* Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">
            Weekly assignments will appear here during your cohort.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function GuildInfoPage() {
  const { user } = useAuth();
  const isQualified = user?.canonProgress.qualifiedForGuild;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-guild-primary" />
          <h1 className="font-serif text-3xl font-bold text-zavia-navy">The Guild</h1>
        </div>
        <p className="mt-2 text-slate-600">
          Live cohort-based learning with direct mentorship
        </p>
      </div>

      {/* Access Status */}
      <Card className={isQualified ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            {isQualified ? (
              <>
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">
                    You&apos;re Qualified to Apply!
                  </h3>
                  <p className="text-sm text-green-700">
                    You&apos;ve completed The Canon and can now apply for The Guild.
                  </p>
                </div>
                <Link href="/guild/apply" className="ml-auto">
                  <Button>
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Lock className="h-8 w-8 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800">
                    Complete The Canon First
                  </h3>
                  <p className="text-sm text-yellow-700">
                    Finish all 5 Canon modules to unlock Guild applications.
                  </p>
                </div>
                <Link href="/canon" className="ml-auto">
                  <Button variant="outline">
                    Go to Canon
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* What You Get */}
      <Card>
        <CardHeader>
          <CardTitle>What You Get</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Video,
                title: '16 Live Sessions',
                description: 'Two 90-minute sessions per week for 8 weeks',
              },
              {
                icon: Users,
                title: 'Small Cohort',
                description: 'Maximum 15 participants for deep engagement',
              },
              {
                icon: Calendar,
                title: 'Structured Curriculum',
                description: 'Weekly topics building to a complete strategic plan',
              },
              {
                title: 'Direct Mentorship',
                icon: CheckCircle,
                description: 'Personal feedback on your strategic work',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="rounded-lg bg-guild-primary/10 p-2 h-fit">
                  <item.icon className="h-5 w-5 text-guild-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-zavia-navy">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-zavia-navy">$2,997</p>
              <p className="text-sm text-slate-500">One-time payment</p>
            </div>
            <Badge variant="guild">By Application</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
