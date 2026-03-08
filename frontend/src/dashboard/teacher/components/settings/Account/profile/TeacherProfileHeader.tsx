// Renders the profile information card header and avatar icon.
import { User } from "lucide-react";

export function TeacherProfileHeader() {
  return (
    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20">
        <User className="h-6 w-6 text-emerald-700" />
      </div>
      Profile Information
    </h2>
  );
}
