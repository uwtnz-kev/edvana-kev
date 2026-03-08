// State hook for the teacher students workspace and restore-route behavior.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStudents, type Student } from "../../components/students";
import { seedSubjects2, type TeacherSubject2 } from "@/dashboard/teacher/components/assignments";
import {
  DEFAULT_STUDENT_FILTERS,
  getFilteredStudents,
  getStudentClasses,
  getStudentPage,
  getSubjectStudents,
  getTotalPages,
  type StudentsRestoreState,
} from "./studentsViewHelpers";

const ITEMS_PER_PAGE = 25;

export function useStudentsViewState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, filters, setFilters } = useStudents();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("all");
  const selectedSubject = useMemo(() => {
    return subjects.find((subject) => subject.id === selectedSubjectId) ?? null;
  }, [subjects, selectedSubjectId]);

  const resetWorkspaceState = () => {
    setFilters(DEFAULT_STUDENT_FILTERS);
    setCurrentPage(1);
    setSelectedStudent(null);
    setDetailsOpen(false);
    setSelectedClass("all");
  };

  useEffect(() => {
    const state = location.state as StudentsRestoreState | null;
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      resetWorkspaceState();
      return void navigate(".", { replace: true, state: null });
    }
    if (!state?.restoreSubjectId) return;
    const subjectExists = subjects.some((subject) => subject.id === state.restoreSubjectId);
    setSelectedSubjectId(subjectExists ? state.restoreSubjectId : null);
    setSelectedStudent(null);
    setDetailsOpen(false);
    setCurrentPage(1);
    navigate(".", { replace: true, state: null });
  }, [location.state, navigate, subjects]);

  const subjectStudents = useMemo(
    () => getSubjectStudents(selectedSubject?.name ?? null, students),
    [selectedSubject?.name, students]
  );
  const classes = useMemo(() => getStudentClasses(subjectStudents), [subjectStudents]);
  const filteredStudents = useMemo(() => {
    return getFilteredStudents(subjectStudents, selectedClass);
  }, [selectedClass, subjectStudents]);
  const totalPages = getTotalPages(filteredStudents.length, ITEMS_PER_PAGE);
  const page = getStudentPage(filteredStudents, currentPage, ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  return {
    classes,
    currentPage,
    detailsOpen,
    filters,
    filteredStudents,
    paginatedStudents: page.items,
    selectedClass,
    selectedStudent,
    selectedSubject,
    selectedSubjectId,
    setCurrentPage,
    setDetailsOpen,
    setFilters,
    setSelectedClass,
    setSelectedSubjectId,
    startIndex: page.startIndex,
    subjects,
    totalPages,
    // Clear the selected student when the details modal closes.
    closeDetails: () => void (setDetailsOpen(false), setSelectedStudent(null)),
    handleBack: () => void (setSelectedSubjectId(null), resetWorkspaceState()),
    handleView: (student: Student) => void (setSelectedStudent(student), setDetailsOpen(true)),
  };
}
