import { Users } from "lucide-react";

export default function StudentsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Students</h1>
        <p className="text-white/80 mt-1">
          View learners across your classes
        </p>
      </div>

      <button
        type="button"
        className="
          group
          inline-flex items-center justify-center gap-2
          w-full sm:w-auto
          bg-white/10
          border border-white/20
          rounded-xl
          px-4 py-2
          text-white/90 text-sm font-medium
          transition-all duration-300
          hover:bg-white/15
          hover:border-white/30
          hover:shadow-xl
          hover:-translate-y-0.5
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white/30
        "
      >
        <Users className="h-4 w-4 text-white/80 transition-transform duration-300 group-hover:scale-110" />
        <span>Teacher View</span>
      </button>
    </div>
  );
}