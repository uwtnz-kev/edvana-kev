import { ChevronUp, ChevronDown, Edit, Trash2, Archive, ArchiveRestore, BookOpen, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Subject, SortState, PaginationState } from './types';
import { ColumnVisibility } from './SubjectToolbar';

interface SubjectsTableProps {
  subjects: Subject[];
  sortBy: keyof Subject;
  sortDir: 'asc' | 'desc';
  onSort: (field: keyof Subject, direction?: 'asc' | 'desc') => void;
  onView: (subject: Subject) => void;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
  onArchive: (subject: Subject) => void;
  onDownload: (subject: Subject) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  columnVisibility: ColumnVisibility;
}

export default function SubjectsTable({
  subjects,
  sortBy,
  sortDir,
  onSort,
  onView,
  onEdit,
  onDelete,
  onArchive,
  onDownload,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  columnVisibility
}: SubjectsTableProps) {
  const getSortIcon = (field: keyof Subject) => {
    if (sortBy !== field) return null;
    return sortDir === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const pages = [];

    // Always show first page
    if (totalPages > 0) pages.push(1);

    // Show ellipsis and pages around current page
    if (currentPage > 3) pages.push('...');

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    // Show ellipsis and last page
    if (currentPage < totalPages - 2) pages.push('...');
    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

    return pages;
  };

  if (subjects.length === 0) {
    return null; // EmptyState will be handled by parent component
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-4">
      {/* Table container with rounded corners and subtle border */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/10 border-b border-white/10">
            <tr>
              {columnVisibility.name && (
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => onSort('name')}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-brand-accent transition-colors"
                    aria-label="Sort by subject name"
                  >
                    Subject Name
                    {getSortIcon('name')}
                  </button>
                </th>
              )}
              {columnVisibility.code && (
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => onSort('code')}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-brand-accent transition-colors"
                    aria-label="Sort by subject code"
                  >
                    Code
                    {getSortIcon('code')}
                  </button>
                </th>
              )}
              {columnVisibility.classes && (
                <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                  Classes
                </th>
              )}
              {columnVisibility.teacherName && (
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => onSort('teacherName')}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-brand-accent transition-colors"
                    aria-label="Sort by teacher"
                  >
                    Teacher
                    {getSortIcon('teacherName')}
                  </button>
                </th>
              )}
              {columnVisibility.numberOfStudents && (
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => onSort('numberOfStudents')}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-brand-accent transition-colors"
                    aria-label="Sort by student count"
                  >
                    Students
                    {getSortIcon('numberOfStudents')}
                  </button>
                </th>
              )}
              {columnVisibility.passingRate && (
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => onSort('passingRate')}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-brand-accent transition-colors"
                    aria-label="Sort by passing rate"
                  >
                    Passing Rate
                    {getSortIcon('passingRate')}
                  </button>
                </th>
              )}
              {columnVisibility.status && (
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => onSort('status')}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-brand-accent transition-colors"
                    aria-label="Sort by status"
                  >
                    Status
                    {getSortIcon('status')}
                  </button>
                </th>
              )}
              {columnVisibility.updatedAt && (
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => onSort('updatedAt')}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-brand-accent transition-colors"
                    aria-label="Sort by last updated"
                  >
                    Updated
                    {getSortIcon('updatedAt')}
                  </button>
                </th>
              )}
              <th className="px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-white/5 transition-colors">
                {columnVisibility.name && (
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-black">{subject.name}</div>
                  </td>
                )}
                {columnVisibility.code && (
                  <td className="px-4 py-4">
                    <span className="text-sm font-mono text-black">{subject.code || 'N/A'}</span>
                  </td>
                )}
                {columnVisibility.classes && (
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {subject.classes.slice(0, 2).map((cls) => (
                        <Badge key={cls} variant="outline" className="text-xs bg-brand-teal/20 text-brand-teal border-brand-teal/30">
                          {cls}
                        </Badge>
                      ))}
                      {subject.classes.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">
                          +{subject.classes.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                )}
                {columnVisibility.teacherName && (
                  <td className="px-4 py-4">
                    <span className="text-sm text-black">{subject.teacherName || 'Unassigned'}</span>
                  </td>
                )}
                {columnVisibility.numberOfStudents && (
                  <td className="px-4 py-4">
                    <span className="text-sm text-black">{subject.numberOfStudents || 0}</span>
                  </td>
                )}
                {columnVisibility.passingRate && (
                  <td className="px-4 py-4">
                    <span className="text-sm text-black">{subject.passingRate ? `${subject.passingRate}%` : 'N/A'}</span>
                  </td>
                )}
                {columnVisibility.status && (
                  <td className="px-4 py-4">
                    <Badge className={`${getStatusColor(subject.status)} border`}>
                      {subject.status}
                    </Badge>
                  </td>
                )}
                {columnVisibility.updatedAt && (
                  <td className="px-4 py-4">
                    <span className="text-sm text-black">{formatDate(subject.updatedAt)}</span>
                  </td>
                )}
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(subject)}
                      className="h-8 w-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10 rounded-lg transition-all"
                      aria-label={`View ${subject.name} details`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownload(subject)}
                      className="h-8 w-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10 rounded-lg transition-all"
                      title="Download report"
                      aria-label={`Download report for ${subject.name}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(subject)}
                      className="h-8 w-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10 rounded-lg transition-all"
                      aria-label={`Edit ${subject.name}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onArchive(subject)}
                      className="h-8 w-8 p-0 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
                      aria-label={`${subject.status === 'Active' ? 'Archive' : 'Restore'} ${subject.name}`}
                    >
                      {subject.status === 'Active' ? <Archive className="h-4 w-4" /> : <ArchiveRestore className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(subject)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-500 hover:bg-red-600/10 rounded-lg transition-all"
                      aria-label={`Delete ${subject.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination using same style as Teachers */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/20">
          <div className="text-sm text-black/60">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} subjects
          </div>
          
          <Pagination className="justify-end w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e: React.MouseEvent) => {
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
                      onClick={(e: React.MouseEvent) => {
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
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
                  className={`bg-white/20 backdrop-blur-sm border-white/20 rounded-xl hover:backdrop-blur-sm hover:bg-white/30 text-black/80 ${
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