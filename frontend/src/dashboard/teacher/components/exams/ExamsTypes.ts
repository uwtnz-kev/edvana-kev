/**
 * ExamsTypes
 * ----------
 * Defines types used by the teacher dashboard e xa ms feature.
 */
export type ExamStatus = "draft" | "published";

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
  scheduledAt: string;
  durationMinutes: number;
  status: ExamStatus;
  createdAt: string;
  totalQuestions: number;
  maxScore?: number;
  rubric?: string;
  instructions?: string;
  questionsText?: string;
  attachments?: ExamAttachment[];
}



