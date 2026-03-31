// Provides derived labels and stat-card data for the exam preview page.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  Clock3,
  FolderOpen,
  GraduationCap,
  KeyRound,
  Shapes,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { TeacherExam } from "../ExamsTypes";
import { formatExamCloseDateTime, getExamDerivedStatus } from "../examStatus";

type ExamPreviewStat = { icon: LucideIcon; label: string; value: string | number; iconClassName: string };
export type ExamPreviewBadge = { label: string; className: string };

export function formatExamPreviewDate(dateString: string) {
  return formatExamCloseDateTime(dateString);
}

export function getExamStatusLabel(status: TeacherExam["status"]) {
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}

export function getExamPreviewStats(exam: TeacherExam, totalSubmissions: number, rosterCount: number): ExamPreviewStat[] {
  const clampedSubmissions = Math.min(totalSubmissions, rosterCount);
  const submissionRate = rosterCount > 0 ? `${Math.round((clampedSubmissions / rosterCount) * 100)}%` : "0%";

  return [
    { icon: Calendar, label: "Close Date & Time", value: formatExamPreviewDate(exam.scheduledAt), iconClassName: "border-sky-400/20 bg-sky-400/15 text-sky-300" },
    { icon: ClipboardList, label: "Total Points", value: exam.maxScore ?? "Not set", iconClassName: "border-indigo-400/20 bg-indigo-400/15 text-indigo-300" },
    { icon: Shapes, label: "Submission Method", value: "Quiz Form", iconClassName: "border-cyan-400/20 bg-cyan-400/15 text-cyan-300" },
    { icon: GraduationCap, label: "Total Attempts", value: exam.totalAttempts, iconClassName: "border-amber-400/20 bg-amber-400/15 text-amber-300" },
    { icon: KeyRound, label: "Access Code", value: exam.accessCode?.trim() ? exam.accessCode.trim() : "Required", iconClassName: "border-rose-400/20 bg-rose-400/15 text-rose-300" },
    { icon: FolderOpen, label: "Submissions", value: clampedSubmissions, iconClassName: "border-violet-400/20 bg-violet-400/15 text-violet-300" },
    { icon: TrendingUp, label: "Submission Rate", value: submissionRate, iconClassName: "border-emerald-400/20 bg-emerald-500/15 text-emerald-300" },
    { icon: Clock3, label: "Duration", value: `${exam.durationMinutes} min`, iconClassName: "border-white/20 bg-white/10 text-white/80" },
  ];
}

export function getExamPreviewBadges(exam: TeacherExam) {
  return [
    { label: exam.subject, className: "bg-white/10 text-white border border-white/20" },
    { label: exam.classLabel, className: "bg-white/10 text-white border border-white/20" },
    { label: getExamStatusLabel(getExamDerivedStatus(exam)), className: getAssessmentStatusBadgeClass(getExamDerivedStatus(exam)) },
  ] satisfies ExamPreviewBadge[];
}

export const examPreviewHeroIcon = BookOpen;
