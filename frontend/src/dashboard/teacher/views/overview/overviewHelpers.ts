// Provides derived labels and static overview dashboard data.
import { BookOpen, ClipboardList, Clock, Users, type LucideIcon } from "lucide-react";
import type { SummaryCardItem } from "@/dashboard/teacher/components/overview/SummaryCards";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import type { AuthUser } from "@/types/user";

export type ActivityItem = {
  id: string;
  meta: string;
  title: string;
  tone: "teal" | "coral" | "slate";
};

type SummaryCardSeed = { icon: LucideIcon; id: string; subject: string; subtitle: string; title: string; value: string | number };

export function getGreeting(user: AuthUser | null, currentHour: number) {
  const timeLabel = currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening";
  const name = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "Teacher";
  return `${timeLabel}, ${name}!`;
}

export function getActivityToneClass(tone: ActivityItem["tone"]) {
  if (tone === "teal") return "bg-[#1EA896]";
  if (tone === "coral") return "bg-[#FF715B]";
  return "bg-[#4C5454]";
}

export function getOverviewActivities(): ActivityItem[] {
  return [
    { id: "a1", tone: "teal", title: "14 assignments submitted", meta: "1 hour ago • Class S3A" },
    { id: "a2", tone: "coral", title: "Quiz published: Algebra Unit 2", meta: "Yesterday • 3 classes assigned" },
    { id: "a3", tone: "slate", title: "Lesson plan updated", meta: "2 days ago • Science Lab" },
    { id: "a4", tone: "teal", title: "New student joined your class", meta: "2 days ago • Class S2B" },
    { id: "a5", tone: "coral", title: "Assignment deadline approaching", meta: "Tomorrow • Math S3A" },
    { id: "a6", tone: "slate", title: "Grades exported", meta: "3 days ago • Term report" },
  ];
}

export function getOverviewSummaryCards(): SummaryCardItem[] {
  const cards: SummaryCardSeed[] = [
    { id: "subjects", icon: BookOpen, title: "Subjects", value: 5, subtitle: "Assigned this term", subject: "Mathematics" },
    { id: "students", icon: Users, title: "Students", value: 148, subtitle: "Across all classes", subject: "Biology" },
    { id: "pending", icon: ClipboardList, title: "Pending", value: 23, subtitle: "To review or grade", subject: "Chemistry" },
    { id: "weekly-hours", icon: Clock, title: "Weekly Hours", value: "18h", subtitle: "Teaching time", subject: "Physics" },
  ];
  return cards.map((card) => ({ ...card, theme: getSubjectIconTheme(card.subject) }));
}
