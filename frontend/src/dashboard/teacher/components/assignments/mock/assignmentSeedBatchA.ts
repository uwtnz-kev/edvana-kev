// Provides the first half of seeded assignment records.
import type { TeacherAssignment } from "../AssignmentsTypes";

export const assignmentSeedBatchA: TeacherAssignment[] = [
  { id: "a2-republish-decoy", title: "Republish Flow Closed Assignment", subject: "Mathematics", classId: "c1", classLabel: "S3A", dueAt: "2026-03-01T23:59:00.000Z", createdAt: "2026-03-01T08:00:00.000Z", status: "closed", totalAttempts: 3, totalQuestions: 10, totalSubmissions: 18, pendingToGrade: 0, instructions: "Use this closed assignment to test the republish flow from the teacher dashboard." },
  { id: "a2-001", title: "Linear Equations Drill", subject: "Mathematics", classId: "c1", classLabel: "S3A", dueAt: "2026-03-11T23:59:00.000Z", createdAt: "2026-02-27T08:15:00.000Z", status: "published", totalAttempts: 3, totalQuestions: 10, totalSubmissions: 21, pendingToGrade: 7, instructions: "Solve all items and show complete solution steps for each equation." },
  { id: "a2-002", title: "Cell Structure Worksheet", subject: "Biology", classId: "c2", classLabel: "S3B", dueAt: "2026-03-13T23:59:00.000Z", createdAt: "2026-02-26T10:30:00.000Z", status: "draft", totalAttempts: 3, totalQuestions: 10, totalSubmissions: 0, pendingToGrade: 0, instructions: "Label each organelle and explain one function per label." },
  { id: "a2-003", title: "Acids and Bases Lab Reflection", subject: "Chemistry", classId: "c3", classLabel: "S2A", dueAt: "2026-03-09T23:59:00.000Z", createdAt: "2026-02-25T09:00:00.000Z", status: "published", totalAttempts: 3, totalQuestions: 12, totalSubmissions: 28, pendingToGrade: 4 },
  { id: "a2-004", title: "Newton's Laws Problem Set", subject: "Physics", classId: "c4", classLabel: "S2B", dueAt: "2026-03-15T23:59:00.000Z", createdAt: "2026-02-28T07:45:00.000Z", status: "published", totalAttempts: 3, totalQuestions: 14, totalSubmissions: 16, pendingToGrade: 11, instructions: "Answer all scenarios and include free-body diagrams where applicable." },
];

