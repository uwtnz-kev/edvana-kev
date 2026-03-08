/**
 * publishedAdapters
 * -----------------
 * Implements the p ub li sh ed Ad ap te rs module for the teacher dashboard g ra de s feature.
 */
import { seedAssignments, seedSubjects2 as assignmentSubjects } from "@/dashboard/teacher/components/assignments/AssignmentsMock";
import { seedExams } from "@/dashboard/teacher/components/exams/ExamsMock";
import { seedQuizzes2 } from "@/dashboard/teacher/components/quiz/QuizMock";
import type { TeacherPublishedItem } from "./gradesTypes";

const subjectIdByName = new Map(assignmentSubjects.map((subject) => [subject.name, subject.id] as const));

function resolveSubjectId(subjectName: string) {
  return subjectIdByName.get(subjectName) ?? "";
}

export function buildPublishedItems(): TeacherPublishedItem[] {
  const assignments: TeacherPublishedItem[] = seedAssignments
    .filter((item) => item.status === "published")
    .map((item) => ({
      id: item.id,
      type: "assignment",
      subjectId: resolveSubjectId(item.subject),
      title: item.title,
      className: item.classLabel,
      dueDate: item.dueAt,
      submissionsCount: item.totalSubmissions,
      status: "published",
      maxScore: 100,
    }));

  const quizzes: TeacherPublishedItem[] = seedQuizzes2
    .filter((item) => item.status === "published")
    .map((item) => ({
      id: item.id,
      type: "quiz",
      subjectId: resolveSubjectId(item.subject),
      title: item.title,
      className: item.classLabel,
      dueDate: item.dueAt,
      submissionsCount: Math.max(0, item.maxScore - 2),
      status: "published",
      maxScore: item.maxScore,
    }));

  const exams: TeacherPublishedItem[] = seedExams
    .filter((item) => item.status === "published")
    .map((item) => ({
      id: item.id,
      type: "exam",
      subjectId: resolveSubjectId(item.subject),
      title: item.title,
      className: item.classLabel,
      dueDate: item.scheduledAt,
      submissionsCount: Math.max(0, item.totalQuestions - 10),
      status: "published",
      maxScore: item.maxScore,
    }));

  return [...assignments, ...quizzes, ...exams].filter((item) => item.subjectId);
}

