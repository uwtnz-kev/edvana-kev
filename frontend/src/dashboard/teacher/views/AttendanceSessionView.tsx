import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AttendanceHeader,
  AttendanceMarkModal,
  AttendanceStatsCards,
  AttendanceTable,
  computeAttendanceStats,
  loadAttendance,
  updateAttendanceStatus,
  type AttendanceRecord,
} from "@/dashboard/teacher/components/attendance";
import { listSessionRows, parseAttendanceSessionId } from "./attendance/attendanceViewHelpers";
import { resolveRestoreSubjectId } from "./attendance/edit/attendanceEditHelpers";

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function AttendanceSessionView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ sessionId: string }>();
  const [rows, setRows] = useState<AttendanceRecord[]>(() => loadAttendance());
  const [selectedRow, setSelectedRow] = useState<AttendanceRecord | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const sessionId = params.sessionId ?? "";
  const session = sessionId ? parseAttendanceSessionId(sessionId) : null;
  const sessionRows = useMemo(() => listSessionRows(rows, sessionId), [rows, sessionId]);
  const stats = useMemo(() => computeAttendanceStats(sessionRows), [sessionRows]);
  const restoreSubjectId = session ? resolveRestoreSubjectId(location.state, session.subjectName) : null;

  if (!session) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-5xl mx-auto teacher-panel-surface rounded-2xl p-8 text-center">
          <p className="text-white text-lg font-semibold">Attendance session not found</p>
          <p className="mt-2 text-white/60">The attendance file you selected could not be opened.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <AttendanceHeader
          title={`${session.className} Attendance List`}
          subtitle={`Subject: ${session.subjectName} | Date: ${formatDate(session.date)}`}
          subjectId={restoreSubjectId}
          showBack
          showCreate={false}
          onBack={() => navigate("/dashboard/teacher/attendance", { state: { restoreSubjectId: restoreSubjectId ?? undefined } })}
          canCreate={false}
          onCreate={() => undefined}
        />
        <AttendanceStatsCards stats={stats} totalLabel="Total Students" />
        <AttendanceTable
          rows={sessionRows}
          onEdit={(row) => {
            setSelectedRow(row);
            setEditOpen(true);
          }}
        />
      </div>

      <AttendanceMarkModal
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedRow(null);
        }}
        record={selectedRow}
        onSave={(id, status) => {
          updateAttendanceStatus(id, status);
          setRows(loadAttendance());
          setEditOpen(false);
          setSelectedRow(null);
        }}
      />
    </div>
  );
}
