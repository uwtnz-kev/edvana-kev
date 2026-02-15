import { nanoid } from 'nanoid';

// Core types for hierarchical class management
export interface SubGrade {
  id: string;
  gradeId: string;
  name: string;
  order: number;
}

export interface Combination {
  id: string;
  gradeId: string;
  name: string;
  order: number;
}

export interface Grade {
  id: string;
  levelId: string;
  name: string;
  order: number;
  subGrades: SubGrade[];
  combinations: Combination[];
}

export interface Level {
  id: string;
  name: string;
  order: number;
  grades: Grade[];
}

// Derived class represents the final class structure
export interface DerivedClass {
  id: string;
  levelId: string;
  gradeId: string;
  subGradeId?: string;
  combinationId?: string;
  name: string; // e.g., "S5 MCB A" or "S1 A" or "S1"
  fullPath: string; // e.g., "A-Level > S5 > MCB > A"
}

export interface ClassesStore {
  levels: Level[];
  derivedClasses: DerivedClass[];
}

// ===== LEVEL HELPERS =====

export const addLevel = (store: ClassesStore, name: string, order?: number): Level => {
  const newLevel: Level = {
    id: nanoid(),
    name,
    order: order || (store.levels.length + 1),
    grades: []
  };
  
  store.levels.push(newLevel);
  store.levels.sort((a, b) => a.order - b.order);
  return newLevel;
};

export const updateLevel = (store: ClassesStore, levelId: string, updates: Partial<Pick<Level, 'name' | 'order'>>): Level | null => {
  const level = store.levels.find(l => l.id === levelId);
  if (!level) return null;
  
  Object.assign(level, updates);
  if (updates.order !== undefined) {
    store.levels.sort((a, b) => a.order - b.order);
  }
  return level;
};

export const deleteLevel = (store: ClassesStore, levelId: string): boolean => {
  const index = store.levels.findIndex(l => l.id === levelId);
  if (index === -1) return false;
  
  store.levels.splice(index, 1);
  return true;
};

// ===== GRADE HELPERS =====

export const addGrade = (store: ClassesStore, levelId: string, name: string, order?: number): Grade | null => {
  const level = store.levels.find(l => l.id === levelId);
  if (!level) return null;
  
  const newGrade: Grade = {
    id: nanoid(),
    levelId,
    name,
    order: order || (level.grades.length + 1),
    subGrades: [],
    combinations: []
  };
  
  level.grades.push(newGrade);
  level.grades.sort((a, b) => a.order - b.order);
  return newGrade;
};

export const updateGrade = (store: ClassesStore, gradeId: string, updates: Partial<Pick<Grade, 'name' | 'order'>>): Grade | null => {
  for (const level of store.levels) {
    const grade = level.grades.find(g => g.id === gradeId);
    if (grade) {
      Object.assign(grade, updates);
      if (updates.order !== undefined) {
        level.grades.sort((a, b) => a.order - b.order);
      }
      return grade;
    }
  }
  return null;
};

export const deleteGrade = (store: ClassesStore, gradeId: string): boolean => {
  for (const level of store.levels) {
    const index = level.grades.findIndex(g => g.id === gradeId);
    if (index !== -1) {
      level.grades.splice(index, 1);
      return true;
    }
  }
  return false;
};

// ===== SUB-GRADE HELPERS =====

export const addSubGrade = (store: ClassesStore, gradeId: string, name: string, order?: number): SubGrade | null => {
  for (const level of store.levels) {
    const grade = level.grades.find(g => g.id === gradeId);
    if (grade) {
      const newSubGrade: SubGrade = {
        id: nanoid(),
        gradeId,
        name,
        order: order || (grade.subGrades.length + 1)
      };
      
      grade.subGrades.push(newSubGrade);
      grade.subGrades.sort((a, b) => a.order - b.order);
      
      // Regenerate derived classes when subgrade is added
      regenerateDerivedClasses(store);
      
      return newSubGrade;
    }
  }
  return null;
};

