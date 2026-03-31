// Manages quiz workspace state, restore routing, and page actions.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteQuiz, loadQuizzes2, publishQuiz, seedSubjects2, type TeacherQuiz, type TeacherSubject2 } from "@/dashboard/teacher/components/quiz";
import type { QuizStatusFilter } from "@/dashboard/teacher/components/quiz/TeacherQuizControls";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { filterQuizzes, getPagedQuizzes, getQuizStats, sortQuizzes } from "./quizViewHelpers";

type QuizRestoreState = { restoreSubjectId?: string; resetToHome?: boolean };

export function useQuizWorkspaceState(classId: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [quizzes, setQuizzes] = useState<TeacherQuiz[]>(() => loadQuizzes2());
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuizStatusFilter>("all");
  const [page, setPage] = useState(1);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const classQuizzes = useMemo(() => quizzes.filter((quiz) => quiz.classId === classId), [classId, quizzes]);
  const scopedSubjects = useMemo(() => {
    const subjectNames = new Set(classQuizzes.map((quiz) => quiz.subject));
    return subjects.filter((subject) => subjectNames.has(subject.name));
  }, [classQuizzes, subjects]);
  const selectedSubject = useMemo(() => scopedSubjects.find((subject) => subject.id === selectedSubjectId) ?? null, [scopedSubjects, selectedSubjectId]);
  const selectedSubjectName = selectedSubject?.name ?? null;
  const canCreate = true;
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPage(1);
  };
  const refreshQuizzes = () => setQuizzes(loadQuizzes2());
  const resetToHomeState = () => {
    setSelectedSubjectId(null);
    resetFilters();
  };

  useEffect(() => {
    const state = location.state as QuizRestoreState | null;
    if (state?.resetToHome) {
      resetToHomeState();
      navigate({ pathname: location.pathname, search: location.search }, { replace: true, state: null });
      return;
    }
    if (!state?.restoreSubjectId) return;
    setSelectedSubjectId(subjects.some((subject) => subject.id === state.restoreSubjectId) ? state.restoreSubjectId : null);
    refreshQuizzes();
    navigate({ pathname: location.pathname, search: location.search }, { replace: true, state: null });
  }, [location.pathname, location.search, location.state, navigate, subjects]);

  useEffect(() => {
    if (previousSubjectId.current !== selectedSubjectId) {
      resetFilters();
      previousSubjectId.current = selectedSubjectId;
    }
  }, [selectedSubjectId]);

  const subjectQuizzes = selectedSubjectName ? classQuizzes.filter((quiz) => quiz.subject === selectedSubjectName) : [];
  const filteredQuizzes = selectedSubjectName ? filterQuizzes(subjectQuizzes, search, statusFilter) : [];
  const sortedQuizzes = selectedSubjectName ? sortQuizzes(filteredQuizzes) : [];
  const { pagedQuizzes, totalPages } = getPagedQuizzes(sortedQuizzes, page);
  const stats = getQuizStats(filteredQuizzes);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return {
    canCreate,
    page,
    pagedQuizzes,
    search,
    selectedSubject,
    selectedSubjectId,
    stats,
    statusFilter,
    subjects: scopedSubjects,
    totalPages,
    onBack: resetToHomeState,
    onCreate: () => {
      if (!selectedSubjectId || !selectedSubjectName) return;
      navigate({ pathname: TEACHER_ROUTES.QUIZZES_CREATE, search: location.search }, { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName } });
    },
    onDelete: (id: string) => {
      deleteQuiz(id);
      refreshQuizzes();
    },
    onEdit: (id: string) => navigate({ pathname: `${TEACHER_ROUTES.QUIZZES}/${id}/edit`, search: location.search }, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onPreview: (id: string) => navigate({ pathname: `${TEACHER_ROUTES.QUIZZES}/${id}/preview`, search: location.search }, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onPublish: (id: string) => {
      publishQuiz(id);
      refreshQuizzes();
    },
    onRepublish: (id: string) => navigate({ pathname: `${TEACHER_ROUTES.QUIZZES}/${id}/republish`, search: location.search }, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    setPage,
    setSearch: (value: string) => {
      setSearch(value);
      setPage(1);
    },
    setSelectedSubjectId,
    setStatusFilter: (value: QuizStatusFilter) => {
      setStatusFilter(value);
      setPage(1);
    },
  };
}
