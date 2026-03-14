// Renders reorder and delete controls for a question card inside the builder canvas.
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onDelete: () => void;
  onMoveDown: () => void;
  onMoveUp: () => void;
};

export function QuestionCardActions({ onDelete, onMoveDown, onMoveUp }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button type="button" onClick={onMoveUp} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">Up</Button>
      <Button type="button" onClick={onMoveDown} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">Down</Button>
      <Button type="button" onClick={onDelete} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
