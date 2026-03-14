/**
 * StudentsHome
 * ------------
 * Renders the teacher dashboard s tu de nt s page content.
 */
import { BookOpenCheck, Sparkles } from "lucide-react";

export default function StudentsHome() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-indigo-500/20 text-indigo-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-white font-semibold">Subject Workspace</h3>
          </div>
          <p className="text-white/60 text-sm mt-2">
            Select a subject from the sidebar to view student records, attendance context, and grading progress.
          </p>
        </section>

        <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-orange-500/20 text-orange-700">
              <BookOpenCheck className="h-4 w-4" />
            </div>
            <h3 className="text-white font-semibold">Tip</h3>
          </div>
          <p className="text-white/60 text-sm mt-2">
            Use filters after selecting a subject to quickly find students by class, status, or name.
          </p>
        </section>
      </div>
    </div>
  );
}


