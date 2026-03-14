import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AttendanceCreateTable,
  AttendanceHeader,
  AttendanceStatsCards,
  loadAttendance,
  updateAttendanceStatus,
  type AttendanceRecord,
  type AttendanceStatus,
} from "@/dashboard/teacher/components/attendance";
import { listSessionRows, parseAttendanceSessionId } from "./attendance/attendanceViewHelpers";
import { resolveRestoreSubjectId } from "./attendance/edit/attendanceEditHelpers";

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function AttendanceSessionEditView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ sessionId: string }>();
  const [records] = useState<AttendanceRecord[]>(() => loadAttendance());
  const sessionId = params.sessionId ?? "";
  const session = sessionId ? parseAttendanceSessionId(sessionId) : null;
  const sessionRows = useMemo(() => listSessionRows(records, sessionId), [records, sessionId]);
  const [statusByRowId, setStatusByRowId] = useState<Record<string, AttendanceStatus>>(() =>
    sessionRows.reduce<Record<string, AttendanceStatus>>((next, row) => ({ ...next, [row.id]: row.status }), {})
  );

  const restoreSubjectId = session ? resolveRestoreSubjectId(location.state, session.subjectName) : null;
  const editRows = sessionRows.map((row) => ({
    id: row.id,
    name: row.studentName,
    className: row.className,
    status: statusByRowId[row.id] ?? row.status,
  }));
  const stats = useMemo(() => ({
    total: editRows.length,
    present: editRows.filter((row) => row.status === "present").length,
    absent: editRows.filter((row) => row.status === "absent").length,
    late: editRows.filter((row) => row.status === "late").length,
  }), [editRows]);

  if (!session) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-5xl mx-auto teacher-panel-surface rounded-2xl p-8 text-center">
          <p className="text-white text-lg font-semibold">Attendance session not found</p>
          <p className="mt-2 text-white/60">The attendance list you selected could not be edited.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <AttendanceHeader
          title={`Edit ${session.className} Attendance`}
          subtitle={`Subject: ${session.subjectName} | Date: ${formatDate(session.date)}`}
          subjectId={restoreSubjectId}
          showBack
          showCreate={false}
          onBack={() => navigate("/dashboard/teacher/attendance", { state: { restoreSubjectId: restoreSubjectId ?? undefined } })}
          canCreate={false}
          onCreate={() => undefined}
        />
        <AttendanceStatsCards stats={stats} totalLabel="Total Students" />
        <div className="teacher-panel-surface rounded-2xl p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
              Class
              <div className="mt-1 text-white font-medium">{session.className}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
              Subject
              <div className="mt-1 text-white font-medium">{session.subjectName}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
              Date
              <div className="mt-1 text-white font-medium">{formatDate(session.date)}</div>
            </div>
          </div>

          <AttendanceCreateTable
            rows={editRows}
            onStatusChange={(rowId, status) => setStatusByRowId((previous) => ({ ...previous, [rowId]: status }))}
          />

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              onClick={() => navigate(`/dashboard/teacher/attendance/sessions/${sessionId}`, { state: { restoreSubjectId: restoreSubjectId ?? undefined } })}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                editRows.forEach((row) => updateAttendanceStatus(row.id, row.status));
                navigate("/dashboard/teacher/attendance", { state: { restoreSubjectId: restoreSubjectId ?? undefined } });
              }}
              className="bg-white/15 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl px-6"
            >
              Save Attendance List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
