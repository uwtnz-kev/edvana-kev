// Wraps the shared attendance create table with the local section label.
import AttendanceCreateTable from "@/dashboard/teacher/components/attendance/AttendanceCreateTable";
import type { Status } from "./attendanceListHelpers";

type Props = {
  className: string;
  onStatusChange: (studentId: string, status: Status) => void;
  rows: Array<{ className: string; id: string; name: string; status: Status }>;
};

export function AttendanceRosterTable({ className, onStatusChange, rows }: Props) {
  return (
    <div className="space-y-3">
      <div className="text-white/60 text-sm">Students in {className}</div>
      <AttendanceCreateTable rows={rows} onStatusChange={onStatusChange} />
    </div>
  );
}
