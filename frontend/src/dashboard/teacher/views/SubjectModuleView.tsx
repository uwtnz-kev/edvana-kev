// src/dashboard/teacher/views/SubjectModuleView.tsx
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import type { SubjectModulesRouteState } from "./subjects/modules/subjectModulesViewHelpers";
import { appendClassIdToPath, getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type Params = {
  subjectId?: string;
  moduleId?: string;
};

export default function SubjectModuleView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "", moduleId = "" } = useParams<Params>();
  const classId = getClassIdFromSearchParams(searchParams);
  const routeState = (location.state as SubjectModulesRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const modules = useSubjectModules(subjectId);
  const module = useMemo(() => modules.find((item) => item.id === moduleId) ?? null, [moduleId, modules]);

  useEffect(() => {
    if (module) return;
    navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId), {
      replace: true,
      state: { restoreSubjectId: subjectId, subject: routeState?.subject ?? null },
    });
  }, [classId, module, navigate, routeState?.subject, subjectId]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group h-11 w-11 rounded-2xl teacher-panel-surface flex items-center justify-center hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#8B6F52]/20"
            type="button"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--text-primary)] group-hover:scale-110 transition-transform duration-300" />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              {module?.title ?? `Module ${moduleId}`}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Subject: {subjectId}
            </p>
          </div>
        </div>

        <div className="text-sm text-[var(--text-secondary)]">
          Subject ID: {subjectId} | Module ID: {moduleId}
        </div>
      </div>

      <div className="group rounded-2xl teacher-panel-surface p-8 hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#8B6F52]/20">
        <div className="flex items-center gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.bgClass} group-hover:scale-105 transition-transform duration-300`}>
            <BookOpen className={`h-6 w-6 ${theme.iconClass} group-hover:scale-110 transition-transform duration-300`} />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
              {module?.title ?? `Module ${moduleId}`}
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">
              {module?.description ?? "This is the module page for this subject."}
            </p>
          </div>
        </div>

        <div className="mt-8 text-[var(--text-secondary)] text-sm">
          Later this page will contain:
          <ul className="mt-3 list-disc list-inside space-y-1">
            <li>Lessons</li>
            <li>Assignments</li>
            <li>Quizzes</li>
            <li>Resources</li>
            <li>Module progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


