import { ChevronUp, ChevronDown, Edit, Trash2, Archive, ArchiveRestore, BookOpen, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Subject, SortState, PaginationState } from './types';

interface SubjectsTableProps {
  subjects: Subject[];
  sortBy: keyof Subject;
  sortDir: 'asc' | 'desc';
  onSort: (field: keyof Subject, direction?: 'asc' | 'desc') => void;
  onView: (subject: Subject) => void;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
  onArchive: (subject: Subject) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
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
  totalCount,
  currentPage,
  pageSize,
  onPageChange
}: SubjectsTableProps) {
  const getSortIcon = (field: keyof Subject) => {
    if (sortBy !== field) return null;
    return sortDir === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
      {/* Table */}
      <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl hover:bg-white/20 hover:shadow-2xl transition-all overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => onSort('name')}
                    className="flex items-center gap-2 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors"
                  >
                    Name
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => onSort('code')}
                    className="flex items-center gap-2 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors"
                  >
                    Code
                    {getSortIcon('code')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => onSort('level')}
                    className="flex items-center gap-2 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors"
                  >
                    Level
                    {getSortIcon('level')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-sm font-medium text-blue-900">Streams</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => onSort('status')}
                    className="flex items-center gap-2 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors"
                  >
                    Status
                    {getSortIcon('status')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => onSort('updatedAt')}
                    className="flex items-center gap-2 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors"
                  >
                    Updated
                    {getSortIcon('updatedAt')}
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-blue-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-black/80">{subject.name}</div>
                      <div className="text-xs text-black/60 mt-1 truncate max-w-xs">{subject.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-black/80">{subject.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-black/80">{subject.level}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {subject.streams.slice(0, 2).map((stream) => (
                        <Badge key={stream} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {stream}
                        </Badge>
                      ))}
                      {subject.streams.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                          +{subject.streams.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`${getStatusColor(subject.status)} border`}>
                      {subject.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-black/80">{formatDate(subject.updatedAt)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(subject)}
                        className="h-8 w-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:backdrop-blur-sm hover:bg-brand-teal/10 rounded-xl transition-all"
                        title="View subject details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(subject)}
                        className="h-8 w-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:backdrop-blur-sm hover:bg-brand-accent/10 rounded-xl transition-all"
                        title="Edit subject"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onArchive(subject)}
                        className={`h-8 w-8 p-0 rounded-xl transition-all ${
                          subject.status === 'Active' 
                            ? 'text-amber-500 hover:text-amber-400 hover:backdrop-blur-sm hover:bg-amber-500/10' 
                            : 'text-green-600 hover:text-green-500 hover:backdrop-blur-sm hover:bg-green-600/10'
                        }`}
                        title={subject.status === 'Active' ? 'Archive subject' : 'Restore subject'}
                      >
                        {subject.status === 'Active' ? (
                          <Archive className="h-4 w-4" />
                        ) : (
                          <ArchiveRestore className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(subject)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-500 hover:backdrop-blur-sm hover:bg-red-600/10 rounded-xl transition-all"
                        title="Delete subject"
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl hover:bg-white/20 hover:shadow-2xl transition-all p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-black/80">
              Showing {((currentPage - 1) * pageSize) + 1} to{' '}
              {Math.min(currentPage * pageSize, totalCount)} of{' '}
              {totalCount} subjects
            </div>
            
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl hover:backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-black/80"
              >
                Previous
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {generatePageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
                    disabled={page === '...'}
                    className={`px-3 py-1 rounded-xl text-sm transition-colors ${
                      page === currentPage
                        ? 'bg-brand-primary text-white shadow-lg'
                        : page === '...'
                        ? 'text-black/60 cursor-default'
                        : 'bg-white/20 backdrop-blur-sm border border-white/20 hover:backdrop-blur-sm hover:bg-white/30 text-black/80'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl hover:backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-black/80"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}