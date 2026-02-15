import { ExamList, ExamsHeader, ExamsControls } from "../components/exams";
import { useState } from "react";
import { PaginationControls } from "../components/shared";
import { FileText, Calendar, TrendingUp } from "lucide-react";

export default function ExamsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <ExamsHeader />

        {/* Controls Section */}
        <ExamsControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-white/60 text-sm">Upcoming</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">89.5%</p>
                <p className="text-white/60 text-sm">Avg Score</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#523F38] to-[#4C5454] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A-</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">A-</p>
                <p className="text-white/60 text-sm">Current Grade</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam List */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            {filterValue === "all" ? "All Exams" : filterValue.charAt(0).toUpperCase() + filterValue.slice(1) + " Exams"}
          </h2>
          <ExamList 
            searchQuery={searchQuery}
            filterValue={filterValue}
            sortField={sortField}
            sortDirection={sortDirection}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(8 / itemsPerPage)} // Based on current exams count
          itemsPerPage={itemsPerPage}
          totalItems={8}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}