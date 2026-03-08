// Helpers for subject-scoped student filtering, paging, and route restore state.
import type { Student, StudentsFilters } from "../../components/students";

export type StudentsRestoreState = {
  restoreSubjectId?: string;
  resetToHome?: boolean;
};

export const DEFAULT_STUDENT_FILTERS: StudentsFilters = {
  search: "",
  class: "",
  status: "all",
};

const SUBJECT_CLASS_MAP: Record<string, string[]> = {
  Mathematics: ["S3A", "S3B"],
  Biology: ["S2A", "S2B"],
  Chemistry: ["S2A"],
  Physics: ["S2B"],
  English: ["S1A", "S1B"],
  Geography: ["S1A", "S3A"],
};

// Restrict the shared student list to the classes taught by the active subject.
export function getSubjectStudents(subjectName: string | null, students: Student[]) {
  if (!subjectName) return [];
  const classes = SUBJECT_CLASS_MAP[subjectName] ?? [];
  if (classes.length === 0) return students;
  return students.filter((student) => classes.includes(student.class));
}

// Build the class filter options from the currently visible student set.
export function getStudentClasses(students: Student[]) {
  return ["all", ...Array.from(new Set(students.map((student) => student.class)))];
}

export function getFilteredStudents(students: Student[], selectedClass: string) {
  if (selectedClass === "all") return students;
  return students.filter((student) => student.class === selectedClass);
}

export function getTotalPages(totalItems: number, itemsPerPage: number) {
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
}

export function getStudentPage(students: Student[], currentPage: number, itemsPerPage: number) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return {
    startIndex,
    items: students.slice(startIndex, startIndex + itemsPerPage),
  };
}
