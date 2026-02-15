import { useState, useEffect } from "react";
import { Search, Filter, X, Columns, Eye, EyeOff, Download, FileText, FileSpreadsheet, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { 
  GlassSelect, 
  GlassSelectContent, 
  GlassSelectItem, 
  GlassSelectTrigger, 
  GlassSelectValue 
} from "../ui/GlassSelect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TeacherFilters } from "./types";



interface TeachersToolbarProps {
  totalTeachers: number;
  searchQuery: string;
  onSearch: (query: string) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  filters: TeacherFilters;
  onFiltersChange: (filters: TeacherFilters) => void;
  onBulkDownload?: (format: 'pdf' | 'excel') => void;
}

interface ColumnVisibility {
  name: boolean;
  email: boolean;
  phone: boolean;
  role: boolean;
  specialization: boolean;
  experience: boolean;
  classes: boolean;
  subjects: boolean;
  status: boolean;
}

// Available filter options
const statusOptions = ['Active', 'On Leave', 'Archived'] as const;

// Mock data for class and subject filters
const classOptions = [
  'P1A', 'P1B', 'P2A', 'P2B', 'P3A', 'P3B', 'P4A', 'P4B', 'P5A', 'P5B', 'P6A', 'P6B',
  'S1A', 'S1B', 'S2A', 'S2B', 'S3A', 'S3B', 'S4 MCB', 'S4 PCB', 'S4 HEG', 'S5 MCB', 'S5 PCB', 'S5 HEG', 'S6 MCB', 'S6 PCB', 'S6 HEG'
] as const;

const subjectOptions = [
  'Mathematics', 'Science', 'English', 'Kinyarwanda', 'French', 'Social Studies', 
  'Arts', 'Physical Education', 'Computer Science', 'Music', 'Biology', 'Chemistry', 
  'Physics', 'Geography', 'History', 'Economics', 'Entrepreneurship', 'Literature'
] as const;



export default function TeachersToolbar({ 
  totalTeachers,
  searchQuery: externalSearchQuery,
  onSearch,
  pageSize,
  onPageSizeChange,
  filters,
  onFiltersChange,
  onBulkDownload
}: TeachersToolbarProps) {
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isColumnsOpen, setIsColumnsOpen] = useState(false);
  
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    name: true,
    email: true,
    phone: true,
    role: true,
    specialization: true,
    experience: true,
    classes: true,
    subjects: true,
    status: true,
  });


  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageSizeChange = (value: string) => {
    onPageSizeChange(parseInt(value));
  };

  // Filter handlers
  const handleStatusFilter = (status: string) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFiltersChange({
      ...filters,
      status: newStatuses
    });
  };

  const handleClassFilter = (className: string, checked: boolean) => {
    const currentClasses = filters.classes || [];
    const newClasses = checked
      ? [...currentClasses, className]
      : currentClasses.filter(c => c !== className);
    
    onFiltersChange({
      ...filters,
      classes: newClasses
    });
  };

  const handleSubjectFilter = (subject: string, checked: boolean) => {
    const currentSubjects = filters.subjects || [];
    const newSubjects = checked
      ? [...currentSubjects, subject]
      : currentSubjects.filter(s => s !== subject);
    
    onFiltersChange({
      ...filters,
      subjects: newSubjects
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: [],
      classes: [],
      subjects: []
    });
  };

  // Count active filters
  const activeFiltersCount = [
    (filters.status || []).length > 0,
    (filters.classes || []).length > 0,
    (filters.subjects || []).length > 0
  ].filter(Boolean).length;

  // Column visibility handlers
  const handleColumnToggle = (column: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const visibleColumnsCount = Object.values(columnVisibility).filter(Boolean).length;



  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl hover:bg-white/20 hover:shadow-2xl transition-all p-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Left: Title and Count */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-blue-900">Teachers</h1>
          <Badge 
            variant="secondary" 
            className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20"
          >
            {totalTeachers} total
          </Badge>
        </div>

        {/* Middle: Search Input, Filters, and Columns */}
        <div className="flex items-center gap-3 flex-1 max-w-3xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl text-blue-900 placeholder-blue-900/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Filters Dropdown */}
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl text-blue-900 hover:bg-white/70 relative"
                aria-label="Filter teachers"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-brand-teal text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4" 
              align="start"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="h-auto p-1 text-xs text-white hover:bg-white/20"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Status</label>
                  <div className="flex gap-2">
                    {statusOptions.map((status) => (
                      <Button
                        key={status}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusFilter(status)}
                        className={`text-xs rounded-xl border transition-all ${
                          (filters.status || []).includes(status)
                            ? 'bg-brand-teal text-white border-brand-teal'
                            : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                        }`}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Classes Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Classes</label>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {classOptions.map((classOption) => (
                        <div key={classOption} className="flex items-center space-x-2">
                          <Checkbox
                            id={`filter-${classOption}`}
                            checked={(filters.classes || []).includes(classOption)}
                            onCheckedChange={(checked) => 
                              handleClassFilter(classOption, checked as boolean)
                            }
                            className="border-white/40 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                          />
                          <label
                            htmlFor={`filter-${classOption}`}
                            className="text-xs text-white cursor-pointer"
                          >
                            {classOption}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subjects Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Subjects</label>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-2">
                      {subjectOptions.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`filter-subject-${subject}`}
                            checked={(filters.subjects || []).includes(subject)}
                            onCheckedChange={(checked) => 
                              handleSubjectFilter(subject, checked as boolean)
                            }
                            className="border-white/40 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                          />
                          <label
                            htmlFor={`filter-subject-${subject}`}
                            className="text-xs text-white cursor-pointer"
                          >
                            {subject}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Columns Visibility Dropdown */}
          <Popover open={isColumnsOpen} onOpenChange={setIsColumnsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl text-blue-900 hover:bg-white/70"
                aria-label="Toggle column visibility"
              >
                <Columns className="h-4 w-4 mr-2" />
                Columns
                <Badge className="ml-2 bg-brand-primary/20 text-brand-primary text-xs">
                  {visibleColumnsCount}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4" 
              align="start"
            >
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Toggle Columns</h3>
                <div className="space-y-2">
                  {Object.entries(columnVisibility).map(([column, visible]) => (
                    <div key={column} className="flex items-center space-x-3">
                      <Checkbox
                        id={`column-${column}`}
                        checked={visible}
                        onCheckedChange={() => handleColumnToggle(column as keyof ColumnVisibility)}
                        className="border-white/40 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                      />
                      <label
                        htmlFor={`column-${column}`}
                        className="text-sm text-white cursor-pointer capitalize flex items-center"
                      >
                        {visible ? (
                          <Eye className="h-3 w-3 mr-2 text-green-400" />
                        ) : (
                          <EyeOff className="h-3 w-3 mr-2 text-gray-400" />
                        )}
                        {column}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Bulk Download Dropdown */}
          {onBulkDownload && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl text-blue-900 hover:bg-white/70"
                  aria-label="Bulk download options"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                  <ChevronDown className="h-3 w-3 ml-2" />
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

        {/* Right: Items per page */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-blue-900 whitespace-nowrap">Items per page:</span>
          <GlassSelect value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <GlassSelectTrigger className="w-20 bg-white/50 backdrop-blur-sm border-white/20 rounded-xl text-blue-900 focus:border-white/40 focus:bg-white/20">
              <GlassSelectValue className="text-blue-900" />
            </GlassSelectTrigger>
            <GlassSelectContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
              <GlassSelectItem value="5" className="text-white hover:bg-white/30 focus:bg-white/30">5</GlassSelectItem>
              <GlassSelectItem value="10" className="text-white hover:bg-white/30 focus:bg-white/30">10</GlassSelectItem>
              <GlassSelectItem value="25" className="text-white hover:bg-white/30 focus:bg-white/30">25</GlassSelectItem>
              <GlassSelectItem value="50" className="text-white hover:bg-white/30 focus:bg-white/30">50</GlassSelectItem>
            </GlassSelectContent>
          </GlassSelect>
        </div>
      </div>
    </div>
  );
}