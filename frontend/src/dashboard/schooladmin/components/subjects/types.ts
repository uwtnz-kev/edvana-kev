export enum SubjectStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive"
}

export interface Subject {
  id: string;
  name: string;
  code?: string;
  classes: string[];
  teacherName?: string;
  numberOfStudents?: number;
  passingRate?: number;
  status: "Active" | "Inactive";
  updatedAt?: string;
  createdAt?: string;
}

export interface SubjectFilters {
  search: string;
  status?: "Active" | "Inactive";
  classes?: string[];
  teacherName?: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortState {
  field: keyof Subject;
  direction: 'asc' | 'desc';
}