import React, { useState, useMemo } from 'react';
import { Plus, BookOpen, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import { 
  Combination, 
  Grade,
  Level,
  canAddCombinations,
  getValidationMessage
} from '@/shared/mocks/schooladmin/classes';

interface CombinationsCardProps {
  selectedGrade?: Grade;
  selectedLevel?: Level;
  hasSelectedGrade: boolean;
  onAddCombination?: () => void;
  onEditCombination?: (combination: Combination) => void;
  onDeleteCombination?: (combination: Combination) => void;
  onUpdate?: () => void;
}

export default function CombinationsCard({
  selectedGrade,
  selectedLevel,
  hasSelectedGrade,
  onAddCombination,
  onEditCombination,
  onDeleteCombination,
  onUpdate
}: CombinationsCardProps) {
  const { toast } = useToast();

  // Get combinations directly from the selected grade
  const gradeCombinations = selectedGrade?.combinations || [];
  
  // Check if combinations can be added
  const canAdd = selectedGrade ? canAddCombinations(selectedGrade) : false;
  const validationMessage = selectedGrade ? getValidationMessage(selectedGrade, 'combinations') : "";

  const handleAddCombinationClick = () => {
    if (!selectedGrade) {
      toast({
        title: "Selection Required",
        description: "Please select a grade first.",
        variant: "destructive"
      });
      return;
    }

    if (!canAddCombinations(selectedGrade)) {
      toast({
        title: "Cannot Add Combinations",
        description: getValidationMessage(selectedGrade, 'combinations'),
        variant: "destructive"
      });
      return;
    }
    
    onAddCombination?.();
  };

  const handleDeleteCombinationClick = (combination: Combination) => {
    onDeleteCombination?.(combination);
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-xl">
          <BookOpen className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Subject Combinations</h3>
          <p className="text-sm text-black">
            {selectedGrade ? `For ${selectedGrade.name} (${gradeCombinations.length} combinations)` : 'Select a grade first'}
          </p>
        </div>
      </div>

      {/* Add New Combination Button */}
      <div className="mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button
                  onClick={handleAddCombinationClick}
                  disabled={!selectedGrade || !canAdd}
                  className={`w-full rounded-xl ${
                    !canAdd && selectedGrade
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-600 border-red-500/30 cursor-not-allowed opacity-60'
                      : 'bg-brand-accent hover:bg-brand-accent/80 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Combination
                  {!canAdd && selectedGrade && (
                    <AlertTriangle className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            {!canAdd && selectedGrade && (
              <TooltipContent>
                <p className="max-w-xs text-sm">{validationMessage}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        {/* Description */}
        <div className="mt-3 p-3 bg-blue-50/20 backdrop-blur-sm rounded-lg border border-blue-200/30">
          <p className="text-xs text-blue-900/80 leading-relaxed">
            <strong>Note:</strong> A grade can have either combinations or sub-grades, but not both.
            If you wish to add combinations to a grade, you must first remove all existing sub-grades.
            Likewise, if the grade does not require combinations, simply add sub-grades instead.
          </p>
        </div>
      </div>

      {/* Content */}
      {!selectedGrade ? (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-black/30" />
          <p className="text-black/60">Select a grade to view combinations</p>
        </div>
      ) : (
        <>
          {/* Combinations List */}
          <div className="space-y-3">
            {gradeCombinations.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                  <BookOpen className="w-12 h-12 text-blue-900/30 mx-auto mb-3" />
                  <p className="text-blue-900/70 font-medium mb-2">No combinations yet</p>
                  <p className="text-sm text-blue-900/50">
                    Create your first subject combination for {selectedGrade?.name}
                  </p>
                </div>
              </div>
            ) : (
              gradeCombinations.map((combination) => (
                <div
                  key={combination.id}
                  className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-emerald-100/20 text-emerald-700 border-emerald-200/30">
                      {combination.name}
                    </Badge>
                    <span className="text-sm text-blue-900/70">
                      Subject combination for {selectedGrade?.name}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => handleDeleteCombinationClick(combination)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-white hover:bg-red-500/20 rounded-lg focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                    aria-label={`Delete ${combination.name} combination`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Helpful Note */}
      {gradeCombinations.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50/20 backdrop-blur-sm rounded-lg border border-blue-200/30">
          <p className="text-xs text-blue-900/70">
            💡 Subject combinations help organize classes by academic focus. Examples: MCB (Math, Chemistry, Biology), PCM (Physics, Chemistry, Math), HEG (History, Economics, Geography)
          </p>
        </div>
      )}
    </div>
  );
}