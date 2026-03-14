// Defines the fallback themes used when no subject-specific icon theme is available.
import type { SubjectIconTheme, SubjectTheme } from "./subjectIconThemeHelpers";

export const DEFAULT_SUBJECT_ICON_THEME: SubjectIconTheme = {
  bgClass: "bg-white/10",
  iconClass: "text-[var(--accent-primary)]",
  iconOnTintClass: "text-white",
  ringClass: "ring-[var(--accent-primary)]/30",
};

export const DEFAULT_SUBJECT_THEME: SubjectTheme = {
  bg: "bg-white/5",
  border: "border-white/15",
  iconBg: DEFAULT_SUBJECT_ICON_THEME.bgClass,
  iconText: DEFAULT_SUBJECT_ICON_THEME.iconClass,
};
