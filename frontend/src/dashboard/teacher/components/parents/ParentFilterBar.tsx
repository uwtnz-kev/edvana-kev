/**
 * ParentFilterBar
 * ---------------
 * Provides supporting UI for the teacher dashboard p ar en ts feature.
 */
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  selectedClass: string;
  onClassChange: (value: string) => void;
  classes: string[];
};

export default function ParentFilterBar({
  query,
  onQueryChange,
  selectedClass,
  onClassChange,
  classes,
}: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl p-3 teacher-panel-hover">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 text-white/80">
          <SlidersHorizontal className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="relative sm:w-96 w-full">
          <Search className="h-4 w-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search parent, email, phone, or student"
            className="pl-9 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white placeholder:text-white/60"
            aria-label="Search parents"
          />
        </div>

        <GlassSelect value={selectedClass} onValueChange={onClassChange}>
          <GlassSelectTrigger className="h-11 w-full text-sm text-white hover:text-white [&>span]:text-white [&>svg]:text-white sm:w-[170px]">
            <GlassSelectValue className="text-white" placeholder="All classes" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            {classes.map((className) => (
              <GlassSelectItem key={className} value={className}>
                {className === "all" ? "All classes" : className}
              </GlassSelectItem>
            ))}
          </GlassSelectContent>
        </GlassSelect>
      </div>
    </div>
  );
}




