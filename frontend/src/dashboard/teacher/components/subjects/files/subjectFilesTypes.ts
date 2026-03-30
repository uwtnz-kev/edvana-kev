export type SubjectFileVisibility = "both" | "module-only";

export type SubjectFileItem = {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  category: string;
  originalFileName: string;
  mimeType: string;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
  modifiedBy: string;
  sizeBytes: number;
  folderId: string | null;
  blobKey?: string | null;
  visibility?: SubjectFileVisibility;
};

export type SubjectFolderItem = {
  id: string;
  name: string;
  subjectId: string;
  createdAt: string;
};

export type SubjectFilesSubjectState = {
  folders: SubjectFolderItem[];
  files: SubjectFileItem[];
};

export type SubjectFileDraft = {
  title: string;
  description: string;
  category: string;
  fileName: string;
  mimeType: string;
  previewUrl: string;
  sizeBytes: number;
  blobKey?: string | null;
  folderName?: string | null;
  visibility?: SubjectFileVisibility;
};
