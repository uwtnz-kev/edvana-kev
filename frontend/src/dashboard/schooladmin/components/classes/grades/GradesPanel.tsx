import React, { useState, useMemo } from 'react';
import { Plus, BookOpen, Edit, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Level, Grade } from '../types';
import { useDebounce } from '@/hooks/use-debounce';

interface GradesPanelProps {
  grades: Grade[];
  selectedGrade?: Grade;
  onSelectGrade: (grade: Grade) => void;
  onAddGrade?: () => void;
  onEditGrade?: (grade: Grade) => void;
  onDeleteGrade?: (grade: Grade) => void;
  hasSelectedLevel: boolean;
  searchTerm?: string;
  visibleColumns?: {
    order: boolean;
    count: boolean;
  };
  itemsPerPage?: number;
}

export default function GradesPanel({
  grades,
  selectedGrade,
  onSelectGrade,
  onAddGrade,
  onEditGrade,
  onDeleteGrade,
  hasSelectedLevel,
  searchTerm = '',
  visibleColumns = { order: true, count: true },
  itemsPerPage = 20
}: GradesPanelProps) {
  
  // Local state for search and sorting
  const [localSearch, setLocalSearch] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(localSearch, 300);

  // Filter and sort grades
  const { filteredGrades, displayedGrades } = useMemo(() => {
    let filtered = grades.filter(grade =>
      grade.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    
    // Apply sorting
    if (sortDirection) {
      filtered = filtered.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return { filteredGrades: filtered, displayedGrades: filtered };
  }, [grades, debouncedSearch, sortDirection]);

  const handleSortToggle = () => {
    setSortDirection(prev => {
      if (prev === null) return 'asc';
      if (prev === 'asc') return 'desc';
      return null;
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-brand-accent/20 rounded-xl">
          <BookOpen className="w-5 h-5 text-brand-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Grades</h3>
          <p className="text-sm text-black">
            {hasSelectedLevel ? 
              (debouncedSearch ? `${filteredGrades.length} of ${grades.length} grades` : `${grades.length} grades`) 
              : 'Select a level first'}
          </p>
        </div>
      </div>

      {/* Add New Grade Button */}
      <div className="mb-6">
        <Button
          onClick={onAddGrade}
          disabled={!hasSelectedLevel}
          className="w-full bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Grade
        </Button>
        {!hasSelectedLevel && (
          <p className="text-xs text-blue-900/60 mt-1 text-center">Select a level first</p>
        )}
      </div>

      {/* Search and Sort Controls */}
      {hasSelectedLevel && (
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">({filteredGrades.length})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Search grades..."
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
      {!hasSelectedLevel ? (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-black/30" />
          <p className="text-black/60">Select an education level to view grades</p>
        </div>
      ) : (
        <>
          {/* Grades List */}
          <div className="space-y-2">
            {displayedGrades.map((grade) => {
              const isSelected = selectedGrade?.id === grade.id;
              const subGradeCount = grade.subGrades.length;
              
              // Mock derived counts for assignment features (deterministic for testing)
              const studentsCount = (grade.id.charCodeAt(0) % 100) + 50; // 50-150 students
              const subjectsCount = (grade.id.charCodeAt(1) % 6) + 4; // 4-9 subjects
              
              return (
                <div
                  key={grade.id}
                  onClick={() => onSelectGrade(grade)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-brand-accent/20 border-brand-accent/40 ring-2 ring-brand-accent/30'
                      : 'bg-white/20 backdrop-blur-xl border-white/20 hover:bg-white/30 hover:backdrop-blur-sm hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-blue-900">{grade.name}</h4>
                        <Badge 
                          variant="secondary"
                          className="bg-white/20 text-black border-white/30 text-xs"
                        >
                          {subGradeCount} sub-grades
                        </Badge>
                      </div>
                      
                      {/* Derived Assignment Chips */}
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30 text-xs">
                          {studentsCount} students
                        </Badge>
                        <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30 text-xs">
                          {subjectsCount} subjects
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 ml-2">
                      {onEditGrade && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditGrade(grade);
                          }}
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {onDeleteGrade && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteGrade(grade);
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

          {/* Empty State for Grades */}
          {grades.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-black/30" />
              <p className="text-black/60 mb-4">No grades found in this level</p>
              {onAddGrade && (
                <Button
                  onClick={onAddGrade}
                  variant="outline"
                  className="border-black/30 text-black hover:bg-white/10 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Grade
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}