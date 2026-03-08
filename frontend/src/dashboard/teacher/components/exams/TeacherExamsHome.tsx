/**
 * TeacherExamsHome
 * ----------------
 * Renders the teacher dashboard e xa ms page content.
 */
import { FileCheck2, Sparkles } from "lucide-react";

export function TeacherExamsHome() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <section className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-indigo-500/20 text-indigo-700">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-white font-semibold">Quick Actions</h3>
        </div>
        <p className="text-white/60 text-sm mt-2">Select a subject, then use Create Exam to draft and publish new work.</p>
      </section>

      <section className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-orange-500/20 text-orange-700">
            <FileCheck2 className="h-4 w-4" />
          </div>
          <h3 className="text-white font-semibold">Exam Flow</h3>
        </div>
        <p className="text-white/60 text-sm mt-2">Track draft and published exams, then schedule and review exam details by subject.</p>
      </section>
    </div>
  );
}

