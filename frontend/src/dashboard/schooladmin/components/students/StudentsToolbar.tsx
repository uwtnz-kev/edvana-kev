import React, { useState, useEffect } from 'react';
import { Search, Filter, Columns, Download, Upload, FileText, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import { StudentFilters } from './types';
import { classOptions, statusOptions } from './mock';

interface StudentsToolbarProps {
  filters: StudentFilters;
  onFiltersChange: (filters: StudentFilters) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  totalStudents: number;
  onExport?: () => void;
  onImport?: () => void;
  onBulkDownload?: (format: 'pdf' | 'excel') => void;
}

// Enhanced status options matching the requirements
const enhancedStatusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'On Leave' },
  { value: 'Transferred', label: 'Transferred' },
  { value: 'Graduated', label: 'Graduated' },
  { value: 'Suspended', label: 'Archived' },
];

// Enrollment year options
const enrollmentYearOptions = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
];

// Parent link options
const parentLinkOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export default function StudentsToolbar({
  filters,
  onFiltersChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalStudents,
  onExport,
  onImport,
  onBulkDownload,
}: StudentsToolbarProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);

  // Debounced search with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchInput });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClassChange = (value: string) => {
    onFiltersChange({ ...filters, class: value ? [value] : [] });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value ? [value] : [] });
  };

  const clearFilters = () => {
    setSearchInput('');
    onFiltersChange({
      search: '',
      class: [],
      section: [],
      status: [],
    });
  };

  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-6 mb-6">
      {/* Main Toolbar Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900 w-4 h-4" />
          <Input
            placeholder="Search students by name, email, phone, roll number..."
            value={searchInput}
            onChange={handleSearchChange}
            className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl text-blue-900 placeholder:text-blue-900/60 focus:border-white/50 focus:bg-white/30"
            aria-label="Search students"
          />
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Filters Dropdown */}
          <div className="relative">
            <GlassSelect
              value=""
              onValueChange={() => {}}
            >
              <GlassSelectTrigger className="h-8 min-w-[100px] text-xs">
                <Filter className="w-3 h-3 mr-1" />
                <span>Filters</span>
              </GlassSelectTrigger>
              <GlassSelectContent>
                {/* Class Filter */}
                <div className="p-2 border-b border-white/10">
                  <label className="text-xs font-medium text-white mb-1 block">Class</label>
                  <GlassSelect
                    value={filters.class[0] || ""}
                    onValueChange={handleClassChange}
                  >
                    <GlassSelectTrigger className="h-7 text-xs">
                      <GlassSelectValue placeholder="Select class" />
                    </GlassSelectTrigger>
                    <GlassSelectContent>
                      {classOptions.map((option) => (
                        <GlassSelectItem key={option.value} value={option.value}>
                          {option.label}
                        </GlassSelectItem>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                </div>

                {/* Status Filter */}
                <div className="p-2 border-b border-white/10">
                  <label className="text-xs font-medium text-white mb-1 block">Status</label>
                  <GlassSelect
                    value={filters.status[0] || ""}
                    onValueChange={handleStatusChange}
                  >
                    <GlassSelectTrigger className="h-7 text-xs">
                      <GlassSelectValue placeholder="Select status" />
                    </GlassSelectTrigger>
                    <GlassSelectContent>
                      {enhancedStatusOptions.map((option) => (
                        <GlassSelectItem key={option.value} value={option.value}>
                          {option.label}
                        </GlassSelectItem>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                </div>

                {/* Enrollment Year Filter */}
                <div className="p-2 border-b border-white/10">
                  <label className="text-xs font-medium text-white mb-1 block">Enrollment Year</label>
                  <GlassSelect
                    value=""
                    onValueChange={() => {}}
                  >
                    <GlassSelectTrigger className="h-7 text-xs">
                      <GlassSelectValue placeholder="Select year" />
                    </GlassSelectTrigger>
                    <GlassSelectContent>
                      {enrollmentYearOptions.map((option) => (
                        <GlassSelectItem key={option.value} value={option.value}>
                          {option.label}
                        </GlassSelectItem>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                </div>

                {/* Parent Link Filter */}
                <div className="p-2">
                  <label className="text-xs font-medium text-white mb-1 block">Linked to Parent</label>
                  <GlassSelect
                    value=""
                    onValueChange={() => {}}
                  >
                    <GlassSelectTrigger className="h-7 text-xs">
                      <GlassSelectValue placeholder="Select option" />
                    </GlassSelectTrigger>
                    <GlassSelectContent>
                      {parentLinkOptions.map((option) => (
                        <GlassSelectItem key={option.value} value={option.value}>
                          {option.label}
                        </GlassSelectItem>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                </div>

                {/* Clear Filters */}
                <div className="p-2 pt-2 border-t border-white/10">
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg h-7 px-3 text-xs w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </GlassSelectContent>
            </GlassSelect>
          </div>

          {/* Columns Dropdown */}
          <div className="relative">
            <GlassSelect
              value=""
              onValueChange={() => {}}
            >
              <GlassSelectTrigger className="h-8 min-w-[100px] text-xs">
                <Columns className="w-3 h-3 mr-1" />
                <span>Columns</span>
              </GlassSelectTrigger>
              <GlassSelectContent>
                <div className="p-2">
                  <label className="text-xs font-medium text-white mb-2 block">Visible Columns</label>
                  <div className="space-y-2">
                    {['Student', 'Roll Number', 'Class/Section', 'Contact', 'Parent', 'Status'].map((column) => (
                      <label key={column} className="flex items-center gap-2 text-xs text-white">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-white/30 bg-white/20"
                        />
                        {column}
                      </label>
                    ))}
                  </div>
                </div>
              </GlassSelectContent>
            </GlassSelect>
          </div>

          {/* Items Per Page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-white whitespace-nowrap">Show:</span>
            <GlassSelect
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
            >
              <GlassSelectTrigger className="w-16 h-8 text-xs text-blue-900">
                <GlassSelectValue />
              </GlassSelectTrigger>
              <GlassSelectContent>
                <GlassSelectItem value="10">10</GlassSelectItem>
                <GlassSelectItem value="25">25</GlassSelectItem>
                <GlassSelectItem value="50">50</GlassSelectItem>
                <GlassSelectItem value="100">100</GlassSelectItem>
              </GlassSelectContent>
            </GlassSelect>
            <span className="text-sm text-white whitespace-nowrap">
              of {totalStudents} students
            </span>
          </div>

          {/* Bulk Download Dropdown */}
          {onBulkDownload && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl text-blue-900 hover:bg-white/70 px-3 h-8"
                  aria-label="Bulk download options"
                >
                  <Download className="w-3 h-3 mr-1" />
                  <span className="text-xs">Download</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-1"
                align="end"
              >
                <DropdownMenuItem
                  onClick={() => onBulkDownload('pdf')}
                  className="text-blue-900 hover:bg-white/30 rounded-xl cursor-pointer flex items-center gap-2 px-3 py-2"
                >
                  <FileText className="w-4 h-4" />
                  PDF (filtered)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onBulkDownload('excel')}
                  className="text-blue-900 hover:bg-white/30 rounded-xl cursor-pointer flex items-center gap-2 px-3 py-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel (filtered)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.class.length > 0 || filters.status.length > 0) && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
          <span className="text-xs text-white/70">Active filters:</span>
          {filters.search && (
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-2 py-1 text-xs text-white">
              Search: "{filters.search}"
            </span>
          )}
          {filters.class.length > 0 && (
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-2 py-1 text-xs text-white">
              Class: {filters.class.join(', ')}
            </span>
          )}
          {filters.status.length > 0 && (
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-2 py-1 text-xs text-white">
              Status: {filters.status.join(', ')}
            </span>
          )}
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg h-6 px-2 text-xs ml-auto"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}