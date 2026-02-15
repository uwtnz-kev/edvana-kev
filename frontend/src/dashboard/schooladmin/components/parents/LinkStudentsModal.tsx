import React, { useState, useEffect } from 'react';
import { X, Search, Users, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Parent, MockParentStore, mockStudents, Student } from '@/shared/mocks/schooladmin/mockData';

interface LinkStudentsModalProps {
  parent: Parent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (parent: Parent) => void;
  onClose: () => void;
}

export default function LinkStudentsModal({
  parent,
  open,
  onOpenChange,
  onSuccess,
  onClose
}: LinkStudentsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const { toast } = useToast();

  // Initialize selected students when parent changes
  useEffect(() => {
    if (parent) {
      setSelectedStudentIds([...parent.studentIds]);
    }
  }, [parent]);

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(mockStudents);
    } else {
      const filtered = mockStudents.filter(student =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm]);

  const handleStudentToggle = (studentId: string) => {
    if (selectedStudentIds.includes(studentId)) {
      setSelectedStudentIds(selectedStudentIds.filter(id => id !== studentId));
    } else {
      setSelectedStudentIds([...selectedStudentIds, studentId]);
    }
  };

  const getSelectedStudents = () => {
    return mockStudents.filter(student => selectedStudentIds.includes(student.id));
  };

  const handleSave = () => {
    if (!parent) return;

    try {
      const updatedParent = MockParentStore.updateParent(parent.id, {
        studentIds: selectedStudentIds
      });

      if (!updatedParent) {
        throw new Error('Failed to update parent');
      }

      onSuccess(updatedParent);
      handleClose();

      const linkedCount = selectedStudentIds.length;
      const previousCount = parent.studentIds.length;
      
      let message = '';
      if (linkedCount > previousCount) {
        message = `${linkedCount - previousCount} student(s) linked successfully.`;
      } else if (linkedCount < previousCount) {
        message = `${previousCount - linkedCount} student(s) unlinked successfully.`;
      } else if (linkedCount === previousCount && linkedCount > 0) {
        message = 'Student links updated successfully.';
      } else {
        message = 'All students unlinked successfully.';
      }

      toast({
        title: "Student Links Updated",
        description: message,
      });
    } catch (error) {
      console.error('Error updating student links:', error);
      toast({
        title: "Error",
        description: "Failed to update student links. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    if (parent) {
      setSelectedStudentIds([...parent.studentIds]);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!parent) return null;

  const selectedStudents = getSelectedStudents();
  const hasChanges = JSON.stringify([...selectedStudentIds].sort()) !== JSON.stringify([...parent.studentIds].sort());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-white"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-white text-xl font-semibold">
            Link Students to {parent.firstName} {parent.lastName}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20 rounded-xl"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Students */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <Input
                placeholder="Search students by name, number, grade, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
              />
            </div>

            <div className="text-sm text-white/70">
              Select students to link to this parent. Students can be linked to multiple parents.
            </div>
          </div>

          {/* Selected Students Summary */}
          {selectedStudents.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-accent" />
                <span className="text-sm font-medium text-white">
                  Selected Students ({selectedStudents.length})
                </span>
                {hasChanges && (
                  <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    Changes pending
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedStudents.map((student) => (
                  <Badge
                    key={student.id}
                    variant="secondary"
                    className="bg-brand-accent/20 text-brand-accent border border-brand-accent/40 hover:bg-brand-accent/30 cursor-pointer"
                    onClick={() => handleStudentToggle(student.id)}
                  >
                    {student.firstName} {student.lastName} ({student.grade})
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0 text-brand-accent hover:bg-brand-accent/20"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Available Students */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-white">
              Available Students ({filteredStudents.length})
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-2 bg-white/5 rounded-xl p-3">
              {filteredStudents.length === 0 ? (
                <div className="text-white/60 text-center py-4">
                  No students found matching your search.
                </div>
              ) : (
                filteredStudents.map((student) => {
                  const isSelected = selectedStudentIds.includes(student.id);
                  const isCurrentlyLinked = parent.studentIds.includes(student.id);
                  
                  return (
                    <div
                      key={student.id}
                      onClick={() => handleStudentToggle(student.id)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-brand-accent/20 border border-brand-accent/40' 
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      <div className="text-white">
                        <div className="font-medium flex items-center gap-2">
                          {student.firstName} {student.lastName}
                          {isCurrentlyLinked && !hasChanges && (
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/40 text-xs">
                              Currently Linked
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-white/70">
                          {student.studentNumber} • {student.grade} - {student.class}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <div className="w-5 h-5 bg-brand-accent rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-white/20">
            <div className="text-sm text-white/70">
              {hasChanges ? (
                <span className="text-amber-400">You have unsaved changes</span>
              ) : (
                <span>No changes to save</span>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="destructiveOutline"
                onClick={handleClose}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl disabled:opacity-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Save Links
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}