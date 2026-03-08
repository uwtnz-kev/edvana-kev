// Provides derived labels and stat-card data for the exam preview modal.
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

export function formatExamPreviewDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "No schedule";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function getExamStatusLabel(status: TeacherExam["status"]) {
  return status === "published" ? "Published" : "Draft";
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
  return [exam.subject, exam.classLabel, getExamStatusLabel(exam.status)];
}

export const examPreviewHeroIcon = BookOpen;
