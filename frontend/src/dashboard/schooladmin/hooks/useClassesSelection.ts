import { Level, Grade, SubGrade } from '../components/classes/types';

// Hook to expose current selection for other modules to consume
export interface ClassesSelection {
  selectedLevel?: Level;
  selectedGrade?: Grade;
  selectedSubGrade?: SubGrade;
  getSelectionPath: () => {
    level?: Level;
    grade?: Grade;
    subGrade?: SubGrade;
  };
}

// This would be consumed by Students/Subjects pages for filtering
// Example usage:
// const classesSelection = useClassesSelection();
// const { selectedLevel, selectedGrade, selectedSubGrade } = classesSelection;

// For now, this is a placeholder hook that would be connected to the
// ClassesSelectionContext when that integration is needed
export function useClassesSelection(): ClassesSelection {
  return {
    selectedLevel: undefined,
    selectedGrade: undefined,
    selectedSubGrade: undefined,
    getSelectionPath: () => ({
      level: undefined,
      grade: undefined,
      subGrade: undefined
    })
  };
}