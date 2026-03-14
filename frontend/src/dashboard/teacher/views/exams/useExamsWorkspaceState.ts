// Manages exams workspace state, restore routing, and page actions.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteExam, duplicateExam, loadExams, publishExam, seedClasses2, seedSubjects2, type TeacherClass2, type TeacherExam, type TeacherSubject2 } from "@/dashboard/teacher/components/exams";
import type { ExamStatusFilter } from "@/dashboard/teacher/components/exams/TeacherExamsControls";
import { filterExams, getExamsStats, getPagedExams, sortExams } from "./examsViewHelpers";

type ExamsRestoreState = { restoreSubjectId?: string; resetToHome?: boolean };

export function useExamsWorkspaceState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [classes] = useState<TeacherClass2[]>(() => seedClasses2);
  const [exams, setExams] = useState<TeacherExam[]>(() => loadExams());
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [search, setSearch] = useState(""); const [statusFilter, setStatusFilter] = useState<ExamStatusFilter>("all"); const [page, setPage] = useState(1); const [previewId, setPreviewId] = useState<string | null>(null);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [subjects, selectedSubjectId]);
  const selectedSubjectName = selectedSubject?.name ?? null;
  const previewExam = useMemo(() => exams.find((exam) => exam.id === previewId) ?? null, [exams, previewId]);
  const canCreate = classes.length > 0;
  const resetFilters = () => { setSearch(""); setStatusFilter("all"); setPage(1); setPreviewId(null); };
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
    setPreviewId(null);
    refreshExams();
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      { replace: true, state: null },
    );
  }, [location.pathname, location.search, location.state, navigate, subjects]);

  useEffect(() => { if (previousSubjectId.current !== selectedSubjectId) { resetFilters(); previousSubjectId.current = selectedSubjectId; } }, [selectedSubjectId]);
  const subjectExams = selectedSubjectName ? exams.filter((exam) => exam.subject === selectedSubjectName) : [];
  const filteredExams = selectedSubjectName ? filterExams(subjectExams, search, statusFilter) : [];
  const sortedExams = selectedSubjectName ? sortExams(filteredExams) : [];
  const { pagedExams, totalPages } = getPagedExams(sortedExams, page);
  const stats = getExamsStats(filteredExams);

  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  return {
    canCreate, page, pagedExams, previewExam, search, selectedSubject, selectedSubjectId, stats, statusFilter, subjects, totalPages,
    onBack: resetToHomeState,
    onCreate: () => { if (!selectedSubjectId || !selectedSubjectName) return; navigate("/dashboard/teacher/exams/create", { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName } }); },
    onDelete: (id: string) => { deleteExam(id); if (previewId === id) setPreviewId(null); refreshExams(); },
    onDuplicate: (id: string) => { duplicateExam(id); refreshExams(); },
    onEdit: (id: string) => navigate(`/dashboard/teacher/exams/${id}/edit`, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onPreview: (id: string) => setPreviewId(id),
    onPublish: (id: string) => { publishExam(id); refreshExams(); },
    setPage,
    setPreviewId,
    setSearch: (value: string) => { setSearch(value); setPage(1); },
    setSelectedSubjectId,
    setStatusFilter: (value: ExamStatusFilter) => { setStatusFilter(value); setPage(1); },
  };
}
