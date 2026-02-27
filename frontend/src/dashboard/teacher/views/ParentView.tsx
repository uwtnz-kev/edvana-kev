import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import ParentsTable from "@/dashboard/teacher/components/parents/ParentsTable";
import TeacherParentDetailsModal from "@/dashboard/teacher/components/parents/TeacherParentDetailsModal";
import {
  getTeacherParents,
  TeacherParentRow,
  getTeacherParentDetails,
} from "@/utils/data/teacher/getTeacherParents";
import { ParentRecord } from "@/utils/data/parents/parentsStore";

export default function TeacherParentsView() {
  const [rows, setRows] = useState<TeacherParentRow[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ParentRecord | null>(null);

  useEffect(() => {
    getTeacherParents().then(setRows);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) => {
      const studentHit = r.students.some((s) =>
        s.fullName.toLowerCase().includes(q)
      );
      return (
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        studentHit
      );
    });
  }, [query, rows]);

  const onView = async (parentId: string) => {
    const details = await getTeacherParentDetails(parentId);
    setSelected(details);
    setOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      <div
        className="
          bg-white/25 backdrop-blur-xl border border-white/35
          rounded-2xl p-6
          shadow-[0_20px_40px_rgba(59,36,15,0.2)]
          transition-all duration-300
          hover:bg-white/30
          hover:border-white/45
          hover:shadow-[0_25px_50px_rgba(59,36,15,0.25)]
          hover:-translate-y-1
        "
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2CB7A7] shadow-md">
            <Users className="h-6 w-6 text-[#1F2326]" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#3B240F]">Parents</h1>
            <p className="text-[#6B4F3A] mt-1">
              View parent contacts and linked students
            </p>
          </div>
        </div>

        <div className="mt-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search parent, email, phone, or student"
            className="w-full md:w-[500px] rounded-xl border border-white/35 bg-white/25 px-4 py-3 text-[#3B240F] placeholder:text-[rgba(122,90,58,0.65)] focus:outline-none focus:ring-2 focus:ring-[rgba(122,90,58,0.25)] transition-all duration-200 hover:bg-white/35 hover:border-white/45"
          />
        </div>
      </div>

      <ParentsTable rows={filtered} onView={onView} />

      <TeacherParentDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        parent={selected}
      />
    </div>
  );
}