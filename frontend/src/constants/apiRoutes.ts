export const API_ROUTES = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
    REFRESH: '/auth/refresh',
  },
  
  // Student endpoints
  STUDENT: {
    COURSES: '/student/courses',
    ENROLLED: '/student/enrolled',
    PROGRESS: '/student/progress',
    ASSESSMENTS: '/student/assessments',
  },
  
  // Teacher endpoints
  TEACHER: {
    COURSES: '/teacher/courses',
    STUDENTS: '/teacher/students',
    ASSESSMENTS: '/teacher/assessments',
    ANALYTICS: '/teacher/analytics',
  },
  
  // Parent endpoints
  PARENT: {
    CHILDREN: '/parent/children',
    PROGRESS: '/parent/progress',
    COMMUNICATIONS: '/parent/communications',
  },
  
  // School admin endpoints
  ADMIN: {
    TEACHERS: '/schooladmin/teachers',
    STUDENTS: '/schooladmin/students',
    CURRICULUM: '/schooladmin/curriculum',
    ANALYTICS: '/schooladmin/analytics',
  },
  
  // Super admin endpoints
  SUPER_ADMIN: {
    SCHOOLS: '/superadmin/schools',
    USERS: '/superadmin/users',
    SYSTEM: '/superadmin/system',
  },
} as const;