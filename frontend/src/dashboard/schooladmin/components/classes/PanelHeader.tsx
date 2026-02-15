import React from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type SortDirection = 'asc' | 'desc' | null;

interface PanelHeaderProps {
  title: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortDirection: SortDirection;
  onSortToggle: () => void;
  itemCount: number;
  placeholder?: string;
}

export default function PanelHeader({
  title,
  searchTerm,
  onSearchChange,
  sortDirection,
  onSortToggle,
  itemCount,
  placeholder = "Search..."
}: PanelHeaderProps) {
  const getSortIcon = () => {
    switch (sortDirection) {
      case 'asc':
        return <ArrowUp className="w-4 h-4" />;
      case 'desc':
        return <ArrowDown className="w-4 h-4" />;
      default:
        return <ArrowUpDown className="w-4 h-4" />;
    }
  };

  const getSortLabel = () => {
    switch (sortDirection) {
      case 'asc':
        return 'A → Z';
      case 'desc':
        return 'Z → A';
      default:
        return 'Sort';
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        <h3 className="text-white font-medium">{title}</h3>
        <span className="text-white/60 text-sm">({itemCount})</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 w-40 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 rounded-lg text-sm h-8"
          />
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onSortToggle}
          className="text-white/60 hover:text-white hover:bg-white/10 border border-white/20 rounded-lg h-8 px-3"
          title={getSortLabel()}
        >
          {getSortIcon()}
        </Button>
      </div>
    </div>
  );
}