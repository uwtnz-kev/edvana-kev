// Shared types and defaults for the teacher general settings workspace.
export interface TeacherPreferences {
  emailNotifications: boolean;
  darkMode: boolean;
  classReminders: boolean;
}

export const TEACHER_PREFERENCES_KEY = "teacherPreferences";

export const defaultTeacherPreferences: TeacherPreferences = {
  emailNotifications: true,
  darkMode: false,
  classReminders: true,
};
