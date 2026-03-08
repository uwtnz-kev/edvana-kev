// Row renderer for a single parent in the parents workspace table.
import { Eye } from "lucide-react";
import type { TeacherParentRow } from "@/utils/data/teacher/getTeacherParents";

type Props = {
  onView: (parentId: string) => void;
  row: TeacherParentRow;
};

export function ParentRow({ onView, row }: Props) {
  return (
    <tr className="border-t border-white/25">
      <td className="px-6 py-4"><div className="font-semibold text-[#3B240F] truncate">{row.fullName}</div></td>
      <td className="px-6 py-4"><div className="text-[#6B4F3A] truncate">{row.email}</div></td>
      <td className="px-6 py-4"><div className="text-[#6B4F3A] truncate">{row.phone}</div></td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {row.students.map((student) => (
            <span
              key={student.id}
              className="inline-flex items-center rounded-full border border-white/35 bg-white/30 px-3 py-1 text-sm text-[#3B240F]"
            >
              {student.fullName}{student.className ? ` | ${student.className}` : ""}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => onView(row.id)}
            className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-white/25 hover:bg-white/35 border border-white/35 text-[#3B240F] shadow-[0_10px_20px_rgba(59,36,15,0.12)] transition"
            aria-label={`View ${row.fullName}`}
          >
            <Eye size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
