// Renders attendance pagination and the current page of attendance rows.
import { Button } from "@/components/ui/button";
import { AttendanceSessionCards } from "@/dashboard/teacher/components/attendance/AttendanceSessionCards";
import type { AttendanceWorkspaceState } from "./useAttendanceWorkspaceState";

type Props = { workspace: AttendanceWorkspaceState };

export function AttendanceWorkspaceTable({ workspace }: Props) {
  return (
    <>
      <div className="teacher-panel-surface rounded-2xl p-3 flex flex-wrap items-center gap-2 teacher-panel-hover">
        <div className="ml-auto text-white/60 text-xs">Page {workspace.page} of {workspace.totalPages}</div>
        <Button type="button" onClick={() => workspace.setPage(Math.max(1, workspace.page - 1))} disabled={workspace.page <= 1} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Prev</Button>
        <Button type="button" onClick={() => workspace.setPage(Math.min(workspace.totalPages, workspace.page + 1))} disabled={workspace.page >= workspace.totalPages} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Next</Button>
      </div>
      <AttendanceSessionCards sessions={workspace.pagedSessions} onEdit={workspace.onEditSession} onOpen={workspace.onOpenSession} />
    </>
  );
}

