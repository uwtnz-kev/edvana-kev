import { subjectWorkspaceData } from "@/dashboard/teacher/views/subjects/subjectWorkspaceData";

export type TeacherSubjectClassDefinition = {
  classId: string;
  classLabel: string;
  subjectIds: string[];
};

const allSubjectIds = subjectWorkspaceData.map((subject) => String(subject.id));

export const teacherSubjectClasses: TeacherSubjectClassDefinition[] = [
  { classId: "s1a", classLabel: "S1A", subjectIds: allSubjectIds },
  { classId: "s3a", classLabel: "S3A", subjectIds: allSubjectIds },
  { classId: "s5b", classLabel: "S5B", subjectIds: allSubjectIds },
  { classId: "s6a", classLabel: "S6A", subjectIds: allSubjectIds },
  { classId: "s6b", classLabel: "S6B", subjectIds: allSubjectIds },
];

export function getTeacherSubjectClass(classId: string | null | undefined) {
  if (!classId) return null;
  return teacherSubjectClasses.find((item) => item.classId === classId) ?? null;
}

export function getSubjectsForClass(classId: string | null | undefined) {
  const subjectClass = getTeacherSubjectClass(classId);
  if (!subjectClass) return [];

  const allowedSubjectIds = new Set(subjectClass.subjectIds);
  return subjectWorkspaceData.filter((subject) => allowedSubjectIds.has(String(subject.id)));
}
