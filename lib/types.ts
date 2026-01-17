// ============================================
// ZAVIA STRATEGY ACADEMY - TYPE DEFINITIONS
// ============================================

// Core Types
export type Layer = 'canon' | 'guild' | 'fellowship';
export type CanonModule = 1 | 2 | 3 | 4 | 5;
export type CohortStatus = 'upcoming' | 'active' | 'completed';
export type SubmissionStatus = 'pending' | 'pass' | 'not_yet';
export type ProductType = 'canon' | 'guild' | 'fellowship' | 'coaching';

// ============================================
// USER & AUTHENTICATION
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;

  // Layer access flags
  canonAccess: boolean;
  guildAccess: boolean;
  fellowshipAccess: boolean;

  // Current progress state
  currentLayer: Layer;
  canonProgress: CanonProgress;
  guildCohortId?: string;
  fellowshipMember: boolean;

  // Payment info
  stripeCustomerId?: string;
  purchases: Purchase[];

  // Admin flag
  isAdmin?: boolean;
}

export interface UserCreateInput {
  email: string;
  name: string;
}

// ============================================
// LAYER 1: THE CANON (Self-Paced)
// ============================================

export interface CanonProgress {
  module1: ModuleProgress;
  module2: ModuleProgress;
  module3: ModuleProgress;
  module4: ModuleProgress;
  module5: ModuleProgress;
  completed: boolean;
  qualifiedForGuild: boolean;
  strategicDoctrine?: string; // Their final deliverable
}

export interface ModuleProgress {
  started: Date | null;
  completed: Date | null;
  lessonsCompleted: number[];
  assignmentSubmitted: boolean;
  assignmentStatus: SubmissionStatus;
  assignmentFeedback?: string;
}

export interface CanonModule {
  id: CanonModule;
  title: string;
  subtitle: string;
  description: string;
  lessons: Lesson[];
  assignment: ModuleAssignment;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string; // e.g., "15 min"
  content: string; // Markdown content
  videoUrl?: string;
}

export interface ModuleAssignment {
  id: string;
  moduleNumber: CanonModule;
  title: string;
  description: string;
  prompt: string;
  rubric: string[];
}

export interface Assignment {
  id: string;
  userId: string;
  moduleNumber: CanonModule;
  submittedAt: Date;
  content: string;
  status: SubmissionStatus;
  reviewedAt?: Date;
  reviewedBy?: string;
  feedback?: string; // One line max per spec
}

// ============================================
// LAYER 2: THE GUILD (Cohort-Based)
// ============================================

export interface GuildCohort {
  id: string;
  name: string; // e.g., "Guild Cohort 1 - Jan 2026"
  startDate: Date;
  endDate: Date;
  maxStudents: number; // Default: 15
  enrolled: string[]; // userIds
  status: CohortStatus;
  sessions: GuildSession[];
  price: number;
}

export interface GuildSession {
  id: string;
  cohortId: string;
  week: number;
  session: number;
  title: string;
  description?: string;
  date: Date;
  zoomLink: string;
  recordingUrl?: string;
  materials: string[]; // URLs to materials
  attendance: string[]; // userIds who attended
}

export interface GuildAssignment {
  id: string;
  cohortId: string;
  week: number;
  title: string;
  description: string;
  dueDate: Date;
  submissions: GuildSubmission[];
}

export interface GuildSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  submittedAt: Date;
  content: string;
  fileUrl?: string;
  status: SubmissionStatus;
  feedback?: string;
}

export interface GuildApplication {
  id: string;
  userId: string;
  cohortId: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  responses: {
    strategicDoctrine: string;
    whyGuild: string;
    commitment: string;
  };
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
}

// ============================================
// LAYER 3: THE FELLOWSHIP (Elite Network)
// ============================================

export interface FellowshipMember {
  id: string; // Same as userId
  joinedAt: Date;
  status: 'active' | 'alumni';
  yearlyFee: number;
  lastPayment: Date;
  nextPayment: Date;
  contributions: FellowshipContribution[];
  bio?: string;
  company?: string;
  title?: string;
  linkedIn?: string;
}

export interface FellowshipContribution {
  id: string;
  memberId: string;
  type: 'case_study' | 'problem' | 'discussion';
  title: string;
  content: string;
  submittedAt: Date;
  isPublished: boolean;
}

