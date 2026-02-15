import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EdvanaBankPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function EdvanaBankPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}: EdvanaBankPaginationProps) {
  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Results Info */}
        <div className="text-sm text-blue-900/70">
          Showing <span className="font-medium text-blue-900">{startItem}</span> to{' '}
          <span className="font-medium text-blue-900">{endItem}</span> of{' '}
          <span className="font-medium text-blue-900">{totalItems}</span> results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* First Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-1 text-blue-900/50">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(page as number)}
                    className={
                      currentPage === page
                        ? 'bg-brand-accent text-white hover:bg-brand-accent/80'
                        : 'bg-white/10 border-white/20 text-blue-900 hover:bg-white/20'
                    }
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}