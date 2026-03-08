// Renders the modal title area and student summary badges.
import { Calendar, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TeacherStudentDetails } from "./TeacherStudentDetailsModal";
import { formatStudentDetailsDate, getStudentStatusClass } from "./studentDetailsHelpers";

type Props = {
  student: TeacherStudentDetails;
};

export function StudentDetailsHeader({ student }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 rounded-full px-2 py-1 text-xs font-medium border"><span className="inline-flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{student.class}</span></Badge>
        <Badge className={`${getStudentStatusClass(student.status)} rounded-full px-2 py-1 text-xs font-medium border`}>{student.status}</Badge>
        <Badge className="bg-white/10 text-white/80 border border-white/20 rounded-full px-2 py-1 text-xs font-medium"><span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Enrolled {formatStudentDetailsDate(student.enrollmentDate)}</span></Badge>
      </div>
    </div>
  );
}
