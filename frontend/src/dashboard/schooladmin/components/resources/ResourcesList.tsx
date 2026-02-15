import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { Resource } from '@/shared/mocks/schooladmin/mockData';
import ResourceCard from './ResourceCard';

interface ResourcesListProps {
  resources: Resource[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  onPreview?: (resource: Resource) => void;
  onDownload?: (resource: Resource) => void;
  onEdit?: (resource: Resource) => void;
  onDelete?: (resource: Resource) => void;
}

export default function ResourcesList({
  resources,
  totalItems,
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onPreview,
  onDownload,
  onEdit,
  onDelete
}: ResourcesListProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * resources.length + 1;
  const endItem = Math.min(currentPage * resources.length, totalItems);

  if (resources.length === 0) {
    return (
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
        <div className="w-16 h-16 bg-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FolderOpen className="w-8 h-8 text-brand-teal" />
        </div>
        <h3 className="text-xl font-semibold text-blue-900 mb-2">No Resources Found</h3>
        <p className="text-blue-900/70 mb-6 max-w-md mx-auto">
          {totalItems === 0 
            ? "No resources have been added yet. Click 'Add Resource' to upload your first educational material."
            : "No resources match your current filters. Try adjusting your search criteria."
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
          Showing {startItem}-{endItem} of {totalItems} resources
        </div>
        <div className="text-sm text-blue-900/70">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onPreview={onPreview}
            onDownload={onDownload}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPreviousPage}
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
            disabled={!hasNextPage}
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