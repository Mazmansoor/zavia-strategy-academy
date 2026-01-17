import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
  QueryConstraint,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore';
import { db, COLLECTIONS } from './firebase';
import {
  User,
  Assignment,
  CanonProgress,
  GuildCohort,
  GuildApplication,
  GuildSession,
  FellowshipMember,
  FellowshipContribution,
  FellowshipConvening,
  FellowshipInvite,
  Purchase,
  DEFAULT_CANON_PROGRESS,
  SubmissionStatus,
  CanonModule,
} from './types';

// ============================================
// USER OPERATIONS
// ============================================

export async function createUser(userId: string, email: string, name: string): Promise<User> {
  const user: User = {
    id: userId,
    email,
    name,
    createdAt: new Date(),
    canonAccess: false,
    guildAccess: false,
    fellowshipAccess: false,
    currentLayer: 'canon',
    canonProgress: DEFAULT_CANON_PROGRESS,
    fellowshipMember: false,
    purchases: [],
  };

  await setDoc(doc(db, COLLECTIONS.USERS, userId), {
    ...user,
    createdAt: serverTimestamp(),
  });

  return user;
}

export async function getUser(userId: string): Promise<User | null> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    createdAt: data.createdAt?.toDate() || new Date(),
  } as User;
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(docRef, updates);
}

export async function grantCanonAccess(userId: string): Promise<void> {
  await updateUser(userId, { canonAccess: true });
}

export async function grantGuildAccess(userId: string, cohortId: string): Promise<void> {
  await updateUser(userId, {
    guildAccess: true,
    guildCohortId: cohortId,
  });
}

export async function grantFellowshipAccess(userId: string): Promise<void> {
  await updateUser(userId, {
    fellowshipAccess: true,
    fellowshipMember: true,
  });
}

// ============================================
// CANON PROGRESS OPERATIONS
// ============================================

export async function updateCanonProgress(
  userId: string,
  moduleNum: number,
  updates: Partial<CanonProgress[`module${1 | 2 | 3 | 4 | 5}`]>
): Promise<void> {
  const moduleKey = `canonProgress.module${moduleNum}` as const;
  await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
    [moduleKey]: updates,
  });
}

export async function markLessonComplete(
  userId: string,
  moduleNum: number,
  lessonNum: number
): Promise<void> {
  const user = await getUser(userId);
  if (!user) throw new Error('User not found');

  const moduleKey = `module${moduleNum}` as keyof CanonProgress;
  const currentProgress = user.canonProgress[moduleKey];

  if (typeof currentProgress === 'object' && currentProgress !== null && 'lessonsCompleted' in currentProgress) {
    const lessonsCompleted = [...(currentProgress.lessonsCompleted || [])];
    if (!lessonsCompleted.includes(lessonNum)) {
      lessonsCompleted.push(lessonNum);
    }

    await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
      [`canonProgress.${moduleKey}.lessonsCompleted`]: lessonsCompleted,
      [`canonProgress.${moduleKey}.started`]: currentProgress.started || serverTimestamp(),
    });
  }
}

export async function checkCanonCompletion(userId: string): Promise<boolean> {
  const user = await getUser(userId);
  if (!user) return false;

  const modules = ['module1', 'module2', 'module3', 'module4', 'module5'] as const;
  const allPassed = modules.every((mod) => {
    const progress = user.canonProgress[mod];
    return progress.assignmentStatus === 'pass';
  });

  if (allPassed && !user.canonProgress.completed) {
    await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
      'canonProgress.completed': true,
      'canonProgress.qualifiedForGuild': true,
    });
  }

  return allPassed;
}

// ============================================
// ASSIGNMENT OPERATIONS
// ============================================

export async function submitAssignment(
  userId: string,
  moduleNumber: CanonModule,
  content: string
): Promise<Assignment> {
  const assignment: Omit<Assignment, 'id'> = {
    userId,
    moduleNumber,
    submittedAt: new Date(),
    content,
    status: 'pending',
  };

  const docRef = await addDoc(collection(db, COLLECTIONS.ASSIGNMENTS), {
    ...assignment,
    submittedAt: serverTimestamp(),
  });

  // Update user's module progress
  await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
    [`canonProgress.module${moduleNumber}.assignmentSubmitted`]: true,
    [`canonProgress.module${moduleNumber}.assignmentStatus`]: 'pending',
  });

  return { ...assignment, id: docRef.id };
}

