// Re-export types from utils to maintain consistency
export type {
  Level,
  Grade, 
  SubGrade,
  Combination,
  DerivedClass,
  ClassesStore
} from '@/utils/classes';

export interface ClassFilters {
  search: string;
  level: string[];
  grade: string[];
}

// Student assignment tracking
export interface StudentAssignment {
  studentId: string;
  levelId: string;
  gradeId: string;
  subGradeId: string;
}