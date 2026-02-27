export type TeacherExamStatus = "upcoming" | "active" | "completed";

export type TeacherExam = {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questionsCount: number;
  status: TeacherExamStatus;
  dueDate: string; // ISO string
  subject: string;
  submissions: number;
  totalStudents: number;
  avgScore?: number;
  color: string;
  bgGradient: string;
  createdAtISO: string;
};

const STORAGE_KEY = "teacher.exams.v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function load(): TeacherExam[] {
  return safeParse<TeacherExam[]>(localStorage.getItem(STORAGE_KEY), []);
}

function save(items: TeacherExam[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function emit() {
  window.dispatchEvent(new Event("teacher-exams-changed"));
}

export function getTeacherExams(): TeacherExam[] {
  return [...load()].sort((a, b) => (a.createdAtISO < b.createdAtISO ? 1 : -1));
}

export function createTeacherExam(input: Omit<TeacherExam, "id" | "createdAtISO">) {
  const next: TeacherExam = {
    ...input,
    id: crypto.randomUUID(),
    createdAtISO: new Date().toISOString(),
  };

  const items = [next, ...load()];
  save(items);
  emit();
  return next;
}

export function deleteTeacherExam(id: string) {
  const items = load().filter((e) => e.id !== id);
  save(items);
  emit();
}

export function subscribeTeacherExams(cb: () => void) {
  const handler = () => cb();
  window.addEventListener("teacher-exams-changed", handler);
  return () => window.removeEventListener("teacher-exams-changed", handler);
}
// src/dashboard/teacher/components/exams/examsStore.ts

export function getTeacherExamById(id: string): TeacherExam | null {
  const items = load();
  return items.find(e => e.id === id) ?? null;
}