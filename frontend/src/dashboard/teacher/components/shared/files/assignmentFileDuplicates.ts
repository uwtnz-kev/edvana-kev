import type { TeacherAssignment } from "@/dashboard/teacher/components/assignments";

export type AssignmentFileDuplicateCandidate = {
  name: string;
  size: number;
  lastModified: number;
};

export type DuplicateAssignmentFileScope = {
  classId?: string;
  subject?: string;
};

export type DuplicateAssignmentFileMatch = {
  assignmentId: string;
  assignmentTitle: string;
  subject: string;
  classId?: string;
  classLabel?: string;
  attachmentId: string;
  attachmentName: string;
  attachmentSize: number;
  attachmentLastModified: number;
};

export type DuplicateAssignmentFileResult = {
  isDuplicate: boolean;
  match: DuplicateAssignmentFileMatch | null;
};

export function findDuplicateAssignmentFile(
  candidate: AssignmentFileDuplicateCandidate,
  assignments: TeacherAssignment[],
  scope: DuplicateAssignmentFileScope = {}
): DuplicateAssignmentFileResult {
  for (const assignment of assignments) {
    if (scope.subject && assignment.subject !== scope.subject) {
      continue;
    }

    if (scope.classId && assignment.classId !== scope.classId) {
      continue;
    }

    for (const attachment of assignment.attachments ?? []) {
      if (
        attachment.name === candidate.name
        && attachment.size === candidate.size
        && attachment.lastModified === candidate.lastModified
      ) {
        return {
          isDuplicate: true,
          match: {
            assignmentId: assignment.id,
            assignmentTitle: assignment.title,
            subject: assignment.subject,
            classId: assignment.classId,
            classLabel: assignment.classLabel,
            attachmentId: attachment.id,
            attachmentName: attachment.name,
            attachmentSize: attachment.size,
            attachmentLastModified: attachment.lastModified,
          },
        };
      }
    }
  }

  return {
    isDuplicate: false,
    match: null,
  };
}
