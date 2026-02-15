export enum TeacherStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On Leave',
  ARCHIVED = 'Archived'
}

export enum TeacherSpecialization {
  MATHEMATICS = 'Mathematics',
  SCIENCE = 'Science',
  LANGUAGES = 'Languages',
  SOCIAL_STUDIES = 'Social Studies',
  ARTS = 'Arts',
  PHYSICAL_EDUCATION = 'Physical Education',
  TECHNOLOGY = 'Technology',
  SPECIAL_EDUCATION = 'Special Education'
}

export enum TeacherQualification {
  DIPLOMA = 'Diploma',
  BACHELOR = 'Bachelor\'s Degree',
  MASTER = 'Master\'s Degree',
  PHD = 'PhD'
}

// Teacher roles in the school system
export enum TeacherRole {
  TEACHER = 'Teacher',
  HEAD_TEACHER = 'Head Teacher',
  DEPARTMENT_HEAD = 'Department Head',
  DEAN = 'Dean',
  VICE_PRINCIPAL = 'Vice Principal',
  PRINCIPAL = 'Principal',
  COORDINATOR = 'Coordinator'
}

// Class assignment interface
export interface ClassAssignment {
  id: string;
  className: string;
  level: string;
  section: string;
  isClassTeacher: boolean; // Main class teacher or assistant
}

// Subject assignment interface
export interface SubjectAssignment {
  id: string;
  subjectName: string;
  subjectCode: string;
  level: string;
  classesAssigned: string[]; // Array of class names
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  specialization: TeacherSpecialization;
  qualification: TeacherQualification;
  experience: number; // years
  status: TeacherStatus;
  subjects: string[]; // subject IDs
  classes: string[]; // class IDs
  hireDate: string;
  salary: number;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  updatedAt: string;
  // New assignment fields
  role: TeacherRole;
  classAssignments: ClassAssignment[];
  subjectAssignments: SubjectAssignment[];
}

export interface TeacherFilters {
  status?: string[];
  classes?: string[];
  subjects?: string[];
}

export interface SortState {
  field: keyof Teacher;
  direction: 'asc' | 'desc';
}