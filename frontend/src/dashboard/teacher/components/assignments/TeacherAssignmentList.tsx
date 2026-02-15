import { TeacherAssignmentCard } from "./TeacherAssignmentCard";

type Filter = "all" | "active" | "grading" | "draft";

interface TeacherAssignment {
  id: number;
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
  assignments?: TeacherAssignment[];
}

const defaultAssignments: TeacherAssignment[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

export function TeacherAssignmentList({
  filter,
  assignments = defaultAssignments,
}: TeacherAssignmentListProps) {
  const filtered =
    filter === "all" ? assignments : assignments.filter((a) => a.status === filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filtered.map((a) => (
        <TeacherAssignmentCard
          key={a.id}
          title={a.title}
          classNameLabel={a.classNameLabel}
          dueDate={a.dueDate}
          submissions={a.submissions}
          totalStudents={a.totalStudents}
          status={a.status}
          color={a.color}
          bgGradient={a.bgGradient}
        />
      ))}
    </div>
  );
}
