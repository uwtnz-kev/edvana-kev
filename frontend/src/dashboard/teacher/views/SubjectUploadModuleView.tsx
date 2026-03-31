// Orchestrates the upload module page by composing extracted form sections and helpers.
import { useMemo, useState } from "react";
import { Save, X } from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { useSubjectFiles } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import { useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import { UploadModuleBasicFields } from "@/dashboard/teacher/components/subjects/upload/UploadModuleBasicFields";
import { UploadModuleHeader } from "@/dashboard/teacher/components/subjects/upload/UploadModuleHeader";
import { UploadModuleSubmodulesSection } from "@/dashboard/teacher/components/subjects/upload/UploadModuleSubmodulesSection";
import { getSubjectName, getSubjectTitle, saveSubjectModule } from "@/dashboard/teacher/components/subjects/upload/uploadModuleHelpers";
import type { ModuleErrors, SubjectUploadParams, SubjectUploadRouteState } from "@/dashboard/teacher/components/subjects/upload/uploadModuleTypes";
import { getFirstInvalidField, hasModuleErrors } from "@/dashboard/teacher/components/subjects/upload/uploadModuleValidation";
import { useUploadModuleForm } from "@/dashboard/teacher/components/subjects/upload/useUploadModuleForm";
import { appendClassIdToPath, getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function SubjectUploadModuleView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "" } = useParams<SubjectUploadParams>();
  const classId = getClassIdFromSearchParams(searchParams);
  const state = (location.state as SubjectUploadRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const existingModules = useSubjectModules(subjectId);
  const subjectFiles = useSubjectFiles(subjectId);
  const existingModuleTitles = useMemo(() => existingModules.map((module) => module.title), [existingModules]);
  const subjectName = useMemo(() => getSubjectName(subjectId, state), [state, subjectId]);
  const subjectTitle = useMemo(() => getSubjectTitle(subjectId, state), [state, subjectId]);
  const form = useUploadModuleForm({ existingModuleTitles });
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const subjectRoute = appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}`, classId);

  const scopedErrors = useMemo<ModuleErrors>(() => form.errors, [form.errors]);

  const goBackToSubject = () => {
    navigate(subjectRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } });
  };

  const handleSaveModule = async () => {
    if (saveStatus === "saving") return;
    if (hasModuleErrors(scopedErrors, form.submodules)) {
      setSaveStatus("error");
      setSaveMessage("Please fix the highlighted errors before saving.");
      form.setTouched({ moduleTitle: true, description: false, submodules: Object.fromEntries(form.submodules.map((submodule) => [submodule.id, { title: true, description: true, content: true }])) });
      document.getElementById(getFirstInvalidField(scopedErrors, form.submodules) ?? "")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSaveStatus("saving");
    setSaveMessage("Saving module...");

    try {
      saveSubjectModule(subjectId, form.moduleTitle, form.description, form.submodules, []);
      setSaveStatus("success");
      setSaveMessage("Module saved successfully.");
      window.setTimeout(() => {
        navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId), { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } });
      }, 700);
    } catch {
      setSaveStatus("error");
      setSaveMessage("Failed to save module. Please try again.");
    }
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <UploadModuleHeader title="Create Module" subjectName={subjectName} theme={theme} variant="create" onBack={goBackToSubject} />

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <div className="mt-0 grid gap-5">
            <UploadModuleBasicFields
              description={form.description}
              theme={theme}
              subjectTitle={subjectTitle}
              moduleTitle={form.moduleTitle}
              titleError={scopedErrors.moduleTitle}
              titleTouched={form.touched.moduleTitle}
              onDescriptionChange={form.setDescription}
              onTitleChange={form.setModuleTitle}
              onTitleBlur={() => form.setTouched((current) => ({ ...current, moduleTitle: true }))}
              variant="create"
            />

            <UploadModuleSubmodulesSection
              availableFiles={subjectFiles}
              subjectId={subjectId}
              submodules={form.submodules}
              attachmentsOpenBySubmoduleId={form.attachmentsOpenBySubmoduleId}
              errors={scopedErrors}
              touched={form.touched.submodules}
              onAdd={form.addSubmodule}
              onUpdate={form.updateSubmodule}
              onTouched={form.setSubmoduleTouched}
              onRemove={form.removeSubmodule}
              onToggleAttachments={form.toggleSubmoduleAttachments}
              onAddAttachedFile={form.addSubmoduleAttachedFile}
              onRemoveAttachedFile={form.removeSubmoduleAttachedFile}
            />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              {saveMessage ? (
                <p
                  className={`sm:mr-auto text-sm ${
                    saveStatus === "success"
                      ? "text-emerald-300"
                      : saveStatus === "error"
                        ? "text-red-300"
                        : "text-white/70"
                  }`}
                >
                  {saveMessage}
                </p>
              ) : null}
              <Button type="button" onClick={goBackToSubject} className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
                  <X className="h-4 w-4" />
                </span>
                Cancel
              </Button>
              <Button type="button" onClick={handleSaveModule} disabled={saveStatus === "saving"} className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300">
                  <Save className="h-4 w-4" />
                </span>
                {saveStatus === "saving" ? "Saving..." : "Save Module"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
