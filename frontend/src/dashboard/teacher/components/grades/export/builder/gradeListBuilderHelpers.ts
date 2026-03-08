// Provides static options and small payload helpers for the grade list builder.
export type BuilderRow = { studentId: string; studentName: string; score: string };
export type AssessmentType = "" | "quiz" | "assignment" | "exam";

export const gradeOptions = [
  { id: "S1", title: "S1" },
  { id: "S2", title: "S2" },
  { id: "S3", title: "S3" },
];

export const subjectOptions = [
  { id: "math", title: "Mathematics" },
  { id: "science", title: "Science" },
  { id: "english", title: "English" },
];

export const semesterOptions = [
  { label: "Term 1", value: "term1" },
  { label: "Term 2", value: "term2" },
  { label: "Term 3", value: "term3" },
];

export const assessmentTypeOptions = [
  { label: "Quiz", value: "quiz" },
  { label: "Assignment", value: "assignment" },
  { label: "Exam", value: "exam" },
] as const;

// Draft payload keeps empty scores nullable for later completion.
export function createGradeListDraftPayload(args: {
  assessmentType: AssessmentType;
  grade: string;
  listName: string;
  maxScore: string;
  rows: BuilderRow[];
  semester: string;
  subject: string;
}) {
  return {
    listName: args.listName,
    grade: args.grade,
    subject: args.subject,
    semester: args.semester,
    assessmentType: args.assessmentType,
    maxScore: args.maxScore === "" ? null : Number(args.maxScore),
    rows: args.rows.map((row) => ({
      studentId: row.studentId,
      score: row.score === "" ? null : Number(row.score),
    })),
  };
}
