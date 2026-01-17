'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { getModule } from '@/lib/content/canon/modules';
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle, FileText } from 'lucide-react';

export default function ModulePage() {
  const params = useParams();
  const moduleId = parseInt(params.id as string);

  return (
    <ProtectedRoute requiredLayer="canon">
      <ModuleContent moduleId={moduleId} />
    </ProtectedRoute>
  );
}

function ModuleContent({ moduleId }: { moduleId: number }) {
  const { user } = useAuth();
  const module = getModule(moduleId);

  if (!module || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }

  const moduleKey = `module${moduleId}` as keyof typeof user.canonProgress;
  const progress = user.canonProgress[moduleKey];

  if (typeof progress !== 'object' || !('lessonsCompleted' in progress)) {
    return null;
  }

  const completedLessons = progress.lessonsCompleted || [];
  const isModuleComplete = progress.assignmentStatus === 'pass';
  const assignmentPending = progress.assignmentStatus === 'pending' && progress.assignmentSubmitted;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      {/* Back Link */}
      <Link
        href="/canon"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-zavia-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Canon
      </Link>

      {/* Module Header */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="canon">Module {module.id}</Badge>
          {isModuleComplete && <StatusBadge status="pass" />}
        </div>
        <h1 className="mt-2 font-serif text-3xl font-bold text-zavia-navy">
          {module.title}
        </h1>
        <p className="mt-1 text-lg text-canon-secondary">{module.subtitle}</p>
        <p className="mt-4 text-slate-600">{module.description}</p>
      </div>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Learning Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {module.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-canon-primary" />
                <span className="text-sm text-slate-600">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-zavia-navy">Lessons</h2>
        <div className="space-y-3">
          {module.lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <Link
                key={lesson.id}
                href={`/canon/module-${moduleId}/lesson-${lesson.id}`}
              >
                <Card className="transition hover:shadow-md">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          isCompleted
                            ? 'bg-green-100 text-green-600'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <BookOpen className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-zavia-navy">{lesson.title}</p>
                        <p className="flex items-center gap-1 text-sm text-slate-500">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Assignment Section */}
      <Card className="border-2 border-canon-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-canon-primary" />
              <CardTitle>Module Assignment</CardTitle>
            </div>
            {assignmentPending ? (
              <StatusBadge status="pending" />
            ) : isModuleComplete ? (
              <StatusBadge status="pass" />
            ) : progress.assignmentSubmitted ? (
              <StatusBadge status="not_yet" />
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold text-zavia-navy">{module.assignment.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{module.assignment.description}</p>

          {progress.assignmentFeedback && (
            <div className="mt-4 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-700">Feedback:</p>
              <p className="text-sm text-slate-600">{progress.assignmentFeedback}</p>
            </div>
          )}

          <div className="mt-4">
            {isModuleComplete ? (
              <Badge variant="success">Assignment Passed</Badge>
            ) : progress.assignmentSubmitted ? (
              <p className="text-sm text-slate-500">
                Your assignment is being reviewed. You&apos;ll be notified when feedback is ready.
              </p>
            ) : (
              <Link href={`/canon/assignments?module=${moduleId}`}>
                <Button>
                  {completedLessons.length === module.lessons.length
                    ? 'Submit Assignment'
                    : 'Complete lessons first'}
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        {moduleId > 1 ? (
          <Link href={`/canon/module-${moduleId - 1}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Module
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {moduleId < 5 ? (
          <Link href={`/canon/module-${moduleId + 1}`}>
            <Button variant="outline">
              Next Module
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
