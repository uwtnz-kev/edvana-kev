import React from 'react';
import { X, BookOpen, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Subject } from './types';

interface SubjectDetailsModalProps {
  open: boolean;
  subject: Subject | null;
  onClose: () => void;
}

export default function SubjectDetailsModal({ open, subject, onClose }: SubjectDetailsModalProps) {

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!subject) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-3xl max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
        aria-describedby="subject-details-description"
      >
        {/* Header */}
        <DialogHeader className="relative">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <BookOpen className="h-6 w-6 text-brand-accent mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-xl font-semibold text-white">
                  {subject.name}
                </DialogTitle>
                <div className="flex items-center gap-3 mt-1">
                  {subject.code && (
                    <span className="text-white/70 text-sm font-mono">
                      {subject.code}
                    </span>
                  )}
                  <Badge className={`text-xs ${getStatusColor(subject.status)}`}>
                    {subject.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Subject Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Classes */}
                <div>
                  <span className="text-white/70 text-sm font-medium">Classes:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {subject.classes && subject.classes.length > 0 ? (
                      subject.classes.map((cls) => (
                        <Badge key={cls} variant="outline" className="text-xs bg-brand-teal/20 text-brand-teal border-brand-teal/30">
                          {cls}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-white/60 text-sm">No classes assigned</span>
                    )}
                  </div>
                </div>

                {/* Teacher */}
                <div>
                  <span className="text-white/70 text-sm font-medium">Assigned Teacher:</span>
                  <p className="text-white font-medium mt-1">
                    {subject.teacherName || 'No teacher assigned'}
                  </p>
                </div>

                {/* Number of Students */}
                <div>
                  <span className="text-white/70 text-sm font-medium">Number of Students:</span>
                  <p className="text-white font-medium mt-1">
                    {subject.numberOfStudents || 0} students
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Passing Rate */}
                <div>
                  <span className="text-white/70 text-sm font-medium">Passing Rate:</span>
                  <p className="text-white font-medium mt-1">
                    {subject.passingRate ? `${subject.passingRate}%` : 'N/A'}
                  </p>
                </div>

                {/* Created Date */}
                {subject.createdAt && (
                  <div>
                    <span className="text-white/70 text-sm font-medium">Created:</span>
                    <p className="text-white font-medium mt-1">{formatDate(subject.createdAt)}</p>
                  </div>
                )}

                {/* Updated Date */}
                {subject.updatedAt && (
                  <div>
                    <span className="text-white/70 text-sm font-medium">Last Updated:</span>
                    <p className="text-white font-medium mt-1">{formatDate(subject.updatedAt)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description (if it exists - this would be added to the Subject interface later) */}
            {/* For now, we'll show a placeholder since description is not in the current interface */}
            <div>
              <span className="text-white/70 text-sm font-medium">Description:</span>
              <p className="text-white/90 text-sm mt-1 bg-white/5 rounded-lg p-3 border border-white/10">
                {/* This would show subject.description when the field is added to the interface */}
                No description available for this subject.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-6 border-t border-white/20 mt-6">
          <Button
            onClick={onClose}
            variant="secondary"
            className="rounded-xl px-6"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}