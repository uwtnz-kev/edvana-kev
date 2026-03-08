// Renders the teacher profile information fields and academic period card.
import { Calendar } from "lucide-react";
import type { TeacherProfile } from "./TeacherProfileInformation";
import { getTeacherProfileFields } from "./teacherProfileHelpers";

type Props = {
  profile: TeacherProfile;
};

export function TeacherProfileFields({ profile }: Props) {
  const [leftFields, rightFields] = getTeacherProfileFields(profile);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        {leftFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.label} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${field.backgroundClass}`}>
                <Icon className={`h-6 w-6 ${field.iconClass}`} />
              </div>
              <div>
                <p className="text-white/60 text-sm">{field.label}</p>
                <p className="text-white font-medium">{field.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {rightFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.label} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${field.backgroundClass}`}>
                <Icon className={`h-6 w-6 ${field.iconClass}`} />
              </div>
              <div>
                <p className="text-white/60 text-sm">{field.label}</p>
                <p className="text-white font-medium">{field.value}</p>
              </div>
            </div>
          );
        })}
        <div className="mt-1 p-4 bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-[#1EA896]/20 rounded-xl">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20">
              <Calendar className="h-6 w-6 text-pink-700" />
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
  );
}
