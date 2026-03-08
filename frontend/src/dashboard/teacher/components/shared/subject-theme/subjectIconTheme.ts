// Orchestrates subject icon theme exports from the extracted theme modules.
import { DEFAULT_SUBJECT_ICON_THEME, DEFAULT_SUBJECT_THEME } from "./subjectIconThemeFallback";
import {
  getNamedSubjectTheme,
  getPaletteTheme,
  getSubjectThemeFromId,
  type SubjectIconTheme,
  type SubjectTheme,
} from "./subjectIconThemeHelpers";
import { SUBJECT_THEMES } from "./subjectIconThemeMap";

export type { SubjectIconTheme, SubjectTheme };
export { DEFAULT_SUBJECT_ICON_THEME, DEFAULT_SUBJECT_THEME, SUBJECT_THEMES };

export function getSubjectIconTheme(key: string): SubjectIconTheme {
  const theme = getNamedSubjectTheme(key);
  if (!key || theme.id === "default") return getPaletteTheme(key);
  return {
    bgClass: theme.bgClass,
    iconClass: theme.iconClass,
    iconOnTintClass: "text-[#3B240F]",
    ringClass: theme.ringClass,
  };
}

// Converts the shared subject theme into the card/background shape used by icon consumers.
export function getSubjectTheme(subjectName: string): SubjectTheme {
  const theme = getNamedSubjectTheme(subjectName);
  return {
    bg: theme.bgClass.replace("/20", "/5"),
    border: (theme.ringClass ?? "ring-blue-500/30").replace("ring-", "border-"),
    iconBg: theme.bgClass,
    iconText: theme.iconClass,
  };
}

export function getSubjectThemeById(subjectId: string): SubjectIconTheme {
  const theme = getSubjectThemeFromId(subjectId);
  return {
    bgClass: theme.bgClass,
    iconClass: theme.iconClass,
    iconOnTintClass: "text-[#3B240F]",
    ringClass: theme.ringClass,
  };
}
