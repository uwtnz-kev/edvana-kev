import React, { useState } from 'react';
import {
  StudentsHeader,
  StudentsStats,
  StudentsToolbar,
  StudentsTable,
  StudentModal,
  StudentDetailsModal,
  StudentDetailsPanel,
  EmptyState,
  ConfirmModal,
  useStudents,

  Student,
  StudentFormData,
  StudentMode,
} from '../components/students';
import { downloadStudentReport, downloadBulkStudentReports } from "@/shared/mocks/schooladmin/reporting";
import { buildFilteredData, exportPdf, exportXlsx, confirmLargeExport } from '@/shared/mocks/schooladmin/export';
import { useToast } from '@/hooks/use-toast';

export default function StudentsView() {
  const { toast } = useToast();
  const {
    students,
    allStudents,
    filters,
    setFilters,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();

  // Modal states
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMode, setModalMode] = useState<StudentMode>('create');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ action: () => void; title: string; description: string; variant?: 'delete' | 'archive' }>({
    action: () => {},
    title: '',
    description: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Calculate pagination
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = students.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handleAddStudent = () => {
    setModalMode('create');
    setSelectedStudent(null);
    setShowStudentModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    // Use panel for desktop, modal for mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setShowDetailsModal(true);
    } else {
      setShowDetailsPanel(true);
    }
  };

  const handleDeleteStudent = (student: Student) => {
    setConfirmAction({
      action: () => {
        deleteStudent(student.id);
        setShowConfirmModal(false);
      },
      title: 'Delete Student',
      description: `Are you sure you want to delete ${student.firstName} ${student.lastName}? This action cannot be undone and will remove all student data from the system.`,
      variant: 'delete',
    });
    setShowConfirmModal(true);
  };

  const handleArchiveStudent = (student: Student) => {
    setConfirmAction({
      action: () => {
        updateStudent(student.id, { status: 'Inactive' });
        setShowConfirmModal(false);
      },
      title: 'Archive Student',
      description: `Are you sure you want to archive ${student.firstName} ${student.lastName}? This will set their status to inactive.`,
      variant: 'archive',
    });
    setShowConfirmModal(true);
  };

  const handleStudentSubmit = (data: StudentFormData | Student[]) => {
    if (Array.isArray(data)) {
      // CSV bulk import
      data.forEach(student => addStudent(student));
    } else {
      // Single student form
      if (modalMode === 'create') {
        addStudent(data);
      } else if (selectedStudent) {
        updateStudent(selectedStudent.id, data);
      }
    }
    setShowStudentModal(false);
    setSelectedStudent(null);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  const handleDownloadStudent = async (student: Student) => {
    try {
      await downloadStudentReport(student);
      // Don't show toast notification - keep it simple
    } catch (error) {
      console.error('Failed to download student report:', error);
    }
  };

  const handleBulkExport = async (format: 'pdf' | 'excel') => {
    try {
      await downloadBulkStudentReports(students, format);
    } catch (error) {
      console.error('Failed to download bulk report:', error);
    }
  };

  // Bulk download with filtered data
  const handleBulkDownload = async (format: 'pdf' | 'excel') => {
    try {
      const confirmed = await confirmLargeExport(students.length);
      if (!confirmed) return;

      // Define visible columns for students
      const visibleColumns = [
        { key: 'name', label: 'Full Name', visible: true },
        { key: 'email', label: 'Email', visible: true },
        { key: 'phone', label: 'Phone', visible: true },
        { key: 'class', label: 'Class', visible: true },
        { key: 'status', label: 'Status', visible: true },
        { key: 'enrollmentDate', label: 'Enrollment Date', visible: true }
      ];

      // Get filtered data (students array is already filtered by the hook)
      const filteredData = students;

      if (format === 'pdf') {
        exportPdf('students', filteredData, visibleColumns);
      } else {
        exportXlsx('students', filteredData, visibleColumns);
      }

      toast({
        title: "Download Complete",
        description: `${format.toUpperCase()} report with ${filteredData.length} students has been downloaded.`,
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
        {/* Header */}
        <StudentsHeader onAddStudent={handleAddStudent} onBulkExport={handleBulkExport} />

        {/* Stats Cards */}
        <StudentsStats students={allStudents} />

        {/* Toolbar */}
        <StudentsToolbar
          filters={filters}
          onFiltersChange={setFilters}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalStudents={students.length}
          onBulkDownload={handleBulkDownload}
        />

        {/* Content */}
        {students.length === 0 && filters.search === '' && filters.class.length === 0 && filters.section.length === 0 && filters.status.length === 0 ? (
          <EmptyState onAddStudent={handleAddStudent} />
        ) : (
          <>
            <StudentsTable
              students={paginatedStudents}
              onView={handleViewStudent}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onArchive={handleArchiveStudent}
              onDownload={handleDownloadStudent}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-6 pb-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, students.length)} of {students.length} students
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      variant="ghost"
                      size="sm"
                      className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-white px-3">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      variant="ghost"
                      size="sm"
                      className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Modals */}
        <StudentModal
          open={showStudentModal}
          onClose={() => {
            setShowStudentModal(false);
            setSelectedStudent(null);
          }}
          onSubmit={handleStudentSubmit}
          mode={modalMode}
          initialData={selectedStudent || undefined}
        />

        <StudentDetailsModal
          open={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedStudent(null);
          }}
          student={selectedStudent}
        />

        <StudentDetailsPanel
          student={selectedStudent}
          open={showDetailsPanel}
          onClose={() => {
            setShowDetailsPanel(false);
            setSelectedStudent(null);
          }}
          isMobile={false}
        />

        <ConfirmModal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmAction.action}
          title={confirmAction.title}
          description={confirmAction.description}
          variant={confirmAction.variant}
          confirmText={confirmAction.variant === 'delete' ? 'Delete Student' : 'Archive Student'}
        />
      </div>
    </div>
  );
}
