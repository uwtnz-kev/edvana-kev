/**
 * ExamsTheme
 * ----------
 * Provides theme helpers for the teacher dashboard e xa ms feature.
 */
import { getSubjectThemeFromName } from "@/dashboard/teacher/components/shared";

export type ExamSubjectIconTheme = {
  bg: string;
  text: string;
};

export const DEFAULT_SUBJECT_ICON_THEME: ExamSubjectIconTheme = {
  bg: "bg-slate-500/20",
  text: "text-slate-700",
};

export const SUBJECT_ICON_THEME: Record<string, ExamSubjectIconTheme> = {
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


