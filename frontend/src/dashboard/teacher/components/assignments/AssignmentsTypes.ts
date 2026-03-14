/**
 * AssignmentsTypes
 * ----------------
 * Defines types used by the teacher dashboard a ss ig nm en ts feature.
 */
import type { SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";

export type AssignmentStatus = "draft" | "published" | "closed";

export type AssignmentAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

export interface TeacherAssignment {
  id: string;
  title: string;
  subject: string;
  classId: string;
  classLabel: string;
  accessCode?: string;
  dueAt: string;
  createdAt: string;
  status: AssignmentStatus;
  totalAttempts: number;
  totalQuestions: number;
  totalSubmissions: number;
  pendingToGrade: number;
  estimatedMinutes: number;
  submissionMethods: SubmissionMethod[];
  instructions?: string;
  questionsText?: string;
  attachments?: AssignmentAttachment[];
  rubric?: string;
  maxScore?: number;
}

export interface TeacherSubject2 {
  id: string;
  name: string;
}

export interface TeacherClass2 {
  id: string;
  label: string;
}

export type AssignmentStatusFilter = "all" | AssignmentStatus | "ongoing";

export interface AssignmentFilters {
  query: string;
  status: AssignmentStatusFilter;
}

export interface AssignmentStats {
  total: number;
  active: number;
  grading: number;
  completionRate: number;
}



