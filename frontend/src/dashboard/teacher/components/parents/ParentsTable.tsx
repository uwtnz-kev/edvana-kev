import { Eye } from "lucide-react";
import type { TeacherParentRow } from "@/utils/data/teacher/getTeacherParents";

type Props = {
  rows: TeacherParentRow[];
  onView: (parentId: string) => void;
};

export default function ParentsTable({ rows, onView }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/35 bg-white/25 backdrop-blur-xl shadow-[0_18px_40px_rgba(59,36,15,0.18)]">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left">
          <thead className="bg-white/20">
            <tr className="text-sm text-[#6B4F3A]">
              <th className="px-6 py-4 font-semibold w-[220px]">Parent</th>
              <th className="px-6 py-4 font-semibold w-[260px]">Email</th>
              <th className="px-6 py-4 font-semibold w-[170px]">Phone</th>
              <th className="px-6 py-4 font-semibold">Students</th>
              <th className="px-6 py-4 font-semibold w-[110px] text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="border-t border-white/25">
                <td className="px-6 py-4">
                  <div className="font-semibold text-[#3B240F] truncate">{row.fullName}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-[#6B4F3A] truncate">{row.email}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-[#6B4F3A] truncate">{row.phone}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {row.students.map(s => (
                      <span
                        key={s.id}
                        className="inline-flex items-center rounded-full border border-white/35 bg-white/30 px-3 py-1 text-sm text-[#3B240F]"
                      >
                        {s.fullName}{s.className ? ` | ${s.className}` : ""}
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
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-[#6B4F3A] text-center">
                  No parents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}