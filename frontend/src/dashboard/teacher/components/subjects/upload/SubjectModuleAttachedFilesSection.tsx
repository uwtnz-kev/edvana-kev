import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { Paperclip, Upload, X } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { validateUploadFile } from "@/dashboard/teacher/components/shared";
import { buildSubjectFileContentKey, storeSubjectFileContent } from "@/dashboard/teacher/components/subjects/files/subjectFilesBinaryStorage";
import { addSubjectFile, useSubjectFolders } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import type { SubjectFileItem, SubjectFileVisibility } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import { useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import { getClassIdFromSearchParams } from "@/dashboard/teacher/views/subjects/subjectClassRouting";
import { buildPersistedPreview, getUploadFilePreviewKind } from "@/dashboard/teacher/views/subject-upload-files/uploadFilesDisplayHelpers";
import { SubjectFileDuplicateDialog } from "./SubjectFileDuplicateDialog";
import { findDuplicateFile, generateUniqueName, resolveDuplicateFileLocations, type DuplicateDecision } from "./subjectFileDuplicateUtils";
import { getSubjectName } from "./uploadModuleHelpers";
import type { SubjectUploadRouteState } from "./uploadModuleTypes";

type UploadDestinationChoice = SubjectFileVisibility;

type Props = {
  availableFiles: SubjectFileItem[];
  selectedFileIds: string[];
  onAddFile: (fileId: string) => void;
  onRemoveFile: (fileId: string) => void;
  subjectId?: string;
  enableUploadNewFile?: boolean;
  idPrefix?: string;
  maxSelectedFiles?: number;
  showAttachExistingFile?: boolean;
};


function buildLocalUploadId(prefix: string) {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return `${prefix}-${crypto.randomUUID()}`;
  } catch {
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}


export function SubjectModuleAttachedFilesSection({ availableFiles, selectedFileIds, onAddFile, onRemoveFile, subjectId, enableUploadNewFile = false, idPrefix = "module-attached-files", maxSelectedFiles = Number.POSITIVE_INFINITY, showAttachExistingFile = true }: Props) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const classId = getClassIdFromSearchParams(searchParams);
  const routeState = (location.state as SubjectUploadRouteState | null) ?? null;
  const subjectFolders = useSubjectFolders(subjectId ?? '');
  const subjectModules = useSubjectModules(subjectId ?? '');
  const subjectName = useMemo(() => getSubjectName(subjectId ?? '', routeState), [routeState, subjectId]);
  const selectedFiles = selectedFileIds
    .map((fileId) => availableFiles.find((file) => file.id === fileId) ?? null)
    .filter((file): file is SubjectFileItem => file !== null);
  const selectableFiles = availableFiles.filter((file) => !selectedFileIds.includes(file.id));
  const topLevelFiles = availableFiles.filter((file) => file.folderId === null);
  const hasReachedSelectionLimit = selectedFileIds.length >= maxSelectedFiles;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadTone, setUploadTone] = useState<"neutral" | "success" | "error">("neutral");
  const [uploading, setUploading] = useState(false);
  const [selectedUploadName, setSelectedUploadName] = useState<string | null>(null);
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingDuplicateFile, setPendingDuplicateFile] = useState<SubjectFileItem | null>(null);
  const [pendingDuplicateLocations, setPendingDuplicateLocations] = useState<string[]>([]);
  const [pendingDestinationChoice, setPendingDestinationChoice] = useState<UploadDestinationChoice | null>(null);
  const existingFileSelectId = `${idPrefix}-existing`;
  const newFileInputId = `${idPrefix}-new`;

  const resetPendingUpload = () => {
    setVisibilityDialogOpen(false);
    setDuplicateDialogOpen(false);
    setPendingFile(null);
    setPendingDuplicateFile(null);
    setPendingDuplicateLocations([]);
    setPendingDestinationChoice(null);
  };

  const completeUpload = async (file: File, decision: DuplicateDecision, duplicateFile: SubjectFileItem | null, visibility: UploadDestinationChoice) => {
    if (!subjectId) return;

    setUploading(true);
    setUploadTone("neutral");
    setUploadMessage("Uploading file...");

    try {
      const uploadId = buildLocalUploadId("upload-file");

      let previewUrl = "";
      try {
        previewUrl = await buildPersistedPreview({
          file,
          previewKind: getUploadFilePreviewKind(file),
          previewUrl: null,
        }, file.name, "");
      } catch (error) {
        console.error("[UploadModule][AttachedFile] buildPersistedPreview failed", {
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          error,
        });
        setUploadTone("error");
        setUploadMessage("Failed to build file preview for this submodule upload.");
        return;
      }

      const contentKey = buildSubjectFileContentKey(uploadId);
      try {
        await storeSubjectFileContent(contentKey, file);
      } catch (error) {
        console.error("[UploadModule][AttachedFile] storeSubjectFileContent failed", {
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          contentKey,
          error,
        });
        setUploadTone("error");
        setUploadMessage("Failed to store file content for this submodule upload.");
        return;
      }
      const draftBase = {
        title: file.name,
        description: "",
        category: "General",
        fileName: file.name,
        mimeType: file.type,
        previewUrl,
        sizeBytes: file.size,
        blobKey: contentKey,
        folderId: null,
        visibility,
      };

      const finalDraft = decision === "proceed" && duplicateFile
        ? {
            ...draftBase,
            title: generateUniqueName(draftBase.title, topLevelFiles.map((item) => item.name)),
            fileName: generateUniqueName(draftBase.fileName, topLevelFiles.map((item) => item.originalFileName)),
          }
        : draftBase;

      let maybeSavedFile: SubjectFileItem | null = null;
      try {
        maybeSavedFile = addSubjectFile(subjectId, finalDraft);
      } catch (error) {
        console.error("[UploadModule][AttachedFile] addSubjectFile failed", {
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          error,
        });
        setUploadTone("error");
        setUploadMessage("Failed to save this submodule file.");
        return;
      }

      if (maybeSavedFile === null) {
        console.error("[UploadModule][AttachedFile] addSubjectFile returned null", {
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        });
        setUploadTone("error");
        setUploadMessage("Failed to save this submodule file.");
        return;
      }

      const savedFile = maybeSavedFile;
      try {
        onAddFile(savedFile.id);
      } catch (error) {
        console.error("[UploadModule][AttachedFile] onAddFile failed", {
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          savedFileId: savedFile.id,
          error,
        });
        setUploadTone("error");
        setUploadMessage("Failed to attach this file to the submodule.");
        return;
      }
      setUploadTone("success");
      setUploadMessage("File uploaded and attached successfully.");
      setSelectedUploadName(savedFile.originalFileName);
    } catch {
      setUploadTone("error");
      setUploadMessage("Failed to upload and attach file. Please try again.");
    } finally {
      setUploading(false);
      resetPendingUpload();
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFilePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    resetPendingUpload();

    if (!file || !subjectId) return;

    if (hasReachedSelectionLimit) {
      setUploadTone("error");
      setUploadMessage(maxSelectedFiles === 1 ? "Remove the current file before uploading another one." : `You can attach up to ${maxSelectedFiles} files.`);
      event.target.value = "";
      return;
    }

    setSelectedUploadName(file.name);
    const validation = validateUploadFile(file);
    if (!validation.isValid) {
      setUploadTone("error");
      setUploadMessage(validation.error);
      event.target.value = "";
      return;
    }

    setPendingFile(file);
    setVisibilityDialogOpen(true);
  };

  const handleVisibilityDecision = async (decision: UploadDestinationChoice | "cancel") => {
    if (decision === "cancel") {
      resetPendingUpload();
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!pendingFile) return;

    setVisibilityDialogOpen(false);
    setPendingDestinationChoice(decision);

    const duplicate = findDuplicateFile(topLevelFiles, null, pendingFile.name, pendingFile.name);
    if (duplicate) {
      setPendingDuplicateFile(duplicate);
      setPendingDuplicateLocations(resolveDuplicateFileLocations({
        duplicateFile: duplicate,
        subjectName,
        classId,
        folders: subjectFolders,
        modules: subjectModules,
      }));
      setDuplicateDialogOpen(true);
      return;
    }

    await completeUpload(pendingFile, "proceed", null, decision);
  };

  const handleDuplicateDecision = async (decision: DuplicateDecision) => {
    if (decision === "cancel") {
      resetPendingUpload();
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!pendingFile || !pendingDestinationChoice) return;
    await completeUpload(pendingFile, decision, pendingDuplicateFile, pendingDestinationChoice);
  };

  const handleRemoveFile = (fileId: string) => {
    onRemoveFile(fileId);
    setUploadMessage(null);
    setUploadTone("neutral");
    setSelectedUploadName(null);
  };

  return (
    <>
      <div className="space-y-3 rounded-2xl border border-white/15 bg-white/10 p-4">
        <div>
          <p className="text-sm font-semibold text-white">Attached Files</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Attach existing subject files or upload a new file for this submodule.</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Attached files are optional supplements. Written submodule content is still required.</p>
        </div>

        {showAttachExistingFile ? (
          <div className="space-y-2">
            <Label htmlFor={existingFileSelectId} className="text-white">Attach Existing File</Label>
            <Select value="" onValueChange={onAddFile} disabled={selectableFiles.length === 0 || hasReachedSelectionLimit}>
              <SelectTrigger id={existingFileSelectId} className="h-12 rounded-2xl border-white/20 bg-white/10 text-white">
                <SelectValue placeholder={selectableFiles.length > 0 ? "Select a file to attach" : "No available files to attach"} />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#1b2430]/95 text-white backdrop-blur-xl">
                {selectableFiles.map((file) => (
                  <SelectItem key={file.id} value={file.id} className="focus:bg-white/10">
                    {file.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        {enableUploadNewFile ? (
          <div className="space-y-2">
            <Label htmlFor={newFileInputId} className="text-white">Upload New File</Label>
            <input ref={fileInputRef} id={newFileInputId} type="file" className="sr-only" onChange={handleFilePicked} />
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading || hasReachedSelectionLimit} className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/15 text-amber-300">
                  <Upload className="h-4 w-4" />
                </span>
                {uploading ? "Uploading..." : "Upload File"}
              </Button>
              {selectedUploadName ? <span className="text-sm text-white/70">{selectedUploadName}</span> : null}
            </div>
            {uploadMessage ? (
              <p className={`text-sm ${uploadTone === "success" ? "text-emerald-300" : uploadTone === "error" ? "text-red-300" : "text-white/70"}`}>
                {uploadMessage}
              </p>
            ) : null}
            {hasReachedSelectionLimit && maxSelectedFiles === 1 ? (
              <p className="text-xs text-[var(--text-secondary)]">Remove the current file below to upload a different one.</p>
            ) : null}
          </div>
        ) : null}

        {selectedFiles.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file) => (
              <div key={file.id} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white">
                <Paperclip className="h-3.5 w-3.5 text-cyan-300" />
                <span className="max-w-[220px] truncate" title={file.name}>{file.name}</span>
                <button type="button" onClick={() => handleRemoveFile(file.id)} className="text-white/65 transition hover:text-white" aria-label={`Remove ${file.name}`}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--text-secondary)]">No files attached yet.</p>
        )}
      </div>

      <Dialog open={visibilityDialogOpen} onOpenChange={(open) => {
        if (!open) {
          void handleVisibilityDecision("cancel");
        }
      }}>
        <DialogPortal>
          <DialogOverlay className="bg-slate-950/70 backdrop-blur-sm" />
          <DialogContent className="max-w-xl rounded-3xl border border-white/10 bg-[#1b2430]/95 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl [&>button]:hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white">Choose file visibility</DialogTitle>
            </DialogHeader>

            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">Choose whether this upload should stay attached only to the module or also appear on the Files page.</p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" onClick={() => void handleVisibilityDecision("cancel")} className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
                  <X className="h-4 w-4" />
                </span>
                Cancel
              </Button>
              <Button type="button" onClick={() => void handleVisibilityDecision("both")} className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/20">
                Module + Files
              </Button>
              <Button type="button" onClick={() => void handleVisibilityDecision("module-only")} className="rounded-2xl border border-cyan-400/30 bg-cyan-500/15 px-6 py-3 font-semibold text-cyan-100 transition-colors duration-200 hover:bg-cyan-500/25">
                Module only
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <SubjectFileDuplicateDialog
        open={duplicateDialogOpen}
        duplicateFileName={pendingDuplicateFile?.name ?? null}
        existingLocations={pendingDuplicateLocations}
        busy={uploading}
        onDecision={handleDuplicateDecision}
        onOpenChange={(open) => {
          if (!open) {
            void handleDuplicateDecision("cancel");
            return;
          }
          setDuplicateDialogOpen(true);
        }}
      />
    </>
  );
}


