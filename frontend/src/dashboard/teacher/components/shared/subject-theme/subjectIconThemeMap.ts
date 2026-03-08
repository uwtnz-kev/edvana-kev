// Stores the subject icon palette and subject-name theme map.
import type { SubjectIconTheme, SubjectTheme } from "./subjectIconThemeHelpers";

export const SUBJECT_ICON_PALETTE: SubjectIconTheme[] = [
  { bgClass: "bg-blue-500/20", iconClass: "text-blue-700", iconOnTintClass: "text-white", ringClass: "ring-blue-500/30" },
  { bgClass: "bg-emerald-500/20", iconClass: "text-emerald-700", iconOnTintClass: "text-[#3B240F]", ringClass: "ring-emerald-500/30" },
  { bgClass: "bg-purple-500/20", iconClass: "text-purple-700", iconOnTintClass: "text-white", ringClass: "ring-purple-500/30" },
  { bgClass: "bg-amber-500/20", iconClass: "text-amber-700", iconOnTintClass: "text-[#3B240F]", ringClass: "ring-amber-500/30" },
  { bgClass: "bg-pink-500/20", iconClass: "text-pink-700", iconOnTintClass: "text-white", ringClass: "ring-pink-500/30" },
  { bgClass: "bg-cyan-500/20", iconClass: "text-cyan-700", iconOnTintClass: "text-[#3B240F]", ringClass: "ring-cyan-500/30" },
];

export const SUBJECT_THEMES: Record<string, SubjectTheme> = {
  Mathematics: { bg: "bg-blue-500/5", border: "border-blue-500/20", iconBg: "bg-blue-500/20", iconText: "text-blue-700" },
  Biology: { bg: "bg-emerald-500/5", border: "border-emerald-500/20", iconBg: "bg-emerald-500/20", iconText: "text-emerald-700" },
  Chemistry: { bg: "bg-purple-500/5", border: "border-purple-500/20", iconBg: "bg-purple-500/20", iconText: "text-purple-700" },
  Physics: { bg: "bg-amber-500/5", border: "border-amber-500/20", iconBg: "bg-amber-500/20", iconText: "text-amber-700" },
  English: { bg: "bg-pink-500/5", border: "border-pink-500/20", iconBg: "bg-pink-500/20", iconText: "text-pink-700" },
  Geography: { bg: "bg-cyan-500/5", border: "border-cyan-500/20", iconBg: "bg-cyan-500/20", iconText: "text-cyan-700" },
};
