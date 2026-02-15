import React, { useState } from 'react';
import { X, Share, AlertCircle, CheckCircle2, GraduationCap, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PublishToSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    type: 'Exam' | 'Resource';
    subject: string;
    grade: string;
    combination?: string;
  } | null;
  onPublish: (selections: PublishSelections) => void;
}

interface PublishSelections {
  grades: string[];
  combinations: string[];
  subgrades: string[];
}

interface GradeOption {
  value: string;
  label: string;
  combinations: string[];
  subgrades: string[];
}

const gradeOptions: GradeOption[] = [
  {
    value: 'S1',
    label: 'Senior 1',
    combinations: [],
    subgrades: ['S1A', 'S1B', 'S1C', 'S1D']
  },
  {
    value: 'S2',
    label: 'Senior 2',
    combinations: [],
    subgrades: ['S2A', 'S2B', 'S2C', 'S2D']
  },
  {
    value: 'S3',
    label: 'Senior 3',
    combinations: [],
    subgrades: ['S3A', 'S3B', 'S3C', 'S3D']
  },
  {
    value: 'S4',
    label: 'Senior 4',
    combinations: ['MCB', 'PCM', 'HEG', 'PCB', 'Arts', 'Commerce'],
    subgrades: []
  },
  {
    value: 'S5',
    label: 'Senior 5',
    combinations: ['MCB', 'PCM', 'HEG', 'PCB', 'Arts', 'Commerce'],
    subgrades: []
  },
  {
    value: 'S6',
    label: 'Senior 6',
    combinations: ['MCB', 'PCM', 'HEG', 'PCB', 'Arts', 'Commerce'],
    subgrades: []
  }
];

