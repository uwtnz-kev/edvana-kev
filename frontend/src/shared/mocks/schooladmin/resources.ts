import { MockResourceStore, Resource, ResourceType, ResourceStatus } from './mockData';

// Resource management utilities
export const addResource = (resourceData: Omit<Resource, 'id' | 'uploadedAt' | 'downloads'>): Resource => {
  return MockResourceStore.addResource(resourceData);
};

export const updateResource = (id: string, resourceData: Partial<Resource>): Resource | null => {
  return MockResourceStore.updateResource(id, resourceData);
};

export const deleteResource = (id: string): boolean => {
  return MockResourceStore.deleteResource(id);
};

// Filter configuration interface
export interface ResourceFilters {
  search?: string;
  subjectId?: string;
  gradeIds?: string[];
  type?: ResourceType;
  status?: ResourceStatus;
}

// Filter resources based on criteria
export const filterResources = (resources: Resource[], filters: ResourceFilters): Resource[] => {
  return resources.filter(resource => {
    // Search filter (name and description)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        resource.name.toLowerCase().includes(searchTerm) ||
        (resource.description && resource.description.toLowerCase().includes(searchTerm));
      if (!matchesSearch) return false;
    }

    // Subject filter
    if (filters.subjectId && resource.subjectId !== filters.subjectId) {
      return false;
    }

    // Grade filter (any grade match)
    if (filters.gradeIds && filters.gradeIds.length > 0) {
      const hasMatchingGrade = filters.gradeIds.some(gradeId => 
        resource.gradeIds.includes(gradeId)
      );
      if (!hasMatchingGrade) return false;
    }

    // Type filter
    if (filters.type && resource.type !== filters.type) {
      return false;
    }

    // Status filter
    if (filters.status && resource.status !== filters.status) {
      return false;
    }

    return true;
  });
};

// Pagination interface
export interface PaginationResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Paginate resources
export const paginateResources = (
  resources: Resource[], 
  page: number = 1, 
  perPage: number = 12
): PaginationResult<Resource> => {
  const totalItems = resources.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const items = resources.slice(startIndex, endIndex);

  return {
    items,
    totalItems,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
};

// Check if resource is previewable
export const isPreviewable = (type: ResourceType): boolean => {
  return ['PDF', 'Image', 'Video', 'Audio'].includes(type);
};

// Get file extension for download
export const getFileExtension = (type: ResourceType): string => {
  const extensions: Record<ResourceType, string> = {
    'PDF': 'pdf',
    'Video': 'mp4',
    'Audio': 'mp3',
    'Image': 'png',
    'Document': 'docx',
    'Link': 'url',
    'Other': 'file'
  };
  return extensions[type] || 'file';
};

// Create mock blob for download
export const createMockBlob = (resource: Resource): Blob => {
  const content = `Mock file content for: ${resource.name}\nType: ${resource.type}\nSize: ${resource.size || 'Unknown'}`;
  return new Blob([content], { type: 'text/plain' });
};

// Trigger download for resource
export const downloadResource = (resource: Resource): void => {
  const blob = createMockBlob(resource);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = `${resource.name}.${getFileExtension(resource.type)}`;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Open resource (external link or preview)
export const openResource = (resource: Resource): void => {
  if (resource.url) {
    // Open external link in new tab
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  } else if (isPreviewable(resource.type)) {
    // Will be handled by preview modal
    console.log(`Opening preview for ${resource.name}`);
  } else {
    // Fallback for non-previewable files
    console.log(`Opening ${resource.name} - file not previewable`);
  }
};