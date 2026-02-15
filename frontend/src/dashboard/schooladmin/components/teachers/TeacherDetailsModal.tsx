import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  Crown, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar,
  X
} from "lucide-react";
import { Teacher } from './types';

interface TeacherDetailsModalProps {
  open: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

export default function TeacherDetailsModal({
  open,
  onClose,
  teacher
}: TeacherDetailsModalProps) {
  if (!teacher) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate total students from mock data (sum of class sizes)
  const totalStudents = teacher.classAssignments.reduce((total, assignment) => {
    // Mock class sizes: Primary classes ~30 students, Secondary ~25 students
    const classSize = assignment.level.includes('Primary') ? 30 : 25;
    return total + classSize;
  }, 0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
        aria-describedby="teacher-details-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-semibold text-lg">
              {teacher.firstName[0]}{teacher.lastName[0]}
            </div>
            Teacher Details - {teacher.firstName} {teacher.lastName}
          </DialogTitle>
          <p id="teacher-details-description" className="sr-only">
            View comprehensive information about {teacher.firstName} {teacher.lastName} including contact details, role, assigned classes and subjects.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Full Name</label>
                <p className="text-white">{teacher.firstName} {teacher.lastName}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Employee ID</label>
                <p className="text-white font-mono">{teacher.employeeId}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white/60" />
                  <p className="text-white">{teacher.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Phone</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white/60" />
                  <p className="text-white">{teacher.phone}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Status</label>
                <Badge className={`text-xs px-2 py-1 rounded-full border w-fit ${getStatusColor(teacher.status)}`}>
                  {teacher.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Role</label>
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-brand-accent" />
                  <p className="text-white font-medium">{teacher.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Specialization</label>
                <p className="text-white">{teacher.specialization}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Qualification</label>
                <p className="text-white">{teacher.qualification}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Experience</label>
                <p className="text-white">{teacher.experience} years</p>
              </div>
            </div>
          </div>

          {/* Assignment Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Assignment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-brand-teal/20 border border-brand-teal/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-brand-teal" />
                  <span className="text-sm font-medium text-white/70">Total Classes</span>
                </div>
                <p className="text-2xl font-bold text-white">{teacher.classAssignments.length}</p>
              </div>

              <div className="bg-brand-accent/20 border border-brand-accent/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-brand-accent" />
                  <span className="text-sm font-medium text-white/70">Total Subjects</span>
                </div>
                <p className="text-2xl font-bold text-white">{teacher.subjectAssignments.length}</p>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-white/70">Total Students</span>
                </div>
                <p className="text-2xl font-bold text-white">{totalStudents}</p>
                <p className="text-xs text-white/60 mt-1">Estimated from class sizes</p>
              </div>
            </div>
          </div>

          {/* Classes Assigned */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Assigned Classes</h3>
            {teacher.classAssignments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teacher.classAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-brand-teal" />
                        <span className="font-medium text-white">{assignment.className}</span>
                        {assignment.isClassTeacher && (
                          <Badge className="bg-brand-accent/20 text-brand-accent border-brand-accent/30 text-xs">
                            Class Teacher
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-white/60 mt-1">{assignment.level} • Section {assignment.section}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <GraduationCap className="h-8 w-8 text-white/40 mx-auto mb-2" />
                <p className="text-white/60">No classes assigned</p>
              </div>
            )}
          </div>

          {/* Subjects Assigned */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Assigned Subjects</h3>
            {teacher.subjectAssignments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teacher.subjectAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-brand-accent" />
                      <span className="font-medium text-white">{assignment.subjectName}</span>
                    </div>
                    <p className="text-sm text-white/60">{assignment.level} Level • Code: {assignment.subjectCode}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {assignment.classesAssigned.map((className, index) => (
                        <Badge 
                          key={index}
                          className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs"
                        >
                          {className}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <BookOpen className="h-8 w-8 text-white/40 mx-auto mb-2" />
                <p className="text-white/60">No subjects assigned</p>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Hire Date</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-white/60" />
                  <p className="text-white">{formatDate(teacher.hireDate)}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Years of Service</label>
                <p className="text-white">{new Date().getFullYear() - new Date(teacher.hireDate).getFullYear()} years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-white/20">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="rounded-xl"
            aria-label="Close teacher details"
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}