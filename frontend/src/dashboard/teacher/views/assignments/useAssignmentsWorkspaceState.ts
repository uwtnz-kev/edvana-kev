// Manages assignments workspace state, restore routing, and page actions.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteAssignment, duplicateAssignment, loadAssignments, publishAssignment, seedSubjects2, type AssignmentStatusFilter, type TeacherAssignment, type TeacherSubject2 } from "@/dashboard/teacher/components/assignments";
import { filterAssignments, getAssignmentsStats, getPagedAssignments, sortAssignments } from "./assignmentsViewHelpers";

type AssignmentsRestoreState = { restoreSubjectId?: string; resetToHome?: boolean };

export function useAssignmentsWorkspaceState(classId: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(() => loadAssignments());
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [search, setSearch] = useState(""); const [statusFilter, setStatusFilter] = useState<AssignmentStatusFilter>("all"); const [page, setPage] = useState(1); const [previewId, setPreviewId] = useState<string | null>(null);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const normalizedClassId = classId.trim().toLowerCase();
  const classAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.classLabel.trim().toLowerCase() === normalizedClassId),
    [assignments, normalizedClassId],
  );
  const scopedSubjects = useMemo(() => {
    const subjectNames = new Set(classAssignments.map((assignment) => assignment.subject));
    const matchingSubjects = subjects.filter((subject) => subjectNames.has(subject.name));
    return matchingSubjects.length > 0 ? matchingSubjects : subjects;
  }, [classAssignments, subjects]);
  const selectedSubject = useMemo(() => scopedSubjects.find((subject) => subject.id === selectedSubjectId) ?? null, [scopedSubjects, selectedSubjectId]);
  const selectedSubjectName = selectedSubject?.name ?? null;
  const previewAssignment = useMemo(() => classAssignments.find((assignment) => assignment.id === previewId) ?? null, [classAssignments, previewId]);
  const resetFilters = () => { setSearch(""); setStatusFilter("all"); setPage(1); setPreviewId(null); };
  const refreshAssignments = () => setAssignments(loadAssignments());

  useEffect(() => {
    const state = location.state as AssignmentsRestoreState | null;
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      resetFilters();
      refreshAssignments();
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
    setSelectedSubjectId(scopedSubjects.some((subject) => subject.id === state.restoreSubjectId) ? state.restoreSubjectId : null);
    setPreviewId(null);
    refreshAssignments();
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      { replace: true, state: null },
    );
  }, [location.pathname, location.search, location.state, navigate, scopedSubjects]);

  useEffect(() => { if (previousSubjectId.current !== selectedSubjectId) { resetFilters(); previousSubjectId.current = selectedSubjectId; } }, [selectedSubjectId]);
  const subjectAssignments = selectedSubjectName ? classAssignments.filter((assignment) => assignment.subject === selectedSubjectName) : [];
  const filteredAssignments = selectedSubjectName ? filterAssignments(subjectAssignments, search, statusFilter) : [];
  const sortedAssignments = selectedSubjectName ? sortAssignments(filteredAssignments) : [];
  const { pagedAssignments, totalPages } = getPagedAssignments(sortedAssignments, page);
  const stats = getAssignmentsStats(filteredAssignments);

  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  return {
    assignments: classAssignments, filteredAssignments, pagedAssignments, page, previewAssignment, search, selectedSubject, selectedSubjectId, selectedSubjectName, stats, statusFilter, subjects: scopedSubjects, totalPages,
    onBack: () => { setSelectedSubjectId(null); resetFilters(); },
    onCreate: () => { if (!selectedSubjectId || !selectedSubjectName) return; navigate({ pathname: "/dashboard/teacher/assignments/create", search: location.search }, { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName } }); },
    onDelete: (id: string) => { deleteAssignment(id); if (previewId === id) setPreviewId(null); refreshAssignments(); },
    onDuplicate: (id: string) => { duplicateAssignment(id); refreshAssignments(); },
    onEdit: (id: string) => navigate({ pathname: `/dashboard/teacher/assignments/${id}/edit`, search: location.search }, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onPreview: (id: string) => setPreviewId(id),
    onPublish: (id: string) => { publishAssignment(id); refreshAssignments(); },
    setPage,
    setPreviewId,
    setSearch: (value: string) => { setSearch(value); setPage(1); },
    setSelectedSubjectId,
    setStatusFilter: (value: AssignmentStatusFilter) => { setStatusFilter(value); setPage(1); },
  };
}
