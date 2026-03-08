// Manages quiz workspace state, restore routing, and page actions.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteQuiz, duplicateQuiz, loadQuizzes2, publishQuiz, seedClasses2, seedSubjects2, type TeacherClass2, type TeacherQuiz, type TeacherSubject2 } from "@/dashboard/teacher/components/quiz";
import type { QuizSort, QuizStatusFilter } from "@/dashboard/teacher/components/quiz/TeacherQuizControls";
import { filterQuizzes, getPagedQuizzes, getQuizStats, sortQuizzes } from "./quizViewHelpers";

type QuizRestoreState = { restoreSubjectId?: string; resetToHome?: boolean };

export function useQuizWorkspaceState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [classes] = useState<TeacherClass2[]>(() => seedClasses2);
  const [quizzes, setQuizzes] = useState<TeacherQuiz[]>(() => loadQuizzes2());
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [search, setSearch] = useState(""); const [statusFilter, setStatusFilter] = useState<QuizStatusFilter>("all"); const [sort, setSort] = useState<QuizSort>("all"); const [page, setPage] = useState(1); const [previewId, setPreviewId] = useState<string | null>(null);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [subjects, selectedSubjectId]);
  const selectedSubjectName = selectedSubject?.name ?? null;
  const previewQuiz = useMemo(() => quizzes.find((quiz) => quiz.id === previewId) ?? null, [quizzes, previewId]);
  const canCreate = classes.length > 0;
  const resetFilters = () => { setSearch(""); setStatusFilter("all"); setSort("all"); setPage(1); setPreviewId(null); };
  const refreshQuizzes = () => setQuizzes(loadQuizzes2());
  const resetToHomeState = () => { setSelectedSubjectId(null); resetFilters(); };

  useEffect(() => {
    const state = location.state as QuizRestoreState | null;
    if (state?.resetToHome) { resetToHomeState(); navigate(".", { replace: true, state: null }); return; }
    if (!state?.restoreSubjectId) return;
    setSelectedSubjectId(subjects.some((subject) => subject.id === state.restoreSubjectId) ? state.restoreSubjectId : null);
    setPreviewId(null); refreshQuizzes(); navigate(".", { replace: true, state: null });
  }, [location.state, navigate, subjects]);

  useEffect(() => { if (previousSubjectId.current !== selectedSubjectId) { resetFilters(); previousSubjectId.current = selectedSubjectId; } }, [selectedSubjectId]);
  const subjectQuizzes = selectedSubjectName ? quizzes.filter((quiz) => quiz.subject === selectedSubjectName) : [];
  const filteredQuizzes = selectedSubjectName ? filterQuizzes(subjectQuizzes, search, statusFilter) : [];
  const sortedQuizzes = selectedSubjectName ? sortQuizzes(filteredQuizzes, sort) : [];
  const { pagedQuizzes, totalPages } = getPagedQuizzes(sortedQuizzes, page);
  const stats = getQuizStats(filteredQuizzes);

  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  return {
    canCreate, page, pagedQuizzes, previewQuiz, search, selectedSubject, selectedSubjectId, sort, stats, statusFilter, subjects, totalPages,
    onBack: resetToHomeState,
    onCreate: () => { if (!selectedSubjectId || !selectedSubjectName) return; navigate("/dashboard/teacher/quiz/create", { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName } }); },
    onDelete: (id: string) => { deleteQuiz(id); if (previewId === id) setPreviewId(null); refreshQuizzes(); },
    onDuplicate: (id: string) => { duplicateQuiz(id); refreshQuizzes(); },
    onEdit: (id: string) => navigate(`/dashboard/teacher/quiz/${id}/edit`, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onPreview: (id: string) => setPreviewId(id),
    onPublish: (id: string) => { publishQuiz(id); refreshQuizzes(); },
    setPage,
    setPreviewId,
    setSearch: (value: string) => { setSearch(value); setPage(1); },
    setSelectedSubjectId,
    setSort: (value: QuizSort) => { setSort(value); setPage(1); },
    setStatusFilter: (value: QuizStatusFilter) => { setStatusFilter(value); setPage(1); },
  };
}
