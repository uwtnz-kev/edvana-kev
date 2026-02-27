export type AssignmentStatus = "active" | "grading" | "draft";

export type TeacherAssignment = {
  id: string;
  title: string;
  description: string;
  questions: string;
  dueDateISO: string | null;
  createdAtISO: string;
  status: AssignmentStatus;
};

const STORAGE_KEY = "teacher.assignments.v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function load(): TeacherAssignment[] {
  return safeParse<TeacherAssignment[]>(localStorage.getItem(STORAGE_KEY), []);
}

function save(items: TeacherAssignment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

let cache: TeacherAssignment[] | null = null;

function getCache(): TeacherAssignment[] {
  if (!cache) cache = load();
  return cache;
}

function emit() {
  window.dispatchEvent(new Event("teacher-assignments-changed"));
}

export function getTeacherAssignments(): TeacherAssignment[] {
  return [...getCache()].sort((a, b) => (a.createdAtISO < b.createdAtISO ? 1 : -1));
}

export function createTeacherAssignment(input: Omit<TeacherAssignment, "id" | "createdAtISO">) {
  const next: TeacherAssignment = {
    ...input,
    id: crypto.randomUUID(),
    createdAtISO: new Date().toISOString(),
  };

  const items = [next, ...getCache()];
  cache = items;
  save(items);
  emit();

  return next;
}

export function subscribeTeacherAssignments(cb: () => void) {
  const handler = () => cb();
  window.addEventListener("teacher-assignments-changed", handler);
  return () => window.removeEventListener("teacher-assignments-changed", handler);
}