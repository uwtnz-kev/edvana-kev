// Renders the brand block for the teacher navbar.
import { BookOpen } from "lucide-react";

export function TeacherNavbarBrand() {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#7A5A3A] to-[#3B240F] shadow-lg">
        <BookOpen className="h-6 w-6 text-[#F8F4E1]" />
      </div>
      <span className="text-xl font-bold text-[#3B240F] tracking-tight">Edvana</span>
    </div>
  );
}
