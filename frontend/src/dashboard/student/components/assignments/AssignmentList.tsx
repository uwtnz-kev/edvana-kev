import { AssignmentCard } from "./AssignmentCard";
import { DataControls, PaginationControls } from "../shared";
import { FileText } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import type { SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";

interface Assignment {
  id: number;
  title: string;
  courseName: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue" | "draft";
  description: string;
  points: number;
  submittedDate?: string;
  grade?: number;
  type: "essay" | "quiz" | "project" | "homework";
  accessCode?: string;
  totalAttempts?: number;
  attemptCount?: number;
  submissionMethods?: SubmissionMethod[];
  classId?: string;
  classLabel?: string;
  teacherAssignmentId?: string;
}

interface AssignmentListProps {
  filter?: "all" | "pending" | "completed" | "overdue" | "draft";
}

const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: "Mathematical Reasoning Essay",
    courseName: "Advanced Mathematics",
    dueDate: "2025-02-05",
    status: "pending",
    description: "Write a 1500-word essay analyzing the application of mathematical reasoning in real-world problem solving, focusing on algebraic thinking.",
    points: 100,
    type: "essay",
    totalAttempts: 3,
    attemptCount: 1,
    submissionMethods: ["text_entry"],
    classId: "math-a",
    classLabel: "Math A",
    teacherAssignmentId: "a2-001"
  },
  {
    id: 2,
    title: "French Grammar Quiz",
    courseName: "French Language",
    dueDate: "2025-01-30",
    status: "completed",
    description: "Complete the online quiz covering past tense conjugations, subjunctive mood, and advanced grammar structures.",
    points: 50,
    submittedDate: "2025-01-28",
    grade: 47,
    type: "quiz",
    submissionMethods: ["quiz_form"],
    classId: "fr-2",
    classLabel: "French 2"
  },
  {
    id: 3,
    title: "Rwanda History Research Project",
    courseName: "History & Geography",
    dueDate: "2025-02-15",
    status: "draft",
    description: "Research and present a comprehensive project on Rwanda's independence movement and its impact on modern society.",
    points: 200,
    type: "project",
    accessCode: "HIST-2025",
    submissionMethods: ["link_submission"],
    classId: "hist-b",
    classLabel: "History B"
  },
  {
    id: 4,
    title: "Cell Biology Lab Report",
    courseName: "Biology",
    dueDate: "2025-01-25",
    status: "overdue",
    description: "Submit detailed observations and analysis from the cell division microscopy lab session conducted last week.",
    points: 75,
    type: "homework",
    submissionMethods: ["file_upload"],
    classId: "bio-1",
    classLabel: "Biology 1",
    teacherAssignmentId: "assignment-5"
  },
  {
    id: 5,
    title: "Physics Problem Set #3",
    courseName: "Physics",
    dueDate: "2025-02-08",
    status: "pending",
    description: "Solve problems related to thermodynamics, heat transfer, and energy conservation principles.",
    points: 80,
    type: "homework",
    totalAttempts: 2,
    attemptCount: 0,
    submissionMethods: ["text_entry", "file_upload"],
    classId: "phy-1",
    classLabel: "Physics 1",
    teacherAssignmentId: "a2-004"
  },
  {
    id: 6,
    title: "Literature Analysis Essay",
    courseName: "English Literature",
    dueDate: "2025-01-20",
    status: "completed",
    description: "Analyze the themes of identity and belonging in contemporary African literature.",
    points: 120,
    submittedDate: "2025-01-18",
    grade: 108,
    type: "essay",
    totalAttempts: 1,
    attemptCount: 1,
    submissionMethods: ["text_entry"],
    classId: "eng-3",
    classLabel: "English 3"
  },
  {
    id: 7,
    title: "Chemical Bonds Worksheet",
    courseName: "Chemistry",
    dueDate: "2025-02-12",
    status: "pending",
    description: "Complete practice problems on ionic, covalent, and metallic bonding structures.",
    points: 60,
    type: "homework",
    accessCode: "CHEM-LOCK",
    submissionMethods: ["text_entry"],
    classId: "chem-1",
    classLabel: "Chemistry 1",
    teacherAssignmentId: "a2-003"
  },
  {
    id: 8,
    title: "Shakespearean Sonnet Analysis",
    courseName: "English Literature",
    dueDate: "2025-02-20",
    status: "draft",
    description: "Analyze the structure, themes, and literary devices in three Shakespearean sonnets.",
    points: 90,
    type: "essay",
    submissionMethods: ["text_entry"],
    classId: "eng-3",
    classLabel: "English 3"
  },
  {
    id: 9,
    title: "Calculus Integration Quiz",
    courseName: "Advanced Mathematics",
    dueDate: "2025-02-03",
    status: "pending",
    description: "Timed quiz covering integration techniques including substitution and integration by parts.",
    points: 75,
    type: "quiz",
    totalAttempts: 2,
    attemptCount: 2,
    submissionMethods: ["quiz_form"],
    classId: "math-a",
    classLabel: "Math A",
    teacherAssignmentId: "a2-001"
  },
  {
    id: 10,
    title: "Ecosystem Food Web Project",
    courseName: "Biology",
    dueDate: "2025-02-25",
    status: "draft",
    description: "Create a detailed food web diagram for a local ecosystem and analyze energy flow.",
    points: 150,
    type: "project",
    submissionMethods: ["link_submission"],
    classId: "bio-1",
    classLabel: "Biology 1",
    teacherAssignmentId: "assignment-5"
  },
  {
    id: 11,
    title: "French Conversation Recording",
    courseName: "French Language",
    dueDate: "2025-02-10",
    status: "pending",
    description: "Record a 5-minute conversation in French about daily activities and future plans.",
    points: 40,
    type: "homework",
    submissionMethods: ["file_upload"],
    classId: "fr-2",
    classLabel: "French 2"
  },
  {
    id: 12,
    title: "Rwandan Geography Map Quiz",
    courseName: "History & Geography",
    dueDate: "2025-01-28",
    status: "completed",
    description: "Online quiz identifying provinces, major cities, and geographical features of Rwanda.",
    points: 30,
    submittedDate: "2025-01-26",
    grade: 28,
    type: "quiz",
    submissionMethods: ["quiz_form"],
    classId: "hist-b",
    classLabel: "History B"
  }
];

