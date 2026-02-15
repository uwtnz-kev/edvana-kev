import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Parent, mockStudents } from '@/shared/mocks/schooladmin/mockData';
import { formatDistanceToNow } from 'date-fns';

interface ParentDetailsModalProps {
  parent: Parent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (parent: Parent) => void;
  onLinkStudents: (parent: Parent) => void;
  onClose: () => void;
}

export default function ParentDetailsModal({
  parent,
  open,
  onOpenChange,
  onEdit,
  onLinkStudents,
  onClose
}: ParentDetailsModalProps) {
  if (!parent) return null;

  const linkedStudents = mockStudents.filter(student => parent.studentIds.includes(student.id));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-white"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-white text-xl font-semibold">
            Parent Details
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-xl"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-white/70 mb-1">Full Name</div>
                <div className="text-white font-medium">
                  {parent.firstName} {parent.lastName}
                </div>
              </div>

              <div>
                <div className="text-sm text-white/70 mb-1">Status</div>
                <Badge
                  variant="secondary"
                  className={parent.status === 'Active' 
                    ? "bg-green-500/20 text-green-400 border border-green-500/40"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                  }
                >
                  {parent.status}
                </Badge>
              </div>
            </div>

            {parent.nationalIdOrPassport && (
              <div>
                <div className="text-sm text-white/70 mb-1">National ID / Passport</div>
                <div className="text-white">{parent.nationalIdOrPassport}</div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-teal/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-4 h-4 text-brand-teal" />
                </div>
                <div>
                  <div className="text-sm text-white/70">Email</div>
                  <div className="text-white">{parent.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <div className="text-sm text-white/70">Phone</div>
                  <div className="text-white">{parent.phone}</div>
                </div>
              </div>
            </div>

            {parent.address && (parent.address.city || parent.address.country) && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-white/70">Address</div>
                  <div className="text-white">
                    {[parent.address.city, parent.address.country].filter(Boolean).join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Linked Students */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Linked Students ({linkedStudents.length})</h3>
              <Button
                onClick={() => onLinkStudents(parent)}
                variant="ghost"
                size="sm"
                className="text-brand-accent hover:bg-brand-accent/20 rounded-xl"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Links
              </Button>
            </div>

            {linkedStudents.length > 0 ? (
              <div className="space-y-3">
                {linkedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white/10 rounded-xl p-4 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-white/70">
                          {student.studentNumber} • {student.grade} - {student.class}
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-brand-accent/20 text-brand-accent border border-brand-accent/40"
                      >
                        {student.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-white/70 mb-2">No students linked</div>
                <div className="text-sm text-white/50 mb-4">
                  This parent has no students linked to their account yet.
                </div>
                <Button
                  onClick={() => onLinkStudents(parent)}
                  variant="ghost"
                  size="sm"
                  className="text-brand-accent hover:bg-brand-accent/20 rounded-xl"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Link Students
                </Button>
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Activity</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-white/70">Created</div>
                  <div className="text-white text-sm">
                    {formatDistanceToNow(new Date(parent.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-white/70">Last Updated</div>
                  <div className="text-white text-sm">
                    {formatDistanceToNow(new Date(parent.updatedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/20">
            <Button
              type="button"
              variant="destructiveOutline"
              onClick={onClose}
              className="rounded-xl"
            >
              Close
            </Button>
            <Button
              onClick={() => onEdit(parent)}
              className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
            >
              Edit Parent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}