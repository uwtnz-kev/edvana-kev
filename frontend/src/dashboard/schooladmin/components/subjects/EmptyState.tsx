import { BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  query: string;
  onClearFilters: () => void;
}

export default function EmptyState({ query, onClearFilters }: EmptyStateProps) {
  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl shadow-xl p-12 text-center">
      <BookOpen className="h-16 w-16 text-blue-400 mx-auto mb-6" />
      <h3 className="text-xl font-semibold text-blue-900 mb-3">
        {query ? 'No subjects found' : 'No subjects available'}
      </h3>
      <p className="text-black/80 mb-6 max-w-md mx-auto">
        {query 
          ? `We couldn't find any subjects matching "${query}". Try adjusting your search or clearing filters.`
          : 'There are no subjects in the system yet. Add your first subject to get started.'
        }
      </p>
      {query && (
        <Button
          onClick={onClearFilters}
          variant="outline"
          className="bg-white/20 backdrop-blur-sm border-white/20 rounded-xl hover:bg-white/30 text-black/80"
          aria-label="Clear search filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}