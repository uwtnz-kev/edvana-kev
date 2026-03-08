/**
 * SubjectBodyCards
 * ----------------
 * Implements the S ub je ct Bo dy Ca rd s module for the teacher dashboard s ub je ct s feature.
 */
import { Users } from "lucide-react";

type Props = {
  totalStudents: number;
  totalSubjects?: number;
  pendingToGrade?: number;
};

export default function SubjectBodyCards({
  totalStudents,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl shadow-sm p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/20">
        <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-rose-500/20 text-rose-700">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-[#3B240F]">{totalStudents}</p>
          <p className="text-[#3B240F]/70">Total Students</p>
        </div>
      </div>
    </div>
  );
}

