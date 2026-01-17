'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { getModule, CANON_MODULES } from '@/lib/content/canon/modules';
import { submitAssignment } from '@/lib/db';
import { CanonModule } from '@/lib/types';
import { ArrowLeft, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function AssignmentsPage() {
  return (
    <ProtectedRoute requiredLayer="canon">
      <AssignmentsContent />
    </ProtectedRoute>
  );
}

function AssignmentsContent() {
  const { user, refreshUser } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const moduleParam = searchParams.get('module');
  const selectedModuleId = moduleParam ? parseInt(moduleParam) : null;

  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!user) return null;

  const selectedModule = selectedModuleId ? getModule(selectedModuleId) : null;

  const moduleKey = selectedModuleId
    ? (`module${selectedModuleId}` as keyof typeof user.canonProgress)
    : null;
  const progress = moduleKey ? user.canonProgress[moduleKey] : null;

  const canSubmit =
    selectedModule &&
    progress &&
    typeof progress === 'object' &&
    'lessonsCompleted' in progress &&
    progress.lessonsCompleted.length === selectedModule.lessons.length &&
    !progress.assignmentSubmitted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModuleId || !canSubmit) return;

    setError('');
    setSubmitting(true);

    try {
      const wordCount = content.trim().split(/\s+/).length;
      const maxWords = selectedModule?.assignment.wordLimit || 500;

      if (wordCount > maxWords) {
        setError(`Your submission exceeds the word limit (${wordCount}/${maxWords} words)`);
        setSubmitting(false);
        return;
      }

      if (wordCount < 50) {
        setError('Your submission is too short. Please provide a more detailed response.');
        setSubmitting(false);
        return;
      }

      await submitAssignment(user.id, selectedModuleId as CanonModule, content);
      await refreshUser();
      setSuccess(true);

      setTimeout(() => {
        router.push(`/canon/module-${selectedModuleId}`);
      }, 2000);
    } catch (err) {
      setError('Failed to submit assignment. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Show module selection if no module specified
  if (!selectedModuleId) {
    return (
      <div className="mx-auto max-w-4xl space-y-8 p-8">
        <div>
          <Link
            href="/canon"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-zavia-navy"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Canon
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-bold text-zavia-navy">
            Assignments
          </h1>
          <p className="mt-2 text-slate-600">
            Submit your module assignments for review
          </p>
        </div>

        <div className="grid gap-4">
          {CANON_MODULES.map((module) => {
            const modKey = `module${module.id}` as keyof typeof user.canonProgress;
            const modProgress = user.canonProgress[modKey];

            if (typeof modProgress !== 'object' || !('assignmentStatus' in modProgress)) {
              return null;
            }

            const isCompleted = modProgress.assignmentStatus === 'pass';
            const isPending = modProgress.assignmentStatus === 'pending' && modProgress.assignmentSubmitted;
            const lessonsComplete =
              modProgress.lessonsCompleted?.length === module.lessons.length;
            const canSubmitAssignment = lessonsComplete && !modProgress.assignmentSubmitted;

            return (
              <Card key={module.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        isCompleted
                          ? 'bg-green-100 text-green-600'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <FileText className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-zavia-navy">
                        Module {module.id}: {module.assignment.title}
                      </p>
                      <p className="text-sm text-slate-500">
                        {module.lessons.length} lessons ·{' '}
                        {module.assignment.wordLimit} words max
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <Badge variant="success">Passed</Badge>
                    ) : isPending ? (
                      <Badge variant="warning">Under Review</Badge>
                    ) : modProgress.assignmentSubmitted ? (
                      <Badge variant="danger">Needs Revision</Badge>
                    ) : !lessonsComplete ? (
                      <Badge>Complete Lessons First</Badge>
                    ) : null}

                    {canSubmitAssignment && (
                      <Link href={`/canon/assignments?module=${module.id}`}>
                        <Button>Submit</Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Show assignment submission form
  if (!selectedModule) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-zavia-navy">
          Assignment Submitted!
        </h1>
        <p className="mt-2 text-slate-600">
          Your assignment has been submitted for review. You&apos;ll be notified
          when feedback is ready.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-8">
      <div>
        <Link
          href="/canon/assignments"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-zavia-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Assignments
        </Link>
      </div>

      <Card>
        <CardHeader>
          <Badge variant="canon" className="w-fit">
            Module {selectedModule.id}
          </Badge>
          <CardTitle>{selectedModule.assignment.title}</CardTitle>
          <CardDescription>
            {selectedModule.assignment.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Assignment Prompt */}
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="font-semibold text-zavia-navy">Assignment Prompt</h3>
            <div className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
              {selectedModule.assignment.prompt}
            </div>
          </div>

          {/* Rubric */}
          <div>
            <h3 className="font-semibold text-zavia-navy">Evaluation Criteria</h3>
            <ul className="mt-2 space-y-1">
              {selectedModule.assignment.rubric.map((criterion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-canon-primary" />
                  {criterion}
                </li>
              ))}
            </ul>
          </div>

          {!canSubmit ? (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertCircle className="h-5 w-5" />
                <p className="font-medium">Complete all lessons first</p>
              </div>
              <p className="mt-1 text-sm text-yellow-700">
                You need to complete all {selectedModule.lessons.length} lessons
                before submitting this assignment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Textarea
                label="Your Response"
                placeholder="Write your assignment response here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px]"
                helperText={`Word limit: ${selectedModule.assignment.wordLimit} words. Current: ${
                  content.trim() ? content.trim().split(/\s+/).length : 0
                } words.`}
              />

              <div className="flex justify-end gap-3">
                <Link href={`/canon/module-${selectedModuleId}`}>
                  <Button variant="ghost" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" loading={submitting}>
                  Submit Assignment
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
