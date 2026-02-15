import { SubjectList, SubjectsHeader, SubjectsControls } from "../components/subjects";
import { useState } from "react";
import { PaginationControls } from "../components/shared";
import { BookOpen, TrendingUp } from "lucide-react";

export default function SubjectsView() {
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
        <SubjectsHeader />

        {/* Controls Section */}
        <SubjectsControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">6</p>
                <p className="text-white/60 text-sm">Total Subjects</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">69%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">69%</p>
                <p className="text-white/60 text-sm">Avg Progress</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">89</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">89</p>
                <p className="text-white/60 text-sm">Lessons Done</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subject List */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            {filterValue === "all" ? "All Subjects" : filterValue.charAt(0).toUpperCase() + filterValue.slice(1).replace('-', ' ') + " Subjects"}
          </h2>
          <SubjectList 
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
          totalPages={Math.ceil(6 / itemsPerPage)} // Based on current subjects count
          itemsPerPage={itemsPerPage}
          totalItems={6}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}