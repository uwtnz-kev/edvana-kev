// src/dashboard/teacher/components/students/TeacherStudentDetailsModal.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  MapPin,
  Percent,
  BookOpen,
} from "lucide-react";

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

function statusClass(status: TeacherStudentDetails["status"]) {
  const map: Record<TeacherStudentDetails["status"], string> = {
    Active: "bg-[#D1FAE5] text-[#047857] border border-[#A7F3D0]",
    Inactive: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
    Transferred: "bg-blue-500/20 text-blue-700 border-blue-500/30",
    Suspended: "bg-red-500/20 text-red-700 border-red-500/30",
    Graduated: "bg-purple-500/20 text-purple-700 border-purple-500/30",
  };
  return map[status];
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function formatPercent(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "Not available";
  return `${Math.max(0, Math.min(100, Math.round(value)))}%`;
}

function formatGrade(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "Not available";
  return `${Math.round(value)}%`;
}

export default function TeacherStudentDetailsModal({ open, onOpenChange, student }: Props) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={[
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100vw-2rem)] sm:w-full max-w-4xl",
          "max-h-[85vh] overflow-hidden",
          "bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-2xl shadow-xl",
          "p-0",
        ].join(" ")}
      >
        <div className="flex flex-col max-h-[85vh]">
          <DialogHeader className="px-6 py-4 border-b border-white/20">
            <DialogTitle className="text-white">
              {student.firstName} {student.lastName}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Student details dialog
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(85vh-72px)]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 rounded-full px-2 py-1 text-xs font-medium border">
                  <span className="inline-flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {student.class}
                  </span>
                </Badge>

                <Badge className={`${statusClass(student.status)} rounded-full px-2 py-1 text-xs font-medium border`}>
                  {student.status}
                </Badge>

                <Badge className="bg-white/10 text-white/80 border border-white/20 rounded-full px-2 py-1 text-xs font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Enrolled {formatDate(student.enrollmentDate)}
                  </span>
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <div className="text-white/70 text-xs">Email</div>
                  <div className="mt-1 inline-flex items-center gap-2 text-white">
                    <Mail className="h-4 w-4 text-white/70" />
                    <span className="break-all">{student.email}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <div className="text-white/70 text-xs">Phone</div>
                  <div className="mt-1 inline-flex items-center gap-2 text-white">
                    <Phone className="h-4 w-4 text-white/70" />
                    <span className="break-all">{student.phone || "Not provided"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 sm:col-span-2">
                  <div className="text-white/70 text-xs">Address</div>
                  <div className="mt-1 inline-flex items-start gap-2 text-white">
                    <MapPin className="h-4 w-4 text-white/70 mt-0.5" />
                    <span className="break-words">{student.address || "Not provided"}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <div className="text-white/70 text-xs">Attendance</div>
                  <div className="mt-1 inline-flex items-center gap-2 text-white">
                    <Percent className="h-4 w-4 text-white/70" />
                    <span className="font-semibold">{formatPercent(student.attendanceRate)}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/20 bg-white/10 p-3 sm:col-span-3">
                  <div className="text-white/70 text-xs">Grades</div>
                  <div className="mt-1 inline-flex items-center gap-2 text-white">
                    <BookOpen className="h-4 w-4 text-white/70" />
                    <span className="font-semibold">
                      Average grade {formatGrade(student.averageGrade)}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs mt-1">
                    Replace this with subject level grades when your data model includes them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}