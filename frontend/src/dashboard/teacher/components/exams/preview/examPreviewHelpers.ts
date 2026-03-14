// Provides derived labels and stat-card data for the exam preview modal.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  Clock3,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { TeacherExam } from "../ExamsTypes";

type ExamPreviewStat = { icon: LucideIcon; label: string; value: string | number };
export type ExamPreviewBadge = { label: string; className: string };

export function formatExamPreviewDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "No schedule";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function getExamStatusLabel(status: TeacherExam["status"]) {
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}

// Preserves the existing dash placeholder for missing scores.
export function getExamMaxScoreLabel(maxScore: TeacherExam["maxScore"]) {
  return maxScore ?? "-";
}

export function getExamPreviewStats(exam: TeacherExam): ExamPreviewStat[] {
  return [
    { icon: Calendar, label: "Scheduled Date", value: formatExamPreviewDate(exam.scheduledAt) },
    { icon: Clock3, label: "Duration", value: `${exam.durationMinutes} min` },
    { icon: ClipboardList, label: "Total Questions", value: exam.totalQuestions },
    { icon: HelpCircle, label: "Max Score", value: getExamMaxScoreLabel(exam.maxScore) },
  ];
}

export function getExamPreviewBadges(exam: TeacherExam) {
  return [
    { label: exam.subject, className: "bg-white/10 text-white border border-white/20" },
    { label: exam.classLabel, className: "bg-white/10 text-white border border-white/20" },
    { label: getExamStatusLabel(exam.status), className: getAssessmentStatusBadgeClass(exam.status) },
  ] satisfies ExamPreviewBadge[];
}

export const examPreviewHeroIcon = BookOpen;
