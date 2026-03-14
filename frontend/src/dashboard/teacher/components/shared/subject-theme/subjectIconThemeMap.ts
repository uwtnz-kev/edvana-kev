// Stores the subject icon palette and subject-name theme map.
import type { SubjectIconTheme, SubjectTheme } from "./subjectIconThemeHelpers";

export const SUBJECT_ICON_PALETTE: SubjectIconTheme[] = [
  { bgClass: "bg-blue-500/15", iconClass: "text-blue-300", iconOnTintClass: "text-white", ringClass: "ring-blue-400/30" },
  { bgClass: "bg-emerald-500/15", iconClass: "text-emerald-300", iconOnTintClass: "text-white", ringClass: "ring-emerald-400/30" },
  { bgClass: "bg-purple-500/15", iconClass: "text-purple-300", iconOnTintClass: "text-white", ringClass: "ring-purple-400/30" },
  { bgClass: "bg-amber-500/15", iconClass: "text-amber-300", iconOnTintClass: "text-white", ringClass: "ring-amber-400/30" },
  { bgClass: "bg-pink-500/15", iconClass: "text-pink-300", iconOnTintClass: "text-white", ringClass: "ring-pink-400/30" },
  { bgClass: "bg-cyan-500/15", iconClass: "text-cyan-300", iconOnTintClass: "text-white", ringClass: "ring-cyan-400/30" },
];

export const SUBJECT_THEMES: Record<string, SubjectTheme> = {
  Mathematics: { bg: "bg-blue-500/8", border: "border-blue-500/20", iconBg: "bg-blue-500/15", iconText: "text-blue-300" },
  Biology: { bg: "bg-emerald-500/8", border: "border-emerald-500/20", iconBg: "bg-emerald-500/15", iconText: "text-emerald-300" },
  Chemistry: { bg: "bg-purple-500/8", border: "border-purple-500/20", iconBg: "bg-purple-500/15", iconText: "text-purple-300" },
  Physics: { bg: "bg-amber-500/8", border: "border-amber-500/20", iconBg: "bg-amber-500/15", iconText: "text-amber-300" },
  English: { bg: "bg-pink-500/8", border: "border-pink-500/20", iconBg: "bg-pink-500/15", iconText: "text-pink-300" },
  Geography: { bg: "bg-cyan-500/8", border: "border-cyan-500/20", iconBg: "bg-cyan-500/15", iconText: "text-cyan-300" },
};
