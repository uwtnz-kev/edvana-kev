import React, { useState, useMemo } from 'react';
import { Plus, GraduationCap, Edit, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Level } from '../types';
import { useDebounce } from '@/hooks/use-debounce';

interface LevelsPanelProps {
  levels: Level[];
  selectedLevel?: Level;
  onSelectLevel: (level: Level) => void;
  onAddLevel?: () => void;
  onEditLevel?: (level: Level) => void;
  onDeleteLevel?: (level: Level) => void;
}

export default function LevelsPanel({
  levels,
  selectedLevel,
  onSelectLevel,
  onAddLevel,
  onEditLevel,
  onDeleteLevel,
}: LevelsPanelProps) {
  // Local state for search and sorting
  const [localSearch, setLocalSearch] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(localSearch, 300);

  // Filter and sort levels
  const { filteredLevels, displayedLevels } = useMemo(() => {
    let filtered = levels.filter(level =>
      level.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    
    // Apply sorting
    if (sortDirection) {
      filtered = filtered.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return { filteredLevels: filtered, displayedLevels: filtered };
  }, [levels, debouncedSearch, sortDirection]);

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
        <div className="flex items-center justify-center w-10 h-10 bg-brand-teal/20 rounded-xl">
          <GraduationCap className="w-5 h-5 text-brand-teal" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Education Levels</h3>
          <p className="text-sm text-black">
            {debouncedSearch ? `${filteredLevels.length} of ${levels.length}` : `${levels.length}`} levels
          </p>
        </div>
      </div>

      {/* Add New Level Button */}
      {onAddLevel && (
        <div className="mb-6">
          <Button
            onClick={onAddLevel}
            className="w-full bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Level
          </Button>
        </div>
      )}

      {/* Search and Sort Controls */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">({filteredLevels.length})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <Input
              placeholder="Search levels..."
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



      {/* Levels List */}
      <div className="space-y-2">
        {displayedLevels.map((level) => {
          const isSelected = selectedLevel?.id === level.id;
          const gradeCount = level.grades.length;
          const subGradeCount = level.grades.reduce((acc, grade) => acc + grade.subGrades.length, 0);
          
          // Mock derived counts for assignment features (deterministic for testing)
          const totalStudents = (level.id.charCodeAt(0) % 200) + 100; // 100-300 students
          const totalSubjects = (level.id.charCodeAt(1) % 8) + 5; // 5-12 subjects
          
          return (
            <div
              key={level.id}
              onClick={() => onSelectLevel(level)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-brand-teal/20 border-brand-teal/40 ring-2 ring-brand-teal/30'
                  : 'bg-white/20 backdrop-blur-xl border-white/20 hover:bg-white/30 hover:backdrop-blur-sm hover:border-white/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-blue-900">{level.name}</h4>
                    <Badge 
                      variant="secondary"
                      className="bg-white/20 text-black border-white/30 text-xs"
                    >
                      {gradeCount} grades
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-black/70">
                    <span>{subGradeCount} sub-grades</span>
                  </div>
                  
                  {/* Derived Assignment Chips */}
                  <div className="flex items-center gap-2 mt-3">
                    <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30 text-xs">
                      {totalStudents} students
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30 text-xs">
                      {totalSubjects} subjects
                    </Badge>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-1 ml-2">
                  {onEditLevel && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditLevel(level);
                      }}
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {onDeleteLevel && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteLevel(level);
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

      {/* Empty State */}
      {levels.length === 0 && (
        <div className="text-center py-8">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-black/30" />
          <p className="text-black/60 mb-4">No education levels found</p>
          {onAddLevel && (
            <Button
              onClick={onAddLevel}
              variant="outline"
              className="border-black/30 text-black hover:bg-white/10 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Level
            </Button>
          )}
        </div>
      )}
    </div>
  );
}