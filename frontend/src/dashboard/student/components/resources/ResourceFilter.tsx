import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ResourceFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSubject: string;
  onSubjectChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  resultsCount: number;
  totalCount: number;
  subjects: string[];
  resourceTypes: string[];
}

export function ResourceFilter({
  searchTerm,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  resultsCount,
  totalCount,
  subjects,
  resourceTypes
}: ResourceFilterProps) {
  const handleReset = () => {
    onSearchChange("");
    onSubjectChange("All Subjects");
    onTypeChange("All Types");
    onSortChange("popularity");
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Filter className="h-5 w-5 text-[#1EA896]" />
        <h3 className="text-lg font-semibold text-white">Filter Resources</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF715B] focus:ring-[#FF715B]/20"
          />
        </div>

        {/* Subject Filter */}
        <Select value={selectedSubject} onValueChange={onSubjectChange}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#1EA896] focus:ring-[#1EA896]/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#4C5454] border-white/20">
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject} className="text-white hover:bg-white/10 focus:bg-white/10">
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#1EA896] focus:ring-[#1EA896]/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#4C5454] border-white/20">
            {resourceTypes.map(type => (
              <SelectItem key={type} value={type} className="text-white hover:bg-white/10 focus:bg-white/10">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#1EA896] focus:ring-[#1EA896]/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#4C5454] border-white/20">
            <SelectItem value="popularity" className="text-white hover:bg-white/10 focus:bg-white/10">Most Downloaded</SelectItem>
            <SelectItem value="rating" className="text-white hover:bg-white/10 focus:bg-white/10">Highest Rated</SelectItem>
            <SelectItem value="newest" className="text-white hover:bg-white/10 focus:bg-white/10">Newest</SelectItem>
            <SelectItem value="title" className="text-white hover:bg-white/10 focus:bg-white/10">Title A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button */}
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleReset}
          variant="outline"
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
        >
          Reset All Filters
        </Button>
      </div>

      {/* Results Summary */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-white/70 text-sm">
          Showing {resultsCount} of {totalCount} resources
          {searchTerm && ` for "${searchTerm}"`}
          {selectedSubject !== "All Subjects" && ` in ${selectedSubject}`}
          {selectedType !== "All Types" && ` (${selectedType})`}
        </p>
      </div>
    </div>
  );
}