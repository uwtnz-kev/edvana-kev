// Renders the empty-subject attendance landing state with subject selection guidance.
import { BookOpen, FileCheck2, Sparkles } from "lucide-react";
import AttendanceHeader from "@/dashboard/teacher/components/attendance/AttendanceHeader";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import type { AttendanceWorkspaceState } from "./useAttendanceWorkspaceState";

type Props = { workspace: AttendanceWorkspaceState };

export function AttendanceWorkspaceHome({ workspace }: Props) {
  return (
    <div className="flex w-full gap-6">
      <aside className="w-[220px] shrink-0">
        <div className="teacher-panel-surface rounded-2xl p-3"><div className="px-2 pt-1 pb-3"><h2 className="text-white text-sm font-semibold">Subjects</h2></div><div className="space-y-2">{workspace.subjects.map((subject) => { const theme = getSubjectThemeById(subject.id); return <button key={subject.id} type="button" onClick={() => workspace.setSelectedSubjectId(subject.id)} className="group w-full text-left rounded-2xl border px-4 py-3 flex items-center gap-3 transition-all duration-200 hover:shadow-sm hover:-translate-y-[1px] bg-white/5 border-white/10 text-[var(--text-primary)] hover:bg-white/25 hover:border-white/20"><div className={`h-9 w-9 rounded-xl flex items-center justify-center ${theme.bgClass}`}><BookOpen className={`h-4 w-4 ${theme.iconClass}`} /></div><span className="text-sm font-medium truncate">{subject.name}</span></button>; })}</div></div>
      </aside>
      <section className="flex-1 min-w-0 space-y-4">
        <AttendanceHeader title="Attendance" subtitle="Choose a subject from the sidebar to manage attendance" subjectId={null} showBack={false} showCreate={false} onBack={workspace.onBack} canCreate={false} onCreate={workspace.onCreate} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl flex items-center justify-center bg-indigo-500/20 text-indigo-700"><Sparkles className="h-4 w-4" /></div><h3 className="text-white font-semibold">Quick Actions</h3></div><p className="text-white/60 text-sm mt-2">Select a subject, then create a daily attendance list for a class and date.</p></section>
          <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl flex items-center justify-center bg-orange-500/20 text-orange-700"><FileCheck2 className="h-4 w-4" /></div><h3 className="text-white font-semibold">Status Guidance</h3></div><p className="text-white/60 text-sm mt-2">Present, Absent, Late, and Excused statuses are tracked per student and date.</p></section>
        </div>
      </section>
    </div>
  );
}


