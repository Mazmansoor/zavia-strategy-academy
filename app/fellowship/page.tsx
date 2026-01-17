'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Crown, Users, Calendar, Lightbulb, Lock, ArrowRight } from 'lucide-react';

export default function FellowshipPage() {
  const { user } = useAuth();

  // If no access, show info page
  if (!user?.fellowshipAccess) {
    return <FellowshipInfoPage />;
  }

  return (
    <ProtectedRoute requiredLayer="fellowship">
      <FellowshipDashboard />
    </ProtectedRoute>
  );
}

function FellowshipDashboard() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8 text-fellowship-primary" />
          <h1 className="font-serif text-3xl font-bold text-zavia-navy">The Fellowship</h1>
        </div>
        <p className="mt-2 text-slate-600">
          Welcome to the elite network
        </p>
      </div>

      {/* Member Status */}
      <Card className="border-fellowship-primary/20 bg-fellowship-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Crown className="h-10 w-10 text-fellowship-primary" />
            <div>
              <h3 className="font-semibold text-fellowship-primary">Active Fellow</h3>
              <p className="text-sm text-slate-600">
                You have full access to Fellowship resources and events
              </p>
            </div>
            <Badge variant="fellowship" className="ml-auto">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/fellowship/members">
          <Card className="transition hover:shadow-md">
            <CardContent className="p-6 text-center">
              <Users className="mx-auto h-8 w-8 text-fellowship-primary" />
              <h3 className="mt-3 font-semibold text-zavia-navy">Member Directory</h3>
              <p className="mt-1 text-sm text-slate-500">Connect with fellow members</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/fellowship/convenings">
          <Card className="transition hover:shadow-md">
            <CardContent className="p-6 text-center">
              <Calendar className="mx-auto h-8 w-8 text-fellowship-primary" />
              <h3 className="mt-3 font-semibold text-zavia-navy">Convenings</h3>
              <p className="mt-1 text-sm text-slate-500">Upcoming events</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/fellowship/contribute">
          <Card className="transition hover:shadow-md">
            <CardContent className="p-6 text-center">
              <Lightbulb className="mx-auto h-8 w-8 text-fellowship-primary" />
              <h3 className="mt-3 font-semibold text-zavia-navy">Contribute</h3>
              <p className="mt-1 text-sm text-slate-500">Share insights</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Upcoming Convenings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Convenings</CardTitle>
          <CardDescription>In-person gatherings with fellow strategic minds</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">
            No upcoming convenings scheduled. Check back soon.
          </p>
        </CardContent>
      </Card>

      {/* Recent Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contributions</CardTitle>
          <CardDescription>Case studies and insights from the community</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">
            No contributions yet. Be the first to share!
          </p>
          <Link href="/fellowship/contribute">
            <Button variant="outline" className="mt-4">
              Share a Case Study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function FellowshipInfoPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8 text-fellowship-primary" />
          <h1 className="font-serif text-3xl font-bold text-zavia-navy">The Fellowship</h1>
        </div>
        <p className="mt-2 text-slate-600">
          An elite network of strategic minds
        </p>
      </div>

      {/* Access Status */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Lock className="h-8 w-8 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-800">
                Invitation Only
              </h3>
              <p className="text-sm text-yellow-700">
                The Fellowship is invite-only. Top performers in The Guild receive invitations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What The Fellowship Offers */}
      <Card>
        <CardHeader>
          <CardTitle>What The Fellowship Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Calendar,
                title: 'Annual Convenings',
                description: 'Two in-person gatherings per year with fellow strategic minds',
              },
              {
                icon: Lightbulb,
                title: 'Direct Problem Access',
                description: 'Bring your toughest challenges to peers who understand',
              },
              {
                icon: Users,
                title: 'Elite Network',
                description: 'Connect with leaders across industries who think differently',
              },
              {
                icon: Crown,
                title: 'Lifetime Community',
                description: 'Relationships that extend beyond annual membership',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="rounded-lg bg-fellowship-primary/10 p-2 h-fit">
                  <item.icon className="h-5 w-5 text-fellowship-primary" />
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

      {/* Path to Fellowship */}
      <Card>
        <CardHeader>
          <CardTitle>How to Join</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-canon-primary text-sm font-bold text-white">
                1
              </div>
              <div>
                <p className="font-medium text-zavia-navy">Complete The Canon</p>
                <p className="text-sm text-slate-500">Master the foundational frameworks</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-guild-primary text-sm font-bold text-white">
                2
              </div>
              <div>
                <p className="font-medium text-zavia-navy">Excel in The Guild</p>
                <p className="text-sm text-slate-500">Demonstrate strategic excellence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fellowship-primary text-sm font-bold text-white">
                3
              </div>
              <div>
                <p className="font-medium text-zavia-navy">Receive an Invitation</p>
                <p className="text-sm text-slate-500">Top performers are nominated</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-zavia-navy">$4,997/year</p>
              <p className="text-sm text-slate-500">Annual membership</p>
            </div>
            <Badge variant="fellowship">Invitation Only</Badge>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="border-2 border-dashed border-zavia-gold bg-zavia-gold/5">
        <CardContent className="p-6 text-center">
          <h3 className="font-serif text-xl font-bold text-zavia-navy">
            Start Your Journey
          </h3>
          <p className="mt-2 text-slate-600">
            The path to The Fellowship begins with The Canon.
          </p>
          <Link href="/canon">
            <Button className="mt-4">
              Start with The Canon
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
