// Persists the generated attendance rows and returns to the workspace.
import { createAttendance } from "@/dashboard/teacher/components/attendance";
import type { AttendanceCreateState, Status } from "./attendanceListHelpers";

type AttendanceRow = {
  className: string;
  id: string;
  name: string;
  status: Status;
};

export function saveAttendanceList(args: {
  createState: AttendanceCreateState;
  date: Date;
  navigate: (to: string, options?: { state?: { restoreSubjectId: string } }) => void;
  rows: AttendanceRow[];
}) {
  const dateISO = args.date.toISOString().slice(0, 10);

  args.rows.forEach((row) => {
    createAttendance({
      date: dateISO,
      studentId: row.id,
      studentName: row.name,
      className: row.className,
      subjectName: args.createState.subjectName,
      status: row.status,
      markedBy: "teacher",
    });
  });

  args.navigate("/dashboard/teacher/attendance", {
    state: { restoreSubjectId: args.createState.subjectId },
  });
}
