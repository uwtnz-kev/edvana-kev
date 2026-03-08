// Renders the linked-students and activity sections for the modal body.
import { Calendar } from "lucide-react";
import type { ParentRecord } from "@/utils/data/parents/parentsStore";
import { getStudentMeta } from "./parentDetailsHelpers";

type Props = {
  parent: ParentRecord;
};

function ActivityCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
      <div className="text-white/60 text-sm">{label}</div>
      <div className="mt-2 flex items-center gap-3 min-w-0">
        <div className="text-white/70"><Calendar className="h-5 w-5" /></div>
        <div className="text-white font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}

export function ParentDetailsSections({ parent }: Props) {
  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
        <div className="text-white/80 font-semibold">Linked Students</div>
        <div className="text-white/60 text-sm mt-1">{parent.students.length} linked student{parent.students.length === 1 ? "" : "s"}</div>
        <div className="mt-4 space-y-3">
          {parent.students.length === 0 ? <div className="text-white/60">No linked students</div> : parent.students.map((student) => (
            <div key={student.id} className="rounded-2xl border border-white/10 bg-white/10 p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">{student.fullName}</div>
                <div className="text-sm text-white/60 truncate">{getStudentMeta(student)}</div>
              </div>
              {student.grade ? <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-semibold text-white/80">{student.grade}</span> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
        <div className="text-white/80 font-semibold">Activity</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard label="Created" value={parent.createdAtLabel ?? "Unknown"} />
          <ActivityCard label="Last Updated" value={parent.updatedAtLabel ?? "Unknown"} />
        </div>
      </div>
    </>
  );
}
