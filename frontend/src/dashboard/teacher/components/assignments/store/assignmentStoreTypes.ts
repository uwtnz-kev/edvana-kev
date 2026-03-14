// Defines public assignment store helper types used by the UI and store modules.
import type { TeacherAssignment } from "../AssignmentsTypes";

export interface AssignmentStatsSummary {
  total: number;
  drafts: number;
  published: number;
  closed: number;
  pendingToGrade: number;
  totalSubmissions: number;
}

export type CreateAssignmentInput = Omit<TeacherAssignment, "id" | "createdAt"> &
  Partial<Pick<TeacherAssignment, "createdAt">>;

export type UpdateAssignmentInput = Partial<Omit<TeacherAssignment, "id" | "createdAt">>;
