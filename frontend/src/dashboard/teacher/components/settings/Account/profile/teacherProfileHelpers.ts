// Provides profile field metadata for the teacher profile information card.
import {
  BookOpen,
  GraduationCap,
  Mail,
  School,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { TeacherProfile } from "./TeacherProfileInformation";

type ProfileField = {
  backgroundClass: string;
  icon: LucideIcon;
  iconClass: string;
  label: string;
  value: string;
};

export function getTeacherProfileFields(profile: TeacherProfile): [ProfileField[], ProfileField[]] {
  return [
    [
      { backgroundClass: "bg-emerald-500/15", icon: User, iconClass: "text-emerald-300", label: "Full Name", value: profile.fullName },
      { backgroundClass: "bg-sky-500/15", icon: Mail, iconClass: "text-sky-300", label: "Email Address", value: profile.email },
      { backgroundClass: "bg-amber-500/15", icon: GraduationCap, iconClass: "text-amber-300", label: "Role", value: profile.role },
      { backgroundClass: "bg-fuchsia-500/15", icon: BookOpen, iconClass: "text-fuchsia-300", label: "Subjects", value: profile.subjects },
    ],
    [
      { backgroundClass: "bg-indigo-500/15", icon: Users, iconClass: "text-indigo-300", label: "Classes", value: profile.classes },
      { backgroundClass: "bg-orange-500/15", icon: School, iconClass: "text-orange-300", label: "School Name", value: profile.schoolName },
    ],
  ];
}
