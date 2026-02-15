import { Users } from "lucide-react";

export default function StudentsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Students</h1>
        <p className="text-white/80 mt-1">View learners across your classes</p>
      </div>

      <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
        <Users className="h-4 w-4 text-white/80" />
        <span className="text-white/90 text-sm">Teacher View</span>
      </div>
    </div>
  );
}
