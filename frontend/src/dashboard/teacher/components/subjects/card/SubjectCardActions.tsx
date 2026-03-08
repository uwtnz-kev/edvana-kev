// Renders the teacher subject card next-lesson summary and open action.
import { ArrowRight } from "lucide-react";

type Props = {
  nextLesson: string;
  onOpen: () => void;
  subjectColor: string;
};

export function SubjectCardActions({ nextLesson, onOpen, subjectColor }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-white/70 text-sm">
        Next lesson: <span className="text-white/90">{nextLesson}</span>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className={`
          inline-flex items-center gap-2
          px-3 py-2 rounded-lg
          ${subjectColor}
          border border-current
          text-sm font-medium
          transition-all duration-200
          hover:bg-white/10 hover:-translate-y-0.5
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
        `}
      >
        <span>Open</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
