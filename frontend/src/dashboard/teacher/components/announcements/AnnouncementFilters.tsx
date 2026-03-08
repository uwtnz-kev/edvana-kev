/**
 * AnnouncementFilters
 * -------------------
 * Renders controls for the teacher dashboard a nn ou nc em en ts feature.
 */
import { Megaphone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  classes: string[];
  classValue: string;
  search: string;
  onClassChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  disabled?: boolean;
};

export function AnnouncementFilters({
  classes,
  classValue,
  search,
  onClassChange,
  onSearchChange,
  onCreate,
  disabled = false,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition-colors duration-200 hover:bg-white/20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <Select value={classValue} onValueChange={onClassChange} disabled={disabled}>
          <SelectTrigger className="sm:w-44 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white rounded-2xl">
            <SelectItem value="all" className="focus:bg-white/10">
              All classes
            </SelectItem>
            {classes.map((item) => (
              <SelectItem key={item} value={item} className="focus:bg-white/10">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search announcements"
            disabled={disabled}
            className="rounded-2xl border-white/10 bg-white/10 pl-9 text-white placeholder:text-white/60"
          />
        </div>

        <Button
          type="button"
          onClick={onCreate}
          disabled={disabled}
          className="ml-auto rounded-2xl border border-white/20 bg-white/15 text-white hover:bg-white/25"
        >
          <Megaphone className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>
    </div>
  );
}



