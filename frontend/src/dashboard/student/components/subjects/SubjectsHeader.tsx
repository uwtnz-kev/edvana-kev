import { BookOpen } from "lucide-react";

export function SubjectsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Subjects</h1>
        <p className="text-white/70">Continue your learning journey</p>
      </div>
    </div>
  );
}