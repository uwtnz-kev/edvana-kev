/**
 * QuizTheme
 * ---------
 * Provides theme helpers for the teacher dashboard q ui z feature.
 */
import { getSubjectThemeFromName } from "@/dashboard/teacher/components/shared";

export type QuizSubjectIconTheme = {
  bg: string;
  text: string;
};

export const DEFAULT_SUBJECT_ICON_THEME: QuizSubjectIconTheme = {
  bg: "bg-white/10",
  text: "text-[var(--accent-primary)]",
};

export const SUBJECT_ICON_THEME: Record<string, QuizSubjectIconTheme> = {
  Mathematics: (() => {
    const theme = getSubjectThemeFromName("Mathematics");
    return { bg: theme.bgClass, text: theme.iconClass };
  })(),
  Biology: (() => {
    const theme = getSubjectThemeFromName("Biology");
    return { bg: theme.bgClass, text: theme.iconClass };
  })(),
  Chemistry: (() => {
    const theme = getSubjectThemeFromName("Chemistry");
    return { bg: theme.bgClass, text: theme.iconClass };
  })(),
  Physics: (() => {
    const theme = getSubjectThemeFromName("Physics");
    return { bg: theme.bgClass, text: theme.iconClass };
  })(),
  English: (() => {
    const theme = getSubjectThemeFromName("English");
    return { bg: theme.bgClass, text: theme.iconClass };
  })(),
  Geography: (() => {
    const theme = getSubjectThemeFromName("Geography");
    return { bg: theme.bgClass, text: theme.iconClass };
  })(),
};


