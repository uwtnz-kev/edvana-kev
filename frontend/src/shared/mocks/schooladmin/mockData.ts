import { nanoid } from 'nanoid';

// Resource Types
export type ResourceType = "PDF" | "Video" | "Audio" | "Image" | "Document" | "Link" | "Other";
export type ResourceStatus = "Active" | "Archived";

// Parent types
export type Parent = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalIdOrPassport?: string;
  address?: {
    city?: string;
    country?: string;
  };
  status: 'Active' | 'Archived';
  studentIds: string[];
  createdAt: string;
  updatedAt: string;
};

export interface Resource {
  id: string;
  name: string;
  description?: string;
  subjectId: string;
  subjectName: string;
  gradeIds: string[];
  gradeNames: string[];
  type: ResourceType;
  status: ResourceStatus;
  size?: string;
  url?: string;
  uploadedAt: string;
  uploadedBy?: string;
  downloads?: number;
  tags?: string[];
}

// Mock Subjects Data
export const mockSubjects = [
  { id: 'subj-math', name: 'Mathematics' },
  { id: 'subj-phys', name: 'Physics' },
  { id: 'subj-chem', name: 'Chemistry' },
  { id: 'subj-bio', name: 'Biology' },
  { id: 'subj-eng', name: 'English' },
  { id: 'subj-kin', name: 'Kinyarwanda' },
  { id: 'subj-fre', name: 'French' },
  { id: 'subj-hist', name: 'History' },
  { id: 'subj-geo', name: 'Geography' },
  { id: 'subj-econ', name: 'Economics' },
  { id: 'subj-cs', name: 'Computer Science' },
  { id: 'subj-art', name: 'Art & Design' },
];

// Mock Grades Data
export const mockGrades = [
  { id: 'grade-p1', name: 'P1' },
  { id: 'grade-p2', name: 'P2' },
  { id: 'grade-p3', name: 'P3' },
  { id: 'grade-p4', name: 'P4' },
  { id: 'grade-p5', name: 'P5' },
  { id: 'grade-p6', name: 'P6' },
  { id: 'grade-s1', name: 'S1' },
  { id: 'grade-s2', name: 'S2' },
  { id: 'grade-s3', name: 'S3' },
  { id: 'grade-s4', name: 'S4' },
  { id: 'grade-s5', name: 'S5' },
  { id: 'grade-s6', name: 'S6' },
];

// Mock Resources Store
export class MockResourceStore {
  private static resources: Resource[] = [
    {
      id: nanoid(),
      name: 'Advanced Algebra Study Guide',
      description: 'Comprehensive study guide covering quadratic equations, polynomial functions, and complex number systems with step-by-step examples.',
      subjectId: 'subj-math',
      subjectName: 'Mathematics',
      gradeIds: ['grade-s2', 'grade-s3'],
      gradeNames: ['S2', 'S3'],
      type: 'PDF',
      status: 'Active',
      size: '2.4 MB',
      uploadedAt: '2024-01-15T10:30:00Z',
      uploadedBy: 'John Doe',
      downloads: 145,
      tags: ['algebra', 'equations', 'study-guide']
    },
    {
      id: nanoid(),
      name: 'Biology Lab Safety Video Series',
      description: 'Essential safety protocols and procedures for conducting laboratory experiments safely and effectively.',
      subjectId: 'subj-bio',
      subjectName: 'Biology',
      gradeIds: ['grade-s1', 'grade-s2'],
      gradeNames: ['S1', 'S2'],
      type: 'Video',
      status: 'Active',
      size: '45.1 MB',
      uploadedAt: '2024-01-10T14:20:00Z',
      uploadedBy: 'Jane Smith',
      downloads: 89,
      tags: ['safety', 'laboratory', 'video']
    },
    {
      id: nanoid(),
      name: 'English Literature Analysis Framework',
      description: 'Interactive guide for analyzing literary works including character development, themes, and narrative techniques.',
      subjectId: 'subj-eng',
      subjectName: 'English',
      gradeIds: ['grade-s3', 'grade-s4', 'grade-s5'],
      gradeNames: ['S3', 'S4', 'S5'],
      type: 'Link',
      status: 'Active',
      url: 'https://example.com/literature-analysis',
      uploadedAt: '2024-01-08T09:15:00Z',
      uploadedBy: 'Mike Wilson',
      downloads: 76,
      tags: ['literature', 'analysis', 'interactive']
    }
  ];

  static getAllResources(): Resource[] {
    return [...this.resources];
  }

  static getResourceById(id: string): Resource | undefined {
    return this.resources.find(resource => resource.id === id);
  }

  static addResource(resourceData: Omit<Resource, 'id' | 'uploadedAt' | 'downloads'>): Resource {
    const newResource: Resource = {
      ...resourceData,
      id: nanoid(),
      uploadedAt: new Date().toISOString(),
      downloads: 0
    };
    
    this.resources.unshift(newResource);
    return newResource;
  }

