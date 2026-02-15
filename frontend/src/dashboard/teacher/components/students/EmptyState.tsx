import { Users } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-10 text-center">
      <div className="w-12 h-12 mx-auto bg-white/10 rounded-xl flex items-center justify-center mb-4">
        <Users className="h-6 w-6 text-white/80" />
      </div>
      <p className="text-white text-lg font-semibold">No students yet</p>
      <p className="text-white/60 text-sm mt-2">
        Once students are enrolled in your classes, they will appear here.
      </p>
    </div>
  );
}
