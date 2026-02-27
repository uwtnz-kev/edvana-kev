import { BookOpen } from "lucide-react";

export function SubjectsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-5">
        <div
          className="
            h-12 w-12
            rounded-2xl
            flex items-center justify-center
            bg-[#1EA896]
          "
        >
          <BookOpen className="h-6 w-6 text-[#3B240F]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#3B240F] leading-tight mb-2">Your Subjects</h1>
          <p className="text-[#6B4F3A] text-base">Continue your learning journey</p>
        </div>
      </div>
    </div>
  );
}
