'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getModule, getLesson } from '@/lib/content/canon/modules';
import { markLessonComplete } from '@/lib/db';
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from 'lucide-react';

export default function LessonPage() {
  const params = useParams();
  const moduleId = parseInt(params.id as string);
  const lessonId = parseInt(params.lesson as string);

  return (
    <ProtectedRoute requiredLayer="canon">
      <LessonContent moduleId={moduleId} lessonId={lessonId} />
    </ProtectedRoute>
  );
}

function LessonContent({ moduleId, lessonId }: { moduleId: number; lessonId: number }) {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [completing, setCompleting] = useState(false);

  const module = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);

  if (!module || !lesson || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Lesson not found</p>
      </div>
    );
  }

  const moduleKey = `module${moduleId}` as keyof typeof user.canonProgress;
  const progress = user.canonProgress[moduleKey];

  if (typeof progress !== 'object' || !('lessonsCompleted' in progress)) {
    return null;
  }

  const completedLessons = progress.lessonsCompleted || [];
  const isCompleted = completedLessons.includes(lessonId);
  const isLastLesson = lessonId === module.lessons.length;
  const nextLessonId = lessonId + 1;
  const prevLessonId = lessonId - 1;

  const handleComplete = async () => {
    if (isCompleted) return;

    setCompleting(true);
    try {
      await markLessonComplete(user.id, moduleId, lessonId);
      await refreshUser();

      if (isLastLesson) {
        router.push(`/canon/module-${moduleId}`);
      } else {
        router.push(`/canon/module-${moduleId}/lesson-${nextLessonId}`);
      }
    } catch (error) {
      console.error('Failed to mark lesson complete:', error);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/canon/module-${moduleId}`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-zavia-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Module {moduleId}
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <Badge variant="canon">Module {moduleId}</Badge>
          <span className="text-slate-400">·</span>
          <span className="text-sm text-slate-500">
            Lesson {lessonId} of {module.lessons.length}
          </span>
          {isCompleted && (
            <>
              <span className="text-slate-400">·</span>
              <Badge variant="success">Completed</Badge>
            </>
          )}
        </div>

        <h1 className="mt-4 font-serif text-3xl font-bold text-zavia-navy">
          {lesson.title}
        </h1>

        <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          <Clock className="h-4 w-4" />
          {lesson.duration} read
        </div>
      </div>

      {/* Lesson Content */}
      <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-zavia-navy prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-strong:text-zavia-navy prose-ul:list-disc prose-li:marker:text-canon-primary">
        <div
          dangerouslySetInnerHTML={{
            __html: formatMarkdown(lesson.content),
          }}
        />
      </article>

      {/* Completion Section */}
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center justify-between">
          {/* Previous Lesson */}
          {prevLessonId >= 1 ? (
            <Link href={`/canon/module-${moduleId}/lesson-${prevLessonId}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {/* Complete / Next */}
          <div className="flex items-center gap-3">
            {!isCompleted && (
              <Button
                onClick={handleComplete}
                loading={completing}
                className="bg-canon-primary hover:bg-canon-primary/90"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
            )}

            {isLastLesson ? (
              <Link href={`/canon/module-${moduleId}`}>
                <Button variant={isCompleted ? 'primary' : 'outline'}>
                  Back to Module
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href={`/canon/module-${moduleId}/lesson-${nextLessonId}`}>
                <Button variant={isCompleted ? 'primary' : 'outline'}>
                  Next Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8">
        <div className="flex justify-center gap-2">
          {module.lessons.map((l) => {
            const isLessonCompleted = completedLessons.includes(l.id);
            const isCurrent = l.id === lessonId;

            return (
              <Link
                key={l.id}
                href={`/canon/module-${moduleId}/lesson-${l.id}`}
                className={`h-2 w-8 rounded-full transition ${
                  isLessonCompleted
                    ? 'bg-green-500'
                    : isCurrent
                    ? 'bg-canon-primary'
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
                title={l.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Simple markdown to HTML converter for lesson content
function formatMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Wrap consecutive list items in ul
    .replace(/(<li>.*<\/li>\n?)+/gim, (match) => `<ul>${match}</ul>`)
    // Paragraphs
    .split(/\n\n+/)
    .map((para) => {
      if (
        para.startsWith('<h') ||
        para.startsWith('<ul') ||
        para.trim() === ''
      ) {
        return para;
      }
      return `<p>${para.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');
}
