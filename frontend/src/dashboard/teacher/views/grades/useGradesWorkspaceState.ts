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
import { buildGradesTypeSelectionRoute, buildGradesWorkspaceRoute, isGradesLanding, isGradesWorkspace, isSelectionType } from "./gradesViewHelpers";
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
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const querySubjectId = query.get("subjectId");
  const queryType = query.get("type");
  const routeSelectedGradeType = queryType && isSelectionType(queryType) ? queryType : null;
  const routeSelectedSubjectId = useMemo(() => subjects.some((subject) => subject.id === querySubjectId) ? querySubjectId : null, [querySubjectId, subjects]);
  const hasInvalidWorkspaceSubject = isWorkspace && !routeSelectedSubjectId;
  const hasInvalidWorkspaceType = isWorkspace && Boolean(queryType) && !routeSelectedGradeType;
  const activeSubjectId = isWorkspace ? routeSelectedSubjectId : selectedSubjectId;
  const activeGradeType = isWorkspace ? routeSelectedGradeType : null;
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === activeSubjectId) ?? null, [activeSubjectId, subjects]);
  const selectedSubjectName = selectedSubject?.name ?? null;

  useEffect(() => {
    if (!isLanding) return;
    resetGradesFlow();
    const next = loadGradesWorkspace();
    setSelectedSubjectId(next.selectedSubjectId); setSelectedGradeTypeState(next.selectedGradeType); setSearch(next.filters.search); setClassValue(next.filters.classValue);
  }, [isLanding]);

  useEffect(() => {
    if (!isWorkspace) return;
    if (!routeSelectedSubjectId) {
      navigate(TEACHER_ROUTES.GRADES, { replace: true });
      return;
    }
    if (queryType && !routeSelectedGradeType) {
      navigate(buildGradesTypeSelectionRoute(routeSelectedSubjectId), { replace: true });
      return;
    }
    if (selectedSubjectId !== routeSelectedSubjectId) {
      setSelectedSubjectId(routeSelectedSubjectId);
    }
    if (selectedGradeType !== routeSelectedGradeType) {
      setSelectedGradeType(routeSelectedGradeType);
      setSelectedGradeTypeState(routeSelectedGradeType);
    }
  }, [buildGradesTypeSelectionRoute, isWorkspace, navigate, queryType, routeSelectedGradeType, routeSelectedSubjectId, selectedGradeType, selectedSubjectId]);

  useEffect(() => {
    const state = location.state as TeacherGradesRestoreState | null;
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      setSearch(defaultGradesFilters.search);
      setClassValue(defaultGradesFilters.classValue);
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
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      { replace: true, state: null },
    );
  }, [location.pathname, location.search, location.state, navigate, subjects]);

  useEffect(() => {
    if (previousSubjectId.current === selectedSubjectId) return;
    setSearch(defaultGradesFilters.search);
    setClassValue(defaultGradesFilters.classValue);
    previousSubjectId.current = selectedSubjectId;
  }, [selectedSubjectId]);

  useEffect(() => {
    saveGradesWorkspace({ selectedSubjectId: activeSubjectId, selectedGradeType: activeGradeType, filters: { search, assessmentType: activeGradeType ?? "all", classValue, assessmentItemId: "all" } });
  }, [activeGradeType, activeSubjectId, classValue, search]);

  const subjectClasses = useMemo(() => (selectedSubjectName ? SUBJECT_CLASS_MAP[selectedSubjectName] ?? [] : []), [selectedSubjectName]);
  const allPublishedItemsForSubject = useMemo(() => getPublishedItems(activeGradeType, activeSubjectId, "all", ""), [activeGradeType, activeSubjectId, version]);
  const publishedItems = useMemo(() => getPublishedItems(activeGradeType, activeSubjectId, classValue, search), [activeGradeType, activeSubjectId, classValue, search, version]);
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
    hasInvalidWorkspaceSubject,
    hasInvalidWorkspaceType,
    isLanding,
    onBack: () => {
      if (isWorkspace && activeGradeType) {
        navigate(buildGradesTypeSelectionRoute(activeSubjectId));
        return;
      }
      resetGradesFlow();
      setSelectedSubjectId(null);
      setSelectedGradeTypeState(null);
      navigate(TEACHER_ROUTES.GRADES);
    },
    onCreate: () => navigateToCreateGradeList(navigate, activeSubjectId, activeGradeType),
    onDeletePublishedItem: (itemId: string) => {
      setPendingDeleteItemId(itemId);
      setDeleteConfirmOpen(true);
    },
    onPickType: (value: string) => {
      if (!isSelectionType(value) || !activeSubjectId) return;
      setSelectedGradeType(value);
      setSelectedGradeTypeState(value);
      navigate(buildGradesWorkspaceRoute(activeSubjectId, value));
    },
    publishedItems,
    search,
    selectedGradeType: activeGradeType,
    selectedSubject,
    selectedSubjectId: activeSubjectId,
    setClassValue,
    setSearch,
    setSelectedSubjectId: (value: string | null) => {
      if (isLanding) {
        setSelectedSubjectId(value);
        setSelectedGradeTypeState(null);
        navigate(buildGradesTypeSelectionRoute(value));
        return;
      }
      setSelectedSubjectId(value);
    },
    stats,
    subjects,
  };
}
