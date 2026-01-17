import { NextRequest, NextResponse } from 'next/server';
import { reviewAssignment, getUser } from '@/lib/db';
import { SubmissionStatus } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assignmentId, reviewerId, status, feedback } = body as {
      assignmentId: string;
      reviewerId: string;
      status: SubmissionStatus;
      feedback: string;
    };

    // Validate input
    if (!assignmentId || !reviewerId || !status || !feedback) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['pass', 'not_yet'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "pass" or "not_yet"' },
        { status: 400 }
      );
    }

    // Verify reviewer is admin
    const reviewer = await getUser(reviewerId);
    if (!reviewer?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - admin access required' },
        { status: 403 }
      );
    }

    // Validate feedback length (one line max per spec)
    if (feedback.length > 500) {
      return NextResponse.json(
        { error: 'Feedback too long - keep it concise' },
        { status: 400 }
      );
    }

    await reviewAssignment(assignmentId, reviewerId, status, feedback);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Review error:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