export const updateSubGrade = (store: ClassesStore, subGradeId: string, updates: Partial<Pick<SubGrade, 'name' | 'order'>>): SubGrade | null => {
  for (const level of store.levels) {
    for (const grade of level.grades) {
      const subGrade = grade.subGrades.find(sg => sg.id === subGradeId);
      if (subGrade) {
        Object.assign(subGrade, updates);
        if (updates.order !== undefined) {
          grade.subGrades.sort((a, b) => a.order - b.order);
        }
        return subGrade;
      }
    }
  }
  return null;
};

export const deleteSubGrade = (store: ClassesStore, subGradeId: string): boolean => {
  for (const level of store.levels) {
    for (const grade of level.grades) {
      const index = grade.subGrades.findIndex(sg => sg.id === subGradeId);
      if (index !== -1) {
        grade.subGrades.splice(index, 1);
        return true;
      }
    }
  }
  return false;
};

// ===== COMBINATION HELPERS =====

export const addCombination = (store: ClassesStore, gradeId: string, name: string, order?: number): Combination | null => {
  for (const level of store.levels) {
    const grade = level.grades.find(g => g.id === gradeId);
    if (grade) {
      const newCombination: Combination = {
        id: nanoid(),
        gradeId,
        name,
        order: order || (grade.combinations.length + 1)
      };
      
      grade.combinations.push(newCombination);
      grade.combinations.sort((a, b) => a.order - b.order);
      
      // Regenerate derived classes when combination is added
      regenerateDerivedClasses(store);
      
      return newCombination;
    }
  }
  return null;
};

export const updateCombination = (store: ClassesStore, combinationId: string, updates: Partial<Pick<Combination, 'name' | 'order'>>): Combination | null => {
  for (const level of store.levels) {
    for (const grade of level.grades) {
      const combination = grade.combinations.find(c => c.id === combinationId);
      if (combination) {
        Object.assign(combination, updates);
        if (updates.order !== undefined) {
          grade.combinations.sort((a, b) => a.order - b.order);
        }
        regenerateDerivedClasses(store);
        return combination;
      }
    }
  }
  return null;
};

export const deleteCombination = (store: ClassesStore, combinationId: string): boolean => {
  for (const level of store.levels) {
    for (const grade of level.grades) {
      const index = grade.combinations.findIndex(c => c.id === combinationId);
      if (index !== -1) {
        grade.combinations.splice(index, 1);
        regenerateDerivedClasses(store);
        return true;
      }
    }
  }
  return false;
};

export const findCombination = (store: ClassesStore, combinationId: string): Combination | undefined => {
  for (const level of store.levels) {
    for (const grade of level.grades) {
      const combination = grade.combinations.find(c => c.id === combinationId);
      if (combination) return combination;
    }
  }
  return undefined;
};

// ===== FINDER HELPERS =====

export const findLevel = (store: ClassesStore, levelId: string): Level | undefined => {
  return store.levels.find(l => l.id === levelId);
};

export const findGrade = (store: ClassesStore, gradeId: string): Grade | undefined => {
  for (const level of store.levels) {
    const grade = level.grades.find(g => g.id === gradeId);
    if (grade) return grade;
  }
  return undefined;
};

export const findSubGrade = (store: ClassesStore, subGradeId: string): SubGrade | undefined => {
  for (const level of store.levels) {
    for (const grade of level.grades) {
      const subGrade = grade.subGrades.find(sg => sg.id === subGradeId);
      if (subGrade) return subGrade;
    }
  }
  return undefined;
};

export const findParentLevel = (store: ClassesStore, gradeId: string): Level | undefined => {
  return store.levels.find(level => level.grades.some(g => g.id === gradeId));
};

export const findParentGrade = (store: ClassesStore, subGradeId: string): Grade | undefined => {
  for (const level of store.levels) {
    const grade = level.grades.find(g => g.subGrades.some(sg => sg.id === subGradeId));
    if (grade) return grade;
  }
  return undefined;
};

// ===== DERIVED CLASS GENERATION =====

