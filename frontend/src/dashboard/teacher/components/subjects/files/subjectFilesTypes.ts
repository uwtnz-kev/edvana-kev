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
  folderName?: string | null;
};
