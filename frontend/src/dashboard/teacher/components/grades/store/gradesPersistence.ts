/** Reads and writes persisted grades store state through shared storage helpers. */
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { createInitialGradesState } from "./gradesSeedData";
import type { GradesState } from "./gradesState";

const GRADES_STORAGE_KEY = "teacher.grades.v2";

function hasValidSubmissions(value: unknown): value is GradesState["submissions"] {
  return Array.isArray(value) && value.every((submission) => typeof submission?.itemId === "string");
}

export function readGradesState(): GradesState {
  const storage = getBrowserStorage();
  if (!storage) return createInitialGradesState();
  const raw = storage.getItem(GRADES_STORAGE_KEY);
  if (!raw) {
    const initial = createInitialGradesState();
    writeStoredJson(GRADES_STORAGE_KEY, initial);
    return initial;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<GradesState>;
    const initial = createInitialGradesState();
    return {
      gradeItems: Array.isArray(parsed.gradeItems) ? parsed.gradeItems : initial.gradeItems,
      publishedItems: Array.isArray(parsed.publishedItems) ? parsed.publishedItems : initial.publishedItems,
      studentGrades: Array.isArray(parsed.studentGrades) ? parsed.studentGrades : [],
      gradeLists: Array.isArray(parsed.gradeLists) ? parsed.gradeLists : [],
      submissions: hasValidSubmissions(parsed.submissions) ? parsed.submissions : initial.submissions,
      selectedGradeListId: typeof parsed.selectedGradeListId === "string" ? parsed.selectedGradeListId : null,
    };
  } catch {
    // Malformed persisted data falls back to the seeded baseline.
    return createInitialGradesState();
  }
}

export function writeGradesState(state: GradesState) {
  writeStoredJson(GRADES_STORAGE_KEY, state);
}
