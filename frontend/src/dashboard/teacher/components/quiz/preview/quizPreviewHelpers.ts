// Provides derived labels and stat-card data for the quiz preview page.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import { BookOpen, Calendar, Clock3, FolderOpen, GraduationCap, KeyRound, Shapes, TrendingUp, ClipboardList, type LucideIcon } from "lucide-react";
import type { TeacherQuiz } from "../QuizTypes";
import { formatQuizCloseDateTime, getQuizDerivedStatus } from "../quizStatus";

type QuizPreviewStat = { icon: LucideIcon; label: string; value: string | number; iconClassName: string };
export type QuizPreviewBadge = { label: string; className: string };

export function formatQuizPreviewDate(dateString: string) {
  return formatQuizCloseDateTime(dateString);
}

export function getQuizStatusLabel(status: TeacherQuiz["status"]) {
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}

export function getQuizPreviewStats(quiz: TeacherQuiz, totalSubmissions: number, rosterCount: number): QuizPreviewStat[] {
  const clampedSubmissions = Math.min(totalSubmissions, rosterCount);
  const submissionRate = rosterCount > 0 ? `${Math.round((clampedSubmissions / rosterCount) * 100)}%` : "0%";

  return [
    { icon: Calendar, label: "Due Date", value: formatQuizPreviewDate(quiz.dueAt), iconClassName: "border-sky-400/20 bg-sky-400/15 text-sky-300" },
    { icon: ClipboardList, label: "Total Points", value: quiz.maxScore ?? "Not set", iconClassName: "border-indigo-400/20 bg-indigo-400/15 text-indigo-300" },
    { icon: Shapes, label: "Submission Method", value: "Quiz Form", iconClassName: "border-cyan-400/20 bg-cyan-400/15 text-cyan-300" },
    { icon: GraduationCap, label: "Total Attempts", value: quiz.totalAttempts, iconClassName: "border-amber-400/20 bg-amber-400/15 text-amber-300" },
    { icon: KeyRound, label: "Access Code", value: quiz.accessCode?.trim() ? quiz.accessCode.trim() : "Not set", iconClassName: "border-rose-400/20 bg-rose-400/15 text-rose-300" },
    { icon: FolderOpen, label: "Submissions", value: clampedSubmissions, iconClassName: "border-violet-400/20 bg-violet-400/15 text-violet-300" },
    { icon: TrendingUp, label: "Submission Rate", value: submissionRate, iconClassName: "border-emerald-400/20 bg-emerald-500/15 text-emerald-300" },
    { icon: Clock3, label: "Duration", value: `${quiz.durationMinutes} min`, iconClassName: "border-white/20 bg-white/10 text-white/80" },
  ];
}

export function getQuizPreviewBadges(quiz: TeacherQuiz) {
  return [
    { label: quiz.subject, className: "bg-white/10 text-white border border-white/20" },
    { label: quiz.classLabel, className: "bg-white/10 text-white border border-white/20" },
    { label: getQuizStatusLabel(getQuizDerivedStatus(quiz)), className: getAssessmentStatusBadgeClass(getQuizDerivedStatus(quiz)) },
  ] satisfies QuizPreviewBadge[];
}

export const quizPreviewHeroIcon = BookOpen;
