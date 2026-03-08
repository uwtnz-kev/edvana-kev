/**
 * AssignmentsTypes
 * ----------------
 * Defines types used by the teacher dashboard a ss ig nm en ts feature.
 */
export type AssignmentStatus = "draft" | "published" | "archived";

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
  dueAt: string;
  createdAt: string;
  status: AssignmentStatus;
  totalQuestions: number;
  totalSubmissions: number;
  pendingToGrade: number;
  estimatedMinutes: number;
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

export type AssignmentStatusFilter = "all" | AssignmentStatus;

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



