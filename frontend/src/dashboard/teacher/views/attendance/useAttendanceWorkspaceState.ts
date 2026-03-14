// Manages attendance workspace state, restore routing, and row mutations.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadAttendance, type AttendanceFilters, type AttendanceRecord } from "@/dashboard/teacher/components/attendance";
import { seedSubjects2, type TeacherSubject2 } from "@/dashboard/teacher/components/assignments";
import { summarizeAttendanceSessions, todayISO } from "./attendanceViewHelpers";

type AttendanceRestoreState = { restoreSubjectId?: string; resetToHome?: boolean };
export type AttendanceWorkspaceState = ReturnType<typeof useAttendanceWorkspaceState>;

function getRestoreState(value: unknown): AttendanceRestoreState | null {
  return (value as AttendanceRestoreState | null) ?? null;
}

function getInitialSelectedSubjectId(
  routeState: unknown,
  subjects: TeacherSubject2[],
) {
  const restoreSubjectId = getRestoreState(routeState)?.restoreSubjectId;
  if (!restoreSubjectId) return null;
  return subjects.some((subject) => subject.id === restoreSubjectId) ? restoreSubjectId : null;
}

export function useAttendanceWorkspaceState() {
  const navigate = useNavigate(); const location = useLocation();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2); const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(() => getInitialSelectedSubjectId(location.state, seedSubjects2)); const [rows, setRows] = useState<AttendanceRecord[]>(() => loadAttendance()); const [selectedDate, setSelectedDate] = useState<string | null>(null); const [filters, setFilters] = useState<AttendanceFilters>({ query: "", classValue: "all", subjectValue: "all", date: todayISO() }); const [page, setPage] = useState(1);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [selectedSubjectId, subjects]);
  const selectedSubjectName = selectedSubject?.name ?? null;
  const refreshAttendance = () => setRows(loadAttendance());
  const resetFilters = () => { setFilters({ query: "", classValue: "all", subjectValue: "all", date: todayISO() }); setPage(1); };
  const resetWorkspaceState = () => { setSelectedDate(null); resetFilters(); };

  useEffect(() => {
    const state = getRestoreState(location.state);
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      resetWorkspaceState();
      refreshAttendance();
      navigate(".", { replace: true, state: null });
      return;
    }

    if (!state?.restoreSubjectId) return;

    const nextSubjectId = subjects.some((subject) => subject.id === state.restoreSubjectId)
      ? state.restoreSubjectId
      : null;

    if (nextSubjectId !== selectedSubjectId) {
      setSelectedSubjectId(nextSubjectId);
    }

    refreshAttendance();
    navigate(".", { replace: true, state: null });
  }, [location.state, navigate, selectedSubjectId, subjects]);
  useEffect(() => { if (previousSubjectId.current !== selectedSubjectId) { resetWorkspaceState(); previousSubjectId.current = selectedSubjectId; } }, [selectedSubjectId]);

  const sessions = useMemo(() => summarizeAttendanceSessions(rows, filters, selectedSubjectName, selectedDate), [filters, rows, selectedDate, selectedSubjectName]);
  const stats = useMemo(() => ({ total: sessions.length, present: sessions.reduce((sum, session) => sum + session.presentCount, 0), absent: sessions.reduce((sum, session) => sum + session.absentCount, 0), late: sessions.reduce((sum, session) => sum + session.lateCount, 0) }), [sessions]);
  const totalPages = Math.max(1, Math.ceil(sessions.length / 8)); const pagedSessions = useMemo(() => sessions.slice((page - 1) * 8, (page - 1) * 8 + 8), [sessions, page]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  return {
    filters, page, pagedSessions, selectedDate, selectedSubject, selectedSubjectId, stats, subjects, totalPages,
    onBack: () => { setSelectedSubjectId(null); resetWorkspaceState(); },
    onCreate: () => { if (!selectedSubjectId || !selectedSubjectName) return; navigate("/dashboard/teacher/attendance/create", { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName } }); },
    onEditSession: (sessionId: string) => navigate(`/dashboard/teacher/attendance/sessions/${sessionId}/edit`, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    onOpenSession: (sessionId: string) => navigate(`/dashboard/teacher/attendance/sessions/${sessionId}`, { state: { restoreSubjectId: selectedSubjectId ?? undefined } }),
    setFilters: (next: AttendanceFilters) => { setFilters(next); setPage(1); },
    setPage,
    setSelectedDate: (next: string | null) => { setSelectedDate(next); setPage(1); },
    setSelectedSubjectId,
  };
}
