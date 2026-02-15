import { Users, CheckCircle2, AlertCircle } from "lucide-react";

export default function StudentsStats({ studentsCount }: { studentsCount: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{studentsCount}</p>
            <p className="text-white/60 text-sm">Total Students</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">Active</p>
            <p className="text-white/60 text-sm">Status tracking</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">Follow up</p>
            <p className="text-white/60 text-sm">At risk support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
