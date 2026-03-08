// State hook for subject modules loading, expansion, and route context.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { updateSubjectModuleStatus, useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import { getFallbackModules, getSubjectName, getSubjectTitle, type SubjectModulesRouteState } from "./subjectModulesViewHelpers";

type Params = { subjectId?: string };

export function useSubjectModulesViewState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectId = "" } = useParams<Params>();
  const routeState = (location.state as SubjectModulesRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = useMemo(() => getSubjectName(subjectId, routeState), [routeState, subjectId]);
  const subjectTitle = useMemo(() => getSubjectTitle(subjectId, routeState), [routeState, subjectId]);
  const modules = useSubjectModules(subjectId);
  const visibleModules = useMemo(() => getFallbackModules(modules), [modules]);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(visibleModules[0]?.id ?? null);

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
    goBack: () => navigate("/dashboard/teacher/subjects", { state: { restoreSubjectId: subjectId } }),
    openSubmodule: (moduleId: string, submoduleId: string) => navigate(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}/submodules/${submoduleId}`, { state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null } }),
    publishModule: (moduleId: string) => updateSubjectModuleStatus(subjectId, moduleId, "published"),
    toggleModule: (moduleId: string) => setExpandedModuleId((current) => (current === moduleId ? null : moduleId)),
  };
}
