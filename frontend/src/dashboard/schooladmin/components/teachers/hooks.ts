import { useState, useMemo } from 'react';
import { Teacher, TeacherFilters, TeacherStatus, TeacherSpecialization, TeacherQualification } from './types';
import { TEACHERS } from './mock';

export function useTeacherState() {
  const [data, setData] = useState<Teacher[]>(TEACHERS);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<TeacherFilters>({
    status: [],
    classes: [],
    subjects: []
  });
  const [sortBy, setSortBy] = useState<keyof Teacher>('lastName');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const setSort = (field: keyof Teacher, direction?: 'asc' | 'desc') => {
    if (field === sortBy) {
      setSortDir(direction || (sortDir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir(direction || 'asc');
    }
    setPage(1); // Reset to first page when sorting changes
  };

  const updateFilters = (newFilters: Partial<TeacherFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page when filters change
  };

  // Derived data with filtering, sorting, and pagination
  const filtered = useMemo(() => {
    return data.filter(teacher => {
      // Text search filter
      if (query) {
        const searchTerm = query.toLowerCase();
        const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
        const searchableFields = [
          fullName,
          teacher.employeeId.toLowerCase(),
          teacher.email.toLowerCase(),
          teacher.specialization.toLowerCase(),
          teacher.qualification.toLowerCase()
        ];
        
        if (!searchableFields.some(field => field.includes(searchTerm))) {
          return false;
        }
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(teacher.status)) {
          return false;
        }
      }

      // Classes filter (check if teacher is assigned to any of the filtered classes)
      if (filters.classes && filters.classes.length > 0) {
        const teacherClasses = teacher.classAssignments?.map(ca => ca.className) || [];
        if (!filters.classes.some(className => teacherClasses.includes(className))) {
          return false;
        }
      }

      // Subjects filter (check if teacher teaches any of the filtered subjects)
      if (filters.subjects && filters.subjects.length > 0) {
        const teacherSubjects = teacher.subjectAssignments?.map(sa => sa.subjectName) || [];
        if (!filters.subjects.some(subject => teacherSubjects.includes(subject))) {
          return false;
        }
      }

      return true;
    });
  }, [data, query, filters]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortBy, sortDir]);

  const paged = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return sorted.slice(startIndex, startIndex + pageSize);
  }, [sorted, page, pageSize]);

  return {
    // Raw state
    data,
    setData,
    query,
    setQuery,
    filters,
    setFilters: updateFilters,
    sortBy,
    sortDir,
    setSort,
    page,
    pageSize,
    setPage,
    setPageSize,

    // Derived data
    filtered,
    sorted,
    paged
  };
}