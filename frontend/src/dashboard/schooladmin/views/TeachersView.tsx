import { useState } from 'react';
import { 
  TeacherTable, 
  TeacherFilters, 
  TeachersHeader,
  TeachersToolbar,
  TeacherModal, 
  TeacherDetailsModal,
  AssignmentModal,
  ConfirmModal,
  EmptyState,
  useTeacherState,
  Teacher,
  TeacherStatus,
  TeacherSpecialization,
  TeacherQualification,
  TeacherRole,
  TeacherFilters as TeacherFiltersType
} from "../components/teachers";

import { useToast } from "@/hooks/use-toast";
import { downloadTeacherReport, downloadBulkTeacherReports } from "@/shared/mocks/schooladmin/reporting";
import { buildFilteredData, exportPdf, exportXlsx, confirmLargeExport } from '@/shared/mocks/schooladmin/export';

export default function TeachersView() {
  const { toast } = useToast();
  
  const {
    data,
    setData,
    query,
    setQuery,
    filters,
    setFilters,
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
  } = useTeacherState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);
  const [assignmentTeacher, setAssignmentTeacher] = useState<Teacher | null>(null);
  const [confirmTeacher, setConfirmTeacher] = useState<Teacher | null>(null);
  const [action, setAction] = useState<'delete' | 'activate' | 'deactivate'>('delete');



  const hasActiveFilters = Boolean((filters.status && filters.status.length > 0) || 
                                  (filters.classes && filters.classes.length > 0) || 
                                  (filters.subjects && filters.subjects.length > 0));

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setViewingTeacher(teacher);
    setIsDetailsModalOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDeleteTeacher = (teacher: Teacher) => {
    setConfirmTeacher(teacher);
    setAction('delete');
    setIsConfirmOpen(true);
  };

  const handleArchiveTeacher = (teacher: Teacher) => {
    setConfirmTeacher(teacher);
    setAction(teacher.status === TeacherStatus.ACTIVE ? 'deactivate' : 'activate');
    setIsConfirmOpen(true);
  };

  const handleAssignTeacher = (teacher: Teacher) => {
    setAssignmentTeacher(teacher);
    setIsAssignmentModalOpen(true);
  };

  const handleAssignmentSubmit = (teacherId: string, assignmentData: any) => {
    setData((prev: Teacher[]) => prev.map((t: Teacher) => 
      t.id === teacherId 
        ? { 
            ...t, 
            role: assignmentData.role,
            classAssignments: assignmentData.classAssignments,
            subjectAssignments: assignmentData.subjectAssignments,
            updatedAt: new Date().toISOString() 
          }
        : t
    ));
    
    setIsAssignmentModalOpen(false);
    setAssignmentTeacher(null);
  };

  const handleConfirmAction = () => {
    if (!confirmTeacher) return;

    if (action === 'delete') {
      // Delete teacher - immutable update
      setData((prev: Teacher[]) => prev.filter((t: Teacher) => t.id !== confirmTeacher.id));
      toast({
        title: "Teacher deleted",
        description: `${confirmTeacher.firstName} ${confirmTeacher.lastName} has been permanently deleted.`,
      });
    } else {
      // Archive/Activate teacher - immutable update
      const newStatus = action === 'activate' ? TeacherStatus.ACTIVE : TeacherStatus.ARCHIVED;
      setData((prev: Teacher[]) => prev.map((t: Teacher) => 
        t.id === confirmTeacher.id 
          ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
          : t
      ));
      toast({
        title: action === 'activate' ? "Teacher activated" : "Teacher deactivated",
        description: `${confirmTeacher.firstName} ${confirmTeacher.lastName} has been ${action === 'activate' ? 'activated' : 'deactivated'}.`,
      });
    }
    
    setIsConfirmOpen(false);
    setConfirmTeacher(null);
  };

  const handleModalSubmit = (formData: any) => {
    // Generate default professional values (these will be managed from other views)
    const defaultSpecializations = [TeacherSpecialization.MATHEMATICS, TeacherSpecialization.SCIENCE, TeacherSpecialization.LANGUAGES, TeacherSpecialization.SOCIAL_STUDIES];
    const defaultQualifications = [TeacherQualification.BACHELOR, TeacherQualification.MASTER, TeacherQualification.DIPLOMA];
    const randomSpecialization = defaultSpecializations[Math.floor(Math.random() * defaultSpecializations.length)];
    const randomQualification = defaultQualifications[Math.floor(Math.random() * defaultQualifications.length)];
    const randomExperience = Math.floor(Math.random() * 15) + 1; // 1-15 years
    const randomSalary = Math.floor(Math.random() * 300000) + 150000; // 150k-450k RWF

    const newTeacher: Teacher = {
      id: editingTeacher?.id || `teacher-${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || '',
      employeeId: editingTeacher?.employeeId || `TCH${Date.now().toString().slice(-3)}`,
      // Professional fields with default values (to be managed elsewhere)
      specialization: editingTeacher?.specialization || randomSpecialization,
      qualification: editingTeacher?.qualification || randomQualification,
      experience: editingTeacher?.experience || randomExperience,
      status: formData.status || TeacherStatus.ACTIVE,
      role: formData.role || TeacherRole.TEACHER,
      salary: editingTeacher?.salary || randomSalary,
      address: editingTeacher?.address || 'To be updated',
      // Relationship fields managed from other views
      subjects: editingTeacher?.subjects || [],
      classes: editingTeacher?.classes || [],
      classAssignments: editingTeacher?.classAssignments || [],
      subjectAssignments: editingTeacher?.subjectAssignments || [],
      hireDate: editingTeacher?.hireDate || new Date().toISOString(),
      emergencyContact: editingTeacher?.emergencyContact || {
        name: 'To be updated',
        phone: '',
        relationship: 'To be updated'
      },
      updatedAt: new Date().toISOString()
    };

    if (editingTeacher) {
      // Update existing teacher
      setData((prev: Teacher[]) => prev.map((teacher: Teacher) => 
        teacher.id === editingTeacher.id ? newTeacher : teacher
      ));
    } else {
      // Add new teacher
      setData((prev: Teacher[]) => [newTeacher, ...prev]);
    }
    
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  const handleClearFilters = () => {
    setFilters({
      status: [],
      classes: [],
      subjects: []
    });
    setQuery('');
  };

  const handleDownloadTeacher = async (teacher: Teacher) => {
    try {
      await downloadTeacherReport(teacher);
      toast({
        title: "Report Downloaded",
        description: `Teacher report for ${teacher.firstName} ${teacher.lastName} has been generated.`,
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
      await downloadBulkTeacherReports(data, format);
      toast({
        title: "Bulk Report Downloaded",
        description: `${format.toUpperCase()} report for all teachers has been generated.`,
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

      // Define visible columns for teachers
      const visibleColumns = [
        { key: 'name', label: 'Full Name', visible: true },
        { key: 'email', label: 'Email', visible: true },
        { key: 'phone', label: 'Phone', visible: true },
        { key: 'role', label: 'Role', visible: true },
        { key: 'qualification', label: 'Qualification', visible: true },
        { key: 'experience', label: 'Experience', visible: true },
        { key: 'specialization', label: 'Specialization', visible: true },
        { key: 'status', label: 'Status', visible: true }
      ];

      if (format === 'pdf') {
        exportPdf('teachers', filtered, visibleColumns);
      } else {
        exportXlsx('teachers', filtered, visibleColumns);
      }

      toast({
        title: "Download Complete",
        description: `${format.toUpperCase()} report with ${filtered.length} teachers has been downloaded.`,
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
        {/* Header with Summary Cards */}
        <TeachersHeader 
          teachers={data}
          onAdd={handleAddTeacher}
          onBulkExport={handleBulkExport}
        />

        {/* Toolbar with Search, Filters, and Page Size */}
        <TeachersToolbar
          totalTeachers={filtered.length}
          searchQuery={query}
          onSearch={setQuery}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          filters={filters}
          onFiltersChange={setFilters}
          onBulkDownload={handleBulkDownload}
        />

        {/* Table or Empty State - Glassy Container */}
        {paged.length > 0 ? (
          <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl shadow-xl overflow-hidden">
            <TeacherTable
              teachers={paged}
              sortBy={sortBy}
              sortDir={sortDir}
              onSort={setSort}
              onView={handleViewTeacher}
              onEdit={handleEditTeacher}
              onDelete={handleDeleteTeacher}
              onDownload={handleDownloadTeacher}
              totalCount={filtered.length}
              currentPage={page}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </div>
        ) : (
          <EmptyState 
            query={query}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Teacher Modal */}
        <TeacherModal
          open={isModalOpen}
          mode={editingTeacher ? 'edit' : 'create'}
          initial={editingTeacher || undefined}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTeacher(null);
          }}
          onSubmit={handleModalSubmit}
        />

        {/* Teacher Details Modal */}
        <TeacherDetailsModal
          open={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setViewingTeacher(null);
          }}
          teacher={viewingTeacher}
        />

        {/* Assignment Modal */}
        <AssignmentModal
          open={isAssignmentModalOpen}
          teacher={assignmentTeacher}
          onClose={() => {
            setIsAssignmentModalOpen(false);
            setAssignmentTeacher(null);
          }}
          onSubmit={handleAssignmentSubmit}
        />

        {/* Confirmation Modal */}
        <ConfirmModal
          open={isConfirmOpen}
          title={action === 'delete' ? 'Delete Teacher' : 
                action === 'activate' ? 'Activate Teacher' : 'Deactivate Teacher'}
          message={confirmTeacher ? 
            action === 'delete' 
              ? `Are you sure you want to permanently delete ${confirmTeacher.firstName} ${confirmTeacher.lastName}? This action cannot be undone.`
              : action === 'activate'
              ? `Are you sure you want to activate ${confirmTeacher.firstName} ${confirmTeacher.lastName}? They will be able to access the system again.`
              : `Are you sure you want to deactivate ${confirmTeacher.firstName} ${confirmTeacher.lastName}? They will no longer be able to access the system.`
            : ''
          }
          confirmLabel={action === 'delete' ? 'Delete' : 
                      action === 'activate' ? 'Activate' : 'Deactivate'}
          variant={action === 'delete' ? 'danger' : action === 'deactivate' ? 'archive' : 'neutral'}
          onConfirm={handleConfirmAction}
          onCancel={() => {
            setIsConfirmOpen(false);
            setConfirmTeacher(null);
          }}
        />
      </div>
    </div>
  );
}