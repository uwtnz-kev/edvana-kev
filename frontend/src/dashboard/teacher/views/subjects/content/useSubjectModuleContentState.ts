// Owns route parsing, module lookup, and derived labels for the content page.
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import {
  getContentSections,
  getSubjectName,
  type SubjectModuleContentRouteState,
} from "./subjectModuleContentHelpers";

type Params = { moduleId?: string; subjectId?: string; submoduleId?: string };

export function useSubjectModuleContentState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectId = "", moduleId = "", submoduleId = "" } = useParams<Params>();
  const routeState = (location.state as SubjectModuleContentRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = useMemo(() => getSubjectName(subjectId, routeState), [routeState, subjectId]);
  const modules = useSubjectModules(subjectId);
  const module = useMemo(() => modules.find((item) => item.id === moduleId) ?? null, [moduleId, modules]);
  const submodule = useMemo(() => module?.submodules.find((item) => item.id === submoduleId) ?? null, [module, submoduleId]);
  const contentTitle = submodule?.title ?? module?.title ?? "Content";
  const pageTitle = submodule?.title ?? module?.title ?? "Module Content";
  const contentDescription = submodule?.description ?? module?.description ?? "Detailed module content will appear here.";
  const sections = useMemo(() => getContentSections(submodule?.summary), [submodule?.summary]);

  useEffect(() => {
    if (!moduleId) return;
    if (!module) {
      navigate(`/dashboard/teacher/subjects/${subjectId}/modules`, {
        replace: true,
        state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
      });
      return;
    }
    if (submoduleId && !submodule) {
      navigate(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}`, {
        replace: true,
        state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
      });
    }
  }, [module, moduleId, navigate, routeState?.subject, subjectId, submodule, submoduleId]);

  return {
    contentDescription,
    contentTitle,
    module,
    pageTitle,
    sections,
    subjectId,
    subjectName,
    submodule,
    theme,
    goBack: () =>
      navigate(`/dashboard/teacher/subjects/${subjectId}/modules`, {
        state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
      }),
  };
}
