// Renders the recipient results dropdown and selection state.
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Option } from "../recipientsData";
import { isRecipientSelected } from "./recipientSearchHelpers";

type Props = {
  filtered: Option[];
  onSelect: (option: Option) => void;
  open: boolean;
  selected: Option[];
};

export function RecipientSearchResults({ filtered, onSelect, open, selected }: Props) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 w-full overflow-hidden",
        "rounded-xl border border-white/20 bg-[#2A2A2F]/90 backdrop-blur-xl",
        "shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
      )}
    >
      <div className="max-h-64 overflow-y-auto">
        {filtered.length ? (
          filtered.map((option) => {
            const selectedOption = isRecipientSelected(selected, option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(option)}
                className="w-full px-3 py-2 text-left flex items-center justify-between text-white/90 hover:bg-white/10"
              >
                <span className="text-sm">{option.label}</span>
                {selectedOption ? <Check className="h-4 w-4 text-white/70" /> : null}
              </button>
            );
          })
        ) : (
          <div className="px-3 py-3 text-sm text-white/60">No matches</div>
        )}
      </div>
    </div>
  );
}
