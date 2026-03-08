// Provides derived display values for the teacher navbar account menu.
import type { AuthUser } from "@/types/user";

type TeacherNavbarDisplayData = {
  email: string;
  fullName: string;
  roleLabel: string;
};

export function getTeacherNavbarDisplayData(user: AuthUser): TeacherNavbarDisplayData {
  return {
    email: user.email ?? "",
    fullName: `${user.firstName} ${user.lastName}`,
    roleLabel: "Teacher",
  };
}
