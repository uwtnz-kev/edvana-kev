// Manages assignments workspace state, restore routing, and page actions.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteAssignment, duplicateAssignment, loadAssignments, publishAssignment, seedSubjects2, type AssignmentStatusFilter, type TeacherAssignment, type TeacherSubject2 } from "@/dashboard/teacher/components/assignments";
import type { AssignmentSort } from "@/dashboard/teacher/components/assignments/TeacherAssignmentsControls";
import { filterAssignments, getAssignmentsStats, getPagedAssignments, sortAssignments } from "./assignmentsViewHelpers";

type AssignmentsRestoreState = { restoreSubjectId?: string; resetToHome?: boolean };

export function useAssignmentsWorkspaceState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(() => loadAssignments());
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [search, setSearch] = useState(""); const [statusFilter, setStatusFilter] = useState<AssignmentStatusFilter>("all"); const [sort, setSort] = useState<AssignmentSort>("all"); const [page, setPage] = useState(1); const [previewId, setPreviewId] = useState<string | null>(null);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [subjects, selectedSubjectId]);
  const selectedSubjectName = selectedSubject?.name ?? null;
  const previewAssignment = useMemo(() => assignments.find((assignment) => assignment.id === previewId) ?? null, [assignments, previewId]);
  const resetFilters = () => { setSearch(""); setStatusFilter("all"); setSort("all"); setPage(1); setPreviewId(null); };
  const refreshAssignments = () => setAssignments(loadAssignments());

  useEffect(() => {
    const state = location.state as AssignmentsRestoreState | null;
    if (state?.resetToHome) { setSelectedSubjectId(null); resetFilters(); refreshAssignments(); navigate(".", { replace: true, state: null }); return; }
    if (!state?.restoreSubjectId) return;
    setSelectedSubjectId(subjects.some((subject) => subject.id === state.restoreSubjectId) ? state.restoreSubjectId : null);
    setPreviewId(null); refreshAssignments(); navigate(".", { replace: true, state: null });
  }, [location.state, navigate, subjects]);

  useEffect(() => { if (previousSubjectId.current !== selectedSubjectId) { resetFilters(); previousSubjectId.current = selectedSubjectId; } }, [selectedSubjectId]);
  const subjectAssignments = selectedSubjectName ? assignments.filter((assignment) => assignment.subject === selectedSubjectName) : [];
  const filteredAssignments = selectedSubjectName ? filterAssignments(subjectAssignments, search, statusFilter) : [];
  const sortedAssignments = selectedSubjectName ? sortAssignments(filteredAssignments, sort) : [];
  const { pagedAssignments, totalPages } = getPagedAssignments(sortedAssignments, page);
  const stats = getAssignmentsStats(filteredAssignments);

  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  return {
    assignments, filteredAssignments, pagedAssignments, page, previewAssignment, search, selectedSubject, selectedSubjectId, selectedSubjectName, sort, stats, statusFilter, subjects, totalPages,
    onBack: () => { setSelectedSubjectId(null); resetFilters(); },
    onCreate: () => { if (!selectedSubjectId || !selectedSubjectName) return; navigate("/dashboard/teacher/assignments/create", { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName } }); },
    onDelete: (id: string) => { deleteAssignment(id); if (previewId === id) setPreviewId(null); refreshAssignments(); },
    onDuplicate: (id: string) => { duplicateAssignment(id); refreshAssignments(); },
    onEdit: (id: string) => navigate(`/dashboard/teacher/assignments/${id}/edit`, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onPreview: (id: string) => setPreviewId(id),
    onPublish: (id: string) => { publishAssignment(id); refreshAssignments(); },
    setPage,
    setPreviewId,
    setSearch: (value: string) => { setSearch(value); setPage(1); },
    setSelectedSubjectId,
    setSort: (value: AssignmentSort) => { setSort(value); setPage(1); },
    setStatusFilter: (value: AssignmentStatusFilter) => { setStatusFilter(value); setPage(1); },
  };
}
