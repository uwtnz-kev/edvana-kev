import React from 'react';
import { 
  Search, 
  Filter, 
  Columns, 
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { GlassSelect } from '@/components/ui/glass-select';
import { Level, Grade } from '@/shared/mocks/schooladmin/classes';

interface ClassesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedLevel?: Level;
  selectedGrade?: Grade;
  currentView: 'levels' | 'grades' | 'subgrades';
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  visibleColumns: {
    order: boolean;
    count: boolean;
  };
  onColumnVisibilityChange: (column: string, visible: boolean) => void;
}

export default function ClassesToolbar({
  searchTerm,
  onSearchChange,
  selectedLevel,
  selectedGrade,
  currentView,
  itemsPerPage,
  onItemsPerPageChange,
  visibleColumns,
  onColumnVisibilityChange
}: ClassesToolbarProps) {
  
  const getSearchPlaceholder = () => {
    switch (currentView) {
      case 'levels':
        return 'Search levels...';
      case 'grades':
        return selectedLevel ? `Search grades in ${selectedLevel.name}...` : 'Search grades...';
      case 'subgrades':
        return selectedGrade ? `Search sub-grades in ${selectedGrade.name}...` : 'Search sub-grades...';
      default:
        return 'Search...';
    }
  };

  const getColumnsLabel = () => {
    switch (currentView) {
      case 'levels':
        return 'Levels Columns';
      case 'grades':
        return 'Grades Columns';
      case 'subgrades':
        return 'Sub-grades Columns';
      default:
        return 'Columns';
    }
  };

  const getCountColumnLabel = () => {
    switch (currentView) {
      case 'levels':
        return '# Grades';
      case 'grades':
        return '# Sub-grades';
      case 'subgrades':
        return '# Students';
      default:
        return 'Count';
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/25 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-900/60" />
            <Input
              placeholder={getSearchPlaceholder()}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-blue-900 placeholder:text-blue-900/60 rounded-xl focus:ring-brand-teal/50 focus:border-brand-teal"
            />
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-3">
          {/* Filters Dropdown - Hidden for now, can be implemented later */}

          {/* Columns Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/30 text-blue-900 hover:bg-white/10 rounded-xl bg-white/10"
              >
                <Columns className="w-4 h-4 mr-2" />
                Columns
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
              <DropdownMenuLabel className="text-white">{getColumnsLabel()}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/20" />
              
              <DropdownMenuCheckboxItem
                checked={visibleColumns.order}
                onCheckedChange={(checked) => onColumnVisibilityChange('order', checked)}
                className="text-white hover:bg-white/30 focus:bg-white/30"
              >
                Order
              </DropdownMenuCheckboxItem>
              
              <DropdownMenuCheckboxItem
                checked={visibleColumns.count}
                onCheckedChange={(checked) => onColumnVisibilityChange('count', checked)}
                className="text-white hover:bg-white/30 focus:bg-white/30"
              >
                {getCountColumnLabel()}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Items per page */}
          <GlassSelect
            value={itemsPerPage.toString()}
            onValueChange={(value: string) => onItemsPerPageChange(Number(value))}
            placeholder="Per page"
            className="min-w-[140px]"
          >
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </GlassSelect>
        </div>
      </div>
    </div>
  );
}