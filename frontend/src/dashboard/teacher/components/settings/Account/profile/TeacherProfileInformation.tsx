// Orchestrates the teacher profile information card using profile subcomponents.
import { TeacherProfileFields } from "./TeacherProfileFields";
import { TeacherProfileHeader } from "./TeacherProfileHeader";

export interface TeacherProfile {
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

type Props = {
  profile: TeacherProfile;
};

export default function TeacherProfileInformation({ profile }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
      <TeacherProfileHeader />
      <TeacherProfileFields profile={profile} />
    </div>
  );
}
