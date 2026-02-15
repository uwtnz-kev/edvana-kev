import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Grid, List, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface EdvanaBankToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedGrade: string;
  setSelectedGrade: (grade: string) => void;
  selectedCombination: string;
  setSelectedCombination: (combination: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  totalItems: number;
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
}

export function EdvanaBankToolbar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedSubject,
  setSelectedSubject,
  selectedGrade,
  setSelectedGrade,
  selectedCombination,
  setSelectedCombination,
  itemsPerPage,
  setItemsPerPage,
  viewMode,
  setViewMode,
  totalItems,
  visibleColumns,
  setVisibleColumns
}: EdvanaBankToolbarProps) {
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'exam', label: 'Exam' },
    { value: 'resource', label: 'Resource' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english', label: 'English' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'french', label: 'French' },
    { value: 'spanish', label: 'Spanish' }
  ];

  const gradeOptions = [
    { value: 'all', label: 'All Grades' },
    { value: 'grade-7', label: 'Grade 7' },
    { value: 'grade-8', label: 'Grade 8' },
    { value: 'grade-9', label: 'Grade 9' },
    { value: 'grade-10', label: 'Grade 10' },
    { value: 'grade-11', label: 'Grade 11' },
    { value: 'grade-12', label: 'Grade 12' }
  ];

  const combinationOptions = [
    { value: 'all', label: 'All Combinations' },
    { value: 'mcb', label: 'MCB (Math, Chemistry, Biology)' },
    { value: 'pcm', label: 'PCM (Physics, Chemistry, Math)' },
    { value: 'heg', label: 'HEG (History, Economics, Geography)' },
    { value: 'pcb', label: 'PCB (Physics, Chemistry, Biology)' },
    { value: 'arts', label: 'Arts Stream' },
    { value: 'commerce', label: 'Commerce Stream' }
  ];

  const itemsPerPageOptions = [
    { value: '20', label: '20 per page' },
    { value: '50', label: '50 per page' },
    { value: '100', label: '100 per page' }
  ];

  const columnOptions = [
    { value: 'title', label: 'Title' },
    { value: 'type', label: 'Type' },
    { value: 'subject', label: 'Subject' },
    { value: 'grade', label: 'Grade' },
    { value: 'author', label: 'Author' },
    { value: 'uploadDate', label: 'Upload Date' },
    { value: 'downloads', label: 'Downloads' },
    { value: 'rating', label: 'Rating' }
  ];

  const toggleColumn = (columnValue: string) => {
    if (visibleColumns.includes(columnValue)) {
      setVisibleColumns(visibleColumns.filter(col => col !== columnValue));
    } else {
      setVisibleColumns([...visibleColumns, columnValue]);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 space-y-4">
      {/* Top Row - Search and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-900/50" />
            <Input
              placeholder="Search resources, exams, materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/20 border-white/20 text-blue-900 placeholder:text-blue-900/50 focus:border-white/40"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20"
            disabled
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20"
            disabled
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="min-w-[120px] bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-2 text-blue-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-white/40"
        >
          {typeOptions.map((type) => (
            <option key={type.value} value={type.value} className="bg-white text-blue-900">
              {type.label}
            </option>
          ))}
        </select>

        {/* Subject Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="min-w-[140px] bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-2 text-blue-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-white/40"
        >
          {subjectOptions.map((subject) => (
            <option key={subject.value} value={subject.value} className="bg-white text-blue-900">
              {subject.label}
            </option>
          ))}
        </select>

        {/* Grade Filter */}
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="min-w-[120px] bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-2 text-blue-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-white/40"
        >
          {gradeOptions.map((grade) => (
            <option key={grade.value} value={grade.value} className="bg-white text-blue-900">
              {grade.label}
            </option>
          ))}
        </select>

        {/* Combination Filter */}
        <select
          value={selectedCombination}
          onChange={(e) => setSelectedCombination(e.target.value)}
          className="min-w-[200px] bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-2 text-blue-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-white/40"
        >
          {combinationOptions.map((combination) => (
            <option key={combination.value} value={combination.value} className="bg-white text-blue-900">
              {combination.label}
            </option>
          ))}
        </select>

        {/* Column Visibility Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowColumnDropdown(!showColumnDropdown)}
            className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20"
          >
            <Eye className="h-4 w-4 mr-2" />
            Columns
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          
          {showColumnDropdown && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-lg z-50">
              {columnOptions.map((column) => (
                <label
                  key={column.value}
                  className="flex items-center gap-2 p-2 hover:bg-white/20 rounded-lg cursor-pointer text-sm text-blue-900"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(column.value)}
                    onChange={() => toggleColumn(column.value)}
                    className="rounded border-white/20"
                  />
                  {column.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row - View Options and Results */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`h-8 px-3 ${viewMode === 'grid' ? 'bg-brand-accent text-white' : 'text-blue-900 hover:bg-white/20'}`}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`h-8 px-3 ${viewMode === 'list' ? 'bg-brand-accent text-white' : 'text-blue-900 hover:bg-white/20'}`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-blue-900/70">
            <Badge variant="secondary" className="bg-blue-100/20 text-blue-700">
              {totalItems} items
            </Badge>
          </div>
        </div>

        {/* Items Per Page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-blue-900/70">Show:</span>
          <select
            value={itemsPerPage.toString()}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="min-w-[130px] bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-2 text-blue-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-white/40"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-white text-blue-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showColumnDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowColumnDropdown(false)}
        />
      )}
    </div>
  );
}