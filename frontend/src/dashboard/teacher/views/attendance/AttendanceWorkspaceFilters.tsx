// Renders attendance stats and filters for the active subject workspace.
import AttendanceFiltersBar from "@/dashboard/teacher/components/attendance/AttendanceFilters";
import AttendanceStatsCards from "@/dashboard/teacher/components/attendance/AttendanceStatsCards";
import type { AttendanceWorkspaceState } from "./useAttendanceWorkspaceState";

type Props = { workspace: AttendanceWorkspaceState };

export function AttendanceWorkspaceFilters({ workspace }: Props) {
  return (
    <>
      <AttendanceStatsCards stats={workspace.stats} totalLabel="Attendance Sessions" />
      <AttendanceFiltersBar value={workspace.filters} onChange={workspace.setFilters} selectedDate={workspace.selectedDate} onDateChange={workspace.setSelectedDate} />
    </>
  );
}
