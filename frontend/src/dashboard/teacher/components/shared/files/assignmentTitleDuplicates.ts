import type { TeacherAssignment } from "@/dashboard/teacher/components/assignments/AssignmentsTypes";

export type AssignmentTitleDuplicateCandidate = {
  title: string;
};

export type DuplicateAssignmentTitleScope = {
  classId?: string;
  subject?: string;
};

export type DuplicateAssignmentTitleMatch = {
  assignmentId: string;
  assignmentTitle: string;
  subject: string;
  classId?: string;
  classLabel?: string;
};

export type DuplicateAssignmentTitleResult = {
  isDuplicate: boolean;
  match: DuplicateAssignmentTitleMatch | null;
};

function normalizeAssignmentTitle(value: string) {
  return value.trim().toLowerCase();
}

export function findDuplicateAssignmentTitle(
  candidate: AssignmentTitleDuplicateCandidate,
  assignments: TeacherAssignment[],
  scope: DuplicateAssignmentTitleScope = {},
): DuplicateAssignmentTitleResult {
  const normalizedTitle = normalizeAssignmentTitle(candidate.title);
  const normalizedClassId = scope.classId?.trim().toLowerCase();
  const normalizedSubject = scope.subject?.trim().toLowerCase();

  if (!normalizedTitle || !normalizedClassId || !normalizedSubject) {
    return { isDuplicate: false, match: null };
  }

  const match = assignments.find((assignment) => {
    if (normalizeAssignmentTitle(assignment.title) !== normalizedTitle) return false;
    if (assignment.classId.trim().toLowerCase() !== normalizedClassId) return false;
    if (assignment.subject.trim().toLowerCase() !== normalizedSubject) return false;
    return true;
  });

  if (!match) {
    return { isDuplicate: false, match: null };
  }

  return {
    isDuplicate: true,
    match: {
      assignmentId: match.id,
      assignmentTitle: match.title,
      subject: match.subject,
      classId: match.classId,
      classLabel: match.classLabel,
    },
  };
}
