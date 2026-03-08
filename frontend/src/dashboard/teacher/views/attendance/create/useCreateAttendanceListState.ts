// Owns create-attendance state, derived roster rows, and navigation actions.
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStudents } from "@/dashboard/teacher/components/students";
import { attendanceRowsForClass, uniqueClassOptions } from "./createAttendanceListStateHelpers";
import { getCreateState, type Status } from "./attendanceListHelpers";
import { canSaveAttendanceList } from "./attendanceListValidation";
import { saveAttendanceList } from "./attendanceListSubmission";

export function useCreateAttendanceListState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { students } = useStudents();
  const createState = getCreateState(location.state);
  const [classValue, setClassValue] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [statusById, setStatusById] = useState<Record<string, Status>>({});
  const classOptions = useMemo(() => uniqueClassOptions(students), [students]);
  const rows = useMemo(() => attendanceRowsForClass({ classValue, statusById, students }), [classValue, statusById, students]);
  const canGenerate = canSaveAttendanceList({ classValue, date, rowCount: rows.length });

  const goBackToAttendanceWorkspace = () => createState && navigate("/dashboard/teacher/attendance", { state: { restoreSubjectId: createState.subjectId } });
  const goBackToAttendanceHome = () => navigate("/dashboard/teacher/attendance");
  const onStatusChange = (studentId: string, status: Status) => setStatusById((previous) => ({ ...previous, [studentId]: status }));
  const onSave = () => createState && date && saveAttendanceList({ createState, date, navigate, rows });

  return { canGenerate, classOptions, classValue, createState, date, goBackToAttendanceHome, goBackToAttendanceWorkspace, onSave, onStatusChange, rows, setClassValue, setDate };
}
