// Provides the second half of seeded exam records.
import type { TeacherExam } from "../ExamsTypes";

export const examSeedBatchB: TeacherExam[] = [
  { id: "e2-005", title: "Poetry Analysis Periodic Exam", subject: "English", classId: "c5", classLabel: "S1A", scheduledAt: "2026-03-12T00:30:00.000Z", durationMinutes: 70, totalAttempts: 1, status: "draft", createdAt: "2026-02-22T13:20:00.000Z", totalQuestions: 24, maxScore: 75, rubric: "Evidence use, clarity, and interpretation depth." },
  { id: "e2-006", title: "Climate Systems Written Exam", subject: "Geography", classId: "c1", classLabel: "S3A", scheduledAt: "2026-03-14T02:00:00.000Z", durationMinutes: 65, totalAttempts: 1, status: "published", createdAt: "2026-02-28T11:10:00.000Z", totalQuestions: 28, maxScore: 85, instructions: "Answer concise-response items in full sentences." },
  { id: "e2-007", title: "Quadratics Midterm Check", subject: "Mathematics", classId: "c2", classLabel: "S3B", scheduledAt: "2026-03-21T08:00:00.000Z", durationMinutes: 75, totalAttempts: 1, status: "published", createdAt: "2026-02-27T15:40:00.000Z", totalQuestions: 34, maxScore: 100 },
  { id: "e2-008", title: "Human Body Systems Final Practice", subject: "Biology", classId: "c3", classLabel: "S2A", scheduledAt: "2026-03-24T01:30:00.000Z", durationMinutes: 85, totalAttempts: 1, status: "draft", createdAt: "2026-02-21T09:35:00.000Z", totalQuestions: 38, maxScore: 95, attachments: [{ id: "att-e2-008-1", name: "body-systems-reference.pdf", size: 284000, type: "application/pdf", lastModified: 1766810400000 }] },
];
