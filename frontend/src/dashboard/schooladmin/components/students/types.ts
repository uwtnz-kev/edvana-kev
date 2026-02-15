export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  class: string;
  status: 'Active' | 'Inactive' | 'Transferred' | 'Suspended' | 'Graduated';
  enrollmentDate: string;
  dateOfBirth?: string;
  gender?: string;
  parentEmail?: string;
  parentNationalId?: string;
  avatar?: string;
}

export interface StudentFormData {
  // Required fields
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  class: string;
  status: string;
  enrollmentDate: string;
  
  // Optional fields
  dateOfBirth?: string;
  gender?: string;
  parentEmail?: string;
  parentNationalId?: string;
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  onLeave: number;
  newEnrollments: number;
}

export interface StudentFilters {
  search: string;
  class: string[];
  section: string[];
  status: string[];
}

export type StudentMode = 'create' | 'edit' | 'view';