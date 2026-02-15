import { useState, useEffect } from "react";
import { Search, Filter, X, Columns, Download, FileText, FileSpreadsheet, ChevronDown } from "lucide-react";
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
import { SubjectFilters } from "./types";

export interface ColumnVisibility {
  name: boolean;
  code: boolean;
  classes: boolean;
  teacherName: boolean;
  numberOfStudents: boolean;
  passingRate: boolean;
  status: boolean;
  updatedAt: boolean;
}

interface SubjectToolbarProps {
  totalSubjects: number;
  searchQuery: string;
  onSearch: (query: string) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  filters: SubjectFilters;
  onFiltersChange: (filters: SubjectFilters) => void;
  columnVisibility: ColumnVisibility;
  onColumnVisibilityChange: (columns: ColumnVisibility) => void;
  onBulkDownload?: (format: 'pdf' | 'excel') => void;
}

// Available filter options
const classOptions = [
  'P1 A', 'P1 B', 'P2 A', 'P2 B', 'P3 A', 'P3 B', 
  'P4 A', 'P4 B', 'P5 A', 'P5 B', 'P6 A', 'P6 B',
  'S1 A', 'S1 B', 'S2 A', 'S2 B', 'S3 A', 'S3 B',
  'S4 A', 'S4 B', 'S5 A', 'S5 B', 'S6 A', 'S6 B'
];

const teacherOptions = [
  'Mr. Jean Baptiste Uwimana',
  'Ms. Marie Claire Mukamana', 
  'Mr. Paul Nkubana',
  'Ms. Agnes Nyirahabimana',
  'Mr. Emmanuel Bizimana',
  'Ms. Claudine Uwizeyimana',
  'Mr. David Habimana',
  'Ms. Grace Mukandayisenga',
  'Mr. Eric Ndayisaba',
  'Ms. Josephine Mukarugwiza',
  'Mr. Innocent Nzeyimana',
  'Ms. Immaculee Uwimana',
  'Mr. Alexis Rugema',
  'Ms. Beatrice Nyiramana',
  'Mr. Vincent Habyarimana'
];

const statusOptions = ['Active', 'Inactive'];

// Column configuration
const columnOptions = [
  { key: 'name' as keyof ColumnVisibility, label: 'Subject Name' },
  { key: 'code' as keyof ColumnVisibility, label: 'Code' },
  { key: 'classes' as keyof ColumnVisibility, label: 'Classes' },
  { key: 'teacherName' as keyof ColumnVisibility, label: 'Teacher' },
  { key: 'numberOfStudents' as keyof ColumnVisibility, label: 'Students Count' },
  { key: 'passingRate' as keyof ColumnVisibility, label: 'Passing Rate' },
  { key: 'status' as keyof ColumnVisibility, label: 'Status' },
  { key: 'updatedAt' as keyof ColumnVisibility, label: 'Updated At' },
];

