import { NextRequest, NextResponse } from 'next/server';
import { submitAssignment } from '@/lib/db';
import { CanonModule } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, moduleNumber, content } = body as {
      userId: string;
      moduleNumber: number;
      content: string;
    };

    // Validate input
    if (!userId || !moduleNumber || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate module number
    if (moduleNumber < 1 || moduleNumber > 5) {
      return NextResponse.json(
        { error: 'Invalid module number' },
        { status: 400 }
      );
    }

    // Validate content length
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < 50) {
      return NextResponse.json(
        { error: 'Submission too short' },
        { status: 400 }
      );
    }

    if (wordCount > 1000) {
      return NextResponse.json(
        { error: 'Submission exceeds maximum length' },
        { status: 400 }
      );
    }

    const assignment = await submitAssignment(
      userId,
      moduleNumber as CanonModule,
      content
    );

    return NextResponse.json({ success: true, assignment });
  } catch (error) {
    console.error('Assignment submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit assignment' },
      { status: 500 }
    );
  }
}