  static updateResource(id: string, resourceData: Partial<Resource>): Resource | null {
    const index = this.resources.findIndex(resource => resource.id === id);
    if (index === -1) return null;

    this.resources[index] = { ...this.resources[index], ...resourceData };
    return this.resources[index];
  }

  static deleteResource(id: string): boolean {
    const index = this.resources.findIndex(resource => resource.id === id);
    if (index === -1) return false;

    this.resources.splice(index, 1);
    return true;
  }

  static getResourcesBySubject(subjectId: string): Resource[] {
    return this.resources.filter(resource => resource.subjectId === subjectId);
  }

  static getResourcesByGrade(gradeId: string): Resource[] {
    return this.resources.filter(resource => resource.gradeIds.includes(gradeId));
  }
}

// Mock Students Data (for parent-student linking)
export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  grade: string;
  class: string;
};

export const mockStudents: Student[] = [
  { id: 'std-001', firstName: 'Alice', lastName: 'Uwimana', studentNumber: 'STD001', grade: 'P6', class: 'P6A' },
  { id: 'std-002', firstName: 'David', lastName: 'Mugisha', studentNumber: 'STD002', grade: 'S1', class: 'S1B' },
  { id: 'std-003', firstName: 'Grace', lastName: 'Kamikazi', studentNumber: 'STD003', grade: 'S2', class: 'S2A' },
  { id: 'std-004', firstName: 'Jean', lastName: 'Niyonshuti', studentNumber: 'STD004', grade: 'P5', class: 'P5C' },
  { id: 'std-005', firstName: 'Mary', lastName: 'Uwase', studentNumber: 'STD005', grade: 'S3', class: 'S3A' },
  { id: 'std-006', firstName: 'Patrick', lastName: 'Habimana', studentNumber: 'STD006', grade: 'S4', class: 'S4B' },
  { id: 'std-007', firstName: 'Sarah', lastName: 'Mutoni', studentNumber: 'STD007', grade: 'P4', class: 'P4A' },
  { id: 'std-008', firstName: 'Emmanuel', lastName: 'Gasana', studentNumber: 'STD008', grade: 'S5', class: 'S5A' },
  { id: 'std-009', firstName: 'Joyce', lastName: 'Uwingabire', studentNumber: 'STD009', grade: 'S6', class: 'S6B' },
  { id: 'std-010', firstName: 'Claude', lastName: 'Nzeyimana', studentNumber: 'STD010', grade: 'P3', class: 'P3B' },
];

// Mock Parents Store
export class MockParentStore {
  private static parents: Parent[] = [
    {
      id: nanoid(),
      firstName: 'John',
      lastName: 'Uwimana',
      email: 'john.uwimana@email.com',
      phone: '+250788123456',
      nationalIdOrPassport: '1198712345678901',
      address: { city: 'Kigali', country: 'Rwanda' },
      status: 'Active',
      studentIds: ['std-001'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: nanoid(),
      firstName: 'Rose',
      lastName: 'Mugisha',
      email: 'rose.mugisha@email.com',
      phone: '+250788234567',
      nationalIdOrPassport: '1199823456789012',
      address: { city: 'Butare', country: 'Rwanda' },
      status: 'Active',
      studentIds: ['std-002', 'std-010'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: nanoid(),
      firstName: 'Paul',
      lastName: 'Kamikazi',
      email: 'paul.kamikazi@email.com',
      phone: '+250788345678',
      status: 'Active',
      studentIds: ['std-003'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  static getAllParents(): Parent[] {
    return [...this.parents];
  }

  static getParentById(id: string): Parent | undefined {
    return this.parents.find(p => p.id === id);
  }

  static addParent(parent: Omit<Parent, 'id' | 'createdAt' | 'updatedAt'>): Parent {
    const newParent: Parent = {
      ...parent,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.parents.push(newParent);
    return newParent;
  }

  static updateParent(id: string, updates: Partial<Omit<Parent, 'id' | 'createdAt'>>): Parent | null {
    const index = this.parents.findIndex(p => p.id === id);
    if (index > -1) {
      this.parents[index] = {
        ...this.parents[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return this.parents[index];
    }
    return null;
  }

  static deleteParent(id: string): boolean {
    const index = this.parents.findIndex(p => p.id === id);
    if (index > -1) {
      this.parents.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Helper functions
export const getSubjectById = (id: string) => mockSubjects.find(s => s.id === id);
export const getGradeById = (id: string) => mockGrades.find(g => g.id === id);
export const getSubjectByName = (name: string) => mockSubjects.find(s => s.name === name);
export const getGradeByName = (name: string) => mockGrades.find(g => g.name === name);