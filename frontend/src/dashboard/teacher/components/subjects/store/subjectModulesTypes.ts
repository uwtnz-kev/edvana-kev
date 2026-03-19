// Defines the shared subject module types used across the store modules.
export type SubjectSubmoduleItem = {
  id: string;
  title: string;
  description: string;
  content: string;
  attachedFileIds: string[];
  summary: string;
  order: number;
};

export type SubjectModuleItem = {
  id: string;
  title: string;
  description: string;
  status: "draft" | "published";
  lessons: number;
  duration: string;
  order: number;
  attachedFileIds: string[];
  submodules: SubjectSubmoduleItem[];
};

export type SubjectSubmoduleDraft = {
  title: string;
  description: string;
  content: string;
  attachedFileIds: string[];
};

export type SubjectModulePayload = {
  title: string;
  description: string;
  attachedFileIds?: string[];
  submodules: SubjectSubmoduleDraft[];
};
