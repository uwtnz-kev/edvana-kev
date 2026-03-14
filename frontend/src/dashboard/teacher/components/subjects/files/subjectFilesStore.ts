import { useSyncExternalStore } from "react";
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { subjectFilesSeedData } from "./subjectFilesSeedData";
import type { SubjectFileDraft, SubjectFileItem, SubjectFilesSubjectState, SubjectFolderItem } from "./subjectFilesTypes";

const STORAGE_KEY = "teacher.subjectFiles.v2";
const LEGACY_STORAGE_KEY = "teacher.subjectFiles.v1";

function buildId(prefix: string) {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return `${prefix}-${crypto.randomUUID()}`;
  } catch {
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function cloneState(state: Record<string, SubjectFilesSubjectState>) {
  return structuredClone(state);
}

function emptySubjectState(): SubjectFilesSubjectState {
  return { folders: [], files: [] };
}

function inferMimeType(fileName: string) {
  const normalized = fileName.toLowerCase();
  if (normalized.endsWith(".pdf")) return "application/pdf";
  if (normalized.endsWith(".png")) return "image/png";
  if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
  if (normalized.endsWith(".gif")) return "image/gif";
  if (normalized.endsWith(".webp")) return "image/webp";
  if (normalized.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

function normalizeFolder(input: unknown, subjectId: string): SubjectFolderItem | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Partial<SubjectFolderItem>;
  if (typeof source.name !== "string" || source.name.trim().length === 0) return null;
  return {
    id: typeof source.id === "string" && source.id.trim().length > 0 ? source.id : buildId("subject-folder"),
    subjectId,
    name: source.name.trim(),
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString(),
  };
}

function normalizeFile(input: unknown, subjectId: string): SubjectFileItem | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Partial<SubjectFileItem>;
  if (typeof source.name !== "string" || typeof source.originalFileName !== "string") return null;
  const createdAt = typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString();
  return {
    id: typeof source.id === "string" && source.id.trim().length > 0 ? source.id : buildId("subject-file"),
    subjectId,
    name: source.name,
    description: typeof source.description === "string" ? source.description : "",
    category: typeof source.category === "string" && source.category.trim().length > 0 ? source.category : "General",
    originalFileName: source.originalFileName,
    mimeType: typeof source.mimeType === "string" && source.mimeType.trim().length > 0 ? source.mimeType : inferMimeType(source.originalFileName),
    previewUrl: typeof source.previewUrl === "string" ? source.previewUrl : "",
    createdAt,
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : createdAt,
    modifiedBy: typeof source.modifiedBy === "string" && source.modifiedBy.trim().length > 0 ? source.modifiedBy : "Teacher",
    sizeBytes: typeof source.sizeBytes === "number" && Number.isFinite(source.sizeBytes) && source.sizeBytes >= 0 ? source.sizeBytes : 0,
    folderId: typeof source.folderId === "string" && source.folderId.trim().length > 0 ? source.folderId : null,
  };
}

function normalizeSubjectState(input: unknown, subjectId: string): SubjectFilesSubjectState {
  if (Array.isArray(input)) {
    return {
      folders: [],
      files: input.map((file) => normalizeFile(file, subjectId)).filter((file): file is SubjectFileItem => file !== null),
    };
  }

  if (!input || typeof input !== "object") return emptySubjectState();
  const source = input as Partial<SubjectFilesSubjectState> & { files?: unknown; folders?: unknown };
  return {
    folders: Array.isArray(source.folders)
      ? source.folders.map((folder) => normalizeFolder(folder, subjectId)).filter((folder): folder is SubjectFolderItem => folder !== null)
      : [],
    files: Array.isArray(source.files)
      ? source.files.map((file) => normalizeFile(file, subjectId)).filter((file): file is SubjectFileItem => file !== null)
      : [],
  };
}

function parseStoredState(raw: string | null): Record<string, SubjectFilesSubjectState> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).map(([subjectId, value]) => [subjectId, normalizeSubjectState(value, subjectId)]),
    );
  } catch {
    return null;
  }
}

function mergeSeedData(current: Record<string, SubjectFilesSubjectState>) {
  const merged = cloneState(current);
  for (const [subjectId, seededFiles] of Object.entries(subjectFilesSeedData)) {
    const existingSubject = merged[subjectId] ?? emptySubjectState();
    const existingIds = new Set(existingSubject.files.map((file) => file.id));
    const missingSeedFiles = seededFiles.filter((file) => !existingIds.has(file.id));
    merged[subjectId] = {
      folders: existingSubject.folders,
      files: missingSeedFiles.length > 0 ? [...existingSubject.files, ...structuredClone(missingSeedFiles)] : existingSubject.files,
    };
  }
  return merged;
}

