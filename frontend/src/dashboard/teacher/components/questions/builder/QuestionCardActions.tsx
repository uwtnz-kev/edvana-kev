// Renders reorder and delete controls for a question card inside the builder canvas.
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onDelete: () => void;
  onMoveDown: () => void;
  onMoveUp: () => void;
};

export function QuestionCardActions({ onDelete, onMoveDown, onMoveUp }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button type="button" onClick={onMoveUp} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
          <ArrowUp className="h-4 w-4" />
        </span>
        Up
      </Button>
      <Button type="button" onClick={onMoveDown} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
          <ArrowDown className="h-4 w-4" />
        </span>
        Down
      </Button>
      <Button type="button" onClick={onDelete} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-red-400/30 bg-red-500/15 text-red-300">
          <Trash2 className="h-4 w-4" />
        </span>
        Delete
      </Button>
    </div>
  );
}
