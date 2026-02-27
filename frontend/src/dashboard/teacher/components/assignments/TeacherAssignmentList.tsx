import { useEffect, useMemo, useState } from "react";
import { TeacherAssignmentCard } from "./TeacherAssignmentCard";

type Filter = "all" | "active" | "grading" | "draft";

export interface TeacherAssignment {
  id: string;
  title: string;
  classNameLabel: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: "draft" | "active" | "grading";
  color: string;
  bgGradient: string;
}

interface TeacherAssignmentListProps {
  filter: Filter;
  query?: string;
  classFilter?: string;
}

const STORAGE_KEY = "teacher.assignments.v1";

const defaultAssignments: TeacherAssignment[] = [
  {
    id: "1",
    title: "Algebra Homework 2",
    classNameLabel: "S3A • Mathematics",
    dueDate: "2025-02-20",
    submissions: 18,
    totalStudents: 32,
    status: "active",
    color: "text-[#1EA896]",
    bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80",
  },
  {
    id: "2",
    title: "Physics Lab Report",
    classNameLabel: "S4B • Physics",
    dueDate: "2025-02-16",
    submissions: 24,
    totalStudents: 28,
    status: "grading",
    color: "text-[#FF715B]",
    bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80",
  },
  {
    id: "3",
    title: "Essay Draft",
    classNameLabel: "S2A • English",
    dueDate: "2025-02-25",
    submissions: 0,
    totalStudents: 30,
    status: "draft",
    color: "text-[#4C5454]",
    bgGradient: "bg-gradient-to-br from-[#4C5454] to-[#523F38]",
  },
];

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function loadAssignments(): TeacherAssignment[] {
  const stored = safeParse<TeacherAssignment[]>(localStorage.getItem(STORAGE_KEY), []);
  if (stored.length) return stored;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAssignments));
  return defaultAssignments;
}

function saveAssignments(items: TeacherAssignment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("teacher-assignments-changed"));
}

function normalizeText(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function TeacherAssignmentList({
  filter,
  query = "",
  classFilter = "all",
}: TeacherAssignmentListProps) {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(() => loadAssignments());

  useEffect(() => {
    const onChange = () => setAssignments(loadAssignments());
    window.addEventListener("teacher-assignments-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("teacher-assignments-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    const cls = normalizeText(classFilter);

    return assignments.filter((a) => {
      const matchesStatus = filter === "all" || a.status === filter;

      const haystack = normalizeText(`${a.title} ${a.classNameLabel}`);
      const matchesQuery = q === "" || haystack.includes(q);

      const matchesClass =
        cls === "" || cls === "all" || normalizeText(a.classNameLabel).includes(cls);

      return matchesStatus && matchesQuery && matchesClass;
    });
  }, [assignments, filter, query, classFilter]);

  const handleDelete = (id: string) => {
    const next = assignments.filter((a) => a.id !== id);
    setAssignments(next);
    saveAssignments(next);
  };

  return (
    <div className="space-y-3">
      <div className="text-white/60 text-sm">
        Showing {filtered.length} of {assignments.length}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-white/80 font-semibold">No matches</div>
          <div className="text-white/60 mt-2 text-sm">
            Try a different search term or change filters.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((a) => (
            <TeacherAssignmentCard
              key={a.id}
              id={a.id}
              title={a.title}
              classNameLabel={a.classNameLabel}
              dueDate={a.dueDate}
              submissions={a.submissions}
              totalStudents={a.totalStudents}
              status={a.status}
              color={a.color}
              bgGradient={a.bgGradient}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}