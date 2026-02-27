import { FileText } from "lucide-react";

export function TeacherExamsHeader() {
  return (
    <div className="flex items-center gap-4">
  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2CB7A7] shadow-md">
    <FileText className="h-6 w-6 text-[#1F2326]" />
  </div>

  <div>
    <h1 className="text-3xl font-bold text-[#3B240F]">Exams</h1>
    <p className="text-[#6B4F3A] mt-1">
      Create exams, monitor submissions, and grade results
    </p>
  </div>
</div>
  );
}
