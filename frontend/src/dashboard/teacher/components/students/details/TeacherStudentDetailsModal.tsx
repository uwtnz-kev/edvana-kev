// Orchestrates the teacher student details modal using focused detail sections.
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StudentDetailsHeader } from "./StudentDetailsHeader";
import { StudentDetailsNotes } from "./StudentDetailsNotes";

type StudentStatus = "Active" | "Inactive" | "Transferred" | "Suspended" | "Graduated";

export type TeacherStudentDetails = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  class: string;
  status: StudentStatus;
  enrollmentDate: string;
  address?: string | null;
  attendanceRate?: number | null;
  averageGrade?: number | null;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: TeacherStudentDetails | null;
};

export default function TeacherStudentDetailsModal({ open, onOpenChange, student }: Props) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={["fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", "w-[calc(100vw-2rem)] sm:w-full max-w-4xl", "max-h-[85vh] overflow-hidden", "bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-2xl shadow-xl", "p-0"].join(" ")}>
        <div className="flex flex-col max-h-[85vh]">
          <DialogHeader className="px-6 py-4 border-b border-white/20">
            <DialogTitle className="text-white">{student.firstName} {student.lastName}</DialogTitle>
            <DialogDescription className="sr-only">Student details dialog</DialogDescription>
          </DialogHeader>
          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(85vh-72px)]">
            <div className="space-y-4">
              <StudentDetailsHeader student={student} />
              <StudentDetailsNotes student={student} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
