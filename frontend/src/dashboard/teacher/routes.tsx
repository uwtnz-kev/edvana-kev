/**
 * routes
 * ------
 * Defines shared route constants for the teacher dashboard.
 */
export const TEACHER_ROUTES = {
  ROOT: "/dashboard/teacher",
  GRADES: "/dashboard/teacher/grades",
  GRADES_WORKSPACE: "/dashboard/teacher/grades/workspace",
  GRADES_WORKSPACE_ITEM: "/dashboard/teacher/grades/workspace/:itemId",
  GRADES_WORKSPACE_ITEM_SUBMITTED: "/dashboard/teacher/grades/workspace/:itemId/submitted",
  GRADES_WORKSPACE_ITEM_NOT_SUBMITTED: "/dashboard/teacher/grades/workspace/:itemId/not-submitted",
  GRADES_WORKSPACE_ITEM_SUBMISSION: "/dashboard/teacher/grades/workspace/:itemId/submissions/:submissionId",
  GRADES_CREATE: "/dashboard/teacher/grades/create",
  GRADES_EXPORT: "/dashboard/teacher/grades/export",
  GRADES_SUBMISSIONS: "/dashboard/teacher/grades/submissions",
  GRADES_SUBMISSION_DETAILS: "/dashboard/teacher/grades/submissions/:submissionId",
  QUESTIONS_BUILDER_CREATE: "/dashboard/teacher/questions/create",
  QUESTIONS_BUILDER_EDIT: "/dashboard/teacher/questions/edit/:itemId",
  ANNOUNCEMENTS: "/dashboard/teacher/announcements",
  ANNOUNCEMENTS_CREATE: "/dashboard/teacher/announcements/create",
  ANNOUNCEMENTS_EDIT: "/dashboard/teacher/announcements/edit/:announcementId",
  MESSAGES: "/dashboard/teacher/messages",
  MESSAGE_DETAILS: "/dashboard/teacher/messages/:messageId",
} as const;

