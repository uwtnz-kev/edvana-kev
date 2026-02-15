import { UserRole } from "@/constants/roles";
import { AuthUser } from "@/types/user";

export const mockTeacherUsers: (AuthUser & { password?: string })[] = [
  {
    id: 2,
    email: "teacher@demo.com",
    password: "teachme",
    firstName: "Jean Baptiste",
    lastName: "Mukamana",
    role: UserRole.TEACHER,
    subjects: ["Mathematics", "Science"],
    school: "Kigali Primary School",
  },
];