function saveState(state: Record<string, SubjectFilesSubjectState>) {
  writeStoredJson(STORAGE_KEY, cloneState(state));
}

function loadState() {
  const storage = getBrowserStorage();
  if (!storage) {
    return mergeSeedData({});
  }

  const parsed = parseStoredState(storage.getItem(STORAGE_KEY)) ?? parseStoredState(storage.getItem(LEGACY_STORAGE_KEY));
  if (parsed) {
    const merged = mergeSeedData(parsed);
    saveState(merged);
    return cloneState(merged);
  }

  const seeded = mergeSeedData({});
  saveState(seeded);
  return seeded;
}

let fileState: Record<string, SubjectFilesSubjectState> = loadState();
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribeToSubjectFiles(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function updateState(updater: (current: Record<string, SubjectFilesSubjectState>) => Record<string, SubjectFilesSubjectState>) {
  fileState = updater(fileState);
  saveState(fileState);
  emitChange();
}

function getSubjectState(snapshot: Record<string, SubjectFilesSubjectState>, subjectId: string) {
  return snapshot[subjectId] ?? emptySubjectState();
}

function ensureFolder(subjectState: SubjectFilesSubjectState, subjectId: string, folderName: string) {
  const normalizedFolderName = folderName.trim();
  if (!normalizedFolderName) return { subjectState, folderId: null as string | null };

  const existingFolder = subjectState.folders.find((folder) => folder.name.toLowerCase() === normalizedFolderName.toLowerCase());
  if (existingFolder) return { subjectState, folderId: existingFolder.id };

  const nextFolder: SubjectFolderItem = {
    id: buildId("subject-folder"),
    subjectId,
    name: normalizedFolderName,
    createdAt: new Date().toISOString(),
  };

  return {
    subjectState: {
      ...subjectState,
      folders: [nextFolder, ...subjectState.folders],
    },
    folderId: nextFolder.id,
  };
}

export function useSubjectFiles(subjectId: string) {
  const snapshot = useSyncExternalStore(subscribeToSubjectFiles, () => fileState, () => fileState);
  return getSubjectState(snapshot, subjectId).files;
}

export function useSubjectFolders(subjectId: string) {
  const snapshot = useSyncExternalStore(subscribeToSubjectFiles, () => fileState, () => fileState);
  return getSubjectState(snapshot, subjectId).folders;
}

export function useSubjectFile(subjectId: string, fileId: string) {
  const files = useSubjectFiles(subjectId);
  return files.find((file) => file.id === fileId) ?? null;
}

export function useSubjectFolder(subjectId: string, folderId: string) {
  const folders = useSubjectFolders(subjectId);
  return folders.find((folder) => folder.id === folderId) ?? null;
}

export function addSubjectFile(subjectId: string, draft: SubjectFileDraft & { folderId?: string | null }) {
  const timestamp = new Date().toISOString();
  const nextFileBase: Omit<SubjectFileItem, "id" | "folderId"> = {
    subjectId,
    name: draft.title.trim(),
    description: draft.description.trim(),
    category: draft.category.trim() || "General",
    originalFileName: draft.fileName.trim(),
    mimeType: draft.mimeType.trim() || inferMimeType(draft.fileName),
    previewUrl: draft.previewUrl,
    createdAt: timestamp,
    updatedAt: timestamp,
    modifiedBy: "You",
    sizeBytes: draft.sizeBytes,
  };

  let createdFile: SubjectFileItem | null = null;
  updateState((current) => {
    const subjectState = getSubjectState(current, subjectId);
    const existingFolderId = typeof draft.folderId === "string" && draft.folderId.trim().length > 0
      ? draft.folderId
      : null;
    const hasExistingFolder = existingFolderId ? subjectState.folders.some((folder) => folder.id === existingFolderId) : false;
    const folderResult = hasExistingFolder
      ? { subjectState, folderId: existingFolderId }
      : typeof draft.folderName === "string" && draft.folderName.trim().length > 0
        ? ensureFolder(subjectState, subjectId, draft.folderName)
        : { subjectState, folderId: null as string | null };

    const nextFile: SubjectFileItem = {
      id: buildId("subject-file"),
      ...nextFileBase,
      folderId: folderResult.folderId,
    };
    createdFile = nextFile;

    return {
      ...current,
      [subjectId]: {
        folders: folderResult.subjectState.folders,
        files: [nextFile, ...folderResult.subjectState.files],
      },
    };
  });

  return createdFile;
}

export function formatSubjectFileSize(sizeBytes: number) {
  if (sizeBytes >= 1024 * 1024) return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
  if (sizeBytes >= 1024) return `${Math.round(sizeBytes / 1024)} KB`;
  return `${sizeBytes} B`;
}
