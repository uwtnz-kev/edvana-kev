import React, { useState, useCallback, useMemo } from 'react';
import { Plus, BookOpen, TrendingUp, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MockResourceStore, Resource, ResourceType, ResourceStatus } from '@/shared/mocks/schooladmin/mockData';
import { 
  ResourcesList, 
  ResourcesToolbar, 
  AddResourceModal,
  ResourcePreviewModal,
  ConfirmDeleteModal
} from '../components/resources';
import { 
  filterResources, 
  paginateResources, 
  downloadResource, 
  openResource,
  updateResource,
  deleteResource,
  isPreviewable
} from '@/shared/mocks/schooladmin/resources';

export default function ResourcesView() {
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [previewResource, setPreviewResource] = useState<Resource | null>(null);
  const [deleteResource, setDeleteResource] = useState<Resource | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [gradeFilter, setGradeFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<ResourceType | ''>('');
  const [statusFilter, setStatusFilter] = useState<ResourceStatus | ''>('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  const { toast } = useToast();

  // Get all resources from the store
  const allResources = MockResourceStore.getAllResources();

  // Apply filters and pagination
  const filteredResources = useMemo(() => {
    return filterResources(allResources, {
      search: searchTerm,
      subjectId: subjectFilter || undefined,
      gradeIds: gradeFilter.length > 0 ? gradeFilter : undefined,
      type: typeFilter || undefined,
      status: statusFilter || undefined
    });
  }, [allResources, searchTerm, subjectFilter, gradeFilter, typeFilter, statusFilter]);

  const paginatedData = useMemo(() => {
    return paginateResources(filteredResources, currentPage, itemsPerPage);
  }, [filteredResources, currentPage, itemsPerPage]);

  // Statistics
  const totalResources = allResources.length;
  const activeResources = allResources.filter(r => r.status === 'Active').length;
  const totalDownloads = allResources.reduce((sum, r) => sum + (r.downloads || 0), 0);
  const subjectCount = new Set(allResources.map(r => r.subjectId)).size;

  // Debounced search handler
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Filter handlers
  const handleSubjectFilterChange = useCallback((subjectId: string) => {
    setSubjectFilter(subjectId === 'all' ? '' : subjectId);
    setCurrentPage(1);
  }, []);

  const handleGradeFilterChange = useCallback((gradeIds: string[]) => {
    setGradeFilter(gradeIds);
    setCurrentPage(1);
  }, []);

  const handleTypeFilterChange = useCallback((type: ResourceType | '') => {
    setTypeFilter(type === 'all' ? '' : type);
    setCurrentPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((status: ResourceStatus | '') => {
    setStatusFilter(status === 'all' ? '' : status);
    setCurrentPage(1);
  }, []);

  // Resource action handlers
  const handleAddResource = () => {
    setEditResource(null);
    setIsAddModalOpen(true);
  };

  const handleEditResource = (resource: Resource) => {
    setEditResource(resource);
    setIsAddModalOpen(true);
  };

  const handlePreviewResource = (resource: Resource) => {
    if (isPreviewable(resource.type)) {
      setPreviewResource(resource);
    } else {
      openResource(resource);
    }
  };

  const handleDownloadResource = (resource: Resource) => {
    downloadResource(resource);
    toast({
      title: "Download Started",
      description: `Downloading ${resource.name}...`,
    });
  };

  const handleDeleteResourceConfirm = (resource: Resource) => {
    setDeleteResource(resource);
  };

  const handleDeleteConfirmed = (resource: Resource) => {
    const success = deleteResource(resource.id);
    if (success) {
      toast({
        title: "Resource Deleted",
        description: "The resource has been successfully deleted.",
      });
    } else {
      toast({
        title: "Delete Failed",
        description: "Failed to delete the resource. Please try again.",
        variant: "destructive",
      });
    }
    setDeleteResource(null);
  };

  const handleResourceSubmit = (resource: Resource) => {
    setIsAddModalOpen(false);
    setEditResource(null);
    toast({
      title: editResource ? "Resource Updated" : "Resource Added",
      description: editResource 
        ? "The resource has been successfully updated."
        : "The resource has been successfully uploaded and added to the library.",
    });
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditResource(null);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-blue-900">Resources</h1>
            <p className="text-blue-900/70 max-w-3xl">
              Manage study materials, guides, and educational content for all subjects and grades.
            </p>
          </div>
          
          <Button
            onClick={handleAddResource}
            className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-brand-teal/20 rounded-xl flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{totalResources}</div>
              <div className="text-sm text-blue-900/80 font-medium">Total Resources</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{activeResources}</div>
              <div className="text-sm text-blue-900/80 font-medium">Active Resources</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{totalDownloads}</div>
              <div className="text-sm text-blue-900/80 font-medium">Total Downloads</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{subjectCount}</div>
              <div className="text-sm text-blue-900/80 font-medium">Subjects Covered</div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <ResourcesToolbar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          subjectFilter={subjectFilter}
          onSubjectFilterChange={handleSubjectFilterChange}
          gradeFilter={gradeFilter}
          onGradeFilterChange={handleGradeFilterChange}
          typeFilter={typeFilter}
          onTypeFilterChange={handleTypeFilterChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />

        {/* Resources List */}
        <ResourcesList
          resources={paginatedData.items}
          totalItems={paginatedData.totalItems}
          currentPage={paginatedData.currentPage}
          totalPages={paginatedData.totalPages}
          hasNextPage={paginatedData.hasNextPage}
          hasPreviousPage={paginatedData.hasPreviousPage}
          onPageChange={setCurrentPage}
          onPreview={handlePreviewResource}
          onDownload={handleDownloadResource}
          onEdit={handleEditResource}
          onDelete={handleDeleteResourceConfirm}
        />

        {/* Modals */}
        <AddResourceModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          editResource={editResource}
          onSuccess={handleResourceSubmit}
          onCancel={handleCloseModal}
        />

        <ResourcePreviewModal
          resource={previewResource}
          open={!!previewResource}
          onOpenChange={(open) => !open && setPreviewResource(null)}
          onDownload={handleDownloadResource}
        />

        <ConfirmDeleteModal
          resource={deleteResource}
          open={!!deleteResource}
          onOpenChange={(open) => !open && setDeleteResource(null)}
          onConfirm={handleDeleteConfirmed}
        />
      </div>
    </div>
  );
}