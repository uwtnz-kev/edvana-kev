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
      { backgroundClass: "bg-emerald-500/20", icon: User, iconClass: "text-emerald-700", label: "Full Name", value: profile.fullName },
      { backgroundClass: "bg-blue-500/20", icon: Mail, iconClass: "text-blue-700", label: "Email Address", value: profile.email },
      { backgroundClass: "bg-red-500/20", icon: GraduationCap, iconClass: "text-red-600", label: "Role", value: profile.role },
      { backgroundClass: "bg-purple-500/20", icon: BookOpen, iconClass: "text-purple-700", label: "Subjects", value: profile.subjects },
    ],
    [
      { backgroundClass: "bg-cyan-500/20", icon: Users, iconClass: "text-cyan-700", label: "Classes", value: profile.classes },
      { backgroundClass: "bg-amber-500/20", icon: School, iconClass: "text-amber-700", label: "School Name", value: profile.schoolName },
    ],
  ];
}
