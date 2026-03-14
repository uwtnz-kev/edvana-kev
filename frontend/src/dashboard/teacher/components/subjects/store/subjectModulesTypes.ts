// Defines the shared subject module types used across the store modules.
export type SubjectSubmoduleItem = {
  id: string;
  title: string;
  description: string;
  summary: string;
};

export type SubjectModuleItem = {
  id: string;
  title: string;
  description: string;
  status: "draft" | "published";
  lessons: number;
  duration: string;
  submodules: SubjectSubmoduleItem[];
};

export type SubjectSubmoduleDraft = {
  title: string;
  description: string;
};

export type SubjectModulePayload = {
  title: string;
  description: string;
  submodules: SubjectSubmoduleDraft[];
};
