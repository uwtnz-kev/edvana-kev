// Renders the view action button for a student table row.
import { Eye } from "lucide-react";
import type { Student } from "../types";

type Props = {
  onView: (student: Student) => void;
  student: Student;
};

export function StudentTableActions({ onView, student }: Props) {
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => onView(student)}
        className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/25 hover:bg-white/35 border border-white/35 text-[#3B240F] shadow-[0_10px_20px_rgba(59,36,15,0.12)] transition-all duration-200 hover:-translate-y-0.5"
        aria-label={`View ${student.firstName} ${student.lastName}`}
        title="View details"
      >
        <Eye size={18} />
      </button>
    </div>
  );
}
