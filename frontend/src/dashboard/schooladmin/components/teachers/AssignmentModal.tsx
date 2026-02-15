import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, X, BookOpen, GraduationCap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Teacher, TeacherRole, ClassAssignment, SubjectAssignment } from './types';
import { useToast } from "@/hooks/use-toast";

// Validation schema for assignments
const assignmentSchema = z.object({
  role: z.nativeEnum(TeacherRole),
  classAssignments: z.array(z.object({
    id: z.string(),
    className: z.string().min(1, 'Class name is required'),
    level: z.string().min(1, 'Level is required'),
    section: z.string().min(1, 'Section is required'),
    isClassTeacher: z.boolean()
  })),
  subjectAssignments: z.array(z.object({
    id: z.string(),
    subjectName: z.string().min(1, 'Subject name is required'),
    subjectCode: z.string().min(1, 'Subject code is required'),
    level: z.string().min(1, 'Level is required'),
    classesAssigned: z.array(z.string()).min(1, 'At least one class must be assigned')
  }))
});

type AssignmentFormData = z.infer<typeof assignmentSchema>;

interface AssignmentModalProps {
  open: boolean;
  teacher: Teacher | null;
  onClose: () => void;
  onSubmit: (teacherId: string, assignmentData: AssignmentFormData) => void;
}

// Mock data for dropdowns
const LEVELS = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Senior 1', 'Senior 2', 'Senior 3', 'Senior 4', 'Senior 5', 'Senior 6'];
const SECTIONS = ['A', 'B', 'C', 'D'];
const SUBJECTS = [
  { name: 'Mathematics', code: 'MATH' },
  { name: 'English Language', code: 'ENG' },
  { name: 'Kinyarwanda', code: 'KIN' },
  { name: 'Science', code: 'SCI' },
  { name: 'Social Studies', code: 'SOC' },
  { name: 'Physics', code: 'PHYS' },
  { name: 'Chemistry', code: 'CHEM' },
  { name: 'Biology', code: 'BIO' },
  { name: 'History', code: 'HIST' },
  { name: 'Geography', code: 'GEO' },
  { name: 'Literature', code: 'LIT' },
  { name: 'Arts', code: 'ART' },
  { name: 'Physical Education', code: 'PE' },
  { name: 'Technology', code: 'TECH' },
  { name: 'Computer Science', code: 'COMP' }
];

