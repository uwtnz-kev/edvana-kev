import React, { useState, useMemo } from 'react';
import { Plus, Users, Edit, Trash2, Eye, Search, ArrowUpDown, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Grade, SubGrade, canAddSubGrades, getValidationMessage } from '@/shared/mocks/schooladmin/classes';
import { useDebounce } from '@/hooks/use-debounce';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SubGradesPanelProps {
  subGrades: SubGrade[];
  selectedSubGrade?: SubGrade;
  selectedGrade?: Grade;
  onSelectSubGrade: (subGrade: SubGrade) => void;
  onAddSubGrade?: () => void;
  onEditSubGrade?: (subGrade: SubGrade) => void;
  onDeleteSubGrade?: (subGrade: SubGrade) => void;
  onViewStudents?: (subGrade: SubGrade) => void;
  hasSelectedGrade: boolean;
  searchTerm?: string;
  visibleColumns?: {
    order: boolean;
    count: boolean;
  };
  itemsPerPage?: number;
}

export default function SubGradesPanel({
  subGrades,
  selectedSubGrade,
  onSelectSubGrade,
  onAddSubGrade,
  onEditSubGrade,
  onDeleteSubGrade,
  onViewStudents,
  hasSelectedGrade,
  selectedGrade,
  searchTerm = '',
  visibleColumns = { order: true, count: true },
  itemsPerPage = 20
}: SubGradesPanelProps) {
  
  // Local state for search and sorting
  const [localSearch, setLocalSearch] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(localSearch, 300);

  // Filter and sort sub-grades
  const { filteredSubGrades, displayedSubGrades } = useMemo(() => {
    let filtered = subGrades.filter(subGrade =>
      subGrade.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    
    // Apply sorting
    if (sortDirection) {
      filtered = filtered.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return { filteredSubGrades: filtered, displayedSubGrades: filtered };
  }, [subGrades, debouncedSearch, sortDirection]);

  const handleSortToggle = () => {
    setSortDirection(prev => {
      if (prev === null) return 'asc';
      if (prev === 'asc') return 'desc';
      return null;
    });
  };

  // Mock student count per sub-grade (deterministic for testing)
  const getStudentCount = (subGradeId: string) => {
    return (subGradeId.charCodeAt(0) % 21) + 15; // 15-35 students
  };

  // Check if subgrades can be added
  const canAdd = selectedGrade ? canAddSubGrades(selectedGrade) : false;
  const validationMessage = selectedGrade ? getValidationMessage(selectedGrade, 'subgrades') : "";

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-xl">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Sub-grades</h3>
          <p className="text-sm text-black">
            {hasSelectedGrade ? 
              (debouncedSearch ? `${filteredSubGrades.length} of ${subGrades.length} sub-grades` : `${subGrades.length} sub-grades`) 
              : 'Select a grade first'}
          </p>
        </div>
      </div>

      {/* Add New Sub-grade Button */}
      <div className="mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button
                  onClick={onAddSubGrade}
                  disabled={!hasSelectedGrade || !canAdd}
                  className={`w-full rounded-xl ${
                    !canAdd && hasSelectedGrade
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-600 border-red-500/30 cursor-not-allowed opacity-60'
                      : 'bg-brand-accent hover:bg-brand-accent/80 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sub-grade
                  {!canAdd && hasSelectedGrade && (
                    <AlertTriangle className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            {!canAdd && hasSelectedGrade && (
              <TooltipContent>
                <p className="max-w-xs text-sm">{validationMessage}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        {!hasSelectedGrade && (
          <p className="text-xs text-blue-900/60 mt-1 text-center">Select a grade first</p>
        )}
      </div>

      {/* Search and Sort Controls */}
      {hasSelectedGrade && (
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">({filteredSubGrades.length})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Search sub-grades..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-9 pr-4 w-40 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 rounded-lg text-sm h-8"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSortToggle}
              className="text-white/60 hover:text-white hover:bg-white/10 border border-white/20 rounded-lg h-8 px-3"
            >
              {sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : 
               sortDirection === 'desc' ? <ArrowDown className="w-4 h-4" /> : 
               <ArrowUpDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      {!hasSelectedGrade ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 mx-auto mb-4 text-black/30" />
          <p className="text-black/60">Select a grade to view sub-grades</p>
        </div>
      ) : (
        <>
          {/* SubGrades List */}
          <div className="space-y-2">
            {displayedSubGrades.map((subGrade) => {
              const isSelected = selectedSubGrade?.id === subGrade.id;
              const studentCount = getStudentCount(subGrade.id);
              
              return (
                <div
                  key={subGrade.id}
                  onClick={() => onSelectSubGrade(subGrade)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-400/40 ring-2 ring-purple-400/30'
                      : 'bg-white/20 backdrop-blur-xl border-white/20 hover:bg-white/30 hover:backdrop-blur-sm hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-blue-900">
                          {subGrade.name}
                        </h4>
                        <Badge 
                          variant="secondary"
                          className="bg-green-500/20 text-green-600 border-green-500/30 text-xs"
                        >
                          {studentCount} students
                        </Badge>
                      </div>
                      
                      {/* Derived Assignment Chips */}
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30 text-xs">
                          {studentCount} students
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 ml-2">
                      {onViewStudents && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewStudents(subGrade);
                          }}
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {onEditSubGrade && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditSubGrade(subGrade);
                          }}
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {onDeleteSubGrade && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSubGrade(subGrade);
                          }}
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-600/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State for SubGrades */}
          {subGrades.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-black/30" />
              <p className="text-black/60 mb-4">No sub-grades found in this grade</p>
              {onAddSubGrade && (
                <Button
                  onClick={onAddSubGrade}
                  variant="outline"
                  className="border-black/30 text-black hover:bg-white/10 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Sub-grade
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}