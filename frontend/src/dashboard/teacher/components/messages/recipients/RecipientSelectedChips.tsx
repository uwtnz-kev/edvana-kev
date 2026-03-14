// Renders the selected recipient chips and remove actions.
import { X } from "lucide-react";
import type { Option } from "../recipientsData";

type Props = {
  onRemove: (value: string) => void;
  selected: Option[];
};

export function RecipientSelectedChips({ onRemove, selected }: Props) {
  if (selected.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {selected.map((option) => (
        <div
          key={option.value}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1"
        >
          <span className="text-sm text-white">{option.label}</span>
          <button
            type="button"
            onClick={() => onRemove(option.value)}
            className="rounded-md hover:bg-white/10 p-1"
            aria-label={`Remove ${option.label}`}
          >
            <X className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
          </button>
        </div>
      ))}
    </div>
  );
}
