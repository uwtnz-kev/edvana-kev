/**
 * TeacherSubjectsHome
 * -------------------
 * Renders the teacher dashboard s ub je ct s page content.
 */
import { BookOpenCheck, Sparkles } from "lucide-react";

export function TeacherSubjectsHome() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl p-3 flex items-center justify-center bg-[var(--sidebar-item-active)] text-[var(--accent-primary)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-white font-semibold">Subject Workspace</h3>
          </div>
          <p className="text-white/60 text-sm mt-2">
            Select a subject from the sidebar to manage classes, student progress, and grading workload.
          </p>
        </section>

        <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl p-3 flex items-center justify-center bg-blue-500/15 text-blue-300">
              <BookOpenCheck className="h-4 w-4" />
            </div>
            <h3 className="text-white font-semibold">Tip</h3>
          </div>
          <p className="text-white/60 text-sm mt-2">
            Use the class dropdown and search to narrow down cards and jump to the exact teaching context quickly.
          </p>
        </section>
      </div>
    </div>
  );
}


