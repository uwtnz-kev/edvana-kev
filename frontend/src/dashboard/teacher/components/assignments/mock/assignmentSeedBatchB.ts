// Provides the second half of seeded assignment records.
import type { TeacherAssignment } from "../AssignmentsTypes";

export const assignmentSeedBatchB: TeacherAssignment[] = [
  { id: "a2-005", title: "Poetry Analysis Paragraph", subject: "English", classId: "c5", classLabel: "S1A", dueAt: "2026-03-12T23:59:00.000Z", createdAt: "2026-02-24T13:20:00.000Z", status: "closed", totalAttempts: 3, totalQuestions: 8, totalSubmissions: 30, pendingToGrade: 0, estimatedMinutes: 40 },
  { id: "a2-006", title: "Climate Zones Mapping", subject: "Geography", classId: "c1", classLabel: "S3A", dueAt: "2026-03-18T23:59:00.000Z", createdAt: "2026-02-28T11:10:00.000Z", status: "draft", totalAttempts: 3, totalQuestions: 10, totalSubmissions: 0, pendingToGrade: 0, estimatedMinutes: 25, instructions: "Color-code world climate zones and submit with legend." },
  { id: "a2-007", title: "Quadratic Word Problems", subject: "Mathematics", classId: "c2", classLabel: "S3B", dueAt: "2026-03-20T23:59:00.000Z", createdAt: "2026-02-27T15:40:00.000Z", status: "published", totalAttempts: 3, totalQuestions: 16, totalSubmissions: 9, pendingToGrade: 9, estimatedMinutes: 55 },
  { id: "a2-008", title: "Human Body Systems Infographic", subject: "Biology", classId: "c3", classLabel: "S2A", dueAt: "2026-03-07T23:59:00.000Z", createdAt: "2026-02-20T09:35:00.000Z", status: "closed", totalAttempts: 3, totalQuestions: 10, totalSubmissions: 27, pendingToGrade: 0, estimatedMinutes: 60, instructions: "Include at least 4 body systems and one key function per system." },
];