export const regenerateDerivedClasses = (store: ClassesStore): void => {
  const derivedClasses: DerivedClass[] = [];

  for (const level of store.levels) {
    for (const grade of level.grades) {
      const hasCombinations = grade.combinations.length > 0;
      const hasSubGrades = grade.subGrades.length > 0;

      if (hasCombinations && hasSubGrades) {
        // Generate all combinations: grade + combination + subgrade (e.g., "S5 MCB A")
        for (const combination of grade.combinations) {
          for (const subGrade of grade.subGrades) {
            derivedClasses.push({
              id: nanoid(),
              levelId: level.id,
              gradeId: grade.id,
              subGradeId: subGrade.id,
              combinationId: combination.id,
              name: `${grade.name} ${combination.name} ${subGrade.name}`,
              fullPath: `${level.name} > ${grade.name} > ${combination.name} > ${subGrade.name}`
            });
          }
        }
        // Also generate grade + combination only (e.g., "S5 MCB")
        for (const combination of grade.combinations) {
          derivedClasses.push({
            id: nanoid(),
            levelId: level.id,
            gradeId: grade.id,
            subGradeId: undefined,
            combinationId: combination.id,
            name: `${grade.name} ${combination.name}`,
            fullPath: `${level.name} > ${grade.name} > ${combination.name}`
          });
        }
      } else if (hasCombinations) {
        // Grade has combinations but no subgrades - generate grade + combination (e.g., "S5 MCB")
        for (const combination of grade.combinations) {
          derivedClasses.push({
            id: nanoid(),
            levelId: level.id,
            gradeId: grade.id,
            subGradeId: undefined,
            combinationId: combination.id,
            name: `${grade.name} ${combination.name}`,
            fullPath: `${level.name} > ${grade.name} > ${combination.name}`
          });
        }
      } else if (hasSubGrades) {
        // Grade has subgrades but no combinations - generate grade + subgrade (e.g., "S1 A")
        for (const subGrade of grade.subGrades) {
          derivedClasses.push({
            id: nanoid(),
            levelId: level.id,
            gradeId: grade.id,
            subGradeId: subGrade.id,
            combinationId: undefined,
            name: `${grade.name} ${subGrade.name}`,
            fullPath: `${level.name} > ${grade.name} > ${subGrade.name}`
          });
        }
      } else {
        // Grade only - generate simple grade name (e.g., "S1")
        derivedClasses.push({
          id: nanoid(),
          levelId: level.id,
          gradeId: grade.id,
          subGradeId: undefined,
          combinationId: undefined,
          name: grade.name,
          fullPath: `${level.name} > ${grade.name}`
        });
      }
    }
  }

  store.derivedClasses = derivedClasses;
};

export const getDerivedClassesForGrade = (store: ClassesStore, gradeId: string): DerivedClass[] => {
  return store.derivedClasses.filter(dc => dc.gradeId === gradeId);
};

export const getDerivedClassesForLevel = (store: ClassesStore, levelId: string): DerivedClass[] => {
  return store.derivedClasses.filter(dc => dc.levelId === levelId);
};

export const validateCombinationName = (grade: Grade | null | undefined, name: string, excludeId?: string): boolean => {
  if (!grade) return false;
  return !grade.combinations.some(c => c.id !== excludeId && c.name.toLowerCase() === name.toLowerCase());
};

// Auto-regenerate derived classes after any structural changes
export const triggerDerivedClassRegeneration = (store: ClassesStore): void => {
  regenerateDerivedClasses(store);
};

// Helper to get human-readable class name patterns
export const getClassNameExamples = (grade: Grade | null | undefined): string[] => {
  if (!grade) return [];
  
  const examples: string[] = [];
  const hasCombinations = grade.combinations?.length > 0;
  const hasSubGrades = grade.subGrades?.length > 0;

  if (hasCombinations && hasSubGrades) {
    // Show both patterns
    examples.push(`${grade.name} ${grade.combinations[0]?.name} ${grade.subGrades[0]?.name}`); // e.g., "S5 MCB A"
    examples.push(`${grade.name} ${grade.combinations[0]?.name}`); // e.g., "S5 MCB"
  } else if (hasCombinations) {
    examples.push(`${grade.name} ${grade.combinations[0]?.name}`); // e.g., "S5 MCB"
  } else if (hasSubGrades) {
    examples.push(`${grade.name} ${grade.subGrades[0]?.name}`); // e.g., "S1 A"
  } else {
    examples.push(grade.name); // e.g., "S1"
  }

  return examples;
};

