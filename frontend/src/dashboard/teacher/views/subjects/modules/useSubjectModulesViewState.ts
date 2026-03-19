// State hook for subject modules loading, expansion, and route context.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { useSubjectFiles } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import {
  deleteSubjectModule,
  deleteSubjectSubmodule,
  reorderSubjectModules,
  reorderSubjectSubmodules,
  updateSubjectModule,
  updateSubjectModuleStatus,
  useSubjectModules,
} from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import type { SubjectModulePayload } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { appendClassIdToPath, getClassIdFromSearchParams } from "../subjectClassRouting";
import { getSubjectName, getSubjectTitle, type SubjectModulesRouteState } from "./subjectModulesViewHelpers";

type Params = { subjectId?: string };
type PendingDeleteTarget =
  | { type: "module"; moduleId: string }
  | { type: "submodule"; moduleId: string; submoduleId: string }
  | null;

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
  const visibleModules = useMemo(() => modules, [modules]);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pendingDeleteTarget, setPendingDeleteTarget] = useState<PendingDeleteTarget>(null);

  useEffect(() => {
    setExpandedModuleId((current) => {
      if (!current) return null;
      return visibleModules.some((module) => module.id === current) ? current : null;
    });
  }, [visibleModules]);

  return {
    expandedModuleId,
    routeState,
    subjectId,
    classId,
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
    openAttachedFile: (fileId: string, moduleId?: string, submoduleId?: string) =>
      navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/${fileId}`, classId), {
        state: {
          from: "module",
          moduleId,
          restoreSubjectId: subjectId,
          subject: routeState?.subject ?? null,
          submoduleId,
        },
      }),
    openModule: (moduleId: string) =>
      navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}`, classId), {
        state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
      }),
    openSubmodule: (moduleId: string, submoduleId: string) => navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}/submodules/${submoduleId}`, classId), { state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null } }),
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
    toggleModule: (moduleId: string) => setExpandedModuleId((current) => (current === moduleId ? null : moduleId)),
    updateModule: (moduleId: string, payload: SubjectModulePayload) => updateSubjectModule(subjectId, moduleId, payload),
  };
}
