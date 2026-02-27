import { BookOpen, Users, ClipboardList } from "lucide-react";

type Props = {
  totalSubjects: number;
  totalStudents: number;
  pendingToGrade: number;
};

export default function SubjectBodyCards({
  totalSubjects,
  totalStudents,
  pendingToGrade,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.02] hover:border-white/20 group">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalSubjects}</p>
            <p className="text-white/60 text-sm">Subjects Assigned</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-white/20 group">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalStudents}</p>
            <p className="text-white/60 text-sm">Total Students</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-white/20 group">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{pendingToGrade}</p>
            <p className="text-white/60 text-sm">Pending To Grade</p>
          </div>
        </div>
      </div>
    </div>
  );
}