// ===== VALIDATION HELPERS =====

export const validateLevelName = (store: ClassesStore, name: string, excludeId?: string): boolean => {
  return !store.levels.some(l => l.id !== excludeId && l.name.toLowerCase() === name.toLowerCase());
};

export const validateGradeName = (level: Level | null | undefined, name: string, excludeId?: string): boolean => {
  if (!level) return false;
  return !level.grades.some(g => g.id !== excludeId && g.name.toLowerCase() === name.toLowerCase());
};

export const validateSubGradeName = (grade: Grade | null | undefined, name: string, excludeId?: string): boolean => {
  if (!grade) return false;
  return !grade.subGrades.some(sg => sg.id !== excludeId && sg.name.toLowerCase() === name.toLowerCase());
};

// ===== REORDER HELPERS =====

export const reorderLevels = (store: ClassesStore, newOrder: string[]): void => {
  const orderedLevels: Level[] = [];
  
  newOrder.forEach((levelId, index) => {
    const level = store.levels.find(l => l.id === levelId);
    if (level) {
      level.order = index + 1;
      orderedLevels.push(level);
    }
  });
  
  store.levels = orderedLevels;
};

export const reorderGrades = (store: ClassesStore, levelId: string, newOrder: string[]): void => {
  const level = findLevel(store, levelId);
  if (!level) return;
  
  const orderedGrades: Grade[] = [];
  
  newOrder.forEach((gradeId, index) => {
    const grade = level.grades.find(g => g.id === gradeId);
    if (grade) {
      grade.order = index + 1;
      orderedGrades.push(grade);
    }
  });
  
  level.grades = orderedGrades;
};

export const reorderSubGrades = (store: ClassesStore, gradeId: string, newOrder: string[]): void => {
  const grade = findGrade(store, gradeId);
  if (!grade) return;
  
  const orderedSubGrades: SubGrade[] = [];
  
  newOrder.forEach((subGradeId, index) => {
    const subGrade = grade.subGrades.find(sg => sg.id === subGradeId);
    if (subGrade) {
      subGrade.order = index + 1;
      orderedSubGrades.push(subGrade);
    }
  });
  
  grade.subGrades = orderedSubGrades;
};

// ===== CLASS NAME HELPERS =====

// Helper function to compute class name from grade and optional sub-grade
export const computeClassName = (gradeName: string, subGradeName?: string): string => {
  if (!subGradeName) {
    // If no sub-grade, the grade itself is the class
    return gradeName;
  }
  
  // Combine grade and sub-grade: e.g., "S1" + "A" = "S1A"
  return `${gradeName}${subGradeName}`;
};

// ===== DERIVED DATA HELPERS (Mock Implementation) =====

// Deterministic mock data based on ID character codes for consistent testing
const getIdBasedCount = (id: string, multiplier: number = 1, base: number = 10): number => {
  const charSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return Math.max(1, (charSum * multiplier) % base + 1);
};

export const getStudentCount = (type: 'level' | 'grade' | 'subgrade', id: string): number => {
  switch (type) {
    case 'level':
      return getIdBasedCount(id, 2, 50) + 20; // 21-70 students per level
    case 'grade':
      return getIdBasedCount(id, 1, 30) + 5; // 6-35 students per grade
    case 'subgrade':
      return getIdBasedCount(id, 1, 25) + 3; // 4-27 students per sub-grade
    default:
      return 0;
  }
};

export const getSubjectCount = (type: 'level' | 'grade', id: string): number => {
  switch (type) {
    case 'level':
      return getIdBasedCount(id, 1, 8) + 4; // 5-12 subjects per level
    case 'grade':
      return getIdBasedCount(id, 1, 6) + 3; // 4-8 subjects per grade
    default:
      return 0;
  }
};

