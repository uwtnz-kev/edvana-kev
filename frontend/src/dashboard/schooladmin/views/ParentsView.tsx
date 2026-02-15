import React, { useState } from 'react';
import { Plus, Users, UserCheck, Link, Clock, Mail, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MockParentStore, Parent } from '@/shared/mocks/schooladmin/mockData';
import { 
  AddParentModal, 
  ParentsTable, 
  ParentsToolbar, 
  ParentDetailsModal, 
  LinkStudentsModal, 
  ConfirmArchiveModal, 
  ConfirmDeleteParentModal,
  ImportCSVModal
} from '../components/parents';

export default function ParentsView() {
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editParent, setEditParent] = useState<Parent | null>(null);
  const [viewParent, setViewParent] = useState<Parent | null>(null);
  const [linkParent, setLinkParent] = useState<Parent | null>(null);
  const [archiveParent, setArchiveParent] = useState<Parent | null>(null);
  const [deleteParent, setDeleteParent] = useState<Parent | null>(null);

  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [linkStateFilter, setLinkStateFilter] = useState('all');
  const [visibleColumns, setVisibleColumns] = useState(['name', 'email', 'phone', 'linkedStudents', 'status', 'updated']);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const { toast } = useToast();

  // Get real statistics from the store
  const allParents = MockParentStore.getAllParents();
  const totalParents = allParents.length;
  const verifiedParents = allParents.filter(p => p.status === 'Active').length;
  const linkedToStudents = allParents.filter(p => p.studentIds.length > 0).length;
  const pendingInvites = Math.max(0, totalParents - verifiedParents); // Mock pending invites

  const handleAddParent = () => {
    setEditParent(null);
    setIsAddModalOpen(true);
  };

  const handleImportCSV = () => {
    setIsImportModalOpen(true);
  };

  const handleEditParent = (parent: Parent) => {
    setEditParent(parent);
    setIsAddModalOpen(true);
  };

  const handleViewParent = (parent: Parent) => {
    setViewParent(parent);
  };

  const handleLinkStudents = (parent: Parent) => {
    setLinkParent(parent);
  };

  const handleResendInvite = (parent: Parent) => {
    toast({
      title: "Invite Sent",
      description: `Invitation resent to ${parent.firstName} ${parent.lastName} at ${parent.email}`,
    });
  };

  const handleArchiveParent = (parent: Parent) => {
    setArchiveParent(parent);
  };

  const handleDeleteParent = (parent: Parent) => {
    setDeleteParent(parent);
  };

  const handleParentSuccess = () => {
    setIsAddModalOpen(false);
    setEditParent(null);
    setViewParent(null);
    setLinkParent(null);
    // Force page refresh to update statistics and table
    setCurrentPage(1);
  };

  const handleImportSuccess = (importedCount: number) => {
    setIsImportModalOpen(false);
    setCurrentPage(1);
    // Statistics will update automatically since we call getAllParents() in render
  };

  const handleArchiveConfirm = (parent: Parent) => {
    try {
      const newStatus = parent.status === 'Active' ? 'Archived' : 'Active';
      MockParentStore.updateParent(parent.id, { status: newStatus });
      
      toast({
        title: newStatus === 'Archived' ? "Parent Archived" : "Parent Unarchived",
        description: `${parent.firstName} ${parent.lastName} has been ${newStatus.toLowerCase()}.`,
      });
      
      setArchiveParent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update parent status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteConfirm = (parent: Parent) => {
    try {
      MockParentStore.deleteParent(parent.id);
      
      toast({
        title: "Parent Deleted",
        description: `${parent.firstName} ${parent.lastName} has been permanently deleted.`,
      });
      
      setDeleteParent(null);
      setCurrentPage(1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete parent. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditParent(null);
  };

  const handleCloseViewModal = () => {
    setViewParent(null);
  };

  const handleCloseLinkModal = () => {
    setLinkParent(null);
  };

  const handleCloseImportModal = () => {
    setIsImportModalOpen(false);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-blue-900">Parents</h1>
            <p className="text-blue-900/70 max-w-3xl">
              Manage guardians and their linked students.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleImportCSV}
              variant="ghost"
              className="text-blue-900 hover:bg-white/20 rounded-xl"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button
              onClick={handleAddParent}
              className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Parent
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-brand-teal/20 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{totalParents}</div>
              <div className="text-sm text-blue-900/80 font-medium">Total Parents</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{verifiedParents}</div>
              <div className="text-sm text-blue-900/80 font-medium">Verified</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center mx-auto">
              <Link className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{linkedToStudents}</div>
              <div className="text-sm text-blue-900/80 font-medium">Linked to Students</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{pendingInvites}</div>
              <div className="text-sm text-blue-900/80 font-medium">Pending Invites</div>
            </div>
          </div>
        </div>

        {/* Table Content */}
        {totalParents > 0 ? (
          <div className="space-y-6">
            <ParentsToolbar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              linkStateFilter={linkStateFilter}
              onLinkStateFilterChange={setLinkStateFilter}
              visibleColumns={visibleColumns}
              onVisibleColumnsChange={setVisibleColumns}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              totalItems={totalParents}
              filteredItems={allParents.filter(parent => {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch = searchTerm === '' || 
                  parent.firstName.toLowerCase().includes(searchLower) ||
                  parent.lastName.toLowerCase().includes(searchLower) ||
                  parent.email.toLowerCase().includes(searchLower) ||
                  parent.phone.toLowerCase().includes(searchLower);
                const matchesStatus = statusFilter === 'all' || parent.status === statusFilter;
                const hasLinkedStudents = parent.studentIds.length > 0;
                const matchesLinkState = linkStateFilter === 'all' || 
                  (linkStateFilter === 'Linked' && hasLinkedStudents) ||
                  (linkStateFilter === 'Unlinked' && !hasLinkedStudents);
                return matchesSearch && matchesStatus && matchesLinkState;
              }).length}
            />

            <ParentsTable
              parents={allParents}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              linkStateFilter={linkStateFilter}
              visibleColumns={visibleColumns}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onView={handleViewParent}
              onEdit={handleEditParent}
              onLinkStudents={handleLinkStudents}
              onResendInvite={handleResendInvite}
              onArchive={handleArchiveParent}
              onDelete={handleDeleteParent}
            />
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
            <div className="w-16 h-16 bg-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-brand-teal" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">No Parents Yet</h3>
            <p className="text-blue-900/70 mb-6 max-w-md mx-auto">
              Start building your parent community by adding the first guardian. 
              Parents can be linked to multiple students and receive important updates.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={handleImportCSV}
                variant="ghost"
                className="text-blue-900 hover:bg-white/20 rounded-xl"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
              <Button
                onClick={handleAddParent}
                className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Parent
              </Button>
            </div>
          </div>
        )}

        {/* All Modals */}
        <AddParentModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          editParent={editParent}
          onSuccess={handleParentSuccess}
          onCancel={handleCloseModal}
        />

        <ParentDetailsModal
          parent={viewParent}
          open={!!viewParent}
          onOpenChange={(open) => !open && setViewParent(null)}
          onEdit={handleEditParent}
          onLinkStudents={handleLinkStudents}
          onClose={handleCloseViewModal}
        />

        <LinkStudentsModal
          parent={linkParent}
          open={!!linkParent}
          onOpenChange={(open) => !open && setLinkParent(null)}
          onSuccess={handleParentSuccess}
          onClose={handleCloseLinkModal}
        />

        <ConfirmArchiveModal
          parent={archiveParent}
          open={!!archiveParent}
          onOpenChange={(open) => !open && setArchiveParent(null)}
          onConfirm={handleArchiveConfirm}
        />

        <ConfirmDeleteParentModal
          parent={deleteParent}
          open={!!deleteParent}
          onOpenChange={(open) => !open && setDeleteParent(null)}
          onConfirm={handleDeleteConfirm}
        />

        <ImportCSVModal
          open={isImportModalOpen}
          onOpenChange={setIsImportModalOpen}
          onSuccess={handleImportSuccess}
          onClose={handleCloseImportModal}
        />
      </div>
    </div>
  );
}