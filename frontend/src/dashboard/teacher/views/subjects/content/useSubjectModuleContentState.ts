// Owns route parsing, module lookup, and derived labels for the content page.
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { useSubjectFiles } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import type { SubjectFileItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import { useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import {
  getSubjectName,
  type SubjectModuleContentRouteState,
} from "./subjectModuleContentHelpers";
import { appendClassIdToPath, getClassIdFromSearchParams } from "../subjectClassRouting";

type Params = { moduleId?: string; subjectId?: string; submoduleId?: string };

export function useSubjectModuleContentState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "", moduleId = "", submoduleId = "" } = useParams<Params>();
  const classId = getClassIdFromSearchParams(searchParams);
  const routeState = (location.state as SubjectModuleContentRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = useMemo(() => getSubjectName(subjectId, routeState), [routeState, subjectId]);
  const modules = useSubjectModules(subjectId);
  const subjectFiles = useSubjectFiles(subjectId);
  const module = useMemo(() => modules.find((item) => item.id === moduleId) ?? null, [moduleId, modules]);
  const submodule = useMemo(() => module?.submodules.find((item) => item.id === submoduleId) ?? null, [module, submoduleId]);
  const attachedFiles = useMemo(
    () => (submodule?.attachedFileIds ?? [])
      .map((fileId) => subjectFiles.find((file) => file.id === fileId) ?? null)
      .filter((file): file is SubjectFileItem => file !== null),
    [subjectFiles, submodule?.attachedFileIds],
  );
  const contentTitle = module?.title ?? submodule?.title ?? "Content";
  const pageTitle = module?.title ?? submodule?.title ?? "Module Content";
  const contentDescription = submodule?.description ?? module?.description ?? "Detailed module content will appear here.";
  const contentBody = submodule?.content ?? module?.description ?? "";

  useEffect(() => {
    if (!moduleId) return;
    if (!module) {
      navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId), {
        replace: true,
        state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
      });
      return;
    }
    if (submoduleId && !submodule) {
      navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}`, classId), {
        replace: true,
        state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
      });
    }
  }, [module, moduleId, navigate, routeState?.subject, subjectId, submodule, submoduleId, classId]);

  return {
    attachedFiles,
    contentBody,
    contentDescription,
    contentTitle,
    module,
    pageTitle,
    subjectId,
    subjectName,
    submodule,
    theme,
    goBack: () =>
      navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId), {
        state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
      }),
    openAttachedFile: (fileId: string) =>
      navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/${fileId}`, classId), {
        state: {
          from: "module",
          moduleId,
          restoreSubjectId: subjectId,
          subject: routeState?.subject ?? null,
          submoduleId: submoduleId || undefined,
        },
      }),
  };
}
