import { Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  query: string;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function EmptyState({ query, hasActiveFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl shadow-xl p-12 text-center">
      <Users className="h-16 w-16 text-blue-400 mx-auto mb-6" />
      <h3 className="text-xl font-semibold text-blue-900 mb-3">
        {query || hasActiveFilters ? 'No teachers found' : 'No teachers available'}
      </h3>
      <p className="text-black/80 mb-6 max-w-md mx-auto">
        {query || hasActiveFilters
          ? `We couldn't find any teachers matching your search criteria. Try adjusting your search or clearing filters.`
          : 'There are no teachers in the system yet. Add your first teacher to get started.'
        }
      </p>
      {(query || hasActiveFilters) && (
        <Button
          onClick={onClearFilters}
          variant="outline"
          className="bg-white/20 backdrop-blur-sm border-white/20 rounded-xl hover:bg-white/30 text-black/80"
          aria-label="Clear search and filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}