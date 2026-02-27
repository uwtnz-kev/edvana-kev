export type GradeStatus = "graded" | "missing" | "draft";

export interface GradeItem {
  id: string;
  title: string;
  type: "assignment" | "exam" | "quiz";
  maxScore: number;
  subjectId: string;
}

export interface StudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  gradeItemId: string;
  score: number | null;
  updatedAt: string;
}

export interface GradesFiltersState {
  subjectId: string;
  type: "assignment" | "exam" | "quiz";
  search: string;
  missingOnly: boolean;
}