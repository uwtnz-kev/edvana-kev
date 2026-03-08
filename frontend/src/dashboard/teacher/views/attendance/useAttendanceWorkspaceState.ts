// Manages attendance workspace state, restore routing, and row mutations.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { computeAttendanceStats, loadAttendance, type AttendanceFilters, type AttendanceRecord } from "@/dashboard/teacher/components/attendance";
import { seedSubjects2, type TeacherSubject2 } from "@/dashboard/teacher/components/assignments";
import { useStudents } from "@/dashboard/teacher/components/students";
import { filterAttendanceRows, mergeRosterWithSaved, todayISO } from "./attendanceViewHelpers";
import { removeAttendanceRecord, saveAttendanceStatus } from "./attendanceMutationHandlers";

type AttendanceRestoreState = { restoreSubjectId?: string; resetToHome?: boolean };
export type AttendanceWorkspaceState = ReturnType<typeof useAttendanceWorkspaceState>;

export function useAttendanceWorkspaceState() {
  const navigate = useNavigate(); const location = useLocation(); const { students } = useStudents();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2); const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null); const [rows, setRows] = useState<AttendanceRecord[]>(() => loadAttendance()); const [selectedDate, setSelectedDate] = useState<string | null>(null); const [filters, setFilters] = useState<AttendanceFilters>({ query: "", classValue: "all", subjectValue: "all", statusValue: "all", date: todayISO() }); const [page, setPage] = useState(1); const [editOpen, setEditOpen] = useState(false); const [selectedRow, setSelectedRow] = useState<AttendanceRecord | null>(null); const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const previousSubjectId = useRef<string | null>(selectedSubjectId);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [selectedSubjectId, subjects]);
  const selectedSubjectName = selectedSubject?.name ?? null; const activeDate = selectedDate ?? filters.date;
  const refreshAttendance = () => setRows(loadAttendance());
  const resetFilters = () => { setFilters({ query: "", classValue: "all", subjectValue: "all", statusValue: "all", date: todayISO() }); setPage(1); };
  const resetWorkspaceState = () => { setSelectedRow(null); setDeleteTargetId(null); setEditOpen(false); setSelectedDate(null); resetFilters(); };

  useEffect(() => { const state = location.state as AttendanceRestoreState | null; if (state?.resetToHome) { setSelectedSubjectId(null); resetWorkspaceState(); refreshAttendance(); navigate(".", { replace: true, state: null }); return; } if (!state?.restoreSubjectId) return; setSelectedSubjectId(subjects.some((subject) => subject.id === state.restoreSubjectId) ? state.restoreSubjectId : null); setSelectedRow(null); setDeleteTargetId(null); setEditOpen(false); refreshAttendance(); navigate(".", { replace: true, state: null }); }, [location.state, navigate, subjects]);
  useEffect(() => { if (previousSubjectId.current !== selectedSubjectId) { resetWorkspaceState(); previousSubjectId.current = selectedSubjectId; } }, [selectedSubjectId]);

  const savedRowsForWorkspace = useMemo(() => !selectedSubjectName ? [] : rows.filter((row) => row.date === activeDate && row.subjectName === selectedSubjectName), [activeDate, rows, selectedSubjectName]);
  const rosterRows = useMemo(() => !selectedSubjectName ? [] : mergeRosterWithSaved(students, selectedSubjectName, activeDate, savedRowsForWorkspace), [activeDate, savedRowsForWorkspace, selectedSubjectName, students]);
  const filteredRows = useMemo(() => filterAttendanceRows(rosterRows, filters, selectedDate), [filters, rosterRows, selectedDate]);
  const stats = useMemo(() => { const computed = computeAttendanceStats(filteredRows); return { total: Number(computed.total) || 0, present: Number(computed.present) || 0, absent: Number(computed.absent) || 0 }; }, [filteredRows]);
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / 8)); const pagedRows = useMemo(() => filteredRows.slice((page - 1) * 8, (page - 1) * 8 + 8), [filteredRows, page]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  return {
    deleteTargetId, editOpen, filters, page, pagedRows, selectedDate, selectedRow, selectedSubject, selectedSubjectId, stats, subjects, totalPages,
    onBack: () => { setSelectedSubjectId(null); resetWorkspaceState(); },
    onConfirmDelete: () => { if (!removeAttendanceRecord(deleteTargetId)) return; if (selectedRow?.id === deleteTargetId) { setSelectedRow(null); setEditOpen(false); } setDeleteTargetId(null); refreshAttendance(); },
    onCreate: () => { if (!selectedSubjectId || !selectedSubjectName) return; navigate("/dashboard/teacher/attendance/create", { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName } }); },
    onDelete: (row: AttendanceRecord) => setDeleteTargetId(row.id),
    onDeleteOpenChange: (open: boolean) => { if (!open) setDeleteTargetId(null); },
    onEdit: (row: AttendanceRecord) => { setSelectedRow(row); setEditOpen(true); },
    onEditOpenChange: (open: boolean) => { setEditOpen(open); if (!open) setSelectedRow(null); },
    onSaveStatus: (id: string, status: AttendanceRecord["status"]) => { if (!saveAttendanceStatus(rows, rosterRows, id, status)) return; refreshAttendance(); setEditOpen(false); setSelectedRow(null); },
    setFilters: (next: AttendanceFilters) => { setFilters(next); setPage(1); },
    setPage,
    setSelectedDate: (next: string | null) => { setSelectedDate(next); setPage(1); },
    setSelectedSubjectId,
  };
}