export default function SubjectToolbar({ 
  totalSubjects,
  searchQuery: externalSearchQuery,
  onSearch,
  pageSize,
  onPageSizeChange,
  filters,
  onFiltersChange,
  columnVisibility,
  onColumnVisibilityChange,
  onBulkDownload
}: SubjectToolbarProps) {
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isColumnsOpen, setIsColumnsOpen] = useState(false);

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
  const handleClassFilter = (classValue: string, checked: boolean) => {
    const currentClasses = filters.classes || [];
    const newClasses = checked 
      ? [...currentClasses, classValue]
      : currentClasses.filter(c => c !== classValue);
    
    onFiltersChange({
      ...filters,
      classes: newClasses.length > 0 ? newClasses : undefined
    });
  };

  const handleStatusFilter = (status: string) => {
    onFiltersChange({
      ...filters,
      status: status === filters.status ? undefined : status as "Active" | "Inactive"
    });
  };

  const handleTeacherFilter = (teacher: string) => {
    // Convert "all" to undefined to clear the filter
    const teacherValue = teacher === "all" ? undefined : teacher;
    onFiltersChange({
      ...filters,
      teacherName: teacherValue
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: filters.search
    });
  };

  // Count active filters
  const activeFiltersCount = [
    filters.status,
    filters.classes && filters.classes.length > 0,
    filters.teacherName
  ].filter(Boolean).length;

  // Column visibility handlers
  const handleColumnToggle = (columnKey: keyof ColumnVisibility, checked: boolean) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [columnKey]: checked
    });
  };

  const visibleColumnsCount = Object.values(columnVisibility).filter(Boolean).length;
  const totalColumnsCount = Object.keys(columnVisibility).length;

  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl hover:bg-white/20 hover:shadow-2xl transition-all p-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Left: Title and Count */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-blue-900">Subjects</h1>
          <Badge 
            variant="secondary" 
            className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20"
          >
            {totalSubjects} total
          </Badge>
        </div>

        {/* Middle: Search Input, Filters, and Columns */}
        <div className="flex items-center gap-3 flex-1 max-w-3xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name, code, or teacher..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search subjects by name, code, or teacher"
              aria-describedby="search-help"
              className="w-full pl-10 pr-4 py-2.5 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-blue-900 placeholder:text-blue-900/60"
            />
            <span id="search-help" className="sr-only">
              Type to filter subjects. Results update automatically as you type.
            </span>
          </div>

          {/* Filters Dropdown */}
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl text-blue-900 hover:bg-white/70 relative"
                aria-label="Open filters"
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
                  <h3 className="text-sm font-semibold text-white">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-xs text-white hover:bg-white/20 h-6 px-2"
                    >
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
                          filters.status === status
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
                            checked={filters.classes?.includes(classOption) || false}
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

                {/* Teacher Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Teacher</label>
                  <GlassSelect 
                    value={filters.teacherName || "all"} 
                    onValueChange={handleTeacherFilter}
                  >
                    <GlassSelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-blue-900 focus:border-white/40 focus:bg-white/20">
                      <GlassSelectValue placeholder="Select teacher" />
                    </GlassSelectTrigger>
                    <GlassSelectContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
                      <GlassSelectItem value="all" className="text-white hover:bg-white/30 focus:bg-white/30">
                        All teachers
                      </GlassSelectItem>
                      {teacherOptions.map((teacher) => (
                        <GlassSelectItem 
                          key={teacher} 
                          value={teacher}
                          className="text-white hover:bg-white/30 focus:bg-white/30"
                        >
                          {teacher}
                        </GlassSelectItem>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Columns Dropdown */}
          <Popover open={isColumnsOpen} onOpenChange={setIsColumnsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl text-blue-900 hover:bg-white/70 relative"
                aria-label="Manage column visibility"
              >
                <Columns className="h-4 w-4 mr-2" />
                Columns
                <Badge className="ml-2 bg-gray-500/80 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {visibleColumnsCount}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4" 
              align="start"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Show Columns</h3>
                  <span className="text-xs text-white/80">
                    {visibleColumnsCount} of {totalColumnsCount}
                  </span>
                </div>

                {/* Column visibility checkboxes */}
                <div className="space-y-3">
                  {columnOptions.map((column) => (
                    <div key={column.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`column-${column.key}`}
                        checked={columnVisibility[column.key]}
                        onCheckedChange={(checked) => 
                          handleColumnToggle(column.key, checked as boolean)
                        }
                        className="border-white/40 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                      />
                      <label
                        htmlFor={`column-${column.key}`}
                        className="text-sm text-white cursor-pointer flex-1"
                      >
                        {column.label}
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

        {/* Right: Page Size */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-black/80">Show:</span>
          <GlassSelect value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <GlassSelectTrigger 
              className="w-20"
              aria-label="Select number of subjects per page"
            >
              <GlassSelectValue />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="20">20</GlassSelectItem>
              <GlassSelectItem value="50">50</GlassSelectItem>
              <GlassSelectItem value="100">100</GlassSelectItem>
            </GlassSelectContent>
          </GlassSelect>
        </div>
      </div>
    </div>
  );
}