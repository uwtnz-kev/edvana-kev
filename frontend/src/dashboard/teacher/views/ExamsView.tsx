import { useState } from "react";
import { TeacherExamsHeader } from "../components/exams/TeacherExamsHeader";
import { TeacherExamsControls } from "../components/exams/TeacherExamsControls";
import { TeacherExamList } from "../components/exams/TeacherExamList";
import { FileText, ClipboardCheck, Clock } from "lucide-react";

export default function ExamsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        <TeacherExamsHeader />

        <TeacherExamsControls
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          filterValue={filterValue}
          onFilterChange={(v) => {
            setFilterValue(v);
            setCurrentPage(1);
          }}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">6</p>
                <p className="text-white/60 text-sm">Total Exams</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">19</p>
                <p className="text-white/60 text-sm">Submissions</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">7</p>
                <p className="text-white/60 text-sm">Pending Grades</p>
              </div>
            </div>
          </div>
        </div>

        <TeacherExamList
          searchQuery={searchQuery}
          filterValue={filterValue}
          sortField={sortField}
          sortDirection={sortDirection}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-6 flex items-center justify-between">
          <p className="text-sm text-white">
            Page {currentPage} • Showing {itemsPerPage} per page
          </p>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <button
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>

            <select
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={6}>6 per page</option>
              <option value={12}>12 per page</option>
              <option value={18}>18 per page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
