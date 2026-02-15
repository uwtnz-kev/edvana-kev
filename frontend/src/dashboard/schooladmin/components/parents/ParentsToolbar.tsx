import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';

interface ParentsToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  linkStateFilter: string;
  onLinkStateFilterChange: (linkState: string) => void;
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  totalItems: number;
  filteredItems: number;
}

const columnOptions = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'linkedStudents', label: 'Linked Students' },
  { id: 'status', label: 'Status' },
  { id: 'updated', label: 'Updated' },
];

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Archived', label: 'Archived' }
];

const linkStateOptions = [
  { value: 'all', label: 'All Parents' },
  { value: 'Linked', label: 'Linked to Students' },
  { value: 'Unlinked', label: 'Not Linked' }
];

export default function ParentsToolbar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  linkStateFilter,
  onLinkStateFilterChange,
  visibleColumns,
  onVisibleColumnsChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  filteredItems
}: ParentsToolbarProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debounce search with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(debouncedSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearch, onSearchChange]);

  const handleColumnToggle = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      onVisibleColumnsChange(visibleColumns.filter(id => id !== columnId));
    } else {
      onVisibleColumnsChange([...visibleColumns, columnId]);
    }
  };

  const clearFilters = () => {
    setDebouncedSearch('');
    onStatusFilterChange('all');
    onLinkStateFilterChange('all');
  };

  const activeFiltersCount = [
    debouncedSearch,
    statusFilter !== 'all' ? statusFilter : '',
    linkStateFilter !== 'all' ? linkStateFilter : ''
  ].filter(Boolean).length;

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 space-y-4">
      {/* Search and Quick Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-900/60" />
          <Input
            placeholder="Search parents by name, email, or phone..."
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            className="pl-10 bg-white/10 border-white/30 text-blue-900 placeholder:text-blue-900/60 rounded-xl"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Column Visibility */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-900 hover:bg-white/20 rounded-xl"
              >
                <Eye className="w-4 h-4 mr-2" />
                Columns
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-white/20 backdrop-blur-xl border border-white/20 text-white" align="end">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Show Columns</h4>
                {columnOptions.map((column) => (
                  <div key={column.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={column.id}
                      checked={visibleColumns.includes(column.id)}
                      onCheckedChange={() => handleColumnToggle(column.id)}
                      className="border-white/30 data-[state=checked]:bg-brand-accent data-[state=checked]:border-brand-accent"
                    />
                    <label
                      htmlFor={column.id}
                      className="text-sm text-white cursor-pointer"
                    >
                      {column.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-blue-900 hover:bg-white/20 rounded-xl"
            >
              Clear Filters
              <Badge className="ml-2 bg-red-500/20 text-red-600 border-red-500/30">
                {activeFiltersCount}
              </Badge>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-2">Status</label>
          <GlassSelect value={statusFilter} onValueChange={onStatusFilterChange}>
            <GlassSelectTrigger>
              <GlassSelectValue placeholder="All statuses" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              {statusOptions.map((option) => (
                <GlassSelectItem key={option.value} value={option.value}>
                  {option.label}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </div>

        {/* Link State Filter */}
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-2">Link State</label>
          <GlassSelect value={linkStateFilter} onValueChange={onLinkStateFilterChange}>
            <GlassSelectTrigger>
              <GlassSelectValue placeholder="All parents" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              {linkStateOptions.map((option) => (
                <GlassSelectItem key={option.value} value={option.value}>
                  {option.label}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </div>

        {/* Items Per Page */}
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-2">Items per page</label>
          <GlassSelect value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
            <GlassSelectTrigger>
              <GlassSelectValue />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="20">20</GlassSelectItem>
              <GlassSelectItem value="50">50</GlassSelectItem>
              <GlassSelectItem value="100">100</GlassSelectItem>
            </GlassSelectContent>
          </GlassSelect>
        </div>

        {/* Results Summary */}
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-2">Results</label>
          <div className="bg-white/10 border border-white/30 rounded-xl px-3 py-2 text-blue-900 text-sm">
            {filteredItems} of {totalItems} parents
          </div>
        </div>
      </div>
    </div>
  );
}