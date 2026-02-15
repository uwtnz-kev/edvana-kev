import { ChevronUp, ChevronDown, Edit, Trash2, Phone, Mail, BookOpen, GraduationCap, Crown, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Teacher } from './types';

interface TeacherTableProps {
  teachers: Teacher[];
  sortBy: keyof Teacher;
  sortDir: 'asc' | 'desc';
  onSort: (field: keyof Teacher, direction?: 'asc' | 'desc') => void;
  onView: (teacher: Teacher) => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
  onDownload: (teacher: Teacher) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function TeacherTable({
  teachers,
  sortBy,
  sortDir,
  onSort,
  onView,
  onEdit,
  onDelete,
  onDownload,
  totalCount,
  currentPage,
  pageSize,
  onPageChange
}: TeacherTableProps) {
  const getSortIcon = (field: keyof Teacher) => {
    if (sortBy !== field) return null;
    return sortDir === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Near the beginning
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (teachers.length === 0) {
    return null; // EmptyState will be handled by parent component
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="overflow-hidden">
      {/* Table using UI components */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/20 hover:bg-transparent">
              <TableHead className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('lastName')}
                  className="hover:backdrop-blur-sm hover:bg-white/20 text-blue-900 font-semibold text-xs uppercase tracking-wide p-0 h-auto justify-start"
                  aria-label="Sort by teacher name"
                >
                  Teacher
                  {getSortIcon('lastName')}
                </Button>
              </TableHead>
              <TableHead className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('specialization')}
                  className="hover:backdrop-blur-sm hover:bg-white/20 text-blue-900 font-semibold text-xs uppercase tracking-wide p-0 h-auto justify-start"
                  aria-label="Sort by specialization"
                >
                  Specialization
                  {getSortIcon('specialization')}
                </Button>
              </TableHead>
              <TableHead className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('qualification')}
                  className="hover:backdrop-blur-sm hover:bg-white/20 text-blue-900 font-semibold text-xs uppercase tracking-wide p-0 h-auto justify-start"
                  aria-label="Sort by qualification"
                >
                  Qualification
                  {getSortIcon('qualification')}
                </Button>
              </TableHead>
              <TableHead className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('experience')}
                  className="hover:backdrop-blur-sm hover:bg-white/20 text-blue-900 font-semibold text-xs uppercase tracking-wide p-0 h-auto justify-start"
                  aria-label="Sort by experience"
                >
                  Experience
                  {getSortIcon('experience')}
                </Button>
              </TableHead>
              <TableHead className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('role')}
                  className="hover:backdrop-blur-sm hover:bg-white/20 text-blue-900 font-semibold text-xs uppercase tracking-wide p-0 h-auto justify-start"
                  aria-label="Sort by role"
                >
                  Role
                  {getSortIcon('role')}
                </Button>
              </TableHead>
              <TableHead className="text-left p-4">
                <span className="text-blue-900 font-semibold text-xs uppercase tracking-wide">Classes</span>
              </TableHead>
              <TableHead className="text-left p-4">
                <span className="text-blue-900 font-semibold text-xs uppercase tracking-wide">Subjects</span>
              </TableHead>
              <TableHead className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('status')}
                  className="hover:backdrop-blur-sm hover:bg-white/20 text-blue-900 font-semibold text-xs uppercase tracking-wide p-0 h-auto justify-start"
                  aria-label="Sort by status"
                >
                  Status
                  {getSortIcon('status')}
                </Button>
              </TableHead>
              <TableHead className="text-left p-4">
                <span className="text-blue-900 font-semibold text-xs uppercase tracking-wide">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                <TableCell className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-semibold text-sm">
                      {teacher.firstName[0]}{teacher.lastName[0]}
                    </div>
                    <div>
                      <div className="font-medium text-blue-900">{teacher.firstName} {teacher.lastName}</div>
                      <div className="text-sm text-black/60 flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {teacher.email}
                      </div>
                      <div className="text-sm text-black/60 flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {teacher.phone}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-black/80">{teacher.specialization}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-black/80">{teacher.qualification}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-black/80">{teacher.experience} years</span>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-brand-accent" />
                    <span className="text-black/80 font-medium">{teacher.role}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <div className="space-y-1">
                    {teacher.classAssignments.length > 0 ? (
                      teacher.classAssignments.slice(0, 2).map((assignment) => (
                        <div key={assignment.id} className="flex items-center gap-2">
                          <GraduationCap className="h-3 w-3 text-brand-teal" />
                          <span className="text-xs text-black/80">
                            {assignment.className}
                            {assignment.isClassTeacher && <span className="text-brand-accent font-medium ml-1">(CT)</span>}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500 italic">No classes assigned</span>
                    )}
                    {teacher.classAssignments.length > 2 && (
                      <span className="text-xs text-brand-primary font-medium">
                        +{teacher.classAssignments.length - 2} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <div className="space-y-1">
                    {teacher.subjectAssignments.length > 0 ? (
                      teacher.subjectAssignments.slice(0, 2).map((assignment) => (
                        <div key={assignment.id} className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3 text-brand-accent" />
                          <span className="text-xs text-black/80">
                            {assignment.subjectName}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500 italic">No subjects assigned</span>
                    )}
                    {teacher.subjectAssignments.length > 2 && (
                      <span className="text-xs text-brand-primary font-medium">
                        +{teacher.subjectAssignments.length - 2} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <Badge className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(teacher.status)}`}>
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(teacher)}
                      className="text-brand-teal hover:text-brand-teal/80 hover:backdrop-blur-sm hover:bg-brand-teal/10 transition-all"
                      aria-label={`View details for ${teacher.firstName} ${teacher.lastName}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownload(teacher)}
                      className="text-brand-teal hover:text-brand-teal/80 hover:backdrop-blur-sm hover:bg-brand-teal/10 transition-all"
                      title="Download report"
                      aria-label={`Download report for ${teacher.firstName} ${teacher.lastName}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(teacher)}
                      className="text-brand-accent hover:text-brand-accent/80 hover:backdrop-blur-sm hover:bg-brand-accent/10 transition-all"
                      aria-label={`Edit ${teacher.firstName} ${teacher.lastName}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(teacher)}
                      className="text-red-600 hover:text-red-500 hover:backdrop-blur-sm hover:bg-red-600/10 transition-all"
                      aria-label={`Delete ${teacher.firstName} ${teacher.lastName}`}
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

      {/* Pagination using UI components */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/20">
          <div className="text-sm text-black/60">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} teachers
          </div>
          
          <Pagination className="justify-end w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={`bg-white/20 backdrop-blur-sm border-white/20 rounded-xl hover:backdrop-blur-sm hover:bg-white/30 text-black/80 ${
                    currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
                  }`}
                />
              </PaginationItem>
              
              {generatePageNumbers().map((pageNum, index) => (
                <PaginationItem key={`page-${pageNum}-${index}`}>
                  {pageNum === '...' ? (
                    <PaginationEllipsis className="text-black/60" />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(pageNum as number);
                      }}
                      isActive={currentPage === pageNum}
                      className={`min-w-[2.5rem] rounded-xl ${
                        currentPage === pageNum
                          ? 'bg-brand-primary text-white border-brand-primary'
                          : 'bg-white/20 backdrop-blur-sm border-white/20 hover:backdrop-blur-sm hover:bg-white/30 text-black/80'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
                  className={`bg-white/20 backdrop-blur-sm border-white/20 rounded-xl hover:bg-white/30 text-black/80 ${
                    currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}