import { useState } from 'react';
import { 
  SubjectsTable, 
  SubjectToolbar, 
  SubjectForm, 
  ConfirmModal, 
  EmptyState,
  AddSubjectModal,
  SubjectsHeader,
  SubjectDetailsModal,
  useSubjectState,
  Subject
} from "../components/subjects";
import { ColumnVisibility } from "../components/subjects/SubjectToolbar";
import { useToast } from "@/hooks/use-toast";
import { downloadSubjectReport, downloadBulkSubjectReports } from "@/shared/mocks/schooladmin/reporting";
import { buildFilteredData, exportPdf, exportXlsx, confirmLargeExport } from '@/shared/mocks/schooladmin/export';

export default function SubjectsView() {
  const { toast } = useToast();
  
  const {
    data,
    setData,
    query,
    setQuery,
    filters,
    handleFiltersChange,
    sortBy,
    sortDir,
    setSort,
    page,
    pageSize,
    setPage,
    setPageSize,
    filtered,
    sorted,
    paged
  } = useSubjectState();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [confirmSubject, setConfirmSubject] = useState<Subject | null>(null);
  const [viewingSubject, setViewingSubject] = useState<Subject | null>(null);
  const [action, setAction] = useState<'delete' | 'activate' | 'deactivate'>('delete');
  
  // Column visibility state - all columns visible by default
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    name: true,
    code: true,
    classes: true,
    teacherName: true,
    numberOfStudents: true,
    passingRate: true,
    status: true,
    updatedAt: true,
  });

  const handleAddSubject = () => {
    setIsAddModalOpen(true);
  };

  const handleViewSubject = (subject: Subject) => {
    setViewingSubject(subject);
    setIsDetailsOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  const handleDeleteSubject = (subject: Subject) => {
    setConfirmSubject(subject);
    setAction('delete');
    setIsConfirmOpen(true);
  };

  const handleArchiveSubject = (subject: Subject) => {
    setConfirmSubject(subject);
    setAction(subject.status === 'Active' ? 'deactivate' : 'activate');
    setIsConfirmOpen(true);
  };

  const handleFormSubmit = (formData: any) => {
    const newSubject: Subject = {
      id: editingSubject?.id || `subj-${Date.now()}`,
      name: formData.name,
      code: formData.code,
      classes: formData.classes || [],
      teacherName: formData.teacherName,
      numberOfStudents: Math.floor(Math.random() * 40) + 15, // Mock data
      passingRate: Math.floor(Math.random() * 40) + 60, // Mock data  
      status: formData.status || 'Active',
      updatedAt: new Date().toISOString()
    };

    if (editingSubject) {
      // Update existing subject - immutable update
      setData(prev => prev.map(subject => 
        subject.id === editingSubject.id ? newSubject : subject
      ));
    } else {
      // Add new subject - immutable update
      setData(prev => [newSubject, ...prev]);
    }
    
    setIsFormOpen(false);
    setEditingSubject(null);
  };

  const handleConfirmAction = () => {
    if (!confirmSubject) return;

    if (action === 'delete') {
      // Delete subject - immutable update
      setData(prev => prev.filter(subject => subject.id !== confirmSubject.id));
      toast({
        title: "Subject deleted",
        description: `${confirmSubject.name} has been permanently deleted.`,
      });
    } else {
      // Archive/Activate subject - immutable update
      const newStatus = action === 'activate' ? 'Active' : 'Inactive';
      setData(prev => prev.map(subject => 
        subject.id === confirmSubject.id 
          ? { ...subject, status: newStatus, updatedAt: new Date().toISOString() }
          : subject
      ));
      toast({
        title: action === 'activate' ? "Subject activated" : "Subject archived",
        description: `${confirmSubject.name} has been ${action === 'activate' ? 'activated' : 'archived'}.`,
      });
    }
    
    setIsConfirmOpen(false);
    setConfirmSubject(null);
  };

  const actionText = action === 'delete' ? 'Delete' : action === 'activate' ? 'Activate' : 'Archive';

  const handleDownloadSubject = async (subject: Subject) => {
    try {
      await downloadSubjectReport(subject);
      toast({
        title: "Report Downloaded",
        description: `Subject report for ${subject.name} has been generated.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBulkExport = async (format: 'pdf' | 'excel') => {
    try {
      await downloadBulkSubjectReports(data, format);
      toast({
        title: "Bulk Report Downloaded",
        description: `${format.toUpperCase()} report for all subjects has been generated.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating the bulk report. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Bulk download with filtered data
  const handleBulkDownload = async (format: 'pdf' | 'excel') => {
    try {
      const confirmed = await confirmLargeExport(filtered.length);
      if (!confirmed) return;

      // Define visible columns for subjects based on current columnVisibility state
      const visibleColumns = [
        { key: 'name', label: 'Subject Name', visible: columnVisibility.name },
        { key: 'code', label: 'Subject Code', visible: columnVisibility.code },
        { key: 'classes', label: 'Classes', visible: columnVisibility.classes },
        { key: 'teacherName', label: 'Teacher', visible: columnVisibility.teacherName },
        { key: 'numberOfStudents', label: 'Students', visible: columnVisibility.numberOfStudents },
        { key: 'passingRate', label: 'Pass Rate', visible: columnVisibility.passingRate },
        { key: 'status', label: 'Status', visible: columnVisibility.status }
      ].filter(col => col.visible);

      if (format === 'pdf') {
        exportPdf('subjects', filtered, visibleColumns);
      } else {
        exportXlsx('subjects', filtered, visibleColumns);
      }

      toast({
        title: "Download Complete",
        description: `${format.toUpperCase()} report with ${filtered.length} subjects has been downloaded.`,
      });
    } catch (error) {
      console.error('Failed to download filtered report:', error);
      toast({
        title: "Download Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        {/* Header with Stats and Add Button */}
        <SubjectsHeader
          subjects={data}
          onAdd={handleAddSubject}
          onBulkExport={handleBulkExport}
        />

        {/* Toolbar - Remove duplicate glassy container since SubjectToolbar has its own */}
        <SubjectToolbar
          totalSubjects={filtered.length}
          searchQuery={query}
          onSearch={setQuery}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          onBulkDownload={handleBulkDownload}
        />

        {/* Table or Empty State - Glassy Container */}
        {paged.length > 0 ? (
          <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl shadow-xl overflow-hidden">
            <SubjectsTable
              subjects={paged}
              sortBy={sortBy}
              sortDir={sortDir}
              onSort={setSort}
              onView={handleViewSubject}
              onEdit={handleEditSubject}
              onDelete={handleDeleteSubject}
              onArchive={handleArchiveSubject}
              onDownload={handleDownloadSubject}
              totalCount={filtered.length}
              currentPage={page}
              pageSize={pageSize}
              onPageChange={setPage}
              columnVisibility={columnVisibility}
            />
          </div>
        ) : (
          <EmptyState 
            query={query} 
            onClearFilters={() => setQuery('')} 
          />
        )}

        {/* Subject Form Modal - Only for editing */}
        <SubjectForm
          open={isFormOpen}
          mode={editingSubject ? 'edit' : 'create'}
          initial={editingSubject || undefined}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />

        {/* Add Subject Modal - Default for adding new subjects */}
        <AddSubjectModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleFormSubmit}
        />

        {/* Subject Details Modal */}
        <SubjectDetailsModal
          open={isDetailsOpen}
          subject={viewingSubject}
          onClose={() => {
            setIsDetailsOpen(false);
            setViewingSubject(null);
          }}
        />

        {/* Confirm Modal */}
        <ConfirmModal
          open={isConfirmOpen}
          title={confirmSubject ? `${action === 'delete' ? 'Delete' : action === 'deactivate' ? 'Archive' : 'Activate'} Subject` : 'Confirm Action'}
          message={confirmSubject ? `Are you sure you want to ${action === 'delete' ? 'permanently delete' : action === 'deactivate' ? 'archive' : 'activate'} "${confirmSubject.name}"? ${action === 'delete' ? 'This action cannot be undone.' : ''}` : 'Are you sure you want to proceed?'}
          confirmLabel={actionText}
          variant={action === 'delete' ? 'danger' : action === 'deactivate' ? 'archive' : 'neutral'}
          onConfirm={handleConfirmAction}
          onCancel={() => setIsConfirmOpen(false)}
        />
      </div>
    </div>
  );
}