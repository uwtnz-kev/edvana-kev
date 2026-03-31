// State hook for subject modules loading, expansion, and route context.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { useSubjectFiles } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import {
  deleteSubjectModule,
  deleteSubjectSubmodule,
  reorderSubjectModules,
  reorderSubjectSubmodules,
  updateSubjectModuleStatus,
  useSubjectModules,
} from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { appendClassIdToPath, getClassIdFromSearchParams } from "../subjectClassRouting";
import { getSubjectName, getSubjectTitle, type SubjectModulesRouteState } from "./subjectModulesViewHelpers";

type Params = { subjectId?: string };
type PendingDeleteTarget =
  | { type: "module"; moduleId: string }
  | { type: "submodule"; moduleId: string; submoduleId: string }
  | null;

function getModulesScrollContainer() {
  return document.querySelector("main.teacher-content-surface");
}

function hasReachedScrollTop(container: HTMLElement, targetScrollTop: number) {
  return Math.abs(container.scrollTop - targetScrollTop) <= 1;
}

function getSearchableText(module: SubjectModuleItem) {
  return [
    module.title,
    module.description,
    ...module.submodules.flatMap((submodule) => [submodule.title, submodule.description]),
  ]
    .join(" ")
    .toLowerCase();
}

export function useSubjectModulesViewState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "" } = useParams<Params>();
  const classId = getClassIdFromSearchParams(searchParams);
  const routeState = (location.state as SubjectModulesRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = useMemo(() => getSubjectName(subjectId, routeState), [routeState, subjectId]);
  const subjectTitle = useMemo(() => getSubjectTitle(subjectId, routeState), [routeState, subjectId]);
  const modules = useSubjectModules(subjectId);
  const subjectFiles = useSubjectFiles(subjectId);
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedSearchQuery = useMemo(() => searchQuery.trim().toLowerCase(), [searchQuery]);
  const isSearchActive = normalizedSearchQuery.length > 0;
  const matchingModuleIds = useMemo(() => {
    if (!isSearchActive) return new Set<string>();
    return new Set(
      modules
        .filter((module) => getSearchableText(module).includes(normalizedSearchQuery))
        .map((module) => module.id),
    );
  }, [isSearchActive, modules, normalizedSearchQuery]);
  const visibleModules = useMemo(
    () => (isSearchActive ? modules.filter((module) => matchingModuleIds.has(module.id)) : modules),
    [isSearchActive, matchingModuleIds, modules],
  );
  const initialExpandedModuleId = routeState?.returnModuleId?.trim() || null;
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(initialExpandedModuleId);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pendingDeleteTarget, setPendingDeleteTarget] = useState<PendingDeleteTarget>(null);
  const restoredScrollStateKeyRef = useRef<string | null>(null);

  useEffect(() => {
    setExpandedModuleId((current) => {
      if (!current) return null;
      return modules.some((module) => module.id === current) ? current : null;
    });
  }, [modules]);

  useEffect(() => {
    const returnModuleId = routeState?.returnModuleId?.trim();
    if (!returnModuleId) return;
    if (!modules.some((module) => module.id === returnModuleId)) return;

    setExpandedModuleId(returnModuleId);
  }, [modules, routeState?.returnModuleId]);

  useEffect(() => {
    const returnModuleId = routeState?.returnModuleId?.trim();
    const returnScrollTop = routeState?.returnScrollTop;
    if (!returnModuleId) return;
    if (typeof returnScrollTop === "number") return;
    if (expandedModuleId !== returnModuleId) return;

    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      {
        replace: true,
        state: {
          restoreSubjectId: routeState?.restoreSubjectId,
          subject: routeState?.subject ?? null,
        },
      },
    );
  }, [expandedModuleId, location.pathname, location.search, navigate, routeState?.restoreSubjectId, routeState?.returnModuleId, routeState?.returnScrollTop, routeState?.subject]);

  useEffect(() => {
    const returnModuleId = routeState?.returnModuleId?.trim();
    const returnScrollTop = routeState?.returnScrollTop;
    if (!returnModuleId) return;
    if (typeof returnScrollTop !== "number") return;
    if (expandedModuleId !== returnModuleId) return;

    const restoreKey = `${location.key}:${returnModuleId}:${returnScrollTop}`;
    if (restoredScrollStateKeyRef.current === restoreKey) return;

    const scrollContainer = getModulesScrollContainer();
    if (!(scrollContainer instanceof HTMLElement)) return;

    let cancelled = false;

    const restoreScroll = (attemptsRemaining: number) => {
      requestAnimationFrame(() => {
        if (cancelled) return;

        scrollContainer.scrollTo({ top: returnScrollTop, behavior: "auto" });

        if (!hasReachedScrollTop(scrollContainer, returnScrollTop) && attemptsRemaining > 0) {
          restoreScroll(attemptsRemaining - 1);
          return;
        }

        restoredScrollStateKeyRef.current = restoreKey;
        navigate(
          {
            pathname: location.pathname,
            search: location.search,
          },
          {
            replace: true,
            state: {
              restoreSubjectId: routeState?.restoreSubjectId,
              subject: routeState?.subject ?? null,
            },
          },
        );
      });
    };

    restoreScroll(4);

    return () => {
      cancelled = true;
    };
  }, [expandedModuleId, location.key, location.pathname, location.search, navigate, routeState?.restoreSubjectId, routeState?.returnModuleId, routeState?.returnScrollTop, routeState?.subject]);

  const openAttachedFile = (fileId: string, moduleId?: string, submoduleId?: string) => {
    const scrollContainer = getModulesScrollContainer();
    const returnScrollTop = scrollContainer instanceof HTMLElement ? scrollContainer.scrollTop : undefined;
    navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/${fileId}`, classId), {
      state: {
        from: "module",
        moduleId,
        restoreSubjectId: subjectId,
        returnScrollTop,
        subject: routeState?.subject ?? null,
        submoduleId,
      },
    });
  };

  return {
    expandedModuleId,
    routeState,
    subjectId,
    classId,
    searchQuery,
    setSearchQuery,
    isSearchActive,
    isModuleExpanded: (moduleId: string) => (isSearchActive ? matchingModuleIds.has(moduleId) : expandedModuleId === moduleId),
    subjectName,
    subjectTitle,
    subjectFiles,
    theme,
    visibleModules,
    closeDeleteConfirm: () => {
      setDeleteConfirmOpen(false);
      setPendingDeleteTarget(null);
    },
    confirmDelete: () => {
      if (!pendingDeleteTarget) return;
      if (pendingDeleteTarget.type === "module") {
        deleteSubjectModule(subjectId, pendingDeleteTarget.moduleId);
      } else {
        deleteSubjectSubmodule(subjectId, pendingDeleteTarget.moduleId, pendingDeleteTarget.submoduleId);
      }
      setDeleteConfirmOpen(false);
      setPendingDeleteTarget(null);
    },
    deleteConfirmDescription:
      pendingDeleteTarget?.type === "module"
        ? "This module and all of its submodules will be removed immediately."
        : "This submodule will be removed immediately.",
    deleteConfirmOpen,
    deleteConfirmTitle:
      pendingDeleteTarget?.type === "module" ? "Delete module?" : "Delete submodule?",
    goBack: () => navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}`, classId)),
    goToSubjectsSelection: () => navigate(appendClassIdToPath("/dashboard/teacher/subjects", classId)),
    openAttachedFile,
    openSubmodule: (moduleId: string, submoduleId: string) => {
      const scrollContainer = getModulesScrollContainer();
      const returnScrollTop = scrollContainer instanceof HTMLElement ? scrollContainer.scrollTop : undefined;
      navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}/submodules/${submoduleId}`, classId), {
        state: {
          restoreSubjectId: subjectId,
          returnModuleId: moduleId,
          returnScrollTop,
          subject: routeState?.subject ?? null,
        },
      });
    },
    publishModule: (moduleId: string) => updateSubjectModuleStatus(subjectId, moduleId, "published"),
    reorderModules: (orderedModuleIds: string[]) => reorderSubjectModules(subjectId, orderedModuleIds),
    reorderSubmodules: (moduleId: string, orderedSubmoduleIds: string[]) => reorderSubjectSubmodules(subjectId, moduleId, orderedSubmoduleIds),
    requestDeleteModule: (moduleId: string) => {
      setPendingDeleteTarget({ type: "module", moduleId });
      setDeleteConfirmOpen(true);
    },
    requestDeleteSubmodule: (moduleId: string, submoduleId: string) => {
      setPendingDeleteTarget({ type: "submodule", moduleId, submoduleId });
      setDeleteConfirmOpen(true);
    },
    toggleModule: (moduleId: string) => {
      if (isSearchActive) return;
      setExpandedModuleId((current) => (current === moduleId ? null : moduleId));
    },
  };
}
