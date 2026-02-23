// hooks.ts
import { useState, useMemo } from 'react';
import { Student, StudentFilters } from './types';
import { mockStudents } from './mock';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(() => mockStudents ?? []);
  const [filters, setFilters] = useState<StudentFilters>({
    search: '',
    class: [],
    section: [],
    status: [],
  });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Search filter - search in firstName, lastName, email, phone, rollNumber
      if (filters.search) {
        const q = (filters.search ?? '').toLowerCase().trim();
        if (q) {
          const firstName = (student.firstName ?? '').toLowerCase();
          const lastName = (student.lastName ?? '').toLowerCase();
          const email = (student.email ?? '').toLowerCase();
          const phone = (student.phone ?? '').toLowerCase();
          const rollNumber = (student.rollNumber ?? '').toLowerCase();

          const matchesSearch =
            firstName.includes(q) ||
            lastName.includes(q) ||
            email.includes(q) ||
            phone.includes(q) ||
            rollNumber.includes(q);

          if (!matchesSearch) return false;
        }
      }

      // Class filter
      if (filters.class.length > 0 && !filters.class.includes(student.class)) {
        return false;
      }

      // Section filter
      if (filters.section.length > 0 && !filters.section.includes(student.section)) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(student.status)) {
        return false;
      }

      return true;
    });
  }, [students, filters]);

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updatedData: Partial<Student>) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, ...updatedData } : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return {
    students: filteredStudents,
    allStudents: students,
    filters,
    setFilters,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}