'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { submitGuildApplication } from '@/lib/db';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function GuildApplyPage() {
  return (
    <ProtectedRoute>
      <GuildApplication />
    </ProtectedRoute>
  );
}

function GuildApplication() {
  const { user } = useAuth();
  const router = useRouter();
  const [strategicDoctrine, setStrategicDoctrine] = useState('');
  const [whyGuild, setWhyGuild] = useState('');
  const [commitment, setCommitment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!user) return null;

  const isQualified = user.canonProgress.qualifiedForGuild;

  if (!isQualified) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">
                  Not Yet Qualified
                </h3>
                <p className="text-sm text-yellow-700">
                  Complete all Canon modules to apply for The Guild.
                </p>
              </div>
            </div>
            <Link href="/canon">
              <Button className="mt-4">Go to Canon</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!strategicDoctrine.trim() || !whyGuild.trim() || !commitment.trim()) {
      setError('Please complete all fields');
      return;
    }

    setSubmitting(true);

    try {
      await submitGuildApplication({
        userId: user.id,
        cohortId: 'next-available', // Will be assigned by admin
        responses: {
          strategicDoctrine: strategicDoctrine.trim(),
          whyGuild: whyGuild.trim(),
          commitment: commitment.trim(),
        },
      });

      setSuccess(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-zavia-navy">
          Application Submitted!
        </h1>
        <p className="mt-2 text-slate-600">
          We&apos;ll review your application and get back to you soon.
        </p>
        <Link href="/dashboard">
          <Button className="mt-6">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-8">
      <Link
        href="/guild"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-zavia-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Guild
      </Link>

      <div>
        <Badge variant="guild" className="mb-2">Application</Badge>
        <h1 className="font-serif text-3xl font-bold text-zavia-navy">
          Apply for The Guild
        </h1>
        <p className="mt-2 text-slate-600">
          Tell us about yourself and your strategic journey.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Application</CardTitle>
          <CardDescription>
            All fields are required. Take your time to provide thoughtful responses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Textarea
              label="Share Your Strategic Doctrine"
              placeholder="Paste or summarize the key points from your Strategic Doctrine..."
              value={strategicDoctrine}
              onChange={(e) => setStrategicDoctrine(e.target.value)}
              helperText="This helps us understand your strategic worldview."
              className="min-h-[150px]"
            />

            <Textarea
              label="Why do you want to join The Guild?"
              placeholder="What do you hope to gain from the cohort experience?"
              value={whyGuild}
              onChange={(e) => setWhyGuild(e.target.value)}
              helperText="Be specific about your goals and expectations."
              className="min-h-[100px]"
            />

            <Textarea
              label="Commitment Confirmation"
              placeholder="Describe your ability to commit to all 16 sessions and weekly assignments..."
              value={commitment}
              onChange={(e) => setCommitment(e.target.value)}
              helperText="The Guild requires full participation."
              className="min-h-[100px]"
            />

            <div className="flex justify-end gap-3 pt-4">
              <Link href="/guild">
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" loading={submitting}>
                Submit Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
