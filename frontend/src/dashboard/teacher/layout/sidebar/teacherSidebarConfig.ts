// Defines the teacher sidebar navigation tree and reset-aware routes.
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  FileText,
  HelpCircle,
  Megaphone,
  MessageSquare,
  Settings,
  Sliders,
  User,
  Users,
} from "lucide-react";

export type TeacherSidebarSubItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type TeacherSidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  hasDropdown?: boolean;
  subItems?: TeacherSidebarSubItem[];
};

export const teacherSidebarItems: TeacherSidebarItem[] = [
  { label: "Overview", href: "/dashboard/teacher", icon: BarChart3 },
  { label: "Subjects", href: "/dashboard/teacher/subjects", icon: BookOpen },
  { label: "Assignments", href: "/dashboard/teacher/assignments", icon: ClipboardList },
  { label: "Exams", href: "/dashboard/teacher/exams", icon: FileText },
  { label: "Quiz", href: "/dashboard/teacher/quizzes", icon: ClipboardList },
  { label: "Grades", href: "/dashboard/teacher/grades", icon: Award },
  { label: "Attendance", href: "/dashboard/teacher/attendance", icon: ClipboardCheck },
   { label: "Announcements", href: "/dashboard/teacher/announcements", icon: Megaphone },
  { label: "Schedule", href: "/dashboard/teacher/schedule", icon: Calendar },
  { label: "Students", href: "/dashboard/teacher/students", icon: Users },
  { label: "Parents", href: "/dashboard/teacher/parents", icon: Users },
  { label: "Messages", href: "/dashboard/teacher/messages", icon: MessageSquare },
  {
    label: "Settings",
    href: "/dashboard/teacher/settings",
    icon: Settings,
    hasDropdown: true,
    subItems: [
      { label: "General Settings", href: "/dashboard/teacher/settings/general", icon: Sliders },
      { label: "Account Settings", href: "/dashboard/teacher/settings/account", icon: User },
    ],
  },
  { label: "Support", href: "/dashboard/teacher/support", icon: HelpCircle },
];

// These sections reset to their landing view when the active nav item is clicked again.
export const teacherSidebarResetRoutes = new Set([
  "/dashboard/teacher/assignments",
  "/dashboard/teacher/announcements",
  "/dashboard/teacher/exams",
  "/dashboard/teacher/quizzes",
  "/dashboard/teacher/attendance",
  "/dashboard/teacher/subjects",
  "/dashboard/teacher/students",
  "/dashboard/teacher/parents",
]);
