import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
}

export default function GradesFilters({ search, onSearchChange }: Props) {
  return (
    <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#8B6F52]/20">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B4F3A] group-hover:scale-110 transition-transform duration-300" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search student"
          className="pl-9 bg-white/10 border-white/20 text-[#3B240F] placeholder:text-[#6B4F3A]"
        />
      </div>
    </div>
  );
}
