/**
 * subjectTheme
 * ------------
 * Provides theme helpers for the teacher dashboard s ha re d feature.
 */
export type SubjectTheme = {
  id: string;
  bgClass: string;
  iconClass: string;
  ringClass?: string;
  accent?: string;
};

const DEFAULT_THEME: SubjectTheme = {
  id: "default",
  bgClass: "bg-blue-500/20",
  iconClass: "text-blue-700",
  ringClass: "ring-blue-500/30",
  accent: "text-blue-700",
};

const SUBJECT_THEME_BY_ID: Record<string, SubjectTheme> = {
  "subject-2-math": {
    id: "subject-2-math",
    bgClass: "bg-blue-500/20",
    iconClass: "text-blue-700",
    ringClass: "ring-blue-500/30",
    accent: "text-blue-700",
  },
  "subject-2-bio": {
    id: "subject-2-bio",
    bgClass: "bg-emerald-500/20",
    iconClass: "text-emerald-700",
    ringClass: "ring-emerald-500/30",
    accent: "text-emerald-700",
  },
  "subject-2-chem": {
    id: "subject-2-chem",
    bgClass: "bg-purple-500/20",
    iconClass: "text-purple-700",
    ringClass: "ring-purple-500/30",
    accent: "text-purple-700",
  },
  "subject-2-physics": {
    id: "subject-2-physics",
    bgClass: "bg-amber-500/20",
    iconClass: "text-amber-700",
    ringClass: "ring-amber-500/30",
    accent: "text-amber-700",
  },
  "subject-2-english": {
    id: "subject-2-english",
    bgClass: "bg-pink-500/20",
    iconClass: "text-pink-700",
    ringClass: "ring-pink-500/30",
    accent: "text-pink-700",
  },
  "subject-2-geography": {
    id: "subject-2-geography",
    bgClass: "bg-cyan-500/20",
    iconClass: "text-cyan-700",
    ringClass: "ring-cyan-500/30",
    accent: "text-cyan-700",
  },
};

const SUBJECT_ID_BY_NAME: Record<string, string> = {
  mathematics: "subject-2-math",
  biology: "subject-2-bio",
  chemistry: "subject-2-chem",
  physics: "subject-2-physics",
  english: "subject-2-english",
  geography: "subject-2-geography",
};

export function getSubjectIdByName(subjectName: string): string | null {
  const key = subjectName.trim().toLowerCase();
  if (!key) {
    return null;
  }
  return SUBJECT_ID_BY_NAME[key] ?? null;
}

export function getSubjectTheme(subjectId: string): SubjectTheme {
  return SUBJECT_THEME_BY_ID[subjectId] ?? DEFAULT_THEME;
}

export function getSubjectThemeFromName(subjectName: string): SubjectTheme {
  const subjectId = getSubjectIdByName(subjectName);
  if (!subjectId) {
    return DEFAULT_THEME;
  }
  return getSubjectTheme(subjectId);
}

