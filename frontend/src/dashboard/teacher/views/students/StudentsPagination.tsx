// Pagination controls for the students table card.
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  totalItems: number;
  totalPages: number;
};

const ITEMS_PER_PAGE = 25;

export function StudentsPagination({
  currentPage,
  onPageChange,
  startIndex,
  totalItems,
  totalPages,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="teacher-panel-surface rounded-2xl p-3 flex flex-wrap items-center gap-2 teacher-panel-hover">
      <div className="flex items-center justify-between gap-3 flex-wrap w-full">
        <p className="text-sm text-white/80">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of{" "}
          {totalItems} students
        </p>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            variant="ghost"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          <span className="text-sm text-white/70 px-3">Page {currentPage} of {totalPages}</span>
          <Button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