export function AssignmentList({ filter = "all" }: AssignmentListProps) {
  const [searchValue, setSearchValue] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [dueDateFilter, setDueDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState(filter);
  const [sortField, setSortField] = useState<string>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    setStatusFilter(filter);
  }, [filter]);

  const courseOptions = useMemo(() => {
    const courses = [...new Set(mockAssignments.map((a) => a.courseName))];
    return [
      { value: "all", label: "All Courses" },
      ...courses.map((course) => ({ value: course, label: course }))
    ];
  }, []);

  const processedAssignments = useMemo(() => {
    let filtered = mockAssignments.filter((assignment) => {
      if (searchValue) {
        const searchLower = searchValue.toLowerCase();
        const matchesSearch =
          assignment.title.toLowerCase().includes(searchLower) ||
          assignment.description.toLowerCase().includes(searchLower) ||
          assignment.courseName.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (courseFilter !== "all" && assignment.courseName !== courseFilter) {
        return false;
      }

      if (statusFilter !== "all") {
        if (statusFilter === "overdue") {
          const isOverdue = assignment.status === "pending" && new Date(assignment.dueDate) < new Date();
          if (!isOverdue) return false;
        } else if (assignment.status !== statusFilter) {
          return false;
        }
      }

      if (dueDateFilter !== "all") {
        const today = new Date();
        const dueDate = new Date(assignment.dueDate);
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (dueDateFilter) {
          case "overdue":
            if (diffDays >= 0) return false;
            break;
          case "today":
            if (diffDays !== 0) return false;
            break;
          case "week":
            if (diffDays < 0 || diffDays > 7) return false;
            break;
          case "month":
            if (diffDays < 0 || diffDays > 30) return false;
            break;
        }
      }

      return true;
    });

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "courseName":
          aValue = a.courseName.toLowerCase();
          bValue = b.courseName.toLowerCase();
          break;
        case "dueDate":
          aValue = new Date(a.dueDate).getTime();
          bValue = new Date(b.dueDate).getTime();
          break;
        case "points":
          aValue = a.points;
          bValue = b.points;
          break;
        default:
          aValue = new Date(a.dueDate).getTime();
          bValue = new Date(b.dueDate).getTime();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    return filtered;
  }, [searchValue, courseFilter, dueDateFilter, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(processedAssignments.length / itemsPerPage);
  const paginatedAssignments = processedAssignments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, courseFilter, dueDateFilter, statusFilter]);

  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (processedAssignments.length === 0) {
    return (
      <div className="space-y-6">
        <DataControls
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search assignments..."
          filters={[
            {
              key: "course",
              label: "Course",
              value: courseFilter,
              options: courseOptions,
              onChange: setCourseFilter
            },
            {
              key: "dueDate",
              label: "Due Date",
              value: dueDateFilter,
              options: [
                { value: "all", label: "All Due Dates" },
                { value: "overdue", label: "Overdue" },
                { value: "today", label: "Due Today" },
                { value: "week", label: "Due This Week" },
                { value: "month", label: "Due This Month" }
              ],
              onChange: setDueDateFilter
            },
            {
              key: "status",
              label: "Status",
              value: statusFilter,
              options: [
                { value: "all", label: "All Statuses" },
                { value: "pending", label: "Pending" },
                { value: "completed", label: "Completed" },
                { value: "overdue", label: "Overdue" },
                { value: "draft", label: "Draft" }
              ],
              onChange: setStatusFilter
            }
          ]}
          sortOptions={[
            { value: "title", label: "Title" },
            { value: "dueDate", label: "Due Date" },
            { value: "courseName", label: "Course" },
            { value: "points", label: "Points" }
          ]}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#4C5454]/20 to-[#523F38]/10 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-white/60" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No assignments found</h3>
          <p className="text-white/60">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DataControls
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search assignments..."
        filters={[
          {
            key: "course",
            label: "Course",
            value: courseFilter,
            options: courseOptions,
            onChange: setCourseFilter
          },
          {
            key: "dueDate",
            label: "Due Date",
            value: dueDateFilter,
            options: [
              { value: "all", label: "All Due Dates" },
              { value: "overdue", label: "Overdue" },
              { value: "today", label: "Due Today" },
              { value: "week", label: "Due This Week" },
              { value: "month", label: "Due This Month" }
            ],
            onChange: setDueDateFilter
          },
          {
            key: "status",
            label: "Status",
            value: statusFilter,
            options: [
              { value: "all", label: "All Statuses" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "overdue", label: "Overdue" },
              { value: "draft", label: "Draft" }
            ],
            onChange: setStatusFilter
          }
        ]}
        sortOptions={[
          { value: "title", label: "Title" },
          { value: "dueDate", label: "Due Date" },
          { value: "courseName", label: "Course" },
          { value: "points", label: "Points" }
        ]}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} {...assignment} />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={processedAssignments.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}


