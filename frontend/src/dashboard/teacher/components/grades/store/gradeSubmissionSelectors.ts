// Exposes submission-focused selectors and roster-derived lookup helpers.
import type { TeacherClassRosterStudent, TeacherGradeSelectionType, TeacherGradeSubmission, TeacherSubmissionStatus } from "../gradesTypes";
import { getClassRosterByClass, getPublishedItemById } from "./gradesSelectors";
import { readGradesState } from "./gradesPersistence";

type ListGradeSubmissionsParams = {
  selectedGradeType: TeacherGradeSelectionType | null;
  subjectId?: string | null;
  classValue?: string;
  search?: string;
  status?: "all" | TeacherSubmissionStatus;
};

export function getGradeSubmissionById(submissionId: string): TeacherGradeSubmission | null { return readGradesState().submissions.find((item) => item.id === submissionId) ?? null; }

export function listGradeSubmissions({ selectedGradeType, subjectId, classValue = "all", search = "", status = "all" }: ListGradeSubmissionsParams) {
  if (!selectedGradeType) return [];
  const query = search.trim().toLowerCase();
  return readGradesState().submissions.filter((submission) => submission.type === selectedGradeType && (!subjectId || submission.subjectId === subjectId) && (classValue === "all" || submission.className === classValue) && (status === "all" || submission.status === status) && (!query || submission.studentName.toLowerCase().includes(query))).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function getItemSubmissions(itemId: string, classValue = "all", search = "", status: "all" | TeacherSubmissionStatus = "all") {
  const query = search.trim().toLowerCase();
  return readGradesState().submissions.filter((submission) => submission.itemId === itemId && (classValue === "all" || submission.className === classValue) && (status === "all" || submission.status === status) && (!query || submission.studentName.toLowerCase().includes(query))).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function getItemSubmission(itemId: string, submissionId: string): TeacherGradeSubmission | null { return readGradesState().submissions.find((submission) => submission.itemId === itemId && submission.id === submissionId) ?? null; }

export function getNotSubmittedStudents(itemId: string, search = ""): TeacherClassRosterStudent[] {
  const item = getPublishedItemById(itemId);
  if (!item) return [];
  const query = search.trim().toLowerCase();
  const submittedIds = new Set(getItemSubmissions(itemId, "all", "", "all").map((submission) => submission.studentId));
  return getClassRosterByClass(item.className).filter((student) => !submittedIds.has(student.studentId) && (!query || student.studentName.toLowerCase().includes(query)));
}