// ===== CASCADE DELETE HELPERS =====

export const getCascadeDeleteInfo = (store: ClassesStore, type: 'level' | 'grade' | 'subgrade', id: string) => {
  switch (type) {
    case 'level': {
      const level = findLevel(store, id);
      if (!level) return null;
      
      const totalGrades = level.grades.length;
      const totalSubGrades = level.grades.reduce((sum, grade) => sum + grade.subGrades.length, 0);
      const totalStudents = getStudentCount('level', id);
      
      return {
        hasChildren: totalGrades > 0,
        counts: {
          grades: totalGrades,
          subGrades: totalSubGrades,
          students: totalStudents
        }
      };
    }
    
    case 'grade': {
      const grade = findGrade(store, id);
      if (!grade) return null;
      
      const totalSubGrades = grade.subGrades.length;
      const totalStudents = getStudentCount('grade', id);
      
      return {
        hasChildren: totalSubGrades > 0,
        counts: {
          subGrades: totalSubGrades,
          students: totalStudents
        }
      };
    }
    
    case 'subgrade': {
      const subGrade = findSubGrade(store, id);
      if (!subGrade) return null;
      
      const totalStudents = getStudentCount('subgrade', id);
      
      return {
        hasChildren: false,
        counts: {
          students: totalStudents
        }
      };
    }
    
    default:
      return null;
  }
};

// ===== STATISTICS HELPERS =====

export const getClassesStats = (store: ClassesStore) => {
  const totalLevels = store.levels.length;
  const totalGrades = store.levels.reduce((sum, level) => sum + level.grades.length, 0);
  const totalSubGrades = store.levels.reduce((sum, level) => 
    sum + level.grades.reduce((gradeSum, grade) => gradeSum + grade.subGrades.length, 0), 0
  );
  
  // Calculate total students across all levels
  const studentsAssigned = store.levels.reduce((sum, level) => 
    sum + getStudentCount('level', level.id), 0
  );
  
  return {
    totalLevels,
    totalGrades,
    totalSubGrades,
    studentsAssigned
  };
};

// ===== SEARCH HELPERS =====

export const searchLevels = (store: ClassesStore, searchTerm: string): Level[] => {
  if (!searchTerm) return store.levels;
  
  const term = searchTerm.toLowerCase();
  return store.levels.filter(level => 
    level.name.toLowerCase().includes(term)
  );
};

export const searchGrades = (level: Level | undefined, searchTerm: string): Grade[] => {
  if (!level) return [];
  if (!searchTerm) return level.grades;
  
  const term = searchTerm.toLowerCase();
  return level.grades.filter(grade => 
    grade.name.toLowerCase().includes(term)
  );
};

export const searchSubGrades = (grade: Grade | undefined, searchTerm: string): SubGrade[] => {
  if (!grade) return [];
  if (!searchTerm) return grade.subGrades;
  
  const term = searchTerm.toLowerCase();
  return grade.subGrades.filter(subGrade => 
    subGrade.name.toLowerCase().includes(term)
  );
};

// ===== VALIDATION LOGIC FOR CLASS CREATION FLOW =====

export const canAddCombinations = (grade: Grade): boolean => {
  return grade.subGrades.length === 0;
};

export const canAddSubGrades = (grade: Grade): boolean => {
  return grade.combinations.length === 0;
};

export const getValidationMessage = (grade: Grade, action: 'combinations' | 'subgrades'): string => {
  if (action === 'combinations') {
    if (grade.subGrades.length > 0) {
      return "This grade already has subgrades. Please remove them to enable combinations.";
    }
  }
  
  if (action === 'subgrades') {
    if (grade.combinations.length > 0) {
      return "This grade already has combinations. You can only add subgrades within each combination.";
    }
  }
  
  return "";
};

// ===== DEFAULT STORE INSTANCE =====

// Create a default store instance with empty levels
export const classesStore: ClassesStore = {
  levels: [],
  derivedClasses: []
};