export default function AssignmentModal({ open, teacher, onClose, onSubmit }: AssignmentModalProps) {
  const { toast } = useToast();
  const [newClassAssignment, setNewClassAssignment] = useState<Partial<ClassAssignment>>({});
  const [newSubjectAssignment, setNewSubjectAssignment] = useState<Partial<SubjectAssignment>>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      role: TeacherRole.TEACHER,
      classAssignments: [],
      subjectAssignments: []
    }
  });

  const watchedValues = watch();

  // Initialize form with teacher data
  useEffect(() => {
    if (open && teacher) {
      reset({
        role: teacher.role,
        classAssignments: teacher.classAssignments,
        subjectAssignments: teacher.subjectAssignments
      });
    }
  }, [open, teacher, reset]);

  const handleFormSubmit = async (data: AssignmentFormData) => {
    if (!teacher) return;
    
    try {
      await onSubmit(teacher.id, data);
      toast({
        title: "Assignments updated",
        description: `${teacher.firstName} ${teacher.lastName}'s assignments have been updated successfully.`,
      });
      onClose();
    } catch (error) {
      console.error('Assignment update error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update assignments. Please try again.",
      });
    }
  };

  const addClassAssignment = () => {
    if (!newClassAssignment.className || !newClassAssignment.level || !newClassAssignment.section) {
      toast({
        variant: "destructive",
        title: "Incomplete data",
        description: "Please fill in all class assignment fields.",
      });
      return;
    }

    const assignment: ClassAssignment = {
      id: `ca-${Date.now()}`,
      className: `${newClassAssignment.level} ${newClassAssignment.section}`,
      level: newClassAssignment.level!,
      section: newClassAssignment.section!,
      isClassTeacher: newClassAssignment.isClassTeacher || false
    };

    setValue('classAssignments', [...watchedValues.classAssignments, assignment]);
    setNewClassAssignment({});
  };

  const removeClassAssignment = (id: string) => {
    setValue('classAssignments', watchedValues.classAssignments.filter(a => a.id !== id));
  };

  const addSubjectAssignment = () => {
    if (!newSubjectAssignment.subjectName || !newSubjectAssignment.level || !newSubjectAssignment.classesAssigned?.length) {
      toast({
        variant: "destructive",
        title: "Incomplete data",
        description: "Please fill in all subject assignment fields.",
      });
      return;
    }

    const assignment: SubjectAssignment = {
      id: `sa-${Date.now()}`,
      subjectName: newSubjectAssignment.subjectName!,
      subjectCode: newSubjectAssignment.subjectCode || newSubjectAssignment.subjectName!.toUpperCase().replace(' ', '-'),
      level: newSubjectAssignment.level!,
      classesAssigned: newSubjectAssignment.classesAssigned!
    };

    setValue('subjectAssignments', [...watchedValues.subjectAssignments, assignment]);
    setNewSubjectAssignment({});
  };

  const removeSubjectAssignment = (id: string) => {
    setValue('subjectAssignments', watchedValues.subjectAssignments.filter(a => a.id !== id));
  };

  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Manage Assignments: {teacher.firstName} {teacher.lastName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Teacher Role</Label>
            <Select value={watchedValues.role} onValueChange={(value) => setValue('role', value as TeacherRole)}>
              <SelectTrigger className="bg-white/20 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TeacherRole).map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Class Assignments */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-green-600" />
              <Label className="text-sm font-medium text-white">Class Assignments</Label>
            </div>
            
            {/* Current assignments */}
            <div className="space-y-2">
              {watchedValues.classAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-white">{assignment.className}</span>
                    {assignment.isClassTeacher && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Class Teacher</Badge>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeClassAssignment(assignment.id)}
                    className="text-red-300 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add new class assignment */}
            <div className="p-4 bg-white/20 rounded-xl space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Select 
                  value={newClassAssignment.level || ''} 
                  onValueChange={(value) => setNewClassAssignment({...newClassAssignment, level: value})}
                >
                  <SelectTrigger className="bg-white/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={newClassAssignment.section || ''} 
                  onValueChange={(value) => setNewClassAssignment({...newClassAssignment, section: value})}
                >
                  <SelectTrigger className="bg-white/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTIONS.map((section) => (
                      <SelectItem key={section} value={section}>{section}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newClassAssignment.isClassTeacher || false}
                    onCheckedChange={(checked) => setNewClassAssignment({...newClassAssignment, isClassTeacher: checked})}
                  />
                  <Label className="text-sm text-white">Main Class Teacher</Label>
                </div>
                <Button type="button" onClick={addClassAssignment} size="sm" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Class
                </Button>
              </div>
            </div>
          </div>

          {/* Subject Assignments */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <Label className="text-sm font-medium text-white">Subject Assignments</Label>
            </div>
            
            {/* Current assignments */}
            <div className="space-y-2">
              {watchedValues.subjectAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                  <div>
                    <span className="font-medium text-white">{assignment.subjectName}</span>
                    <div className="text-sm text-black/60">
                      Classes: {assignment.classesAssigned.join(', ')}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSubjectAssignment(assignment.id)}
                    className="text-red-300 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add new subject assignment */}
            <div className="p-4 bg-white/20 rounded-xl space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Select 
                  value={newSubjectAssignment.subjectName || ''} 
                  onValueChange={(value) => {
                    const subject = SUBJECTS.find(s => s.name === value);
                    setNewSubjectAssignment({
                      ...newSubjectAssignment, 
                      subjectName: value,
                      subjectCode: subject?.code || value.toUpperCase().replace(' ', '-')
                    });
                  }}
                >
                  <SelectTrigger className="bg-white/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((subject) => (
                      <SelectItem key={subject.code} value={subject.name}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={newSubjectAssignment.level || ''} 
                  onValueChange={(value) => setNewSubjectAssignment({...newSubjectAssignment, level: value})}
                >
                  <SelectTrigger className="bg-white/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Input
                    placeholder="Assigned classes (comma-separated)"
                    value={newSubjectAssignment.classesAssigned?.join(', ') || ''}
                    onChange={(e) => setNewSubjectAssignment({
                      ...newSubjectAssignment, 
                      classesAssigned: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    className="bg-white/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <Button type="button" onClick={addSubjectAssignment} size="sm" className="bg-brand-accent hover:bg-brand-accent/90 text-white ml-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Subject
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-white/20">
            <Button
              type="button"
              variant="destructiveOutline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl disabled:opacity-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="rounded-xl px-6 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isSubmitting ? 'Updating...' : 'Update Assignments'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}