import { Search, Filter, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Slider } from "@/components/ui/slider";
import { TeacherFilters, TeacherStatus, TeacherSpecialization, TeacherQualification } from './types';

interface TeacherFiltersProps {
  totalTeachers: number;
  query: string;
  onSearch: (query: string) => void;
  filters: TeacherFilters;
  onFiltersChange: (filters: Partial<TeacherFilters>) => void;
  onAdd: () => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export default function TeacherFiltersComponent({ 
  totalTeachers,
  query,
  onSearch,
  filters,
  onFiltersChange,
  onAdd,
  pageSize,
  onPageSizeChange
}: TeacherFiltersProps) {
  const activeFiltersCount = [
    filters.status !== 'all',
    filters.specialization !== 'all',
    filters.qualification !== 'all',
    filters.experienceRange.min > 0 || filters.experienceRange.max < 30
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    onFiltersChange({
      status: 'all',
      specialization: 'all',
      qualification: 'all',
      experienceRange: { min: 0, max: 30 }
    });
    onSearch('');
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      {/* Left: Title and Count */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-blue-900">Teachers</h1>
        <Badge 
          variant="secondary" 
          className="bg-brand-teal/10 text-brand-teal border-brand-teal/20 hover:bg-brand-teal/20"
        >
          {totalTeachers} total
        </Badge>
      </div>

      {/* Middle: Search and Filters */}
      <div className="flex-1 flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search teachers by name, ID, or email..."
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search teachers by name, employee ID, or email"
            aria-describedby="teacher-search-help"
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-teal/50 text-blue-900 placeholder:text-blue-900/60"
          />
          <span id="teacher-search-help" className="sr-only">
            Type to filter teachers. Results update automatically as you type.
          </span>
        </div>

        {/* Advanced Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/50 backdrop-blur-sm border-white/20 rounded-xl hover:bg-white/30 text-black/80 relative"
              aria-label="Open advanced filters"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-brand-accent text-white text-xs px-1.5 py-0.5">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-white/90 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-blue-900">Filter Teachers</h4>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-xs hover:bg-white/20"
                    aria-label="Clear all filters"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium text-blue-900 mb-2 block">Status</label>
                <GlassSelect
                  value={filters.status}
                  onValueChange={(value) => onFiltersChange({ status: value as TeacherStatus | 'all' })}
                >
                  <GlassSelectTrigger aria-label="Filter by teacher status">
                    <GlassSelectValue />
                  </GlassSelectTrigger>
                  <GlassSelectContent>
                    <GlassSelectItem value="all">All Status</GlassSelectItem>
                    {Object.values(TeacherStatus).map(status => (
                      <GlassSelectItem key={status} value={status}>{status}</GlassSelectItem>
                    ))}
                  </GlassSelectContent>
                </GlassSelect>
              </div>

              {/* Specialization Filter */}
              <div>
                <label className="text-sm font-medium text-blue-900 mb-2 block">Specialization</label>
                <GlassSelect
                  value={filters.specialization}
                  onValueChange={(value) => onFiltersChange({ specialization: value as TeacherSpecialization | 'all' })}
                >
                  <GlassSelectTrigger aria-label="Filter by teacher specialization">
                    <GlassSelectValue />
                  </GlassSelectTrigger>
                  <GlassSelectContent>
                    <GlassSelectItem value="all">All Specializations</GlassSelectItem>
                    {Object.values(TeacherSpecialization).map(spec => (
                      <GlassSelectItem key={spec} value={spec}>{spec}</GlassSelectItem>
                    ))}
                  </GlassSelectContent>
                </GlassSelect>
              </div>

              {/* Qualification Filter */}
              <div>
                <label className="text-sm font-medium text-blue-900 mb-2 block">Qualification</label>
                <GlassSelect
                  value={filters.qualification}
                  onValueChange={(value) => onFiltersChange({ qualification: value as TeacherQualification | 'all' })}
                >
                  <GlassSelectTrigger aria-label="Filter by teacher qualification">
                    <GlassSelectValue />
                  </GlassSelectTrigger>
                  <GlassSelectContent>
                    <GlassSelectItem value="all">All Qualifications</GlassSelectItem>
                    {Object.values(TeacherQualification).map(qual => (
                      <GlassSelectItem key={qual} value={qual}>{qual}</GlassSelectItem>
                    ))}
                  </GlassSelectContent>
                </GlassSelect>
              </div>

              {/* Experience Range Filter */}
              <div>
                <label className="text-sm font-medium text-blue-900 mb-2 block">
                  Experience: {filters.experienceRange.min} - {filters.experienceRange.max} years
                </label>
                <Slider
                  value={[filters.experienceRange.min, filters.experienceRange.max]}
                  onValueChange={([min, max]) => onFiltersChange({ experienceRange: { min, max } })}
                  max={30}
                  min={0}
                  step={1}
                  className="w-full"
                  aria-label="Filter by years of experience"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Right: Page Size and Add Button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-black/80">Show:</span>
          <GlassSelect value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(parseInt(value))}>
            <GlassSelectTrigger 
              className="w-20"
              aria-label="Select number of teachers per page"
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
        
        <Button
          onClick={onAdd}
          className="bg-brand-teal hover:backdrop-blur-sm hover:bg-white/20 hover:text-brand-teal text-white rounded-xl px-4 py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Add new teacher"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>
    </div>
  );
}