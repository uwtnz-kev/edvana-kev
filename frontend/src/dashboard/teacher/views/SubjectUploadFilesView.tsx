import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { addSubjectFile, useSubjectFolder } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import { getSubjectName, getSubjectTitle } from "@/dashboard/teacher/components/subjects/upload/uploadModuleHelpers";
import type { SubjectUploadRouteState } from "@/dashboard/teacher/components/subjects/upload/uploadModuleTypes";
import { appendClassIdToPath, getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type Params = { subjectId?: string };

type FormState = {
  title: string;
  description: string;
  category: string;
  file: File | null;
  showFolderInput: boolean;
  folderName: string;
};

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function SubjectUploadFilesView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "" } = useParams<Params>();
  const scopedFolderId = searchParams.get("folderId")?.trim() ?? "";
  const classId = getClassIdFromSearchParams(searchParams);
  const state = (location.state as SubjectUploadRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const scopedFolder = useSubjectFolder(subjectId, scopedFolderId);
  const subjectName = useMemo(() => getSubjectName(subjectId, state), [state, subjectId]);
  const subjectTitle = useMemo(() => getSubjectTitle(subjectId, state), [state, subjectId]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<FormState>({ title: "", description: "", category: "", file: null, showFolderInput: false, folderName: "" });

  const filesRoute = appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files`, classId);
  const folderRoute = scopedFolderId ? appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/folders/${scopedFolderId}`, classId) : filesRoute;
  const subjectRoute = appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}`, classId);
  const titleError = submitted && form.title.trim().length === 0 ? "File title is required." : null;
  const fileError = submitted && !form.file ? "Please choose a file to upload." : null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setForm((current) => ({
      ...current,
      file,
      title: file ? file.name : current.title,
    }));
  };

  const handleUpload = async () => {
    setSubmitted(true);
    if (form.title.trim().length === 0 || !form.file) return;
    setSaving(true);
    try {
      const previewUrl = await readFileAsDataUrl(form.file);
        addSubjectFile(subjectId, {
          title: form.title,
          description: form.description,
          category: form.category,
          fileName: form.file.name,
          mimeType: form.file.type,
          previewUrl,
          sizeBytes: form.file.size,
          folderId: scopedFolder ? scopedFolder.id : null,
          folderName: scopedFolder ? null : form.folderName.trim().length > 0 ? form.folderName : null,
        });
      navigate(folderRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button type="button" onClick={() => navigate(scopedFolder ? folderRoute : subjectRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })} className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />Back
            </Button>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}><Upload className={`h-6 w-6 ${theme.iconClass}`} /></div>
              <div><h1 className="text-2xl font-semibold text-[var(--text-primary)]">Upload Files</h1><p className="mt-1 text-[var(--text-secondary)]">Subject: {subjectName}</p></div>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <div className="mt-0 grid gap-5">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}>
                <Upload className={`h-6 w-6 ${theme.iconClass}`} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Subject Files Upload</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{subjectTitle}</h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">Add a new file resource for {subjectTitle} by filling out the details below.</p>
              </div>
            </div>

            {scopedFolder ? (
              <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm font-medium text-white">Uploading into folder: {scopedFolder.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">This upload will be saved directly inside the current folder.</p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        showFolderInput: !current.showFolderInput,
                        folderName: current.showFolderInput ? "" : current.folderName,
                      }))
                    }
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                  >
                    Create Folder
                  </button>
                  <p className="text-xs text-white/50">(Optional)</p>
                </div>

                {form.showFolderInput ? (
                  <div className="space-y-2">
                    <Label htmlFor="folder-name" className="text-white">Folder Name (Optional)</Label>
                    <Input id="folder-name" value={form.folderName} onChange={(event) => setForm((current) => ({ ...current, folderName: event.target.value }))} placeholder="Enter folder name" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70" />
                  </div>
                ) : null}
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="file-title" className="text-white">File Title</Label>
              <Input id="file-title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Enter file title" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70" />
              {titleError ? <p className="mt-1 text-sm font-medium text-red-600">{titleError}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject-file" className="text-white">Choose File</Label>
              <input
                ref={fileInputRef}
                id="subject-file"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white/30 hover:bg-white/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.97] active:bg-white/25"
                >
                  Choose File
                </button>
              </div>
              {fileError ? <p className="mt-1 text-sm font-medium text-red-600">{fileError}</p> : null}
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" onClick={() => navigate(folderRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })} className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/20">
                Cancel
              </Button>
              <Button type="button" onClick={handleUpload} disabled={saving} className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30">
                {saving ? "Uploading..." : "Upload File"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
