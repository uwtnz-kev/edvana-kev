import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  className = ""
}: PaginationControlsProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("ellipsis");
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }
      
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      {/* Items per page selector */}
      <div className="flex items-center space-x-3">
        <span className="text-white/60 text-sm">Show:</span>
        <div className="flex bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-1">
          {[20, 50, 100].map((size) => (
            <button
              key={size}
              onClick={() => onItemsPerPageChange(size)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                itemsPerPage === size
                  ? "bg-[#1EA896] text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <span className="text-white/60 text-sm">per page</span>
      </div>

      {/* Page info */}
      <div className="text-white/60 text-sm text-center">
        Showing {startItem}-{endItem} of {totalItems} items
      </div>

      {/* Page navigation */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center space-x-1 px-3 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:text-white/80 transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Previous</span>
        </button>

        <div className="flex items-center space-x-1">
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === "ellipsis" ? (
                <div className="flex items-center justify-center w-10 h-10">
                  <MoreHorizontal className="h-4 w-4 text-white/40" />
                </div>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === page
                      ? "bg-[#1EA896] text-white shadow-lg"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1 px-3 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:text-white/80 transition-all duration-200"
        >
          <span className="text-sm">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}