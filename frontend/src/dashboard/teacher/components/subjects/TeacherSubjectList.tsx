import React from "react";
import { TeacherSubjectCard } from "./TeacherSubjectCard";
import type { TeacherSubjectNavData } from "./TeacherSubjectCard";

type TeacherSubject = TeacherSubjectNavData & {
  id: number;
  category: "science" | "arts" | "languages";
};

type TeacherSubjectListProps = {
  subjects?: TeacherSubject[];
  searchQuery?: string;
  filterValue?: string;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  currentPage?: number;
  itemsPerPage?: number;
};

const defaultSubjects: TeacherSubject[] = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Plan lessons, publish quizzes, and grade assignments for Senior classes.",
    classesCount: 3,
    studentsCount: 96,
    pendingToGrade: 12,
    nextLesson: "Quadratic functions",
    color: "text-[#1EA896]",
    bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80",
    category: "science",
  },
  {
    id: 2,
    title: "Physics Laboratory",
    description: "Manage lab activities and evaluate lab reports with rubrics.",
    classesCount: 2,
    studentsCount: 52,
    pendingToGrade: 6,
    nextLesson: "Optics experiment",
    color: "text-[#FF715B]",
    bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80",
    category: "science",
  },
  {
    id: 3,
    title: "Kinyarwanda Literature",
    description: "Assign reading tasks and monitor comprehension checkpoints.",
    classesCount: 2,
    studentsCount: 48,
    pendingToGrade: 3,
    nextLesson: "Poetry analysis",
    color: "text-[#4C5454]",
    bgGradient: "bg-gradient-to-br from-[#4C5454] to-[#523F38]",
    category: "languages",
  },
  {
    id: 4,
    title: "History & Geography",
    description: "Prepare lessons and create short assessments per unit.",
    classesCount: 1,
    studentsCount: 32,
    pendingToGrade: 2,
    nextLesson: "Rwanda pre colonial history",
    color: "text-[#523F38]",
    bgGradient: "bg-gradient-to-br from-[#523F38] to-[#4C5454]",
    category: "arts",
  },
  {
    id: 5,
    title: "Chemistry Fundamentals",
    description: "Set practice questions and track student progress per topic.",
    classesCount: 2,
    studentsCount: 64,
    pendingToGrade: 8,
    nextLesson: "Stoichiometry",
    color: "text-[#1EA896]",
    bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80",
    category: "science",
  },
  {
    id: 6,
    title: "English Language",
    description: "Assign essays and manage marking workload.",
    classesCount: 2,
    studentsCount: 58,
    pendingToGrade: 9,
    nextLesson: "Argumentative writing",
    color: "text-[#FF715B]",
    bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80",
    category: "languages",
  },
];

export function TeacherSubjectList({
  subjects = defaultSubjects,
  searchQuery = "",
  filterValue = "all",
  sortField = "title",
  sortDirection = "asc",
  currentPage = 1,
  itemsPerPage = 6,
}: TeacherSubjectListProps) {
  const filtered = subjects.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.title.toLowerCase().includes(q) || s.nextLesson.toLowerCase().includes(q);
    const matchesFilter = filterValue === "all" || s.category === filterValue;
    return matchesSearch && matchesFilter;
  });

  const sorted = [...filtered].sort((a, b) => {
    let aValue: string | number = "";
    let bValue: string | number = "";

    switch (sortField) {
      case "title":
        aValue = a.title;
        bValue = b.title;
        break;
      case "classes":
        aValue = a.classesCount;
        bValue = b.classesCount;
        break;
      case "pending":
        aValue = a.pendingToGrade;
        bValue = b.pendingToGrade;
        break;
      default:
        aValue = a.title;
        bValue = b.title;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = sorted.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {pageItems.map((s) => (
        <TeacherSubjectCard key={s.id} subject={s} />
      ))}
    </div>
  );
}