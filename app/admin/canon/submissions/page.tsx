'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { getPendingAssignments, getUser, reviewAssignment } from '@/lib/db';
import { Assignment, User, SubmissionStatus } from '@/lib/types';
import { getModule } from '@/lib/content/canon/modules';
import { formatRelativeTime } from '@/lib/utils';
import { CheckCircle, XCircle, Eye, RefreshCw } from 'lucide-react';

export default function CanonSubmissionsPage() {
  const { user: admin } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submitterInfo, setSubmitterInfo] = useState<User | null>(null);
  const [feedback, setFeedback] = useState('');
  const [reviewing, setReviewing] = useState(false);

  const loadAssignments = async () => {
    setLoading(true);
    try {
      const data = await getPendingAssignments();
      setAssignments(data);
    } catch (error) {
      console.error('Failed to load assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleViewAssignment = async (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setFeedback('');

    // Load submitter info
    const user = await getUser(assignment.userId);
    setSubmitterInfo(user);
  };

  const handleReview = async (status: SubmissionStatus) => {
    if (!selectedAssignment || !admin || !feedback.trim()) return;

    setReviewing(true);
    try {
      await reviewAssignment(
        selectedAssignment.id,
        admin.id,
        status,
        feedback.trim()
      );

      // Refresh assignments list
      await loadAssignments();

      // Close modal
      setSelectedAssignment(null);
      setFeedback('');
    } catch (error) {
      console.error('Failed to review assignment:', error);
    } finally {
      setReviewing(false);
    }
  };

  const getModuleInfo = (moduleNumber: number) => {
    const module = getModule(moduleNumber);
    return module ? { title: module.title, assignment: module.assignment } : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zavia-navy border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-zavia-navy">
            Canon Submissions
          </h1>
          <p className="mt-1 text-slate-600">
            Review and grade student assignments
          </p>
        </div>
        <Button variant="outline" onClick={loadAssignments}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {assignments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 font-semibold text-zavia-navy">All caught up!</h3>
            <p className="mt-1 text-slate-500">
              No pending assignments to review.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const moduleInfo = getModuleInfo(assignment.moduleNumber as number);

            return (
              <Card key={assignment.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="canon">Module {assignment.moduleNumber}</Badge>
                      <StatusBadge status={assignment.status} />
                    </div>
                    <p className="mt-2 font-semibold text-zavia-navy">
                      {moduleInfo?.assignment.title || `Module ${assignment.moduleNumber} Assignment`}
                    </p>
                    <p className="text-sm text-slate-500">
                      Submitted {formatRelativeTime(assignment.submittedAt)}
                    </p>
                  </div>
                  <Button onClick={() => handleViewAssignment(assignment)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        title={`Review: Module ${selectedAssignment?.moduleNumber} Assignment`}
        size="xl"
      >
        {selectedAssignment && (
          <div className="space-y-6">
            {/* Submitter Info */}
            {submitterInfo && (
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-500">Submitted by</p>
                <p className="font-semibold text-zavia-navy">{submitterInfo.name}</p>
                <p className="text-sm text-slate-500">{submitterInfo.email}</p>
              </div>
            )}

            {/* Assignment Content */}
            <div>
              <p className="text-sm font-medium text-slate-500">Response</p>
              <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border bg-white p-4">
                <p className="whitespace-pre-wrap text-sm text-slate-700">
                  {selectedAssignment.content}
                </p>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {selectedAssignment.content.trim().split(/\s+/).length} words
              </p>
            </div>

            {/* Rubric Reminder */}
            {(() => {
              const moduleInfo = getModuleInfo(selectedAssignment.moduleNumber as number);
              if (!moduleInfo) return null;

              return (
                <div>
                  <p className="text-sm font-medium text-slate-500">Rubric</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {moduleInfo.assignment.rubric.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            {/* Feedback Input */}
            <Input
              label="Feedback (required)"
              placeholder="Provide concise feedback for the student..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              helperText="Keep feedback brief and actionable. Max 500 characters."
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setSelectedAssignment(null)}
                disabled={reviewing}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleReview('not_yet')}
                loading={reviewing}
                disabled={!feedback.trim()}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Not Yet
              </Button>
              <Button
                onClick={() => handleReview('pass')}
                loading={reviewing}
                disabled={!feedback.trim()}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Pass
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
