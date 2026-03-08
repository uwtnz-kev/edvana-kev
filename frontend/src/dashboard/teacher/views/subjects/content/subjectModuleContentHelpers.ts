// Provides route-state types and derived content labels for the module content view.
import { Link as LinkIcon, Paperclip, type LucideIcon } from "lucide-react";
import { seedSubjects2 } from "@/dashboard/teacher/components/assignments";
import type { TeacherSubjectNavData } from "@/dashboard/teacher/components/subjects/TeacherSubjectCard";

export type SubjectModuleContentRouteState = {
  subject?: TeacherSubjectNavData | null;
  restoreSubjectId?: string;
};

export type SubjectModuleContentSection = {
  body?: string;
  resources?: Array<{ icon: LucideIcon; label: string }>;
  title: string;
};

export function getSubjectName(subjectId: string, state: SubjectModuleContentRouteState | null) {
  return state?.subject?.name ?? seedSubjects2.find((item) => item.id === subjectId)?.name ?? "Subject";
}

// Builds the fixed content sections while preserving the current fallback copy.
export function getContentSections(summary?: string): SubjectModuleContentSection[] {
  return [
    {
      title: "Lesson Overview",
      body: summary ?? "This content page will hold the lesson overview, teacher notes, guided activities, and key checkpoints for the module.",
    },
    {
      title: "Teaching Focus",
      body: "Clarify core concepts, model worked examples, and prepare students for guided practice.",
    },
    {
      title: "In-Class Activity",
      body: "Small-group discussion prompts, worksheet tasks, and quick reflection checks can be attached here.",
    },
    {
      title: "Resources",
      resources: [
        { icon: Paperclip, label: "Lesson slides" },
        { icon: Paperclip, label: "Printable worksheet" },
        { icon: LinkIcon, label: "Reference video link" },
      ],
    },
    {
      title: "Teaching Notes",
      body: "Use this area for pacing notes, prerequisite reminders, and follow-up assessment tasks.",
    },
  ];
}
