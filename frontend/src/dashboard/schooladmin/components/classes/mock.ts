import { Level, Grade, SubGrade } from './types';

// Mock data for the classes hierarchy
export const mockLevels: Level[] = [
  {
    id: 'level-1',
    name: 'Nursery',
    order: 1,
    grades: [
      {
        id: 'grade-n1',
        levelId: 'level-1',
        name: 'Baby',
        order: 1,
        subGrades: [
          { id: 'subgrade-n1a', gradeId: 'grade-n1', name: 'A', order: 1 },
          { id: 'subgrade-n1b', gradeId: 'grade-n1', name: 'B', order: 2 }
        ],
        combinations: []
      },
      {
        id: 'grade-n2',
        levelId: 'level-1',
        name: 'Middle',
        order: 2,
        subGrades: [
          { id: 'subgrade-n2a', gradeId: 'grade-n2', name: 'A', order: 1 },
          { id: 'subgrade-n2b', gradeId: 'grade-n2', name: 'B', order: 2 }
        ],
        combinations: []
      },
      {
        id: 'grade-n3',
        levelId: 'level-1',
        name: 'Top',
        order: 3,
        subGrades: [
          { id: 'subgrade-n3a', gradeId: 'grade-n3', name: 'A', order: 1 },
          { id: 'subgrade-n3b', gradeId: 'grade-n3', name: 'B', order: 2 }
        ],
        combinations: []
      }
    ]
  },
  {
    id: 'level-2',
    name: 'Primary',
    order: 2,
    grades: [
      {
        id: 'grade-p1',
        levelId: 'level-2',
        name: 'P1',
        order: 1,
        subGrades: [
          { id: 'subgrade-p1a', gradeId: 'grade-p1', name: 'A', order: 1 },
          { id: 'subgrade-p1b', gradeId: 'grade-p1', name: 'B', order: 2 },
          { id: 'subgrade-p1c', gradeId: 'grade-p1', name: 'C', order: 3 }
        ],
        combinations: []
      },
      {
        id: 'grade-p2',
        levelId: 'level-2',
        name: 'P2',
        order: 2,
        subGrades: [
          { id: 'subgrade-p2a', gradeId: 'grade-p2', name: 'A', order: 1 },
          { id: 'subgrade-p2b', gradeId: 'grade-p2', name: 'B', order: 2 },
          { id: 'subgrade-p2c', gradeId: 'grade-p2', name: 'C', order: 3 }
        ],
        combinations: []
      },
      {
        id: 'grade-p3',
        levelId: 'level-2',
        name: 'P3',
        order: 3,
        subGrades: [
          { id: 'subgrade-p3a', gradeId: 'grade-p3', name: 'A', order: 1 },
          { id: 'subgrade-p3b', gradeId: 'grade-p3', name: 'B', order: 2 },
          { id: 'subgrade-p3c', gradeId: 'grade-p3', name: 'C', order: 3 }
        ],
        combinations: []
      },
      {
        id: 'grade-p4',
        levelId: 'level-2',
        name: 'P4',
        order: 4,
        subGrades: [
          { id: 'subgrade-p4a', gradeId: 'grade-p4', name: 'A', order: 1 },
          { id: 'subgrade-p4b', gradeId: 'grade-p4', name: 'B', order: 2 },
          { id: 'subgrade-p4c', gradeId: 'grade-p4', name: 'C', order: 3 }
        ],
        combinations: []
      },
      {
        id: 'grade-p5',
        levelId: 'level-2',
        name: 'P5',
        order: 5,
        subGrades: [
          { id: 'subgrade-p5a', gradeId: 'grade-p5', name: 'A', order: 1 },
          { id: 'subgrade-p5b', gradeId: 'grade-p5', name: 'B', order: 2 },
          { id: 'subgrade-p5c', gradeId: 'grade-p5', name: 'C', order: 3 }
        ],
        combinations: []
      },
      {
        id: 'grade-p6',
        levelId: 'level-2',
        name: 'P6',
        order: 6,
        subGrades: [
          { id: 'subgrade-p6a', gradeId: 'grade-p6', name: 'A', order: 1 },
          { id: 'subgrade-p6b', gradeId: 'grade-p6', name: 'B', order: 2 },
          { id: 'subgrade-p6c', gradeId: 'grade-p6', name: 'C', order: 3 }
        ],
        combinations: []
      }
    ]
  },
  {
    id: 'level-3',
    name: 'O-Level',
    order: 3,
    grades: [
      {
        id: 'grade-s1',
        levelId: 'level-3',
        name: 'S1',
        order: 1,
        subGrades: [
          { id: 'subgrade-s1a', gradeId: 'grade-s1', name: 'A', order: 1 },
          { id: 'subgrade-s1b', gradeId: 'grade-s1', name: 'B', order: 2 },
          { id: 'subgrade-s1c', gradeId: 'grade-s1', name: 'C', order: 3 }
        ],
        combinations: []
      },
      {
        id: 'grade-s2',
        levelId: 'level-3',
        name: 'S2',
        order: 2,
        subGrades: [
          { id: 'subgrade-s2a', gradeId: 'grade-s2', name: 'A', order: 1 },
          { id: 'subgrade-s2b', gradeId: 'grade-s2', name: 'B', order: 2 },
          { id: 'subgrade-s2c', gradeId: 'grade-s2', name: 'C', order: 3 }
        ],
        combinations: []
      },
      {
        id: 'grade-s3',
        levelId: 'level-3',
        name: 'S3',
        order: 3,
        subGrades: [
          { id: 'subgrade-s3a', gradeId: 'grade-s3', name: 'A', order: 1 },
          { id: 'subgrade-s3b', gradeId: 'grade-s3', name: 'B', order: 2 },
          { id: 'subgrade-s3c', gradeId: 'grade-s3', name: 'C', order: 3 }
        ],
        combinations: []
      }
    ]
  },
  {
    id: 'level-4',
    name: 'A-Level',
    order: 4,
    grades: [
      {
        id: 'grade-s4',
        levelId: 'level-4',
        name: 'S4',
        order: 1,
        subGrades: [
          { id: 'subgrade-s4a', gradeId: 'grade-s4', name: 'A', order: 1 },
          { id: 'subgrade-s4b', gradeId: 'grade-s4', name: 'B', order: 2 }
        ],
        combinations: [
          { id: 'combination-s4mcb', gradeId: 'grade-s4', name: 'MCB', order: 1 },
          { id: 'combination-s4pcb', gradeId: 'grade-s4', name: 'PCB', order: 2 },
          { id: 'combination-s4heg', gradeId: 'grade-s4', name: 'HEG', order: 3 }
        ]
      },
      {
        id: 'grade-s5',
        levelId: 'level-4',
        name: 'S5',
        order: 2,
        subGrades: [
          { id: 'subgrade-s5a', gradeId: 'grade-s5', name: 'A', order: 1 },
          { id: 'subgrade-s5b', gradeId: 'grade-s5', name: 'B', order: 2 }
        ],
        combinations: [
          { id: 'combination-s5mcb', gradeId: 'grade-s5', name: 'MCB', order: 1 },
          { id: 'combination-s5pcb', gradeId: 'grade-s5', name: 'PCB', order: 2 },
          { id: 'combination-s5heg', gradeId: 'grade-s5', name: 'HEG', order: 3 }
        ]
      },
      {
        id: 'grade-s6',
        levelId: 'level-4',
        name: 'S6',
        order: 3,
        subGrades: [
          { id: 'subgrade-s6a', gradeId: 'grade-s6', name: 'A', order: 1 },
          { id: 'subgrade-s6b', gradeId: 'grade-s6', name: 'B', order: 2 }
        ],
        combinations: [
          { id: 'combination-s6mcb', gradeId: 'grade-s6', name: 'MCB', order: 1 },
          { id: 'combination-s6pcb', gradeId: 'grade-s6', name: 'PCB', order: 2 },
          { id: 'combination-s6heg', gradeId: 'grade-s6', name: 'HEG', order: 3 }
        ]
      }
    ]
  }
];

// Helper functions for mock data
export const getAllGrades = (): Grade[] => {
  return mockLevels.flatMap(level => level.grades);
};

export const getAllSubGrades = (): SubGrade[] => {
  return mockLevels.flatMap(level => 
    level.grades.flatMap(grade => grade.subGrades)
  );
};

export const getGradesByLevel = (levelId: string): Grade[] => {
  const level = mockLevels.find(l => l.id === levelId);
  return level ? level.grades : [];
};

export const getSubGradesByGrade = (gradeId: string): SubGrade[] => {
  const grade = getAllGrades().find(g => g.id === gradeId);
  return grade ? grade.subGrades : [];
};

// Mock student count per class (for stats)
export const getStudentCountBySubGrade = (subGradeId: string): number => {
  // Mock data - random counts between 15-35 students per class
  const mockCounts: { [key: string]: number } = {};
  getAllSubGrades().forEach(sg => {
    mockCounts[sg.id] = Math.floor(Math.random() * 21) + 15; // 15-35 students
  });
  return mockCounts[subGradeId] || 0;
};