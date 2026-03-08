// Renders the contact and address overview cards for the student details modal.
import { Mail, MapPin, Percent, Phone } from "lucide-react";
import type { TeacherStudentDetails } from "./TeacherStudentDetailsModal";
import { formatStudentDetailsPercent } from "./studentDetailsHelpers";

type Props = {
  student: TeacherStudentDetails;
};

export function StudentDetailsOverview({ student }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="rounded-xl border border-white/20 bg-white/10 p-3 sm:col-span-1"><div className="text-white/70 text-xs">Email</div><div className="mt-1 inline-flex items-center gap-2 text-white"><Mail className="h-4 w-4 text-white/70" /><span className="break-all">{student.email}</span></div></div>
      <div className="rounded-xl border border-white/20 bg-white/10 p-3 sm:col-span-1"><div className="text-white/70 text-xs">Phone</div><div className="mt-1 inline-flex items-center gap-2 text-white"><Phone className="h-4 w-4 text-white/70" /><span className="break-all">{student.phone || "Not provided"}</span></div></div>
      <div className="rounded-xl border border-white/20 bg-white/10 p-3 sm:col-span-1"><div className="text-white/70 text-xs">Attendance</div><div className="mt-1 inline-flex items-center gap-2 text-white"><Percent className="h-4 w-4 text-white/70" /><span className="font-semibold">{formatStudentDetailsPercent(student.attendanceRate)}</span></div></div>
      <div className="rounded-xl border border-white/20 bg-white/10 p-3 sm:col-span-3"><div className="text-white/70 text-xs">Address</div><div className="mt-1 inline-flex items-start gap-2 text-white"><MapPin className="h-4 w-4 text-white/70 mt-0.5" /><span className="break-words">{student.address || "Not provided"}</span></div></div>
    </div>
  );
}
