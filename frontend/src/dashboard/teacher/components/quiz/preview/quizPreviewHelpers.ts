// Provides derived labels and stat-card data for the quiz preview modal.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  Clock3,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { TeacherQuiz } from "../QuizTypes";

type QuizPreviewStat = { icon: LucideIcon; label: string; value: string | number };
export type QuizPreviewBadge = { label: string; className: string };

export function formatQuizPreviewDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function getQuizStatusLabel(status: TeacherQuiz["status"]) {
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}

// Preserves the existing dash placeholder for missing scores.
export function getQuizMaxScoreLabel(maxScore: TeacherQuiz["maxScore"]) {
  return maxScore ?? "-";
}

export function getQuizPreviewStats(quiz: TeacherQuiz): QuizPreviewStat[] {
  return [
    { icon: Calendar, label: "Due Date", value: formatQuizPreviewDate(quiz.dueAt) },
    { icon: Clock3, label: "Duration Minutes", value: quiz.durationMinutes },
    { icon: ClipboardList, label: "Total Questions", value: quiz.totalQuestions },
    { icon: HelpCircle, label: "Max Score", value: getQuizMaxScoreLabel(quiz.maxScore) },
  ];
}

export function getQuizPreviewBadges(quiz: TeacherQuiz) {
  return [
    { label: quiz.subject, className: "bg-white/10 text-white border border-white/20" },
    { label: quiz.classLabel, className: "bg-white/10 text-white border border-white/20" },
    { label: getQuizStatusLabel(quiz.status), className: getAssessmentStatusBadgeClass(quiz.status) },
  ] satisfies QuizPreviewBadge[];
}

export const quizPreviewHeroIcon = BookOpen;
