 import { User, Mail, GraduationCap, School, BookOpen, Users, Calendar } from "lucide-react";

interface TeacherProfile {
  fullName: string;
  email: string;
  role: string;
  subjects: string;
  classes: string;
  schoolName: string;
  academicPeriod: string;
  termStartDate: string;
  termEndDate: string;
}

export default function TeacherProfileInformation({
  profile,
}: {
  profile: TeacherProfile;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <User className="h-5 w-5 text-[#1EA896]" />
        Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Full Name</p>
              <p className="text-white font-medium">{profile.fullName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Email Address</p>
              <p className="text-white font-medium">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Role</p>
              <p className="text-white font-medium">{profile.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Subjects</p>
              <p className="text-white font-medium">{profile.subjects}</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Classes</p>
              <p className="text-white font-medium">{profile.classes}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <School className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">School Name</p>
              <p className="text-white font-medium">{profile.schoolName}</p>
            </div>
          </div>

          <div className="mt-1 p-4 bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-[#1EA896]/20 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#FF715B] rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Academic Period</h3>
                <p className="text-[#1EA896] font-medium">{profile.academicPeriod}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60">Start Date</p>
                <p className="text-white font-medium">{profile.termStartDate}</p>
              </div>
              <div>
                <p className="text-white/60">End Date</p>
                <p className="text-white font-medium">{profile.termEndDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
