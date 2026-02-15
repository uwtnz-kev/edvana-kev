import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import { Badge } from '@/components/ui/badge';
import { ResourceType, ResourceStatus } from '@/shared/mocks/schooladmin/mockData';
import { mockSubjects } from '@/shared/mocks/schooladmin/mockData';

interface ResourcesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  subjectFilter: string;
  onSubjectFilterChange: (subjectId: string) => void;
  gradeFilter: string[];
  onGradeFilterChange: (gradeIds: string[]) => void;
  typeFilter: ResourceType | '';
  onTypeFilterChange: (type: ResourceType | '') => void;
  statusFilter: ResourceStatus | '';
  onStatusFilterChange: (status: ResourceStatus | '') => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}

const grades = [
  { id: 'p1', name: 'P1' }, { id: 'p2', name: 'P2' }, { id: 'p3', name: 'P3' },
  { id: 'p4', name: 'P4' }, { id: 'p5', name: 'P5' }, { id: 'p6', name: 'P6' },
  { id: 's1', name: 'S1' }, { id: 's2', name: 'S2' }, { id: 's3', name: 'S3' },
  { id: 's4', name: 'S4' }, { id: 's5', name: 'S5' }, { id: 's6', name: 'S6' }
];

const resourceTypes: ResourceType[] = ['PDF', 'Video', 'Audio', 'Link', 'Image', 'Document', 'Other'];
const statusOptions: ResourceStatus[] = ['Active', 'Archived'];

export default function ResourcesToolbar({
  searchTerm,
  onSearchChange,
  subjectFilter,
  onSubjectFilterChange,
  gradeFilter,
  onGradeFilterChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  itemsPerPage,
  onItemsPerPageChange
}: ResourcesToolbarProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debounce search with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(debouncedSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearch, onSearchChange]);

  const handleGradeToggle = (gradeId: string) => {
    if (gradeFilter.includes(gradeId)) {
      onGradeFilterChange(gradeFilter.filter(id => id !== gradeId));
    } else {
      onGradeFilterChange([...gradeFilter, gradeId]);
    }
  };

  const clearFilters = () => {
    setDebouncedSearch('');
    onSearchChange('');
    onSubjectFilterChange('all');
    onGradeFilterChange([]);
    onTypeFilterChange('all');
    onStatusFilterChange('all');
  };

  const activeFiltersCount = [
    debouncedSearch,
    subjectFilter,
    gradeFilter.length > 0 ? 'grades' : '',
    typeFilter,
    statusFilter
  ].filter(Boolean).length;

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 space-y-4">
      {/* Search and Quick Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-900/60" />
          <Input
            placeholder="Search resources..."
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            className="pl-10 bg-white/10 border-white/30 text-blue-900 placeholder:text-blue-900/60 rounded-xl"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-blue-900 hover:bg-white/20 rounded-xl"
            >
              Clear Filters
              <Badge className="ml-2 bg-red-500/20 text-red-600 border-red-500/30">
                {activeFiltersCount}
              </Badge>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Subject Filter */}
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-2">Subject</label>
          <GlassSelect value={subjectFilter || 'all'} onValueChange={onSubjectFilterChange}>
            <GlassSelectTrigger>
              <GlassSelectValue placeholder="All subjects" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="all">All subjects</GlassSelectItem>
              {mockSubjects.map((subject) => (
                <GlassSelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-2">Type</label>
          <GlassSelect value={typeFilter || 'all'} onValueChange={(value: ResourceType | '') => onTypeFilterChange(value)}>
            <GlassSelectTrigger>
              <GlassSelectValue placeholder="All types" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="all">All types</GlassSelectItem>
              {resourceTypes.map((type) => (
                <GlassSelectItem key={type} value={type}>
                  {type}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-2">Status</label>
          <GlassSelect value={statusFilter || 'all'} onValueChange={(value: ResourceStatus | '') => onStatusFilterChange(value)}>
            <GlassSelectTrigger>
              <GlassSelectValue placeholder="All statuses" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="all">All statuses</GlassSelectItem>
              {statusOptions.map((status) => (
                <GlassSelectItem key={status} value={status}>
                  {status}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </div>

        {/* Items Per Page */}
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-2">Items per page</label>
          <GlassSelect value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
            <GlassSelectTrigger>
              <GlassSelectValue />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="12">12</GlassSelectItem>
              <GlassSelectItem value="24">24</GlassSelectItem>
              <GlassSelectItem value="36">36</GlassSelectItem>
              <GlassSelectItem value="48">48</GlassSelectItem>
            </GlassSelectContent>
          </GlassSelect>
        </div>
      </div>

      {/* Grade Filter */}
      <div>
        <label className="block text-sm font-medium text-blue-900 mb-2">Grades</label>
        <div className="flex flex-wrap gap-2">
          {grades.map((grade) => {
            const isSelected = gradeFilter.includes(grade.id);
            return (
              <Button
                key={grade.id}
                variant="ghost"
                size="sm"
                onClick={() => handleGradeToggle(grade.id)}
                className={isSelected 
                  ? "bg-brand-accent/20 text-brand-accent border border-brand-accent/40 hover:bg-brand-accent/30" 
                  : "bg-white/10 text-blue-900 border border-white/30 hover:bg-white/20"
                }
              >
                {grade.name}
              </Button>
            );
          })}
        </div>
        {gradeFilter.length > 0 && (
          <div className="mt-2 text-sm text-blue-900/70">
            {gradeFilter.length} grade{gradeFilter.length > 1 ? 's' : ''} selected
          </div>
        )}
      </div>
    </div>
  );
}