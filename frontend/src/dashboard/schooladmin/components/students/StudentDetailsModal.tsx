import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  UserCheck, 
  AlertCircle,
  Contact,
  X
} from 'lucide-react';
import { Student } from './types';

interface StudentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
}

export default function StudentDetailsModal({
  open,
  onClose,
  student,
}: StudentDetailsModalProps) {
  if (!student) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const getStatusBadge = (status: Student['status']) => {
    const statusConfig = {
      Active: { className: 'bg-green-500/20 text-green-300 border-green-500/30', label: 'Active' },
      Inactive: { className: 'bg-gray-500/20 text-gray-300 border-gray-500/30', label: 'Inactive' },
      Suspended: { className: 'bg-red-500/20 text-red-300 border-red-500/30', label: 'Suspended' },
      Graduated: { className: 'bg-purple-500/20 text-purple-300 border-purple-500/30', label: 'Graduated' },
    };

    const config = statusConfig[status];
    return (
      <Badge className={`${config.className} rounded-full px-3 py-1 text-sm font-medium border`}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
        aria-describedby="student-details-description"
      >
        <DialogHeader className="pb-4">
          <div className="flex flex-row items-center justify-between space-y-0">
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                {student.firstName} {student.lastName}
              </DialogTitle>
              <p id="student-details-description" className="text-white/70 mt-1">
                Student ID: {student.rollNumber}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(student.status)}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-brand-teal" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-brand-accent" />
                    <span className="text-white/70">Email:</span>
                    <span className="text-white">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-brand-accent" />
                    <span className="text-white/70">Phone:</span>
                    <span className="text-white">{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-brand-accent" />
                    <span className="text-white/70">Date of Birth:</span>
                    <span className="text-white">{formatDate(student.dateOfBirth)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-brand-accent" />
                    <span className="text-white/70">Address:</span>
                    <span className="text-white">{student.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-brand-accent" />
                    <span className="text-white/70">Enrollment Date:</span>
                    <span className="text-white">{formatDate(student.enrollmentDate)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-teal" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  <p className="text-white/70 text-sm">Class</p>
                  <p className="text-white font-medium">{student.class}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  <p className="text-white/70 text-sm">Section</p>
                  <p className="text-white font-medium">{student.section}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  <p className="text-white/70 text-sm">Roll Number</p>
                  <p className="text-white font-medium">{student.rollNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent/Guardian Information */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Contact className="w-5 h-5 text-brand-teal" />
                Parent/Guardian Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <UserCheck className="w-4 h-4 text-brand-accent" />
                    <span className="text-white/70">Name:</span>
                    <span className="text-white">{student.parentName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-brand-accent" />
                    <span className="text-white/70">Phone:</span>
                    <span className="text-white">{student.parentPhone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-brand-accent" />
                    <span className="text-white/70">Email:</span>
                    <span className="text-white">{student.parentEmail}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact & Medical Information */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brand-teal" />
                Emergency Contact & Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <UserCheck className="w-4 h-4 text-red-400" />
                    <span className="text-white/70">Emergency Contact:</span>
                    <span className="text-white">{student.emergencyContact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-red-400" />
                    <span className="text-white/70">Emergency Phone:</span>
                    <span className="text-white">{student.emergencyPhone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {student.medicalInfo && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <p className="text-amber-200 text-sm font-medium mb-1">Medical Information:</p>
                      <p className="text-white text-sm">{student.medicalInfo}</p>
                    </div>
                  )}
                  {!student.medicalInfo && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                      <p className="text-white/70 text-sm">No medical information on file</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
          <Button
            onClick={onClose}
            variant="secondary"
            className="rounded-xl"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}