// Provides the first half of seeded quiz records.
import type { TeacherQuiz } from "../QuizTypes";

export const seedQuizBatchA: TeacherQuiz[] = [
  { id: "q2-001", title: "Linear Equations Checkpoint", subject: "Mathematics", classId: "c1", classLabel: "S3A", dueAt: "2026-03-04T10:00:00.000Z", durationMinutes: 20, totalQuestions: 12, difficulty: "medium", type: "mcq", status: "published", createdAt: "2026-02-24T08:00:00.000Z", maxScore: 24 },
  { id: "q2-002", title: "Cell Organelles Quick Quiz", subject: "Biology", classId: "c2", classLabel: "S3B", dueAt: "2026-03-05T03:00:00.000Z", durationMinutes: 15, totalQuestions: 10, difficulty: "easy", type: "mcq", status: "draft", createdAt: "2026-02-23T09:30:00.000Z", maxScore: 20, instructions: "Answer all multiple-choice questions before submitting." },
  { id: "q2-003", title: "Acids and Bases Mastery Quiz", subject: "Chemistry", classId: "c3", classLabel: "S2A", dueAt: "2026-03-06T06:00:00.000Z", durationMinutes: 25, totalQuestions: 14, difficulty: "hard", type: "mixed", status: "published", createdAt: "2026-02-20T10:00:00.000Z", maxScore: 30, rubric: "Short-answer items graded for concept accuracy." },
  { id: "q2-004", title: "Newton's Laws Concept Check", subject: "Physics", classId: "c4", classLabel: "S2B", dueAt: "2026-03-07T02:00:00.000Z", durationMinutes: 18, totalQuestions: 11, difficulty: "medium", type: "mixed", status: "published", createdAt: "2026-02-22T07:45:00.000Z", maxScore: 22 },
  { id: "q2-005", title: "Poetry Devices Spot Quiz", subject: "English", classId: "c5", classLabel: "S1A", dueAt: "2026-03-08T00:30:00.000Z", durationMinutes: 12, totalQuestions: 8, difficulty: "easy", type: "mcq", status: "draft", createdAt: "2026-02-21T13:20:00.000Z", maxScore: 16 },
];
