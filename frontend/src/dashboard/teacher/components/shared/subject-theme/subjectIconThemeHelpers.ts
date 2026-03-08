// Provides shared types and lookup helpers for subject icon themes.
import { getSubjectTheme as getSharedSubjectTheme, getSubjectThemeFromName } from "../subjectTheme";
import { DEFAULT_SUBJECT_ICON_THEME } from "./subjectIconThemeFallback";
import { SUBJECT_ICON_PALETTE } from "./subjectIconThemeMap";

export type SubjectIconTheme = {
  bgClass: string;
  iconClass: string;
  iconOnTintClass: string;
  ringClass?: string;
};

export type SubjectTheme = {
  bg: string;
  border: string;
  iconBg: string;
  iconText: string;
};

function hashKey(key: string) {
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }
  return hash;
}

// Falls back to a deterministic palette entry so unnamed subjects stay visually stable.
export function getPaletteTheme(key: string) {
  const index = hashKey((key || "default").trim().toLowerCase()) % SUBJECT_ICON_PALETTE.length;
  return SUBJECT_ICON_PALETTE[index] ?? DEFAULT_SUBJECT_ICON_THEME;
}

export function getNamedSubjectTheme(subjectName: string) {
  return getSubjectThemeFromName(subjectName);
}

export function getSubjectThemeFromId(subjectId: string) {
  return getSharedSubjectTheme(subjectId);
}
