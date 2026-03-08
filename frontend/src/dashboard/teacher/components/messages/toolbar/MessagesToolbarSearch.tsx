// Renders the toolbar search input with its leading icon.
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function MessagesToolbarSearch({ query, onQueryChange }: Props) {
  return (
    <div className="relative flex-1 min-w-0">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B4F3A]" />
      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search..."
        className="pl-9 h-12 rounded-xl border-white/15 bg-white/10 backdrop-blur-md w-full"
      />
    </div>
  );
}
