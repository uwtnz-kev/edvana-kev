export const USER_ROLES = {
  STUDENT: 'student',
    SELFSTUDENT: 'selfstudent',
  TEACHER: 'teacher',
  PARENT: 'parent',
  SCHOOL_ADMIN: 'schooladmin',
  SUPER_ADMIN: 'superadmin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const ROLE_LABELS = {
  [USER_ROLES.STUDENT]: 'Student',
    [USER_ROLES.SELFSTUDENT]: 'Self Student',
  [USER_ROLES.TEACHER]: 'Teacher',
  [USER_ROLES.PARENT]: 'Parent',
  [USER_ROLES.SCHOOL_ADMIN]: 'School Administrator',
  [USER_ROLES.SUPER_ADMIN]: 'Super Administrator',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.STUDENT]: ['view_courses', 'take_assessments', 'view_progress'],
    [USER_ROLES.SELFSTUDENT]: ['view_courses', 'take_assessments', 'view_progress'],
  [USER_ROLES.TEACHER]: ['create_courses', 'grade_assessments', 'view_student_progress'],
  [USER_ROLES.PARENT]: ['view_child_progress', 'communicate_with_teachers'],
  [USER_ROLES.SCHOOL_ADMIN]: ['manage_teachers', 'view_school_analytics', 'manage_curriculum'],
  [USER_ROLES.SUPER_ADMIN]: ['manage_all_schools', 'system_administration'],
};

export const normalizeUserRole = (role: string | undefined): UserRole => {
  if (!role) return USER_ROLES.STUDENT; // fallback

  const normalized = role.toLowerCase().replace(/[\s_]/g, ""); // e.g. "school_admin" → "schooladmin"

  switch (normalized) {
    case "student":
      return USER_ROLES.STUDENT;
    case "selfstudent":
      return USER_ROLES.SELFSTUDENT;
    case "teacher":
      return USER_ROLES.TEACHER;
    case "parent":
      return USER_ROLES.PARENT;
    case "schooladmin":
      return USER_ROLES.SCHOOL_ADMIN;
    case "superadmin":
      return USER_ROLES.SUPER_ADMIN;
    default:
      return USER_ROLES.STUDENT; // ✅ safe fallback
  }
};



export const hasPermission = (role: string, permission: string): boolean => {
  const normalizedRole = normalizeUserRole(role);
  if (!normalizedRole) return false;
  return ROLE_PERMISSIONS[normalizedRole]?.includes(permission) ?? false;
};
