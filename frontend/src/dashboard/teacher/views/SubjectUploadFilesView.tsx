import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import {
  addSubjectFile,
  useSubjectFiles,
  useSubjectFolder,
  useSubjectFolders,
} from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import { buildSubjectFileContentKey, storeSubjectFileContent } from "@/dashboard/teacher/components/subjects/files/subjectFilesBinaryStorage";
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
import { UploadFilesFilePicker } from "./subject-upload-files/UploadFilesFilePicker";
import { UploadFilesFolderOptions } from "./subject-upload-files/UploadFilesFolderOptions";
import { UploadFilesFolderTargetFields } from "./subject-upload-files/UploadFilesFolderTargetFields";
import { UploadFilesFooterActions } from "./subject-upload-files/UploadFilesFooterActions";
import { UploadFilesHeader } from "./subject-upload-files/UploadFilesHeader";
import { UploadFilesSelectedFilesPreview } from "./subject-upload-files/UploadFilesSelectedFilesPreview";
import { UploadFilesStatusMessage } from "./subject-upload-files/UploadFilesStatusMessage";
import { UploadFilesTitleInput } from "./subject-upload-files/UploadFilesTitleInput";
import {
  buildPersistedPreview,
  formatSelectedFileSize,
  getUploadFilePreviewKind,
  renderUploadFilePreviewTile,
  type PreviewKind,
} from "./subject-upload-files/uploadFilesDisplayHelpers";

type Params = { subjectId?: string };
type FolderMode = "none" | "create" | "existing";
type UploadStatus = "idle" | "uploading" | "success" | "error";
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
const MAX_FILE_SIZE_BYTES = 17 * 1024 * 1024;
const UNSUPPORTED_FILE_MESSAGE = "Unsupported file type. Please upload PDF, Word, Excel, PowerPoint, JPG, or PNG files.";
const FILE_TOO_LARGE_MESSAGE = "File is too large. Maximum allowed size is 17 MB.";

function validateFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTENSIONS.includes(extension)) return UNSUPPORTED_FILE_MESSAGE;
  if (file.size > MAX_FILE_SIZE_BYTES) return FILE_TOO_LARGE_MESSAGE;
  return null;
}

function buildLocalId(prefix: string) {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return `${prefix}-${crypto.randomUUID()}`;
  } catch {
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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
      navigate(
        appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files`, classId),
        {
          replace: true,
          state: {
            restoreSubjectId: subjectId,
            subject: state?.subject ?? null,
          },
        },
      );
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
        previewUrl: getUploadFilePreviewKind(file) === "image" ? URL.createObjectURL(file) : null,
        previewKind: getUploadFilePreviewKind(file),
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
          previewUrl: await buildPersistedPreview(selectedFile, baseDraft.title, form.description),
        };

        if (duplicateDecision === "proceed" && duplicate) {
          const uniqueTitle = generateUniqueName(resolvedDraft.title, existingDestinationFiles.map((file) => file.name));
          const uniqueFileName = generateUniqueName(resolvedDraft.fileName, existingDestinationFiles.map((file) => file.originalFileName));
          resolvedDraft = {
            ...resolvedDraft,
            title: uniqueTitle,
            fileName: uniqueFileName,
            previewUrl: await buildPersistedPreview(selectedFile, uniqueTitle, form.description),
          };
        }

        const contentKey = buildSubjectFileContentKey(selectedFile.id);
        await storeSubjectFileContent(contentKey, selectedFile.file);
        resolvedDraft = {
          ...resolvedDraft,
          blobKey: contentKey,
        };

        const savedFile = addSubjectFile(subjectId, resolvedDraft);

        if (!savedFile) {
          failedCount += 1;
          continue;
        }

        uploadedCount += 1;
        if (!activeFolderId && savedFile.folderId) {
          activeFolderId = savedFile.folderId;
        }

        workingFiles = [savedFile, ...workingFiles];
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
          <UploadFilesHeader
            onBack={() => navigate(scopedFolder ? scopedFolderRoute : subjectRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })}
            subjectName={subjectName}
            theme={theme}
          />

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

              {!scopedFolder ? (
                <UploadFilesFolderOptions
                  onToggleCreate={() => setFolderMode("create")}
                  onToggleExisting={() => setFolderMode("existing")}
                />
              ) : null}

              <UploadFilesFolderTargetFields
                existingFolderError={existingFolderError}
                existingFolderId={form.existingFolderId}
                folderMode={form.folderMode}
                folderName={form.folderName}
                onExistingFolderChange={(value) => {
                  clearPendingDuplicate();
                  setForm((current) => ({ ...current, existingFolderId: value }));
                }}
                onFolderNameChange={(value) => {
                  clearPendingDuplicate();
                  setForm((current) => ({ ...current, folderName: value }));
                }}
                scopedFolder={scopedFolder}
                subjectFolders={subjectFolders}
              />

              <UploadFilesTitleInput
                disabled={!singleSelectedFile || selectedFiles.length > 1}
                onTitleChange={updateSingleFileTitle}
                selectedFilesCount={selectedFiles.length}
                title={singleSelectedFile?.title ?? ""}
                titleError={titleError}
              />

              <UploadFilesFilePicker
                fileError={fileError}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
                onOpenFileDialog={() => fileInputRef.current?.click()}
                selectedFilesCount={selectedFiles.length}
              />

              <UploadFilesSelectedFilesPreview
                files={selectedFiles}
                formatSelectedFileSize={formatSelectedFileSize}
                onRemoveFile={removeSelectedFile}
                renderPreviewTile={renderUploadFilePreviewTile}
              />

              <UploadFilesStatusMessage
                progressPercent={progressPercent}
                saving={saving}
                uploadMessage={uploadMessage}
                uploadProgress={uploadProgress}
                uploadStatus={uploadStatus}
              />

              <UploadFilesFooterActions
                canSubmit={!(saving || selectedFiles.length === 0 || Boolean(fileValidationError))}
                onCancel={() => navigate(scopedFolderRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })}
                onSubmit={handleUpload}
                saving={saving}
                selectedFilesCount={selectedFiles.length}
                uploadMessage={uploadMessage}
                uploadProgressTotal={uploadProgress.total}
                uploadStatus={uploadStatus}
              />
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



