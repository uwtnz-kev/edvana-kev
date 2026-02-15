import type { StudentsFilters, StudentStatus } from "./types";

interface Props {
  filters: StudentsFilters;
  onFiltersChange: (next: StudentsFilters) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (n: number) => void;
  totalStudents: number;
}

export default function StudentsToolbar({
  filters,
  onFiltersChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalStudents,
}: Props) {
  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-6 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <input
          className="lg:w-80 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#1EA896]/40"
          placeholder="Search name, email, phone"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />

        <input
          className="lg:w-56 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF715B]/40"
          placeholder="Filter by class"
          value={filters.class}
          onChange={(e) => onFiltersChange({ ...filters, class: e.target.value })}
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:ml-auto">
          <select
            className="sm:w-56 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none"
            value={filters.status}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as "all" | StudentStatus })}
          >
            <option value="all">All status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Transferred">Transferred</option>
            <option value="Suspended">Suspended</option>
            <option value="Graduated">Graduated</option>
          </select>

          <select
            className="sm:w-44 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      <div className="text-white/70 text-sm">
        Total: {totalStudents}
      </div>
    </div>
  );
}
