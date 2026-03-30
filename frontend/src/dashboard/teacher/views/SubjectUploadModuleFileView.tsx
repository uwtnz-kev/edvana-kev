// Orchestrates the minimal upload-module-from-PC flow using existing module and subject-file stores.
import { useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { useSubjectFiles } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import { useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import { SubjectModuleAttachedFilesSection } from "@/dashboard/teacher/components/subjects/upload/SubjectModuleAttachedFilesSection";
import { UploadModuleBasicFields } from "@/dashboard/teacher/components/subjects/upload/UploadModuleBasicFields";
import { UploadModuleHeader } from "@/dashboard/teacher/components/subjects/upload/UploadModuleHeader";
import { createEmptySubmodule, getSubjectName, getSubjectTitle, isSubmoduleBlank, saveSubjectModule } from "@/dashboard/teacher/components/subjects/upload/uploadModuleHelpers";
import type { SubjectUploadParams, SubjectUploadRouteState, SubmoduleDraft } from "@/dashboard/teacher/components/subjects/upload/uploadModuleTypes";
import { buildModuleErrors } from "@/dashboard/teacher/components/subjects/upload/uploadModuleValidation";
import { appendClassIdToPath, getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function SubjectUploadModuleFileView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "" } = useParams<SubjectUploadParams>();
  const classId = getClassIdFromSearchParams(searchParams);
  const state = (location.state as SubjectUploadRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectFiles = useSubjectFiles(subjectId);
  const existingModules = useSubjectModules(subjectId);
  const existingModuleTitles = useMemo(() => existingModules.map((module) => module.title), [existingModules]);
  const subjectName = useMemo(() => getSubjectName(subjectId, state), [state, subjectId]);
  const subjectTitle = useMemo(() => getSubjectTitle(subjectId, state), [state, subjectId]);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [submodules, setSubmodules] = useState<SubmoduleDraft[]>([createEmptySubmodule()]);
  const [submitted, setSubmitted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const errors = useMemo(() => buildModuleErrors(moduleTitle, "", submodules, existingModuleTitles), [existingModuleTitles, moduleTitle, submodules]);
  const submoduleFileErrors = useMemo(() => Object.fromEntries(
    submodules.map((submodule) => {
      return [submodule.id, submitted && submodule.attachedFileIds.length === 0 ? "Please upload a file for this submodule." : null];
    }),
  ) as Record<string, string | null>, [submodules, submitted]);
  const subjectRoute = appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}`, classId);
  const modulesRoute = appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId);

  const addSubmodule = () => setSubmodules((current) => [...current, createEmptySubmodule()]);
  const removeSubmodule = (submoduleId: string) => setSubmodules((current) => {
    if (current.length <= 1) return current;
    return current.filter((item) => item.id !== submoduleId);
  });
  const updateSubmodule = (submoduleId: string, updates: Partial<SubmoduleDraft>) => {
    setSubmodules((current) => current.map((item) => item.id === submoduleId ? { ...item, ...updates } : item));
  };

  const handleSave = () => {
    if (saveStatus === "saving") return;

    setSubmitted(true);
    setTitleTouched(true);

    const hasSubmoduleTitleErrors = submodules.some((submodule) => Boolean(errors.submodules[submodule.id]?.title) || submodule.title.trim().length === 0);
    const hasMissingSubmoduleFiles = submodules.some((submodule) => submodule.attachedFileIds.length === 0);

    if (errors.moduleTitle || hasSubmoduleTitleErrors || hasMissingSubmoduleFiles) {
      setSaveStatus("error");
      setSaveMessage("Please complete the required fields before saving.");
      return;
    }

    setSaveStatus("saving");
    setSaveMessage("Saving module...");

    try {
      saveSubjectModule(subjectId, moduleTitle, moduleDescription, submodules, []);
      setSaveStatus("success");
      setSaveMessage("Module created successfully.");
      window.setTimeout(() => {
        navigate(modulesRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } });
      }, 700);
    } catch {
      setSaveStatus("error");
      setSaveMessage("Failed to create module. Please try again.");
    }
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <UploadModuleHeader
          title="Upload Module"
          subjectName={subjectName}
          theme={theme}
          onBack={() => navigate(subjectRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })}
        />

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <div className="mt-0 grid gap-5">
            <UploadModuleBasicFields
              description={moduleDescription}
              theme={theme}
              subjectTitle={subjectTitle}
              moduleTitle={moduleTitle}
              titleError={errors.moduleTitle}
              titleTouched={submitted || titleTouched}
              onDescriptionChange={setModuleDescription}
              onTitleChange={setModuleTitle}
              onTitleBlur={() => setTitleTouched(true)}
              showDescriptionField={false}
            />

            <div className="space-y-2">
              <Label htmlFor="module-description" className="text-white">Module Description (optional)</Label>
              <textarea
                id="module-description"
                value={moduleDescription}
                onChange={(event) => setModuleDescription(event.target.value)}
                placeholder="Describe what this module covers..."
                className="w-full min-h-[100px] resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-4">
              <div>
                <div>
                  <p className="text-sm font-semibold text-white">Submodules</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">Add uploaded submodules to this module before saving.</p>
                </div>
              </div>

              <div className="space-y-4">
                {submodules.map((submodule, index) => (
                  <div key={submodule.id} className="space-y-4 rounded-2xl border border-white/15 bg-white/10 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div />
                      {submodules.length > 1 ? (
                        <Button type="button" variant="outline" onClick={() => removeSubmodule(submodule.id)} className="rounded-2xl border-red-400/20 bg-red-500/10 px-4 py-2 text-white transition-all duration-200 hover:bg-red-500/20 hover:border-red-400/30 hover:text-white">
                          <Trash2 className="mr-2 h-4 w-4 text-red-300" />
                          Remove Submodule
                        </Button>
                      ) : null}
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label htmlFor={submodule.id} className="text-white">Submodule title</Label>
                      <Input
                        id={submodule.id}
                        value={submodule.title}
                        onChange={(event) => updateSubmodule(submodule.id, { title: event.target.value })}
                        placeholder="Enter submodule title"
                        className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
                      />
                      {submitted && (errors.submodules[submodule.id]?.title || submodule.title.trim().length === 0) ? <p className="text-sm font-medium text-red-600">{errors.submodules[submodule.id]?.title ?? "Submodule title is required."}</p> : null}
                    </div>

                    <div className="mt-4 space-y-2">
                      <SubjectModuleAttachedFilesSection
                        availableFiles={subjectFiles}
                        selectedFileIds={submodule.attachedFileIds}
                        subjectId={subjectId}
                        enableUploadNewFile
                        idPrefix={`upload-module-submodule-${submodule.id}`}
                        maxSelectedFiles={1}
                        showAttachExistingFile={false}
                        onAddFile={(fileId) => updateSubmodule(submodule.id, { attachedFileIds: [fileId] })}
                        onRemoveFile={(fileId) => updateSubmodule(submodule.id, { attachedFileIds: submodule.attachedFileIds.filter((id) => id !== fileId) })}
                      />
                      {submoduleFileErrors[submodule.id] ? <p className="text-sm font-medium text-red-600">{submoduleFileErrors[submodule.id]}</p> : null}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Button type="button" onClick={addSubmodule} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-white transition-colors duration-200 hover:bg-white/20">
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300"><Plus className="h-4 w-4" /></span>
                  Add Submodule
                </Button>
              </div>
            </div>

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
              <Button type="button" onClick={() => navigate(subjectRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })} className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
                  <X className="h-4 w-4" />
                </span>
                Cancel
              </Button>
              <Button type="button" onClick={handleSave} disabled={saveStatus === "saving"} className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300"><Plus className="h-4 w-4" /></span>
                {saveStatus === "saving" ? "Saving..." : "Create Module"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}













