// Provides the second half of seeded quiz records.
import type { TeacherQuiz } from "../QuizTypes";

export const seedQuizBatchB: TeacherQuiz[] = [
  { id: "q2-006", title: "Climate Zones Timed Quiz", subject: "Geography", classId: "c1", classLabel: "S3A", dueAt: "2026-03-09T04:00:00.000Z", durationMinutes: 22, totalQuestions: 13, difficulty: "medium", type: "short_answer", status: "published", createdAt: "2026-02-25T11:10:00.000Z", maxScore: 26, instructions: "Keep short-answer responses concise and complete." },
  { id: "q2-007", title: "Quadratics Speed Round", subject: "Mathematics", classId: "c2", classLabel: "S3B", dueAt: "2026-03-11T09:00:00.000Z", durationMinutes: 20, totalQuestions: 12, difficulty: "hard", type: "mcq", status: "published", createdAt: "2026-02-26T15:40:00.000Z", maxScore: 24 },
  { id: "q2-008", title: "Human Body Systems Drill", subject: "Biology", classId: "c3", classLabel: "S2A", dueAt: "2026-03-13T01:30:00.000Z", durationMinutes: 28, totalQuestions: 15, difficulty: "medium", type: "mixed", status: "draft", createdAt: "2026-02-21T09:35:00.000Z", maxScore: 30, attachments: [{ id: "att-q2-008-1", name: "systems-reference.pdf", size: 248000, type: "application/pdf", lastModified: 1766810400000 }] },
  { id: "q2-009", title: "Chemical Bonding Recall", subject: "Chemistry", classId: "c4", classLabel: "S2B", dueAt: "2026-03-17T05:30:00.000Z", durationMinutes: 17, totalQuestions: 9, difficulty: "easy", type: "mcq", status: "published", createdAt: "2026-02-27T08:25:00.000Z", maxScore: 18 },
  { id: "q2-010", title: "Map Reading Applied Quiz", subject: "Geography", classId: "c5", classLabel: "S1A", dueAt: "2026-03-20T02:30:00.000Z", durationMinutes: 24, totalQuestions: 12, difficulty: "hard", type: "short_answer", status: "draft", createdAt: "2026-02-28T10:15:00.000Z", maxScore: 24, rubric: "Credit for correct interpretation and clear reasoning." },
];
