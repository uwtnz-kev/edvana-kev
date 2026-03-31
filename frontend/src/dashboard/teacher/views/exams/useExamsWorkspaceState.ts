// Manages exams workspace state, restore routing, and page actions.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteExam, loadExams, publishExam, seedSubjects2, type TeacherExam, type TeacherSubject2 } from "@/dashboard/teacher/components/exams";
import type { ExamStatusFilter } from "@/dashboard/teacher/components/exams/TeacherExamsControls";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { filterExams, getExamsStats, getPagedExams, sortExams } from "./examsViewHelpers";

type ExamsRestoreState = { restoreSubjectId?: string; resetToHome?: boolean };

export function useExamsWorkspaceState(classId: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [exams, setExams] = useState<TeacherExam[]>(() => loadExams());
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ExamStatusFilter>("all");
  const [page, setPage] = useState(1);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const classExams = useMemo(() => exams.filter((exam) => exam.classId === classId), [classId, exams]);
  const scopedSubjects = useMemo(() => {
    const subjectNames = new Set(classExams.map((exam) => exam.subject));
    return subjects.filter((subject) => subjectNames.has(subject.name));
  }, [classExams, subjects]);
  const selectedSubject = useMemo(() => scopedSubjects.find((subject) => subject.id === selectedSubjectId) ?? null, [scopedSubjects, selectedSubjectId]);
  const selectedSubjectName = selectedSubject?.name ?? null;
  const canCreate = true;
  const resetFilters = () => { setSearch(""); setStatusFilter("all"); setPage(1); };
  const refreshExams = () => setExams(loadExams());
  const resetToHomeState = () => { setSelectedSubjectId(null); resetFilters(); };

  useEffect(() => {
    const state = location.state as ExamsRestoreState | null;
    if (state?.resetToHome) {
      resetToHomeState();
      navigate(
        {
          pathname: location.pathname,
          search: location.search,
        },
        { replace: true, state: null },
      );
      return;
    }
    if (!state?.restoreSubjectId) return;
    setSelectedSubjectId(subjects.some((subject) => subject.id === state.restoreSubjectId) ? state.restoreSubjectId : null);
    refreshExams();
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      { replace: true, state: null },
    );
  }, [location.pathname, location.search, location.state, navigate, subjects]);

  useEffect(() => {
    if (previousSubjectId.current !== selectedSubjectId) {
      resetFilters();
      previousSubjectId.current = selectedSubjectId;
    }
  }, [selectedSubjectId]);

  const subjectExams = selectedSubjectName ? classExams.filter((exam) => exam.subject === selectedSubjectName) : [];
  const filteredExams = selectedSubjectName ? filterExams(subjectExams, search, statusFilter) : [];
  const sortedExams = selectedSubjectName ? sortExams(filteredExams) : [];
  const { pagedExams, totalPages } = getPagedExams(sortedExams, page);
  const stats = getExamsStats(filteredExams);

  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  return {
    canCreate,
    page,
    pagedExams,
    search,
    selectedSubject,
    selectedSubjectId,
    stats,
    statusFilter,
    subjects: scopedSubjects,
    totalPages,
    onBack: resetToHomeState,
    onCreate: () => { if (!selectedSubjectId || !selectedSubjectName) return; navigate({ pathname: TEACHER_ROUTES.EXAMS_CREATE, search: location.search }, { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName } }); },
    onDelete: (id: string) => { deleteExam(id); refreshExams(); },
    onEdit: (id: string) => navigate({ pathname: `${TEACHER_ROUTES.EXAMS}/${id}/edit`, search: location.search }, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onPreview: (id: string) => navigate({ pathname: `${TEACHER_ROUTES.EXAMS}/${id}/preview`, search: location.search }, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onPublish: (id: string) => { publishExam(id); refreshExams(); },
    onRepublish: (id: string) => navigate({ pathname: `${TEACHER_ROUTES.EXAMS}/${id}/republish`, search: location.search }, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    setPage,
    setSearch: (value: string) => { setSearch(value); setPage(1); },
    setSelectedSubjectId,
    setStatusFilter: (value: ExamStatusFilter) => { setStatusFilter(value); setPage(1); },
  };
}
