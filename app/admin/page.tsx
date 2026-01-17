'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getPendingAssignments, getPendingApplications, getAllFellowshipMembers } from '@/lib/db';
import { Assignment, GuildApplication, FellowshipMember } from '@/lib/types';
import { FileText, Users, Crown, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [pendingAssignments, setPendingAssignments] = useState<Assignment[]>([]);
  const [pendingApplications, setPendingApplications] = useState<GuildApplication[]>([]);
  const [fellowshipMembers, setFellowshipMembers] = useState<FellowshipMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [assignments, applications, members] = await Promise.all([
          getPendingAssignments(),
          getPendingApplications(),
          getAllFellowshipMembers(),
        ]);
        setPendingAssignments(assignments);
        setPendingApplications(applications);
        setFellowshipMembers(members);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zavia-navy border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-zavia-navy">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-slate-600">
          Manage submissions, applications, and members
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Pending Assignments
            </CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zavia-navy">
              {pendingAssignments.length}
            </div>
            <p className="text-sm text-slate-500">
              Canon submissions awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Pending Applications
            </CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zavia-navy">
              {pendingApplications.length}
            </div>
            <p className="text-sm text-slate-500">
              Guild applications to review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Fellowship Members
            </CardTitle>
            <Crown className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zavia-navy">
              {fellowshipMembers.length}
            </div>
            <p className="text-sm text-slate-500">
              Active fellowship members
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      {(pendingAssignments.length > 0 || pendingApplications.length > 0) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-800">Action Required</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingAssignments.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-yellow-700">
                  {pendingAssignments.length} assignment
                  {pendingAssignments.length !== 1 ? 's' : ''} pending review
                </p>
                <Link href="/admin/canon/submissions">
                  <Button size="sm">
                    Review Assignments
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
            {pendingApplications.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-yellow-700">
                  {pendingApplications.length} application
                  {pendingApplications.length !== 1 ? 's' : ''} pending review
                </p>
                <Link href="/admin/guild/applications">
                  <Button size="sm">
                    Review Applications
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/admin/canon/submissions">
          <Card className="transition hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-canon-primary/10 p-3">
                <FileText className="h-6 w-6 text-canon-primary" />
              </div>
              <div>
                <p className="font-semibold text-zavia-navy">Canon Submissions</p>
                <p className="text-sm text-slate-500">Review and grade assignments</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/guild/applications">
          <Card className="transition hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-guild-primary/10 p-3">
                <Users className="h-6 w-6 text-guild-primary" />
              </div>
              <div>
                <p className="font-semibold text-zavia-navy">Guild Applications</p>
                <p className="text-sm text-slate-500">Review cohort applications</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/fellowship/members">
          <Card className="transition hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-fellowship-primary/10 p-3">
                <Crown className="h-6 w-6 text-fellowship-primary" />
              </div>
              <div>
                <p className="font-semibold text-zavia-navy">Fellowship</p>
                <p className="text-sm text-slate-500">Manage members and invites</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
