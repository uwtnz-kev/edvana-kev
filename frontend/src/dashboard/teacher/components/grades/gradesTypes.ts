/**
 * gradesTypes
 * -----------
 * Defines types used by the teacher dashboard g ra de s feature.
 */
import type { TeacherSubject2 } from "@/dashboard/teacher/components/assignments";

export type TeacherGradeAssessmentType = "all" | "assignment" | "exam" | "quiz";
export type TeacherGradeSelectionType = Exclude<TeacherGradeAssessmentType, "all">;

export interface TeacherGradeItem {
  id: string;
  title: string;
  type: Exclude<TeacherGradeAssessmentType, "all">;
  maxScore: number;
  subjectId: string;
  classLabel: string;
  createdAt: string;
}

export interface TeacherPublishedItem {
  id: string;
  type: TeacherGradeSelectionType;
  subjectId: string;
  title: string;
  className: string;
  dueDate: string;
  submissionsCount: number;
  status: "published";
  maxScore: number;
}

export interface TeacherClassRosterStudent {
  studentId: string;
  studentName: string;
  className: string;
}

export interface TeacherStudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  classLabel: string;
  gradeItemId: string;
  score: number | null;
  updatedAt: string;
}

export interface TeacherGradeRow {
  id: string;
  studentId: string;
  studentName: string;
  classLabel: string;
  subjectId: string;
  gradeItemId: string;
  assessmentTitle: string;
  assessmentType: Exclude<TeacherGradeAssessmentType, "all">;
  maxScore: number;
  score: number | null;
  updatedAt: string;
}

export interface TeacherGradesFilters {
  search: string;
  assessmentType: TeacherGradeAssessmentType;
  classValue: string;
  assessmentItemId: string;
}

export interface TeacherGradesWorkspace {
  selectedSubjectId: string | null;
  selectedGradeType: TeacherGradeSelectionType | null;
  filters: TeacherGradesFilters;
}

export interface TeacherGradeListRow {
  studentId: string;
  studentName: string;
  score: number;
}

export interface TeacherGradeList {
  id: string;
  gradeItemId?: string;
  subjectId: string;
  classId: string;
  title: string;
  assessmentType: Exclude<TeacherGradeAssessmentType, "all">;
  date: string;
  maxScore: number;
  rows: TeacherGradeListRow[];
  createdAt: string;
}

export interface CreateTeacherGradeListPayload {
  subjectId: string;
  classId: string;
  title: string;
  assessmentType: Exclude<TeacherGradeAssessmentType, "all">;
  date: string;
  maxScore: number;
  rows: TeacherGradeListRow[];
}

export interface TeacherGradeListFilters {
  classId?: string;
  assessmentType?: TeacherGradeAssessmentType;
  fromDate?: string;
  toDate?: string;
}

export interface TeacherGradesStatsData {
  total: number;
  graded: number;
  missing: number;
  average: number;
}

export type TeacherSubmissionStatus = "submitted" | "graded";

export interface TeacherQuizSubmissionAnswer {
  question: string;
  selectedAnswer: string;
}

export interface TeacherAssignmentAttachment {
  id: string;
  fileName: string;
}

export interface TeacherExamSectionAnswer {
  section: string;
  answer: string;
}

export interface TeacherGradeSubmission {
  id: string;
  itemId: string;
  type: TeacherGradeSelectionType;
  subjectId: string;
  subjectName: string;
  className: string;
  studentId: string;
  studentName: string;
  title: string;
  assessmentTitle: string;
  submittedAt: string;
  status: TeacherSubmissionStatus;
  score?: number | null;
  maxScore: number;
  updatedAt?: string;
  submissionDetails?: {
    questions?: Array<{
      id: string;
      prompt: string;
      studentAnswer: string;
      correctAnswer: string;
      points: number;
      earnedPoints?: number;
    }>;
    attachments?: Array<{ name: string; url: string }>;
    responseText?: string;
  };
  quizAnswers?: TeacherQuizSubmissionAnswer[];
  assignmentAttachments?: TeacherAssignmentAttachment[];
  assignmentTextResponse?: string;
  examSectionAnswers?: TeacherExamSectionAnswer[];
}

export type TeacherGradesRestoreState = {
  restoreSubjectId?: string;
  resetToHome?: boolean;
};

export type TeacherGradesSubject = TeacherSubject2;

// Backward-compatible aliases used by existing grade/export components.
export type GradeItem = TeacherGradeItem;
export type StudentGrade = TeacherStudentGrade;
export type GradesFiltersState = TeacherGradesFilters;

