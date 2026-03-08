// Renders attendance pagination and the current page of attendance rows.
import { Button } from "@/components/ui/button";
import AttendanceTable from "@/dashboard/teacher/components/attendance/AttendanceTable";
import type { AttendanceWorkspaceState } from "./useAttendanceWorkspaceState";

type Props = { workspace: AttendanceWorkspaceState };

export function AttendanceWorkspaceTable({ workspace }: Props) {
  return (
    <>
      <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-3 flex flex-wrap items-center gap-2 transition-colors duration-200 hover:bg-white/20">
        <div className="ml-auto text-white/60 text-xs">Page {workspace.page} of {workspace.totalPages}</div>
        <Button type="button" onClick={() => workspace.setPage(Math.max(1, workspace.page - 1))} disabled={workspace.page <= 1} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Prev</Button>
        <Button type="button" onClick={() => workspace.setPage(Math.min(workspace.totalPages, workspace.page + 1))} disabled={workspace.page >= workspace.totalPages} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Next</Button>
      </div>
      <AttendanceTable rows={workspace.pagedRows} onEdit={workspace.onEdit} onDelete={workspace.onDelete} />
    </>
  );
}
