// Defines the fallback themes used when no subject-specific icon theme is available.
import type { SubjectIconTheme, SubjectTheme } from "./subjectIconThemeHelpers";

export const DEFAULT_SUBJECT_ICON_THEME: SubjectIconTheme = {
  bgClass: "bg-blue-500/20",
  iconClass: "text-blue-700",
  iconOnTintClass: "text-[#3B240F]",
  ringClass: "ring-blue-500/30",
};

export const DEFAULT_SUBJECT_THEME: SubjectTheme = {
  bg: "bg-blue-500/5",
  border: "border-blue-500/20",
  iconBg: DEFAULT_SUBJECT_ICON_THEME.bgClass,
  iconText: DEFAULT_SUBJECT_ICON_THEME.iconClass,
};
