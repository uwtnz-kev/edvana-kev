import type { TeacherQuiz } from "./teacherQuizTypes";

export const seedQuizzes: TeacherQuiz[] = [
  {
    id: "tq-1",
    title: "Algebra Practice Quiz",
    subject: "Mathematics",
    grade: "S3",
    type: "Mixed",
    difficulty: "Medium",
    totalQuestions: 10,
    estimatedTime: 15,
    createdAt: "2025-01-26T10:30:00Z",
    status: "published",
    publishedTo: ["S3A", "S3B"],
    questions: [],
  },
  {
    id: "tq-2",
    title: "Cell Biology Exit Ticket",
    subject: "Biology",
    grade: "S2",
    type: "Open",
    difficulty: "Easy",
    totalQuestions: 5,
    estimatedTime: 8,
    createdAt: "2025-01-25T14:20:00Z",
    status: "draft",
    questions: [],
  },
];

export const subjects = ["Mathematics", "Biology", "Chemistry", "Physics", "English", "History"];
export const grades = ["S1", "S2", "S3", "S4", "S5", "S6"];
