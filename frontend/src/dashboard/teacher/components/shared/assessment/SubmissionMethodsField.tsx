import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import {
  SUBMISSION_METHOD_OPTIONS,
  type SubmissionMethod,
} from "./submissionMethods";

type Props = {
  id: string;
  error?: string | null;
  selected: SubmissionMethod[];
  onToggle: (method: SubmissionMethod) => void;
};

export function SubmissionMethodsField({ id, error, selected, onToggle }: Props) {
  const triggerLabel = getTriggerLabel(selected);

  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block text-sm text-white">Submission Method</label>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            id={id}
            type="button"
            className={cn(
              "flex h-12 w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left transition",
              "border-white/20 bg-white/20 text-white hover:bg-white/25",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0",
              error && "border-red-500/70"
            )}
          >
            <span className={cn("min-w-0 truncate text-sm", selected.length === 0 && "text-white/60")}>
              {triggerLabel}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-white/70" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className="w-[min(22rem,var(--radix-dropdown-menu-trigger-width))] rounded-2xl border border-white/20 bg-[#1b2430]/95 p-1 text-white shadow-2xl backdrop-blur-xl"
        >
          <DropdownMenuLabel className="px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
            Submission Method
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mx-2 bg-white/10" />
          {SUBMISSION_METHOD_OPTIONS.map((option) => {
            const checked = selected.includes(option.value);

            return (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={checked}
                onCheckedChange={() => onToggle(option.value)}
                className="rounded-xl px-3 py-3 pl-9 text-white focus:bg-white/10 focus:text-white data-[disabled]:opacity-50"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white">{option.label}</div>
                  <div className="whitespace-normal text-xs leading-5 text-white/60">{option.description}</div>
                </div>
              </DropdownMenuCheckboxItem>
            );
          })}
          <DropdownMenuSeparator className="mx-2 bg-white/10" />
          <div className="px-3 py-2 text-xs leading-5 text-white/55">
            Quiz Form is exclusive. File Upload, Text Entry, and Link Submission can be combined together.
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {error ? <p className="mt-1 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

function getTriggerLabel(selected: SubmissionMethod[]) {
  if (selected.length === 0) return "Select submission method";
  if (selected.length === 1) return getOptionLabel(selected[0]);
  if (selected.length === 2) return selected.map(getOptionLabel).join(", ");
  return `${selected.length} methods selected`;
}

function getOptionLabel(value: SubmissionMethod) {
  return SUBMISSION_METHOD_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
