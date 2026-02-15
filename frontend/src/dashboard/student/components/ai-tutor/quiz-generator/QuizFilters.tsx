import React, { useState } from "react";
import { Filter, Search, SortAsc, SortDesc } from "lucide-react";
import { cn } from "@/utils/cn";

interface QuizFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
  itemsPerPage: number;
  onItemsPerPageChange: (count: number) => void;
}

const subjects = ["All Subjects", "Mathematics", "Science", "History", "English", "Geography", "Kinyarwanda"];
const difficulties = ["All Levels", "Easy", "Medium", "Hard"];
const types = ["All Types", "MCQ", "Open", "Mixed"];
const sortOptions = ["Date Created", "Title", "Score", "Difficulty"];
const itemsPerPageOptions = [5, 10, 15, 20];

export function QuizFilters({
  searchTerm,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  itemsPerPage,
  onItemsPerPageChange
}: QuizFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#1EA896]" />
          Filters & Search
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
        >
          {showFilters ? "Hide" : "Show"} Filters
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 outline-none focus:border-[#1EA896] focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200"
        />
      </div>

      {/* Filter Controls */}
      <div className={cn(
        "grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4",
        showFilters ? "block" : "hidden lg:grid"
      )}>
        {/* Subject Filter */}
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1EA896] focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject} className="bg-[#4C5454] text-white">
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">Difficulty</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1EA896] focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty} className="bg-[#4C5454] text-white">
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">Type</label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1EA896] focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200"
          >
            {types.map((type) => (
              <option key={type} value={type} className="bg-[#4C5454] text-white">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">Sort By</label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1EA896] focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option} className="bg-[#4C5454] text-white">
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-200"
              title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Items Per Page */}
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">Items Per Page</label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1EA896] focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200"
          >
            {itemsPerPageOptions.map((count) => (
              <option key={count} value={count} className="bg-[#4C5454] text-white">
                {count}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}