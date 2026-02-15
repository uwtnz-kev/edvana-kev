import { useState } from "react";
import { TeacherSubjectsHeader, TeacherSubjectsControls, TeacherSubjectList } from "../components/subjects";
import { BookOpen } from "lucide-react";

export default function SubjectView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const totalSubjects = 6;
  const totalStudents = 148;
  const pendingToGrade = 23;

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        <TeacherSubjectsHeader />

        <TeacherSubjectsControls
          searchQuery={searchQuery}
          onSearchChange={(v) => {
            setSearchQuery(v);
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
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalSubjects}</p>
                <p className="text-white/60 text-sm">Subjects Assigned</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{totalStudents}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalStudents}</p>
                <p className="text-white/60 text-sm">Total Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{pendingToGrade}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingToGrade}</p>
                <p className="text-white/60 text-sm">Pending To Grade</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            {filterValue === "all"
              ? "All Subjects"
              : `${filterValue.charAt(0).toUpperCase()}${filterValue.slice(1).replace("teacher", "Teacher")}`}
          </h2>

          <TeacherSubjectList
            searchQuery={searchQuery}
            filterValue={filterValue}
            sortField={sortField}
            sortDirection={sortDirection}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-white/70 text-sm">
            Page {currentPage} of {Math.max(1, Math.ceil(totalSubjects / itemsPerPage))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 border border-white/10"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <button
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 border border-white/10"
              onClick={() =>
                setCurrentPage((p) => {
                  const maxPage = Math.max(1, Math.ceil(totalSubjects / itemsPerPage));
                  return Math.min(maxPage, p + 1);
                })
              }
            >
              Next
            </button>

            <select
              className="px-3 py-2 rounded-lg bg-white/10 text-white/90 border border-white/10"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={6}>6 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
