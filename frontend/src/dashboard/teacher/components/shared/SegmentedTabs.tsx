/**
 * SegmentedTabs
 * -------------
 * Provides supporting UI for the teacher dashboard s ha re d feature.
 */
import { cn } from "@/utils/cn";

type SegmentedOption = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  options: SegmentedOption[];
  onChange: (value: string) => void;
};

export default function SegmentedTabs({ value, options, onChange }: Props) {
  return (
    <div className="flex w-full gap-2 rounded-full border border-white/30 bg-white/20 p-1 backdrop-blur-xl">
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex-1 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
              active
                ? "bg-teal-400/80 text-white shadow-md shadow-teal-400/30"
                : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="block w-full text-center">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

