// Owns attendance edit route state, local form state, and save actions.
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAttendanceById, updateAttendance, type AttendanceStatus } from "@/dashboard/teacher/components/attendance";
import { resolveRestoreSubjectId } from "./attendanceEditHelpers";
import { normalizeAttendanceNote } from "./attendanceEditValidation";

export function useAttendanceEditState() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ attendanceId: string }>();
  const attendanceId = params.attendanceId ?? "";
  const record = attendanceId ? getAttendanceById(attendanceId) : null;
  // Restores the subject context when returning to the attendance workspace.
  const restoreSubjectId = record ? resolveRestoreSubjectId(location.state, record.subjectName) : null;
  const [status, setStatus] = useState<AttendanceStatus>(record?.status ?? "present");
  const [note, setNote] = useState(record?.note ?? "");

  const goBackToAttendanceWorkspace = () => navigate("/dashboard/teacher/attendance", { state: { restoreSubjectId: restoreSubjectId ?? undefined } });
  const goBackToAttendanceHome = () => navigate("/dashboard/teacher/attendance");
  const onSave = () => {
    if (!record) return;
    updateAttendance(record.id, { status, note: normalizeAttendanceNote(note) });
    goBackToAttendanceWorkspace();
  };

  return { goBackToAttendanceHome, goBackToAttendanceWorkspace, note, onSave, record, restoreSubjectId, setNote, setStatus, status };
}
