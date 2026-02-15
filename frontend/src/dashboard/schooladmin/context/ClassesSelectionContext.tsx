import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Level, Grade, SubGrade } from '../components/classes/types';

interface ClassesSelectionContextType {
  selectedLevel?: Level;
  selectedGrade?: Grade;
  selectedSubGrade?: SubGrade;
  setSelectedLevel: (level?: Level) => void;
  setSelectedGrade: (grade?: Grade) => void;
  setSelectedSubGrade: (subGrade?: SubGrade) => void;
  getSelectionPath: () => {
    level?: Level;
    grade?: Grade;
    subGrade?: SubGrade;
  };
  clearSelection: () => void;
}

const ClassesSelectionContext = createContext<ClassesSelectionContextType | undefined>(undefined);

interface ClassesSelectionProviderProps {
  children: ReactNode;
}

export function ClassesSelectionProvider({ children }: ClassesSelectionProviderProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level | undefined>();
  const [selectedGrade, setSelectedGrade] = useState<Grade | undefined>();
  const [selectedSubGrade, setSelectedSubGrade] = useState<SubGrade | undefined>();

  const getSelectionPath = () => ({
    level: selectedLevel,
    grade: selectedGrade,
    subGrade: selectedSubGrade
  });

  const clearSelection = () => {
    setSelectedLevel(undefined);
    setSelectedGrade(undefined);
    setSelectedSubGrade(undefined);
  };

  const contextValue: ClassesSelectionContextType = {
    selectedLevel,
    selectedGrade,
    selectedSubGrade,
    setSelectedLevel,
    setSelectedGrade,
    setSelectedSubGrade,
    getSelectionPath,
    clearSelection
  };

  return (
    <ClassesSelectionContext.Provider value={contextValue}>
      {children}
    </ClassesSelectionContext.Provider>
  );
}

export function useClassesSelection() {
  const context = useContext(ClassesSelectionContext);
  if (context === undefined) {
    throw new Error('useClassesSelection must be used within a ClassesSelectionProvider');
  }
  return context;
}