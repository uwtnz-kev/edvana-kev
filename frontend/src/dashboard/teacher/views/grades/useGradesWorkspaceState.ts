// Manages grades workspace state, persistence, and route-driven resets for the page shell.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deletePublishedItem,
  defaultGradesFilters,
  getPublishedItems,
  loadGradesWorkspace,
  resetGradesFlow,
  saveGradesWorkspace,
  seedSubjects2,
  setSelectedGradeType,
  SUBJECT_CLASS_MAP,
  type TeacherGradeSelectionType,
  type TeacherGradesRestoreState,
  type TeacherGradesSubject,
} from "@/dashboard/teacher/components/grades";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { navigateToCreateGradeList } from "./gradesWorkspaceActions";
import { buildClassOptions, buildWorkspaceStats } from "./gradesWorkspaceDerived";
import { isGradesLanding, isGradesWorkspace, isSelectionType } from "./gradesViewHelpers";
export function useGradesWorkspaceState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjects] = useState<TeacherGradesSubject[]>(() => seedSubjects2);
  const initialWorkspace = useMemo(() => loadGradesWorkspace(), []);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(initialWorkspace.selectedSubjectId);
  const [selectedGradeType, setSelectedGradeTypeState] = useState<TeacherGradeSelectionType | null>(initialWorkspace.selectedGradeType);
  const [search, setSearch] = useState(initialWorkspace.filters.search);
  const [classValue, setClassValue] = useState(initialWorkspace.filters.classValue);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pendingDeleteItemId, setPendingDeleteItemId] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const isLanding = isGradesLanding(location.pathname);
  const isWorkspace = isGradesWorkspace(location.pathname);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [subjects, selectedSubjectId]);
  const selectedSubjectName = selectedSubject?.name ?? null;

  useEffect(() => {
    if (!isLanding) return;
    resetGradesFlow();
    const next = loadGradesWorkspace();
    setSelectedSubjectId(next.selectedSubjectId); setSelectedGradeTypeState(next.selectedGradeType); setSearch(next.filters.search); setClassValue(next.filters.classValue);
  }, [isLanding]);

  useEffect(() => {
    if (isWorkspace && !selectedGradeType) navigate(TEACHER_ROUTES.GRADES, { replace: true });
  }, [isWorkspace, navigate, selectedGradeType]);

  useEffect(() => {
    const state = location.state as TeacherGradesRestoreState | null;
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      setSearch(defaultGradesFilters.search);
      setClassValue(defaultGradesFilters.classValue);
      navigate(".", { replace: true, state: null });
      return;
    }
    if (!state?.restoreSubjectId) return;
    setSelectedSubjectId(subjects.some((subject) => subject.id === state.restoreSubjectId) ? state.restoreSubjectId : null);
    navigate(".", { replace: true, state: null });
  }, [location.state, navigate, subjects]);

  useEffect(() => {
    if (previousSubjectId.current === selectedSubjectId) return;
    setSearch(defaultGradesFilters.search);
    setClassValue(defaultGradesFilters.classValue);
    previousSubjectId.current = selectedSubjectId;
  }, [selectedSubjectId]);

  useEffect(() => {
    saveGradesWorkspace({ selectedSubjectId, selectedGradeType, filters: { search, assessmentType: selectedGradeType ?? "all", classValue, assessmentItemId: "all" } });
  }, [classValue, search, selectedGradeType, selectedSubjectId]);

  const subjectClasses = useMemo(() => (selectedSubjectName ? SUBJECT_CLASS_MAP[selectedSubjectName] ?? [] : []), [selectedSubjectName]);
  const allPublishedItemsForSubject = useMemo(() => getPublishedItems(selectedGradeType, selectedSubjectId, "all", ""), [selectedGradeType, selectedSubjectId, version]);
  const publishedItems = useMemo(() => getPublishedItems(selectedGradeType, selectedSubjectId, classValue, search), [classValue, search, selectedGradeType, selectedSubjectId, version]);
  const classOptions = useMemo(() => buildClassOptions(allPublishedItemsForSubject, subjectClasses), [allPublishedItemsForSubject, subjectClasses]);
  const stats = useMemo(() => buildWorkspaceStats(publishedItems), [publishedItems]);
  return {
    classOptions,
    classValue,
    closeDeleteConfirm: () => {
      setDeleteConfirmOpen(false);
      setPendingDeleteItemId(null);
    },
    confirmDeletePublishedItem: () => {
      if (!pendingDeleteItemId) return;
      deletePublishedItem(pendingDeleteItemId);
      setDeleteConfirmOpen(false);
      setPendingDeleteItemId(null);
      setVersion((current) => current + 1);
    },
    deleteConfirmOpen,
    isLanding,
    onBack: () => { resetGradesFlow(); navigate(TEACHER_ROUTES.GRADES); },
    onCreate: () => navigateToCreateGradeList(navigate, selectedSubjectId, selectedGradeType),
    onDeletePublishedItem: (itemId: string) => {
      setPendingDeleteItemId(itemId);
      setDeleteConfirmOpen(true);
    },
    onPickType: (value: string) => {
      if (!isSelectionType(value)) return;
      setSelectedGradeType(value);
      setSelectedGradeTypeState(value);
      navigate(TEACHER_ROUTES.GRADES_WORKSPACE);
    },
    publishedItems,
    search,
    selectedGradeType,
    selectedSubject,
    selectedSubjectId,
    setClassValue,
    setSearch,
    setSelectedSubjectId,
    stats,
    subjects,
  };
}
