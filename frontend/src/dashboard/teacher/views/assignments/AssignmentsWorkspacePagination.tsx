// Renders the compact pagination controls for the assignments workspace.
import { Button } from "@/components/ui/button";

type Props = { page: number; totalPages: number; onPageChange: (page: number) => void };

export function AssignmentsWorkspacePagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl p-3 flex flex-wrap items-center gap-2 teacher-panel-hover">
      <div className="ml-auto text-white/60 text-xs">Page {page} of {totalPages}</div>
      <Button type="button" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Prev</Button>
      <Button type="button" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Next</Button>
    </div>
  );
}

