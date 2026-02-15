// Types - Re-export from utils/classes.ts for consistency
export type { 
  Level, 
  Grade, 
  SubGrade, 
  ClassesStore 
} from '@/shared/mocks/schooladmin/classes';

// Legacy types for compatibility
export type { ClassFilters, StudentAssignment } from './types';

// Components
export { default as ClassesHeader } from './ClassesHeader';
export { default as StudentsPanel } from './StudentsPanel';
export { default as StudentsDataPanel } from './StudentsDataPanel';
export { default as ClassesTabs } from './ClassesTabs';
export { default as ClassesToolbar } from './ClassesToolbar';
export { default as CombinationsCard } from './CombinationsCard';

// Sub-components
export { LevelsPanel } from './levels';
export { GradesPanel } from './grades';
export { SubGradesPanel } from './subgrades';

// Modals
export { LevelModal, GradeModal, SubGradeModal, ConfirmDeleteModal } from './modals';

// Mock data and utilities - Re-export from utils/classes.ts and utils/mockData.ts
export { 
  // CRUD helpers
  addLevel,
  updateLevel,
  deleteLevel,
  addGrade,
  updateGrade,
  deleteGrade,
  addSubGrade,
  updateSubGrade,
  deleteSubGrade,
  
  // Finder helpers
  findLevel,
  findGrade,
  findSubGrade,
  findParentLevel,
  findParentGrade,
  
  // Validation helpers
  validateLevelName,
  validateGradeName,
  validateSubGradeName,
  
  // Derived data helpers
  getStudentCount,
  getSubjectCount,
  getCascadeDeleteInfo,
  getClassesStats,
  
  // Search helpers
  searchLevels,
  searchGrades,
  searchSubGrades,
  
  // Reorder helpers
  reorderLevels,
  reorderGrades,
  reorderSubGrades
} from '@/shared/mocks/schooladmin/classes';

// Mock data
export { mockLevels } from './mock';

// Legacy utilities
export { 
  getAllGrades,
  getAllSubGrades,
  getGradesByLevel,
  getSubGradesByGrade,
  getStudentCountBySubGrade
} from './mock';