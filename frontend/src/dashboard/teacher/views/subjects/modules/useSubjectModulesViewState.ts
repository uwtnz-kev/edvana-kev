// State hook for subject modules loading, expansion, and route context.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import {
  deleteSubjectModule,
  deleteSubjectSubmodule,
  updateSubjectModuleStatus,
  useSubjectModules,
} from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import { getSubjectName, getSubjectTitle, type SubjectModulesRouteState } from "./subjectModulesViewHelpers";

type Params = { subjectId?: string };
type PendingDeleteTarget =
  | { type: "module"; moduleId: string }
  | { type: "submodule"; moduleId: string; submoduleId: string }
  | null;

export function useSubjectModulesViewState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectId = "" } = useParams<Params>();
  const routeState = (location.state as SubjectModulesRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = useMemo(() => getSubjectName(subjectId, routeState), [routeState, subjectId]);
  const subjectTitle = useMemo(() => getSubjectTitle(subjectId, routeState), [routeState, subjectId]);
  const modules = useSubjectModules(subjectId);
  const visibleModules = useMemo(() => modules, [modules]);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(visibleModules[0]?.id ?? null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pendingDeleteTarget, setPendingDeleteTarget] = useState<PendingDeleteTarget>(null);

  useEffect(() => {
    setExpandedModuleId((current) => {
      if (!current) return visibleModules[0]?.id ?? null;
      return visibleModules.some((module) => module.id === current) ? current : visibleModules[0]?.id ?? null;
    });
  }, [visibleModules]);

  return {
    expandedModuleId,
    routeState,
    subjectId,
    subjectName,
    subjectTitle,
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
    goBack: () => navigate("/dashboard/teacher/subjects", { state: { restoreSubjectId: subjectId } }),
    openModule: (moduleId: string) =>
      navigate(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}`, {
        state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
      }),
    openSubmodule: (moduleId: string, submoduleId: string) => navigate(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}/submodules/${submoduleId}`, { state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null } }),
    publishModule: (moduleId: string) => updateSubjectModuleStatus(subjectId, moduleId, "published"),
    requestDeleteModule: (moduleId: string) => {
      setPendingDeleteTarget({ type: "module", moduleId });
      setDeleteConfirmOpen(true);
    },
    requestDeleteSubmodule: (moduleId: string, submoduleId: string) => {
      setPendingDeleteTarget({ type: "submodule", moduleId, submoduleId });
      setDeleteConfirmOpen(true);
    },
    toggleModule: (moduleId: string) => setExpandedModuleId((current) => (current === moduleId ? null : moduleId)),
  };
}
