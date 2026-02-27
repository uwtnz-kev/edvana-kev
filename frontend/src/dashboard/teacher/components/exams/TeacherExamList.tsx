import { useEffect, useMemo, useState } from "react";
import TeacherExamCard from "./TeacherExamCard";
import { FileText } from "lucide-react";
import { deleteTeacherExam } from "@/dashboard/teacher/components/exams/examsStore";

interface TeacherExam {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questionsCount: number;
  status: "upcoming" | "active" | "completed";
  dueDate: string;
  subject: string;
  submissions: number;
  totalStudents: number;
  avgScore?: number;
  color: string;
  bgGradient: string;
  createdAtISO?: string;
}

interface TeacherExamListProps {
  exams?: TeacherExam[];
  searchQuery?: string;
  filterValue?: string;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  currentPage?: number;
  itemsPerPage?: number;
}

const STORAGE_KEY = "teacher.exams.v1";

const defaultExams: TeacherExam[] = [
  {
    id: "1",
    title: "Advanced Mathematics Mid Term",
    description: "Create and manage exam for calculus and algebra topics.",
    timeLimit: 120,
    questionsCount: 50,
    status: "upcoming",
    dueDate: "Feb 15, 2025",
    subject: "Mathematics",
    submissions: 0,
    totalStudents: 32,
    avgScore: undefined,
    color: "text-[#1EA896]",
    bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80",
  },
  {
    id: "2",
    title: "Physics Laboratory Practical",
    description: "Practical exam with lab data analysis and writeup submission.",
    timeLimit: 90,
    questionsCount: 25,
    status: "active",
    dueDate: "Feb 12, 2025",
    subject: "Physics",
    submissions: 18,
    totalStudents: 28,
    avgScore: undefined,
    color: "text-[#FF715B]",
    bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80",
  },
  {
    id: "3",
    title: "Biology Cell Structure Quiz",
    description: "Short quiz. Track submissions and average score.",
    timeLimit: 60,
    questionsCount: 30,
    status: "completed",
    dueDate: "Feb 8, 2025",
    subject: "Biology",
    submissions: 24,
    totalStudents: 24,
    avgScore: 87,
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

function loadExams(): TeacherExam[] {
  const stored = safeParse<TeacherExam[]>(localStorage.getItem(STORAGE_KEY), []);
  if (stored.length) return stored;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultExams));
  return defaultExams;
}

function toTime(v: string | undefined) {
  if (!v) return 0;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? 0 : t;
}

export function TeacherExamList({
  exams,
  searchQuery = "",
  filterValue = "all",
  sortField = "date",
  sortDirection = "desc",
  currentPage = 1,
  itemsPerPage = 6,
}: TeacherExamListProps) {
  const [storedExams, setStoredExams] = useState<TeacherExam[]>(() => loadExams());

  useEffect(() => {
    const onChange = () => setStoredExams(loadExams());
    window.addEventListener("teacher-exams-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("teacher-exams-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const source = exams ?? storedExams;

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return source.filter((e) => {
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q);

      const matchesFilter =
        filterValue === "all" ||
        e.status === filterValue ||
        (filterValue === "past" && e.status === "completed");

      return matchesSearch && matchesFilter;
    });
  }, [source, searchQuery, filterValue]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aValue: string | number = 0;
      let bValue: string | number = 0;

      switch (sortField) {
        case "date": {
          const aCreated = toTime(a.createdAtISO);
          const bCreated = toTime(b.createdAtISO);
          if (aCreated || bCreated) {
            aValue = aCreated;
            bValue = bCreated;
          } else {
            aValue = toTime(a.dueDate);
            bValue = toTime(b.dueDate);
          }
          break;
        }
        case "subject":
          aValue = a.subject;
          bValue = b.subject;
          break;
        case "status": {
          const order: Record<TeacherExam["status"], number> = { active: 3, upcoming: 2, completed: 1 };
          aValue = order[a.status];
          bValue = order[b.status];
          break;
        }
        case "score":
          aValue = a.avgScore || 0;
          bValue = b.avgScore || 0;
          break;
        default: {
          const aCreated = toTime(a.createdAtISO);
          const bCreated = toTime(b.createdAtISO);
          aValue = aCreated || toTime(a.dueDate);
          bValue = bCreated || toTime(b.dueDate);
        }
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [filtered, sortField, sortDirection]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = sorted.slice(startIndex, startIndex + itemsPerPage);

  if (pageItems.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
        <FileText className="h-12 w-12 text-white/40 mx-auto mb-4" />
        <h3 className="text-white text-lg font-medium mb-2">No exams found</h3>
        <p className="text-white/60">
          {searchQuery || filterValue !== "all"
            ? "No exams match your current search or filter criteria."
            : "You have not created any exams yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {pageItems.map((exam) => (
        <TeacherExamCard
          key={exam.id}
          {...exam}
          onDelete={(id: string) => deleteTeacherExam(id)}
        />
      ))}
    </div>
  );
}