export interface FellowshipConvening {
  id: string;
  name: string;
  date: Date;
  location: string;
  description: string;
  attendees: string[]; // memberIds
  agenda: string;
  notes?: string;
  maxAttendees?: number;
}

export interface FellowshipInvite {
  id: string;
  email: string;
  invitedBy: string; // admin userId
  invitedAt: Date;
  status: 'pending' | 'accepted' | 'expired';
  expiresAt: Date;
  token: string;
}

// ============================================
// PAYMENTS & PURCHASES
// ============================================

export interface Purchase {
  id: string;
  userId: string;
  product: ProductType;
  amount: number;
  currency: string;
  date: Date;
  stripePaymentId: string;
  stripeSessionId?: string;
  status: 'pending' | 'completed' | 'refunded';
}

export interface Product {
  id: ProductType;
  name: string;
  description: string;
  price: number;
  currency: string;
  stripePriceId: string;
  features: string[];
}

// ============================================
// ADMIN TYPES
// ============================================

export interface AdminStats {
  totalUsers: number;
  canonStudents: number;
  guildStudents: number;
  fellowshipMembers: number;
  pendingAssignments: number;
  pendingApplications: number;
  revenue: {
    total: number;
    thisMonth: number;
    byProduct: Record<ProductType, number>;
  };
}

export interface AssignmentReview {
  assignmentId: string;
  reviewerId: string;
  status: SubmissionStatus;
  feedback: string;
  reviewedAt: Date;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// FIRESTORE DOCUMENT CONVERTERS
// ============================================

export type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export function timestampToDate(timestamp: FirestoreTimestamp | Date | null): Date | null {
  if (!timestamp) return null;
  if (timestamp instanceof Date) return timestamp;
  return new Date(timestamp.seconds * 1000);
}

export function dateToTimestamp(date: Date): FirestoreTimestamp {
  return {
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: 0,
  };
}

// ============================================
// DEFAULT VALUES
// ============================================

export const DEFAULT_CANON_PROGRESS: CanonProgress = {
  module1: { started: null, completed: null, lessonsCompleted: [], assignmentSubmitted: false, assignmentStatus: 'pending' },
  module2: { started: null, completed: null, lessonsCompleted: [], assignmentSubmitted: false, assignmentStatus: 'pending' },
  module3: { started: null, completed: null, lessonsCompleted: [], assignmentSubmitted: false, assignmentStatus: 'pending' },
  module4: { started: null, completed: null, lessonsCompleted: [], assignmentSubmitted: false, assignmentStatus: 'pending' },
  module5: { started: null, completed: null, lessonsCompleted: [], assignmentSubmitted: false, assignmentStatus: 'pending' },
  completed: false,
  qualifiedForGuild: false,
};

export const PRODUCTS: Record<ProductType, Product> = {
  canon: {
    id: 'canon',
    name: 'The Canon',
    description: 'Self-paced strategic mastery course',
    price: 497,
    currency: 'usd',
    stripePriceId: '', // Set in .env
    features: [
      '5 comprehensive modules',
      'Lifetime access',
      'Personal Strategic Doctrine',
      'Guild qualification',
    ],
  },
  guild: {
    id: 'guild',
    name: 'The Guild',
    description: '8-week live cohort experience',
    price: 2997,
    currency: 'usd',
    stripePriceId: '', // Set in .env
    features: [
      '16 live sessions',
      'Direct mentorship',
      'Peer collaboration',
      'Fellowship nomination path',
    ],
  },
  fellowship: {
    id: 'fellowship',
    name: 'The Fellowship',
    description: 'Elite annual membership',
    price: 4997,
    currency: 'usd',
    stripePriceId: '', // Set in .env
    features: [
      'Annual convenings',
      'Direct problem access',
      'Peer network',
      'Lifetime community',
    ],
  },
  coaching: {
    id: 'coaching',
    name: '1:1 Coaching',
    description: 'Personal strategic coaching',
    price: 997,
    currency: 'usd',
    stripePriceId: '', // Set in .env
    features: [
      '60-minute session',
      'Personalized guidance',
      'Recording included',
    ],
  },
};
