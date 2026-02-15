import React, { useState, useMemo } from 'react';
import { Eye, Edit, Link, Mail, Archive, Trash2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Parent, mockStudents } from '@/shared/mocks/schooladmin/mockData';
import { formatDistanceToNow } from 'date-fns';

interface ParentsTableProps {
  parents: Parent[];
  searchTerm: string;
  statusFilter: string;
  linkStateFilter: string;
  visibleColumns: string[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onView: (parent: Parent) => void;
  onEdit: (parent: Parent) => void;
  onLinkStudents: (parent: Parent) => void;
  onResendInvite: (parent: Parent) => void;
  onArchive: (parent: Parent) => void;
  onDelete: (parent: Parent) => void;
}

export default function ParentsTable({
  parents,
  searchTerm,
  statusFilter,
  linkStateFilter,
  visibleColumns,
  itemsPerPage,
  currentPage,
  onPageChange,
  onView,
  onEdit,
  onLinkStudents,
  onResendInvite,
  onArchive,
  onDelete
}: ParentsTableProps) {
  // Filter parents based on search and filters
  const filteredParents = useMemo(() => {
    return parents.filter(parent => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        parent.firstName.toLowerCase().includes(searchLower) ||
        parent.lastName.toLowerCase().includes(searchLower) ||
        parent.email.toLowerCase().includes(searchLower) ||
        parent.phone.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === 'all' || parent.status === statusFilter;

      // Link state filter
      const hasLinkedStudents = parent.studentIds.length > 0;
      const matchesLinkState = linkStateFilter === 'all' || 
        (linkStateFilter === 'Linked' && hasLinkedStudents) ||
        (linkStateFilter === 'Unlinked' && !hasLinkedStudents);

      return matchesSearch && matchesStatus && matchesLinkState;
    });
  }, [parents, searchTerm, statusFilter, linkStateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParents = filteredParents.slice(startIndex, startIndex + itemsPerPage);
  const startItem = filteredParents.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + itemsPerPage, filteredParents.length);

  const getLinkedStudentsInfo = (studentIds: string[]) => {
    const linkedStudents = mockStudents.filter(student => studentIds.includes(student.id));
    return {
      count: linkedStudents.length,
      names: linkedStudents.map(s => `${s.firstName} ${s.lastName}`)
    };
  };

  const isColumnVisible = (column: string) => visibleColumns.includes(column);

  if (filteredParents.length === 0) {
    return (
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
        <div className="w-16 h-16 bg-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-brand-teal" />
        </div>
        <h3 className="text-xl font-semibold text-blue-900 mb-2">No Parents Found</h3>
        <p className="text-blue-900/70 mb-6 max-w-md mx-auto">
          {parents.length === 0 
            ? "No parents have been added yet. Click 'Add Parent' to add your first guardian."
            : "No parents match your current filters. Try adjusting your search criteria."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-blue-900/70">
          Showing {startItem}-{endItem} of {filteredParents.length} parents
        </div>
        <div className="text-sm text-blue-900/70">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                {isColumnVisible('name') && (
                  <th className="text-left p-4 text-sm font-medium text-blue-900">Name</th>
                )}
                {isColumnVisible('email') && (
                  <th className="text-left p-4 text-sm font-medium text-blue-900">Email</th>
                )}
                {isColumnVisible('phone') && (
                  <th className="text-left p-4 text-sm font-medium text-blue-900">Phone</th>
                )}
                {isColumnVisible('linkedStudents') && (
                  <th className="text-left p-4 text-sm font-medium text-blue-900">Linked Students</th>
                )}
                {isColumnVisible('status') && (
                  <th className="text-left p-4 text-sm font-medium text-blue-900">Status</th>
                )}
                {isColumnVisible('updated') && (
                  <th className="text-left p-4 text-sm font-medium text-blue-900">Updated</th>
                )}
                <th className="text-left p-4 text-sm font-medium text-blue-900 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedParents.map((parent, index) => {
                const linkedInfo = getLinkedStudentsInfo(parent.studentIds);
                const isEven = index % 2 === 0;
                
                return (
                  <tr
                    key={parent.id}
                    className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
                      isEven ? 'bg-white/5' : 'bg-transparent'
                    }`}
                  >
                    {isColumnVisible('name') && (
                      <td className="p-4">
                        <div className="font-medium text-black">
                          {parent.firstName} {parent.lastName}
                        </div>
                        {parent.nationalIdOrPassport && (
                          <div className="text-sm text-black/60">
                            ID: {parent.nationalIdOrPassport}
                          </div>
                        )}
                      </td>
                    )}
                    
                    {isColumnVisible('email') && (
                      <td className="p-4 text-black">{parent.email}</td>
                    )}
                    
                    {isColumnVisible('phone') && (
                      <td className="p-4 text-black">{parent.phone}</td>
                    )}
                    
                    {isColumnVisible('linkedStudents') && (
                      <td className="p-4">
                        {linkedInfo.count > 0 ? (
                          <Badge 
                            variant="secondary" 
                            className="bg-brand-accent/20 text-brand-accent border border-brand-accent/40"
                          >
                            {linkedInfo.count} student{linkedInfo.count > 1 ? 's' : ''}
                          </Badge>
                        ) : (
                          <Badge 
                            variant="secondary" 
                            className="bg-amber-500/20 text-amber-600 border border-amber-500/40"
                          >
                            No students
                          </Badge>
                        )}
                      </td>
                    )}
                    
                    {isColumnVisible('status') && (
                      <td className="p-4">
                        <Badge
                          variant="secondary"
                          className={parent.status === 'Active' 
                            ? "bg-green-500/20 text-green-600 border border-green-500/40"
                            : "bg-gray-500/20 text-gray-600 border border-gray-500/40"
                          }
                        >
                          {parent.status}
                        </Badge>
                      </td>
                    )}
                    
                    {isColumnVisible('updated') && (
                      <td className="p-4 text-black text-sm">
                        {formatDistanceToNow(new Date(parent.updatedAt), { addSuffix: true })}
                      </td>
                    )}
                    
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {/* View */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(parent)}
                          className="h-8 w-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10 rounded-lg"
                          title="View parent details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(parent)}
                          className="h-8 w-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10 rounded-lg"
                          title="Edit parent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        {/* Link Students */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onLinkStudents(parent)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-500 hover:bg-blue-600/10 rounded-lg"
                          title="Link/unlink students"
                        >
                          <Link className="w-4 h-4" />
                        </Button>

                        {/* Resend Invite */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onResendInvite(parent)}
                          className="h-8 w-8 p-0 text-purple-600 hover:text-purple-500 hover:bg-purple-600/10 rounded-lg"
                          title="Resend invite"
                        >
                          <Mail className="w-4 h-4" />
                        </Button>

                        {/* Archive/Unarchive */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onArchive(parent)}
                          className="h-8 w-8 p-0 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
                          title={parent.status === 'Active' ? 'Archive parent' : 'Unarchive parent'}
                        >
                          {parent.status === 'Active' ? (
                            <Archive className="w-4 h-4" />
                          ) : (
                            <RotateCcw className="w-4 h-4" />
                          )}
                        </Button>

                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(parent)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-500 hover:bg-red-600/10 rounded-lg"
                          title="Delete parent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-blue-900 hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              
              return (
                <Button
                  key={page}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={isActive 
                    ? "bg-brand-accent text-white hover:bg-brand-accent/80" 
                    : "text-blue-900 hover:bg-white/20"
                  }
                >
                  {page}
                </Button>
              );
            })}
            
            {totalPages > 5 && (
              <>
                <span className="text-blue-900/50 px-2">...</span>
                <Button
                  variant={currentPage === totalPages ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(totalPages)}
                  className={currentPage === totalPages 
                    ? "bg-brand-accent text-white hover:bg-brand-accent/80" 
                    : "text-blue-900 hover:bg-white/20"
                  }
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-blue-900 hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}