/**
 * index
 * -----
 * Provides barrel exports for the teacher dashboard s tu de nt s module.
 */
 export { default as StudentsHeader } from "./StudentsHeader";
export { default as StudentsStats } from "./StudentsStats";
export { default as StudentsToolbar } from "./StudentsToolbar";
export { default as StudentsTable } from "./StudentsTable";
export { default as EmptyState } from "./EmptyState";
export { default as StudentsHome } from "./StudentsHome";

export * from "./types";
export { useStudents } from "./hooks";