export async function getAssignment(assignmentId: string): Promise<Assignment | null> {
  const docRef = doc(db, COLLECTIONS.ASSIGNMENTS, assignmentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    submittedAt: data.submittedAt?.toDate() || new Date(),
    reviewedAt: data.reviewedAt?.toDate(),
  } as Assignment;
}

export async function getPendingAssignments(): Promise<Assignment[]> {
  const q = query(
    collection(db, COLLECTIONS.ASSIGNMENTS),
    where('status', '==', 'pending'),
    orderBy('submittedAt', 'asc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      submittedAt: data.submittedAt?.toDate() || new Date(),
    } as Assignment;
  });
}

export async function reviewAssignment(
  assignmentId: string,
  reviewerId: string,
  status: SubmissionStatus,
  feedback: string
): Promise<void> {
  const assignment = await getAssignment(assignmentId);
  if (!assignment) throw new Error('Assignment not found');

  // Update assignment
  await updateDoc(doc(db, COLLECTIONS.ASSIGNMENTS, assignmentId), {
    status,
    feedback,
    reviewedBy: reviewerId,
    reviewedAt: serverTimestamp(),
  });

  // Update user's module progress
  await updateDoc(doc(db, COLLECTIONS.USERS, assignment.userId), {
    [`canonProgress.module${assignment.moduleNumber}.assignmentStatus`]: status,
    [`canonProgress.module${assignment.moduleNumber}.assignmentFeedback`]: feedback,
  });

  // Check if all modules are complete
  if (status === 'pass') {
    await checkCanonCompletion(assignment.userId);
  }
}

export async function getUserAssignments(userId: string): Promise<Assignment[]> {
  const q = query(
    collection(db, COLLECTIONS.ASSIGNMENTS),
    where('userId', '==', userId),
    orderBy('submittedAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      submittedAt: data.submittedAt?.toDate() || new Date(),
    } as Assignment;
  });
}

// ============================================
// GUILD COHORT OPERATIONS
// ============================================

export async function createCohort(cohort: Omit<GuildCohort, 'id'>): Promise<GuildCohort> {
  const docRef = await addDoc(collection(db, COLLECTIONS.GUILD_COHORTS), {
    ...cohort,
    startDate: Timestamp.fromDate(cohort.startDate),
    endDate: Timestamp.fromDate(cohort.endDate),
  });

  return { ...cohort, id: docRef.id };
}

export async function getCohort(cohortId: string): Promise<GuildCohort | null> {
  const docRef = doc(db, COLLECTIONS.GUILD_COHORTS, cohortId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    startDate: data.startDate?.toDate() || new Date(),
    endDate: data.endDate?.toDate() || new Date(),
  } as GuildCohort;
}

export async function getActiveCohorts(): Promise<GuildCohort[]> {
  const q = query(
    collection(db, COLLECTIONS.GUILD_COHORTS),
    where('status', 'in', ['upcoming', 'active']),
    orderBy('startDate', 'asc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      startDate: data.startDate?.toDate() || new Date(),
      endDate: data.endDate?.toDate() || new Date(),
    } as GuildCohort;
  });
}

export async function enrollInCohort(cohortId: string, userId: string): Promise<void> {
  const cohort = await getCohort(cohortId);
  if (!cohort) throw new Error('Cohort not found');

  if (cohort.enrolled.length >= cohort.maxStudents) {
    throw new Error('Cohort is full');
  }

  await updateDoc(doc(db, COLLECTIONS.GUILD_COHORTS, cohortId), {
    enrolled: [...cohort.enrolled, userId],
  });

  await grantGuildAccess(userId, cohortId);
}

// ============================================
// GUILD APPLICATION OPERATIONS
// ============================================

