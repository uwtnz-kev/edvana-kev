// src/dashboard/teacher/components/messages/RecipientSearchSelect.tsx
import * as React from "react";
import { Check, Search, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Option, RECIPIENTS_BY_ROLE } from "./recipientsData";

type Props = {
  role: string;
  placeholder: string;
  selected: Option[];
  onSelectedChange: (next: Option[]) => void;
};

export default function RecipientSearchSelect(props: Props) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setQuery("");
    setOpen(false);
    props.onSelectedChange([]);
  }, [props.role]);

  React.useEffect(() => {
    if (!open) return;

    const onDocDown = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [open]);

  const options = RECIPIENTS_BY_ROLE[props.role] ?? [];

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options.slice(0, 8);
    return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query, options]);

  const add = (opt: Option) => {
    if (props.selected.some((s) => s.value === opt.value)) return;
    props.onSelectedChange([...props.selected, opt]);
    setQuery(opt.label);
    setOpen(false);
  };

  const remove = (value: string) => {
    props.onSelectedChange(props.selected.filter((s) => s.value !== value));
  };

  return (
    <div className="space-y-2" ref={wrapRef}>
      <div className="text-sm text-white/70">To</div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={props.placeholder}
            className="h-12 pl-9 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50"
          />

          {open && (
            <div
              className={cn(
                "absolute z-50 mt-2 w-full overflow-hidden",
                "rounded-xl border border-white/20 bg-[#2A2A2F]/90 backdrop-blur-xl",
                "shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              )}
            >
              <div className="max-h-64 overflow-y-auto">
                {filtered.length ? (
                  filtered.map((opt) => {
                    const selected = props.selected.some((s) => s.value === opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => add(opt)}
                        className="w-full px-3 py-2 text-left flex items-center justify-between text-white/90 hover:bg-white/10"
                      >
                        <span className="text-sm">{opt.label}</span>
                        {selected && <Check className="h-4 w-4 text-white/70" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-3 text-sm text-white/60">No matches</div>
                )}
              </div>
            </div>
          )}
        </div>

        <Button
          type="button"
          variant="ghost"
          className="h-12 w-12 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20"
          title="Toggle recipients list"
          onClick={() => setOpen((v) => !v)}
        >
          <Users className="h-5 w-5 text-white" />
        </Button>
      </div>

      {props.selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {props.selected.map((s) => (
            <div
              key={s.value}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1"
            >
              <span className="text-sm text-white/90">{s.label}</span>
              <button
                type="button"
                onClick={() => remove(s.value)}
                className="rounded-md hover:bg-white/10 p-1"
                aria-label={`Remove ${s.label}`}
              >
                <X className="h-3.5 w-3.5 text-white/70" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}