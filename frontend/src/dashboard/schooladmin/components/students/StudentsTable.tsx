import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Download } from 'lucide-react';
import { Student } from './types';

interface StudentsTableProps {
  students: Student[];
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onArchive?: (student: Student) => void;
  onDownload: (student: Student) => void;
}

export default function StudentsTable({
  students,
  onView,
  onEdit,
  onDelete,
  onArchive,
  onDownload,
}: StudentsTableProps) {
  const getStatusBadge = (status: Student['status']) => {
    const statusConfig = {
      Active: { className: 'bg-green-500/20 text-green-700 border-green-500/30', label: 'Active' },
      Inactive: { className: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30', label: 'On Leave' },
      Transferred: { className: 'bg-blue-500/20 text-blue-700 border-blue-500/30', label: 'Transferred' },
      Suspended: { className: 'bg-red-500/20 text-red-700 border-red-500/30', label: 'Archived' },
      Graduated: { className: 'bg-purple-500/20 text-purple-700 border-purple-500/30', label: 'Graduated' },
    };

    const config = statusConfig[status] || statusConfig.Active;
    return (
      <Badge className={`${config.className} rounded-full px-2 py-1 text-xs font-medium border`}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (students.length === 0) {
    return (
      <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-8 text-center">
        <p className="text-white/70 text-lg">No students found</p>
        <p className="text-white/50 text-sm mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableHead className="text-blue-900 font-semibold">Name</TableHead>
            <TableHead className="text-blue-900 font-semibold">Email</TableHead>
            <TableHead className="text-blue-900 font-semibold">Phone</TableHead>
            <TableHead className="text-blue-900 font-semibold">Class</TableHead>
            <TableHead className="text-blue-900 font-semibold">Status</TableHead>
            <TableHead className="text-blue-900 font-semibold">Enrollment Date</TableHead>
            <TableHead className="text-blue-900 font-semibold">Linked Parent</TableHead>
            <TableHead className="text-blue-900 font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="text-black font-medium">
                {student.firstName} {student.lastName}
              </TableCell>
              <TableCell className="text-black">
                {student.email}
              </TableCell>
              <TableCell className="text-black">
                {student.phone}
              </TableCell>
              <TableCell>
                <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 rounded-full px-2 py-1 text-xs font-medium border">
                  {student.class}
                </Badge>
              </TableCell>
              <TableCell>
                {getStatusBadge(student.status)}
              </TableCell>
              <TableCell className="text-black">
                {formatDate(student.enrollmentDate)}
              </TableCell>
              <TableCell className="text-black">
                {student.parentEmail || '—'}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(student)}
                    className="h-8 w-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10 rounded-lg"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload(student)}
                    className="h-8 w-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10 rounded-lg"
                    title="Download report"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(student)}
                    className="h-8 w-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10 rounded-lg"
                    title="Edit student"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(student)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-500 hover:bg-red-600/10 rounded-lg"
                    title="Delete student"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}