export function PublishToSchoolModal({ isOpen, onClose, item, onPublish }: PublishToSchoolModalProps) {
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedCombinations, setSelectedCombinations] = useState<string[]>([]);
  const [selectedSubgrades, setSelectedSubgrades] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  if (!isOpen || !item) return null;

  const handleGradeToggle = (gradeValue: string, checked: boolean) => {
    if (checked) {
      setSelectedGrades(prev => [...prev, gradeValue]);
    } else {
      setSelectedGrades(prev => prev.filter(g => g !== gradeValue));
      // Clear combinations and subgrades for this grade
      const grade = gradeOptions.find(g => g.value === gradeValue);
      if (grade) {
        setSelectedCombinations(prev => prev.filter(c => !grade.combinations.includes(c)));
        setSelectedSubgrades(prev => prev.filter(s => !grade.subgrades.includes(s)));
      }
    }
  };

  const handleCombinationToggle = (combination: string, checked: boolean) => {
    if (checked) {
      setSelectedCombinations(prev => [...prev, combination]);
    } else {
      setSelectedCombinations(prev => prev.filter(c => c !== combination));
    }
  };

  const handleSubgradeToggle = (subgrade: string, checked: boolean) => {
    if (checked) {
      setSelectedSubgrades(prev => [...prev, subgrade]);
    } else {
      setSelectedSubgrades(prev => prev.filter(s => s !== subgrade));
    }
  };

  const getAvailableCombinations = () => {
    const combinations = new Set<string>();
    selectedGrades.forEach(gradeValue => {
      const grade = gradeOptions.find(g => g.value === gradeValue);
      if (grade) {
        grade.combinations.forEach(combo => combinations.add(combo));
      }
    });
    return Array.from(combinations);
  };

  const getAvailableSubgrades = () => {
    const subgrades = new Set<string>();
    selectedGrades.forEach(gradeValue => {
      const grade = gradeOptions.find(g => g.value === gradeValue);
      if (grade) {
        grade.subgrades.forEach(sub => subgrades.add(sub));
      }
    });
    return Array.from(subgrades);
  };

  const hasSelections = selectedGrades.length > 0 || selectedCombinations.length > 0 || selectedSubgrades.length > 0;

  const getTotalTargetClasses = () => {
    let total = 0;
    
    // Count combinations
    selectedCombinations.forEach(combo => {
      const gradesWithCombo = selectedGrades.filter(grade => {
        const gradeOption = gradeOptions.find(g => g.value === grade);
        return gradeOption?.combinations.includes(combo);
      });
      total += gradesWithCombo.length;
    });
    
    // Count subgrades
    total += selectedSubgrades.length;
    
    return total;
  };

  const handlePublishClick = () => {
    if (!hasSelections) return;
    setShowConfirmation(true);
  };

  const handleConfirmPublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPublish({
      grades: selectedGrades,
      combinations: selectedCombinations,
      subgrades: selectedSubgrades
    });
    
    setIsPublishing(false);
    onClose();
    
    // Reset selections
    setSelectedGrades([]);
    setSelectedCombinations([]);
    setSelectedSubgrades([]);
    setShowConfirmation(false);
  };

  const handleClose = () => {
    if (isPublishing) return;
    setShowConfirmation(false);
    setSelectedGrades([]);
    setSelectedCombinations([]);
    setSelectedSubgrades([]);
    onClose();
  };

  const availableCombinations = getAvailableCombinations();
  const availableSubgrades = getAvailableSubgrades();

  return (
    <div className="fixed inset-0 bg-blue-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/20 flex items-center justify-center">
              <Share className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900">Publish to School</h2>
              <p className="text-sm text-blue-900/70">Share this {item.type.toLowerCase()} with your school</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isPublishing}
            className="h-8 w-8 p-0 hover:bg-white/20 text-blue-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Item Info */}
          <div className="bg-white/10 rounded-xl p-4 border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-brand-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-blue-900/70">
                  <Badge variant="outline" className="border-white/20">
                    {item.type}
                  </Badge>
                  <span>{item.subject}</span>
                  <span>•</span>
                  <span>{item.grade}</span>
                  {item.combination && (
                    <>
                      <span>•</span>
                      <span>{item.combination}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {!showConfirmation ? (
            <>
              {/* Grade Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-blue-900" />
                  <h3 className="text-lg font-semibold text-blue-900">Select Grades</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {gradeOptions.map((grade) => (
                    <div
                      key={grade.value}
                      className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10"
                    >
                      <Checkbox
                        id={grade.value}
                        checked={selectedGrades.includes(grade.value)}
                        onCheckedChange={(checked) => handleGradeToggle(grade.value, checked as boolean)}
                        className="border-white/30"
                      />
                      <label
                        htmlFor={grade.value}
                        className="text-sm font-medium text-blue-900 cursor-pointer flex-1"
                      >
                        {grade.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Combination Selection */}
              {availableCombinations.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-blue-900" />
                    <h3 className="text-lg font-semibold text-blue-900">Select Combinations</h3>
                    <span className="text-sm text-blue-900/60">(for S4-S6)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {availableCombinations.map((combination) => (
                      <div
                        key={combination}
                        className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10"
                      >
                        <Checkbox
                          id={combination}
                          checked={selectedCombinations.includes(combination)}
                          onCheckedChange={(checked) => handleCombinationToggle(combination, checked as boolean)}
                          className="border-white/30"
                        />
                        <label
                          htmlFor={combination}
                          className="text-sm font-medium text-blue-900 cursor-pointer flex-1"
                        >
                          {combination}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subgrade Selection */}
              {availableSubgrades.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-blue-900" />
                    <h3 className="text-lg font-semibold text-blue-900">Select Subgrades</h3>
                    <span className="text-sm text-blue-900/60">(for S1-S3)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {availableSubgrades.map((subgrade) => (
                      <div
                        key={subgrade}
                        className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10"
                      >
                        <Checkbox
                          id={subgrade}
                          checked={selectedSubgrades.includes(subgrade)}
                          onCheckedChange={(checked) => handleSubgradeToggle(subgrade, checked as boolean)}
                          className="border-white/30"
                        />
                        <label
                          htmlFor={subgrade}
                          className="text-sm font-medium text-blue-900 cursor-pointer flex-1"
                        >
                          {subgrade}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selection Summary */}
              {hasSelections && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-blue-900">
                    This {item.type.toLowerCase()} will be published to <strong>{getTotalTargetClasses()} classes</strong> across your school.
                  </AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            /* Confirmation Step */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Confirm Publication</h3>
                <p className="text-blue-900/70">
                  Are you sure you want to publish this {item.type.toLowerCase()} to the selected classes?
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <h4 className="font-medium text-blue-900 mb-3">Publication Summary</h4>
                <div className="space-y-2 text-sm">
                  {selectedGrades.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-blue-900/70">Grades:</span>
                      <span className="text-blue-900">{selectedGrades.join(', ')}</span>
                    </div>
                  )}
                  {selectedCombinations.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-blue-900/70">Combinations:</span>
                      <span className="text-blue-900">{selectedCombinations.join(', ')}</span>
                    </div>
                  )}
                  {selectedSubgrades.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-blue-900/70">Subgrades:</span>
                      <span className="text-blue-900">{selectedSubgrades.join(', ')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-2 border-t border-white/10">
                    <span className="text-blue-900/70">Total Classes:</span>
                    <span className="text-blue-900">{getTotalTargetClasses()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-white/10">
          {!showConfirmation ? (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 bg-white/10 border-white/20 text-blue-900 hover:bg-white/20"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePublishClick}
                disabled={!hasSelections}
                className="flex-1 bg-brand-accent hover:bg-brand-accent/80 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share className="w-4 h-4 mr-2" />
                Continue to Publish
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                disabled={isPublishing}
                className="flex-1 bg-white/10 border-white/20 text-blue-900 hover:bg-white/20"
              >
                Go Back
              </Button>
              <Button
                onClick={handleConfirmPublish}
                disabled={isPublishing}
                className="flex-1 bg-brand-accent hover:bg-brand-accent/80 text-white disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm Publish
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}