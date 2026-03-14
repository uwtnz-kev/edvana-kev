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
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search..."
        className="h-12 w-full rounded-xl border-white/15 bg-white/10 pl-9 text-white placeholder:text-white/70 backdrop-blur-md"
      />
    </div>
  );
}
