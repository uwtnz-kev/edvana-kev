import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  File as FileIcon,
  FileImage,
  FileSpreadsheet,
  FileText,
  Presentation,
  Upload,
  X,
} from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import {
  addSubjectFile,
  replaceSubjectFile,
  useSubjectFiles,
  useSubjectFolder,
  useSubjectFolders,
} from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import type { SubjectFileDraft, SubjectFolderItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import { SubjectFileDuplicateDialog } from "@/dashboard/teacher/components/subjects/upload/SubjectFileDuplicateDialog";
import { useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import {
  findDuplicateFile,
  generateUniqueName,
  normalizeComparisonValue,
  resolveDuplicateFileLocations,
  type DuplicateDecision,
  type PendingDuplicateUpload,
} from "@/dashboard/teacher/components/subjects/upload/subjectFileDuplicateUtils";
import { getSubjectName, getSubjectTitle } from "@/dashboard/teacher/components/subjects/upload/uploadModuleHelpers";
import type { SubjectUploadRouteState } from "@/dashboard/teacher/components/subjects/upload/uploadModuleTypes";
import { appendClassIdToPath, getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type Params = { subjectId?: string };
type FolderMode = "none" | "create" | "existing";
type UploadStatus = "idle" | "uploading" | "success" | "error";
type PreviewKind = "image" | "pdf" | "doc" | "ppt" | "xls" | "file";
type UploadDraft = SubjectFileDraft & { folderId?: string | null };

type FormState = {
  description: string;
  category: string;
  folderMode: FolderMode;
  folderName: string;
  existingFolderId: string;
};

type SelectedUploadFile = {
  id: string;
  file: File;
  title: string;
  previewUrl: string | null;
  previewKind: PreviewKind;
};

type UploadProgress = {
  current: number;
  total: number;
  currentFileName: string;
};

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "jpg", "jpeg", "png"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const UNSUPPORTED_FILE_MESSAGE = "Unsupported file type. Please upload PDF, Word, Excel, PowerPoint, JPG, or PNG files.";
const FILE_TOO_LARGE_MESSAGE = "File is too large. Maximum allowed size is 10 MB.";

function buildLocalId(prefix: string) {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return `${prefix}-${crypto.randomUUID()}`;
  } catch {
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function validateFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTENSIONS.includes(extension)) return UNSUPPORTED_FILE_MESSAGE;
  if (file.size > MAX_FILE_SIZE_BYTES) return FILE_TOO_LARGE_MESSAGE;
  return null;
}

function getPreviewKind(file: File): PreviewKind {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png"].includes(extension)) return "image";
  if (extension === "pdf") return "pdf";
  if (["doc", "docx"].includes(extension)) return "doc";
  if (["ppt", "pptx"].includes(extension)) return "ppt";
  if (["xls", "xlsx"].includes(extension)) return "xls";
  return "file";
}

function formatSelectedFileSize(sizeBytes: number) {
  if (sizeBytes >= 1024 * 1024) return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
  if (sizeBytes >= 1024) return `${Math.round(sizeBytes / 1024)} KB`;
  return `${sizeBytes} B`;
}

function encodePreviewSvg(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildPersistedPreview(file: SelectedUploadFile, title: string, description: string) {
  const previewLabels: Record<PreviewKind, { label: string; accent: string }> = {
    image: { label: "IMAGE", accent: "#38bdf8" },
    pdf: { label: "PDF", accent: "#f87171" },
    doc: { label: "DOC", accent: "#60a5fa" },
    ppt: { label: "PPT", accent: "#fb923c" },
    xls: { label: "XLS", accent: "#34d399" },
    file: { label: "FILE", accent: "#cbd5e1" },
  };
  const preview = previewLabels[file.previewKind];
  const safeTitle = title.replace(/[<>&]/g, "");
  const safeDescription = (description.trim() || file.file.name).replace(/[<>&]/g, "");

  return encodePreviewSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
    <rect width="1200" height="1600" fill="#07111f" />
    <rect x="70" y="70" width="1060" height="1460" rx="42" fill="#0f1c30" stroke="${preview.accent}" stroke-width="6" />
    <rect x="120" y="140" width="220" height="56" rx="28" fill="${preview.accent}" fill-opacity="0.2" />
    <text x="230" y="177" text-anchor="middle" fill="${preview.accent}" font-family="Arial, sans-serif" font-size="28" font-weight="700">${preview.label}</text>
    <text x="120" y="280" fill="#ffffff" font-family="Arial, sans-serif" font-size="60" font-weight="700">${safeTitle}</text>
    <foreignObject x="120" y="340" width="960" height="820">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color:#d7e3f4;font-family:Arial,sans-serif;font-size:34px;line-height:1.45;white-space:pre-wrap;">${safeDescription}</div>
    </foreignObject>
    <rect x="120" y="1270" width="960" height="2" fill="#29435c" />
    <text x="120" y="1335" fill="#8ca6c6" font-family="Arial,sans-serif" font-size="28">${file.file.name}</text>
  </svg>`);
}

function resolveTargetFolderId(form: FormState, scopedFolder: SubjectFolderItem | null, subjectFolders: SubjectFolderItem[]) {
  if (scopedFolder) return scopedFolder.id;
  if (form.folderMode === "existing" && form.existingFolderId.trim().length > 0) return form.existingFolderId.trim();
  if (form.folderMode === "create" && form.folderName.trim().length > 0) {
    return subjectFolders.find((folder) => normalizeComparisonValue(folder.name) === normalizeComparisonValue(form.folderName))?.id ?? null;
  }
  return null;
}

function revokePreviewUrls(files: SelectedUploadFile[]) {
  files.forEach((file) => {
    if (file.previewUrl) {
      URL.revokeObjectURL(file.previewUrl);
    }
  });
}

function renderPreviewTile(file: SelectedUploadFile) {
  if (file.previewKind === "image" && file.previewUrl) {
    return <img src={file.previewUrl} alt={file.file.name} className="h-full w-full object-cover" />;
  }

  const previewMap: Record<Exclude<PreviewKind, "image">, { label: string; icon: typeof FileIcon; tileClass: string }> = {
    pdf: { label: "PDF", icon: FileText, tileClass: "bg-red-500/15 text-red-300" },
    doc: { label: "DOC", icon: FileText, tileClass: "bg-blue-500/15 text-blue-300" },
    ppt: { label: "PPT", icon: Presentation, tileClass: "bg-orange-500/15 text-orange-300" },
    xls: { label: "XLS", icon: FileSpreadsheet, tileClass: "bg-emerald-500/15 text-emerald-300" },
    file: { label: "FILE", icon: FileIcon, tileClass: "bg-white/10 text-white/70" },
  };
  const preview = previewMap[file.previewKind];
  const Icon = preview.icon;

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-2 ${preview.tileClass}`}>
      <Icon className="h-8 w-8" />
      <span className="text-xs font-semibold tracking-[0.18em]">{preview.label}</span>
    </div>
  );
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
  const subjectFolders = useSubjectFolders(subjectId);
  const subjectFiles = useSubjectFiles(subjectId);
  const subjectModules = useSubjectModules(subjectId);
  const subjectName = useMemo(() => getSubjectName(subjectId, state), [state, subjectId]);
  const subjectTitle = useMemo(() => getSubjectTitle(subjectId, state), [state, subjectId]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fileValidationError, setFileValidationError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [pendingDuplicateUpload, setPendingDuplicateUpload] = useState<PendingDuplicateUpload | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<SelectedUploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ current: 0, total: 0, currentFileName: "" });
  const duplicateDecisionRef = useRef<((decision: DuplicateDecision) => void) | null>(null);
  const selectedFilesRef = useRef<SelectedUploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<FormState>({
    description: "",
    category: "",
    folderMode: "none",
    folderName: "",
    existingFolderId: "",
  });

  useEffect(() => {
    selectedFilesRef.current = selectedFiles;
  }, [selectedFiles]);

  useEffect(() => () => {
    revokePreviewUrls(selectedFilesRef.current);
  }, []);

  const filesRoute = appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files`, classId);
  const scopedFolderRoute = scopedFolderId
    ? appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/folders/${scopedFolderId}`, classId)
    : filesRoute;
  const subjectRoute = appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}`, classId);
  const singleSelectedFile = selectedFiles.length === 1 ? selectedFiles[0] : null;
  const titleError = submitted && singleSelectedFile && singleSelectedFile.title.trim().length === 0 ? "File title is required." : null;
  const fileError = fileValidationError ?? (submitted && selectedFiles.length === 0 ? "Please choose at least one file to upload." : null);
  const existingFolderError =
    submitted && !scopedFolder && form.folderMode === "existing" && form.existingFolderId.trim().length === 0
      ? "Please select a folder."
      : null;
  const progressPercent = uploadProgress.total > 0 ? Math.round((uploadProgress.current / uploadProgress.total) * 100) : 0;

  const clearPendingDuplicate = () => {
    setDuplicateDialogOpen(false);
    setPendingDuplicateUpload(null);
    duplicateDecisionRef.current = null;
  };

  const navigateAfterUpload = () => {
    window.setTimeout(() => {
      navigate(filesRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } });
    }, 700);
  };

  const requestDuplicateDecision = (payload: PendingDuplicateUpload) => {
    setPendingDuplicateUpload(payload);
    setDuplicateDialogOpen(true);
    return new Promise<DuplicateDecision>((resolve) => {
      duplicateDecisionRef.current = resolve;
    });
  };

  const resolveDuplicateDecision = (decision: DuplicateDecision) => {
    setDuplicateDialogOpen(false);
    setPendingDuplicateUpload(null);
    const resolver = duplicateDecisionRef.current;
    duplicateDecisionRef.current = null;
    resolver?.(decision);
  };

  const updateSingleFileTitle = (title: string) => {
    setSelectedFiles((current) => current.map((file, index) => (index === 0 ? { ...file, title } : file)));
  };

  const removeSelectedFile = (fileId: string) => {
    setSubmitted(false);
    setFileValidationError(null);
    setSelectedFiles((current) => {
      const nextFiles = current.filter((file) => file.id !== fileId);
      const removedFile = current.find((file) => file.id === fileId);
      if (removedFile?.previewUrl) {
        URL.revokeObjectURL(removedFile.previewUrl);
      }
      return nextFiles;
    });
    if (fileInputRef.current && selectedFiles.length <= 1) {
      fileInputRef.current.value = "";
    }
  };

  const setFolderMode = (nextMode: Exclude<FolderMode, "none">) => {
    clearPendingDuplicate();
    setForm((current) => ({
      ...current,
      folderMode: current.folderMode === nextMode ? "none" : nextMode,
      folderName: nextMode === "create" && current.folderMode !== "create" ? current.folderName : nextMode === "existing" ? "" : current.folderName,
      existingFolderId: nextMode === "existing" && current.folderMode !== "existing" ? current.existingFolderId : nextMode === "create" ? "" : current.existingFolderId,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const pickedFiles = Array.from(event.target.files ?? []);
    clearPendingDuplicate();
    setSubmitted(false);

    if (pickedFiles.length === 0) {
      revokePreviewUrls(selectedFilesRef.current);
      setSelectedFiles([]);
      setFileValidationError(null);
      return;
    }

    const validFiles: SelectedUploadFile[] = [];
    const invalidMessages: string[] = [];

    pickedFiles.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        invalidMessages.push(validationError);
        return;
      }

      validFiles.push({
        id: buildLocalId("upload-file"),
        file,
        title: file.name,
        previewUrl: getPreviewKind(file) === "image" ? URL.createObjectURL(file) : null,
        previewKind: getPreviewKind(file),
      });
    });

    revokePreviewUrls(selectedFilesRef.current);
    setSelectedFiles(validFiles);

    if (validFiles.length === 0) {
      setFileValidationError(invalidMessages[0] ?? "Please choose at least one file to upload.");
      event.target.value = "";
      return;
    }

    if (invalidMessages.length > 0) {
      setFileValidationError(`Some selected files were skipped. ${invalidMessages[0]}`);
    } else {
      setFileValidationError(null);
    }
  };

  const buildDraftForFile = (file: SelectedUploadFile, folderId: string | null, folderName: string | null): UploadDraft => ({
    title: file.title.trim() || file.file.name,
    description: form.description,
    category: form.category,
    fileName: file.file.name,
    mimeType: file.file.type,
    sizeBytes: file.file.size,
    previewUrl: "",
    folderId,
    folderName,
  });

  const handleUpload = async () => {
    if (saving) return;
    setSubmitted(true);

    if (selectedFiles.length === 0 || fileValidationError) return;
    if (singleSelectedFile && singleSelectedFile.title.trim().length === 0) return;
    if (!scopedFolder && form.folderMode === "existing" && form.existingFolderId.trim().length === 0) return;

    const matchedFolderId = resolveTargetFolderId(form, scopedFolder, subjectFolders);
    const createFolderName = !scopedFolder && form.folderMode === "create" && form.folderName.trim().length > 0 ? form.folderName.trim() : null;
    const creatingNewFolder = Boolean(createFolderName) && !matchedFolderId;

    setSaving(true);
    setUploadStatus("uploading");
    setUploadMessage(selectedFiles.length > 1 ? `Uploading 1 of ${selectedFiles.length}` : "Uploading file...");
    setUploadProgress({ current: 0, total: selectedFiles.length, currentFileName: "" });

    let workingFiles = [...subjectFiles];
    let activeFolderId = matchedFolderId ?? scopedFolder?.id ?? null;
    let uploadedCount = 0;
    let failedCount = 0;
    let lastSavedFolderId: string | null = activeFolderId;

    try {
      for (let index = 0; index < selectedFiles.length; index += 1) {
        const selectedFile = selectedFiles[index];
        const folderNameForDraft = !activeFolderId && createFolderName ? createFolderName : null;
        const existingDestinationFiles = creatingNewFolder && !activeFolderId
          ? []
          : workingFiles.filter((file) => file.folderId === activeFolderId);
        const baseDraft = buildDraftForFile(selectedFile, activeFolderId, folderNameForDraft);
        const duplicate = creatingNewFolder && !activeFolderId
          ? existingDestinationFiles.find((file) => normalizeComparisonValue(file.name) === normalizeComparisonValue(baseDraft.title) || normalizeComparisonValue(file.originalFileName) === normalizeComparisonValue(baseDraft.fileName)) ?? null
          : findDuplicateFile(workingFiles, activeFolderId, baseDraft.title, baseDraft.fileName);

        setUploadProgress({ current: index + 1, total: selectedFiles.length, currentFileName: selectedFile.file.name });
        setUploadMessage(selectedFiles.length > 1 ? `Uploading ${index + 1} of ${selectedFiles.length}` : "Uploading file...");

        let duplicateDecision: DuplicateDecision | null = null;
        if (duplicate) {
          duplicateDecision = await requestDuplicateDecision({
            duplicateFileId: duplicate.id,
            duplicateFileName: duplicate.name,
            existingLocations: resolveDuplicateFileLocations({
              duplicateFile: duplicate,
              subjectName,
              classId,
              folders: subjectFolders,
              modules: subjectModules,
            }),
          });
          if (duplicateDecision === "cancel") {
            failedCount += 1;
            continue;
          }
        }

        let resolvedDraft: UploadDraft = {
          ...baseDraft,
          previewUrl: buildPersistedPreview(selectedFile, baseDraft.title, form.description),
        };

        if (duplicateDecision === "keep-both") {
          const uniqueTitle = generateUniqueName(resolvedDraft.title, existingDestinationFiles.map((file) => file.name));
          const uniqueFileName = generateUniqueName(resolvedDraft.fileName, existingDestinationFiles.map((file) => file.originalFileName));
          resolvedDraft = {
            ...resolvedDraft,
            title: uniqueTitle,
            fileName: uniqueFileName,
            previewUrl: buildPersistedPreview(selectedFile, uniqueTitle, form.description),
          };
        }

        const savedFile = duplicateDecision === "replace" && duplicate
          ? replaceSubjectFile(subjectId, duplicate.id, resolvedDraft)
          : addSubjectFile(subjectId, resolvedDraft);

        if (!savedFile) {
          failedCount += 1;
          continue;
        }

        uploadedCount += 1;
        lastSavedFolderId = savedFile.folderId;
        if (!activeFolderId && savedFile.folderId) {
          activeFolderId = savedFile.folderId;
        }

        if (duplicateDecision === "replace" && duplicate) {
          workingFiles = workingFiles.map((file) => (file.id === duplicate.id ? savedFile : file));
        } else {
          workingFiles = [savedFile, ...workingFiles];
        }
      }

      if (uploadedCount === 0) {
        setUploadStatus("error");
        setUploadMessage("No files were uploaded.");
        return;
      }

      setUploadProgress({ current: selectedFiles.length, total: selectedFiles.length, currentFileName: "" });
      setUploadStatus("success");
      setUploadMessage(
        failedCount > 0
          ? `Uploaded ${uploadedCount} of ${selectedFiles.length} files.`
          : uploadedCount > 1
            ? `Uploaded ${uploadedCount} files successfully.`
            : "File uploaded successfully.",
      );
      navigateAfterUpload();
    } catch {
      setUploadStatus("error");
      setUploadMessage("Upload failed. Please try again.");
    } finally {
      setSaving(false);
      clearPendingDuplicate();
    }
  };

  return (
    <>
      <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
        <div className="mx-auto w-full max-w-6xl space-y-4">
          <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="button" onClick={() => navigate(scopedFolder ? scopedFolderRoute : subjectRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })} className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm">
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
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">Add one or more file resources for {subjectTitle} by filling out the details below.</p>
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
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setFolderMode("create")}
                          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                        >
                          Create Folder
                        </button>
                        <p className="text-xs text-white/50">(Optional)</p>
                      </div>
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setFolderMode("existing")}
                          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                        >
                          Upload to Existing Folder
                        </button>
                        <p className="text-xs text-white/50">(Optional)</p>
                      </div>
                    </div>
                  </div>
                  

                  {form.folderMode === "create" ? (
                    <div className="space-y-2">
                      <Label htmlFor="folder-name" className="text-white">Folder Name</Label>
                      <Input
                        id="folder-name"
                        value={form.folderName}
                        onChange={(event) => {
                          clearPendingDuplicate();
                          setForm((current) => ({ ...current, folderName: event.target.value }));
                        }}
                        placeholder="Enter folder name"
                        className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
                      />
                    </div>
                  ) : null}

                  {form.folderMode === "existing" ? (
                    <div className="space-y-2">
                      <Label htmlFor="existing-folder" className="text-white">Folder</Label>
                      <Select value={form.existingFolderId} onValueChange={(value) => {
                        clearPendingDuplicate();
                        setForm((current) => ({ ...current, existingFolderId: value }));
                      }} disabled={subjectFolders.length === 0}>
                        <SelectTrigger id="existing-folder" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white">
                          <SelectValue placeholder={subjectFolders.length > 0 ? "Select a folder" : "No folders available"} />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-[#1b2430]/95 text-white backdrop-blur-xl">
                          {subjectFolders.map((folder) => (
                            <SelectItem key={folder.id} value={folder.id} className="focus:bg-white/10">
                              {folder.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {existingFolderError ? <p className="mt-1 text-sm font-medium text-red-600">{existingFolderError}</p> : null}
                      {subjectFolders.length === 0 ? <p className="text-xs text-[var(--text-secondary)]">No existing folders are available for this subject yet.</p> : null}
                    </div>
                  ) : null}
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="file-title" className="text-white">File Title</Label>
                <Input
                  id="file-title"
                  value={singleSelectedFile?.title ?? ""}
                  onChange={(event) => updateSingleFileTitle(event.target.value)}
                  disabled={!singleSelectedFile || selectedFiles.length > 1}
                  placeholder={selectedFiles.length > 1 ? "Titles will use each filename during multi-file upload" : "Enter file title"}
                  className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-70"
                />
                {selectedFiles.length > 1 ? <p className="text-xs text-[var(--text-secondary)]">Multiple files selected. Each upload will use its filename as the default title.</p> : null}
                {titleError ? <p className="mt-1 text-sm font-medium text-red-600">{titleError}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject-file" className="text-white">Choose Files</Label>
                <input
                  ref={fileInputRef}
                  id="subject-file"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white/30 hover:bg-white/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.97] active:bg-white/25"
                  >
                    Choose Files
                  </button>
                  {selectedFiles.length > 0 ? <span className="text-sm text-white/70">{selectedFiles.length} selected</span> : null}
                </div>
                {fileError ? <p className="mt-1 text-sm font-medium text-red-600">{fileError}</p> : null}
              </div>

              {selectedFiles.length > 0 ? (
                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Selected files</p>
                    <p className="text-xs text-[var(--text-secondary)]">Preview selected files before uploading.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {selectedFiles.map((file) => (
                      <article key={file.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                        <div className="relative h-32 w-full overflow-hidden bg-white/5">
                          {renderPreviewTile(file)}
                          <button
                            type="button"
                            onClick={() => removeSelectedFile(file.id)}
                            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#1b2430]/80 text-white transition hover:bg-[#243041]"
                            aria-label={`Remove ${file.file.name}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-1 p-3">
                          <p className="truncate text-sm font-medium text-white" title={file.title}>{file.title}</p>
                          <p className="truncate text-xs text-[var(--text-secondary)]" title={file.file.name}>{file.file.name}</p>
                          <div className="flex items-center gap-2 text-xs text-white/55">
                            {file.previewKind === "image" ? <FileImage className="h-3.5 w-3.5" /> : <FileIcon className="h-3.5 w-3.5" />}
                            <span>{formatSelectedFileSize(file.file.size)}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {(saving || uploadMessage) && uploadProgress.total > 0 ? (
                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className={`text-sm font-medium ${uploadStatus === "error" ? "text-red-300" : uploadStatus === "success" ? "text-emerald-300" : "text-white"}`}>
                      {uploadMessage ?? "Uploading file..."}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {saving ? `Uploading ${uploadProgress.current} of ${uploadProgress.total}` : `${uploadProgress.total} file${uploadProgress.total === 1 ? "" : "s"}`}
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${uploadStatus === "error" ? "bg-red-400" : uploadStatus === "success" ? "bg-emerald-400" : "bg-cyan-400"}`}
                      style={{ width: `${saving ? progressPercent : uploadStatus === "success" ? 100 : progressPercent}%` }}
                    />
                  </div>
                  {saving && uploadProgress.currentFileName ? <p className="truncate text-xs text-white/60">{uploadProgress.currentFileName}</p> : null}
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {!uploadProgress.total && uploadMessage ? (
                  <p
                    className={`sm:mr-auto text-sm ${
                      uploadStatus === "success"
                        ? "text-emerald-300"
                        : uploadStatus === "error"
                          ? "text-red-300"
                          : "text-white/70"
                    }`}
                  >
                    {uploadMessage}
                  </p>
                ) : null}
                <Button type="button" onClick={() => navigate(scopedFolderRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })} className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/20">
                  Cancel
                </Button>
                <Button type="button" onClick={handleUpload} disabled={saving || selectedFiles.length === 0 || Boolean(fileValidationError)} className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60">
                  {saving ? "Uploading..." : selectedFiles.length > 1 ? "Upload Files" : "Upload File"}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SubjectFileDuplicateDialog
        open={duplicateDialogOpen}
        duplicateFileName={pendingDuplicateUpload?.duplicateFileName ?? null}
        existingLocations={pendingDuplicateUpload?.existingLocations ?? []}
        onDecision={resolveDuplicateDecision}
        onOpenChange={(open) => {
          if (saving) return;
          if (!open) {
            resolveDuplicateDecision("cancel");
            return;
          }
          setDuplicateDialogOpen(true);
        }}
      />
    </>
  );
}
