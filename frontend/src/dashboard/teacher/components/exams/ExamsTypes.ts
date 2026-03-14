/**
 * ExamsTypes
 * ----------
 * Defines types used by the teacher dashboard e xa ms feature.
 */
import type { SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";

export type ExamStatus = "draft" | "published" | "closed";

export interface TeacherSubject2 {
  id: string;
  name: string;
}

export interface TeacherClass2 {
  id: string;
  label: string;
}

export type ExamAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

export interface TeacherExam {
  id: string;
  title: string;
  subject: string;
  classId: string;
  classLabel: string;
  accessCode?: string;
  scheduledAt: string;
  durationMinutes: number;
  totalAttempts: number;
  status: ExamStatus;
  createdAt: string;
  totalQuestions: number;
  submissionMethods: SubmissionMethod[];
  maxScore?: number;
  rubric?: string;
  instructions?: string;
  questionsText?: string;
  attachments?: ExamAttachment[];
}



