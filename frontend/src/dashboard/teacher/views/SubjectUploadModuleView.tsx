// Orchestrates the upload module page by composing extracted form sections and helpers.
import { useMemo } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { UploadModuleBasicFields } from "@/dashboard/teacher/components/subjects/upload/UploadModuleBasicFields";
import { UploadModuleHeader } from "@/dashboard/teacher/components/subjects/upload/UploadModuleHeader";
import { UploadModuleSubmodulesSection } from "@/dashboard/teacher/components/subjects/upload/UploadModuleSubmodulesSection";
import { getSubjectName, getSubjectTitle, saveSubjectModule } from "@/dashboard/teacher/components/subjects/upload/uploadModuleHelpers";
import type { SubjectUploadParams, SubjectUploadRouteState } from "@/dashboard/teacher/components/subjects/upload/uploadModuleTypes";
import { getFirstInvalidField, hasModuleErrors } from "@/dashboard/teacher/components/subjects/upload/uploadModuleValidation";
import { useUploadModuleForm } from "@/dashboard/teacher/components/subjects/upload/useUploadModuleForm";
import { appendClassIdToPath, getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

export default function SubjectUploadModuleView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "" } = useParams<SubjectUploadParams>();
  const classId = getClassIdFromSearchParams(searchParams);
  const state = (location.state as SubjectUploadRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = useMemo(() => getSubjectName(subjectId, state), [state, subjectId]);
  const subjectTitle = useMemo(() => getSubjectTitle(subjectId, state), [state, subjectId]);
  const form = useUploadModuleForm();

  const handleSaveModule = () => {
    if (hasModuleErrors(form.errors, form.submodules.filter((submodule) => !(submodule.title.trim().length === 0 && submodule.description.trim().length === 0)))) {
      form.setTouched({ moduleTitle: true, description: true, submodules: Object.fromEntries(form.submodules.map((submodule) => [submodule.id, { title: true, description: true }])) });
      document.getElementById(getFirstInvalidField(form.errors, form.submodules) ?? "")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    saveSubjectModule(subjectId, form.moduleTitle, form.description, form.submodules);
    navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId), { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } });
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <UploadModuleHeader subjectName={subjectName} theme={theme} onBack={() => navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}`, classId), { state: { restoreSubjectId: subjectId } })} />

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <div className="mt-0 grid gap-5">
            <UploadModuleBasicFields
              theme={theme}
              subjectTitle={subjectTitle}
              moduleTitle={form.moduleTitle}
              description={form.description}
              titleError={form.errors.moduleTitle}
              descriptionError={form.errors.description}
              titleTouched={form.touched.moduleTitle}
              descriptionTouched={form.touched.description}
              onTitleChange={form.setModuleTitle}
              onDescriptionChange={form.setDescription}
              onTitleBlur={() => form.setTouched((current) => ({ ...current, moduleTitle: true }))}
              onDescriptionBlur={() => form.setTouched((current) => ({ ...current, description: true }))}
            />

            <UploadModuleSubmodulesSection
              submodules={form.submodules}
              errors={form.errors}
              touched={form.touched.submodules}
              onAdd={form.addSubmodule}
              onUpdate={form.updateSubmodule}
              onTouched={form.setSubmoduleTouched}
              onRemove={form.removeSubmodule}
            />

            <div className="flex justify-end">
              <Button type="button" onClick={handleSaveModule} className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30">
                Save Module
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