export async function submitGuildApplication(
  application: Omit<GuildApplication, 'id' | 'submittedAt' | 'status'>
): Promise<GuildApplication> {
  const fullApplication: Omit<GuildApplication, 'id'> = {
    ...application,
    submittedAt: new Date(),
    status: 'pending',
  };

  const docRef = await addDoc(collection(db, COLLECTIONS.GUILD_APPLICATIONS), {
    ...fullApplication,
    submittedAt: serverTimestamp(),
  });

  return { ...fullApplication, id: docRef.id };
}

export async function getPendingApplications(): Promise<GuildApplication[]> {
  const q = query(
    collection(db, COLLECTIONS.GUILD_APPLICATIONS),
    where('status', '==', 'pending'),
    orderBy('submittedAt', 'asc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      submittedAt: data.submittedAt?.toDate() || new Date(),
    } as GuildApplication;
  });
}

export async function reviewApplication(
  applicationId: string,
  reviewerId: string,
  status: 'approved' | 'rejected',
  notes?: string
): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.GUILD_APPLICATIONS, applicationId), {
    status,
    reviewedBy: reviewerId,
    reviewedAt: serverTimestamp(),
    reviewNotes: notes || null,
  });
}

// ============================================
// FELLOWSHIP OPERATIONS
// ============================================

export async function createFellowshipMember(
  member: Omit<FellowshipMember, 'contributions'>
): Promise<FellowshipMember> {
  const fullMember: FellowshipMember = {
    ...member,
    contributions: [],
  };

  await setDoc(doc(db, COLLECTIONS.FELLOWSHIP_MEMBERS, member.id), {
    ...fullMember,
    joinedAt: Timestamp.fromDate(member.joinedAt),
    lastPayment: Timestamp.fromDate(member.lastPayment),
    nextPayment: Timestamp.fromDate(member.nextPayment),
  });

  await grantFellowshipAccess(member.id);

  return fullMember;
}

export async function getFellowshipMember(memberId: string): Promise<FellowshipMember | null> {
  const docRef = doc(db, COLLECTIONS.FELLOWSHIP_MEMBERS, memberId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    joinedAt: data.joinedAt?.toDate() || new Date(),
    lastPayment: data.lastPayment?.toDate() || new Date(),
    nextPayment: data.nextPayment?.toDate() || new Date(),
  } as FellowshipMember;
}

export async function getAllFellowshipMembers(): Promise<FellowshipMember[]> {
  const q = query(
    collection(db, COLLECTIONS.FELLOWSHIP_MEMBERS),
    where('status', '==', 'active'),
    orderBy('joinedAt', 'asc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      joinedAt: data.joinedAt?.toDate() || new Date(),
      lastPayment: data.lastPayment?.toDate() || new Date(),
      nextPayment: data.nextPayment?.toDate() || new Date(),
    } as FellowshipMember;
  });
}

export async function createFellowshipInvite(
  email: string,
  invitedBy: string
): Promise<FellowshipInvite> {
  const token = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const invite: Omit<FellowshipInvite, 'id'> = {
    email,
    invitedBy,
    invitedAt: now,
    status: 'pending',
    expiresAt,
    token,
  };

  const docRef = await addDoc(collection(db, COLLECTIONS.FELLOWSHIP_INVITES), {
    ...invite,
    invitedAt: serverTimestamp(),
    expiresAt: Timestamp.fromDate(expiresAt),
  });

  return { ...invite, id: docRef.id };
}

// ============================================
// PURCHASE OPERATIONS
// ============================================

export async function recordPurchase(purchase: Omit<Purchase, 'id'>): Promise<Purchase> {
  const docRef = await addDoc(collection(db, COLLECTIONS.PURCHASES), {
    ...purchase,
    date: serverTimestamp(),
  });

  // Update user's purchases array
  const user = await getUser(purchase.userId);
  if (user) {
    await updateDoc(doc(db, COLLECTIONS.USERS, purchase.userId), {
      purchases: [...user.purchases, { ...purchase, id: docRef.id }],
    });
  }

  return { ...purchase, id: docRef.id };
}

export async function getUserPurchases(userId: string): Promise<Purchase[]> {
  const q = query(
    collection(db, COLLECTIONS.PURCHASES),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      date: data.date?.toDate() || new Date(),
    } as Purchase;
  });
}
