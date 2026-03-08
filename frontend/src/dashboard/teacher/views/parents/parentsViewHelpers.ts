// Helpers for subject-scoped parent filtering and restore-route state.
import type { TeacherParentRow } from "@/utils/data/teacher/getTeacherParents";

export type ParentsRestoreState = {
  restoreSubjectId?: string;
  resetToHome?: boolean;
};

const SUBJECT_CLASS_MAP: Record<string, string[]> = {
  Mathematics: ["S3A", "S3B"],
  Biology: ["S2A", "S2B"],
  Chemistry: ["S2A"],
  Physics: ["S2B"],
  English: ["S1A", "S1B", "S1C"],
  Geography: ["S1A", "S3A"],
};

// Restrict parent rows to students taught in the active subject.
export function getSubjectParentRows(subjectName: string | null, rows: TeacherParentRow[]) {
  if (!subjectName) return [];
  const classes = SUBJECT_CLASS_MAP[subjectName] ?? [];
  if (classes.length === 0) return rows;
  return rows.filter((row) =>
    row.students.some((student) => (student.className ? classes.includes(student.className) : false))
  );
}

export function getParentClasses(rows: TeacherParentRow[]) {
  const classSet = new Set<string>();
  rows.forEach((parent) => {
    parent.students.forEach((student) => {
      if (student.className) classSet.add(student.className);
    });
  });
  return ["all", ...Array.from(classSet)];
}

// Search matches either parent details or linked student names.
export function getFilteredParentRows(rows: TeacherParentRow[], query: string, selectedClass: string) {
  const classFiltered = rows.filter((parent) =>
    selectedClass === "all" ? true : parent.students.some((student) => student.className === selectedClass)
  );
  const search = query.trim().toLowerCase();
  if (!search) return classFiltered;
  return classFiltered.filter((row) => {
    const studentMatch = row.students.some((student) => student.fullName.toLowerCase().includes(search));
    return (
      row.fullName.toLowerCase().includes(search) ||
      row.email.toLowerCase().includes(search) ||
      row.phone.toLowerCase().includes(search) ||
      studentMatch
    );
  });
}
