// Renders the recipient search input and toggle trigger.
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onChange: (value: string) => void;
  onFocus: () => void;
  onToggle: () => void;
  placeholder: string;
  query: string;
};

export function RecipientSearchInput({ onChange, onFocus, onToggle, placeholder, query }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
        <Input
          value={query}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className="h-12 rounded-xl border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/70"
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="h-12 w-12 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20"
        title="Toggle recipients list"
        onClick={onToggle}
      >
        <Users className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}
