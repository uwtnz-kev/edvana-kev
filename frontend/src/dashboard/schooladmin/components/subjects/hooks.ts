import { useState, useMemo } from 'react';
import { Subject, SubjectFilters, PaginationState, SortState, SubjectStatus } from './types';
import { SUBJECTS } from './mock';

export function useSubjectState() {
  const [data, setData] = useState<Subject[]>(SUBJECTS);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SubjectFilters>({
    search: '',
  });
  const [sortBy, setSortBy] = useState<keyof Subject>('updatedAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const setSort = (field: keyof Subject, direction?: 'asc' | 'desc') => {
    setSortBy(field);
    setSortDir(direction || (field === sortBy && sortDir === 'asc' ? 'desc' : 'asc'));
    setPage(1); // Reset to first page when sorting changes
  };

  const handleFiltersChange = (newFilters: SubjectFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filtering
  };

  // Filtered data - case-insensitive search over name, code, teacher, plus advanced filters
  const filtered = useMemo(() => {
    let result = data;
    
    // Search filter (from both query and filters.search)
    const currentSearch = query || filters.search;
    if (currentSearch?.trim()) {
      const searchQuery = currentSearch.toLowerCase();
      result = result.filter(subject =>
        subject.name.toLowerCase().includes(searchQuery) ||
        (subject.code && subject.code.toLowerCase().includes(searchQuery)) ||
        (subject.teacherName && subject.teacherName.toLowerCase().includes(searchQuery))
      );
    }

    // Status filter
    if (filters.status) {
      result = result.filter(subject => subject.status === filters.status);
    }

    // Classes filter
    if (filters.classes && filters.classes.length > 0) {
      result = result.filter(subject => {
        return filters.classes!.some(filterClass => 
          subject.classes.includes(filterClass)
        );
      });
    }

    // Teacher filter
    if (filters.teacherName) {
      result = result.filter(subject => subject.teacherName === filters.teacherName);
    }

    return result;
  }, [data, query, filters]);

  // Sorted data - stable sort with default updatedAt desc
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
      
      // Stable sort - if values are equal, maintain original order
      if (comparison === 0) {
        const aIndex = data.findIndex(item => item.id === a.id);
        const bIndex = data.findIndex(item => item.id === b.id);
        comparison = aIndex - bIndex;
      }
      
      return sortDir === 'asc' ? comparison : -comparison;
    });
  }, [filtered, sortBy, sortDir, data]);

  // Paged data
  const paged = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sorted.slice(startIndex, endIndex);
  }, [sorted, page, pageSize]);

  return {
    // Raw state
    data,
    setData,
    query,
    setQuery,
    filters,
    handleFiltersChange,
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

export function useSubjects() {
  const [subjects] = useState<Subject[]>(SUBJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SubjectFilters>({
    search: '',
  });
  
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 20,
    total: 0
  });
  
  const [sort, setSort] = useState<SortState>({
    field: 'name',
    direction: 'asc'
  });

  const filteredAndSortedSubjects = useMemo(() => {
    let filtered = subjects.filter(subject => {
      // Search filter (from both searchQuery and filters.search)
      const currentSearch = searchQuery || filters.search;
      if (currentSearch) {
        const searchLower = currentSearch.toLowerCase();
        const matchesSearch = (
          subject.name.toLowerCase().includes(searchLower) ||
          (subject.code && subject.code.toLowerCase().includes(searchLower)) ||
          (subject.teacherName && subject.teacherName.toLowerCase().includes(searchLower))
        );
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && subject.status !== filters.status) {
        return false;
      }

      // Classes filter
      if (filters.classes && filters.classes.length > 0) {
        const hasMatchingClass = filters.classes.some(filterClass => 
          subject.classes.includes(filterClass)
        );
        if (!hasMatchingClass) {
          return false;
        }
      }

      // Teacher filter
      if (filters.teacherName && subject.teacherName !== filters.teacherName) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sort.direction === 'asc' ? comparison : -comparison;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sort.direction === 'asc' ? comparison : -comparison;
      }
      
      return 0;
    });

    return filtered;
  }, [subjects, searchQuery, filters, sort]);

  const paginatedSubjects = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return filteredAndSortedSubjects.slice(startIndex, endIndex);
  }, [filteredAndSortedSubjects, pagination]);

  // Update total when filtered results change
  const total = filteredAndSortedSubjects.length;
  if (pagination.total !== total) {
    setPagination(prev => ({ ...prev, total }));
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, search: query }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when searching
  };

  const handleFiltersChange = (newFilters: SubjectFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filtering
  };

  const updatePagination = (newPagination: Partial<PaginationState>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const updateSort = (field: keyof Subject) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination(prev => ({ 
      ...prev, 
      pageSize: newPageSize, 
      page: 1 // Reset to first page when changing page size
    }));
  };

  return {
    subjects: paginatedSubjects,
    allSubjects: subjects,
    searchQuery,
    filters,
    pagination,
    sort,
    totalSubjects: total,
    handleSearch,
    handleFiltersChange,
    updatePagination,
    handlePageChange,
    updateSort,
    handlePageSizeChange
  };
}

export function useSubjectForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const openForm = (subject?: Subject) => {
    setEditingSubject(subject || null);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setEditingSubject(null);
  };

  return {
    isOpen,
    editingSubject,
    openForm,
    closeForm,
    isEditing: !!editingSubject
  };
}

export function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [action, setAction] = useState<'delete' | 'activate' | 'deactivate'>('delete');

  const openModal = (subjectToAction: Subject, actionType: 'delete' | 'activate' | 'deactivate') => {
    setSubject(subjectToAction);
    setAction(actionType);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSubject(null);
  };

  const getActionText = () => {
    switch (action) {
      case 'delete': return 'delete';
      case 'activate': return 'activate';
      case 'deactivate': return 'deactivate';
      default: return 'confirm';
    }
  };

  const getActionColor = () => {
    switch (action) {
      case 'delete': return 'destructive';
      case 'activate': return 'default';
      case 'deactivate': return 'secondary';
      default: return 'default';
    }
  };

  return {
    isOpen,
    subject,
    action,
    openModal,
    closeModal,
    actionText: getActionText(),
    actionColor: getActionColor()
  };
}