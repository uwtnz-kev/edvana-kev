// shared/mocks/parents.ts

import { USER_ROLES } from "@/constants/roles";
import { LoginUser } from "@/types/user";

export const mockParentUsers: LoginUser[] = [
  {
    id: "parent-uuid-1",
    email: "john.doe@parent.com",
    password: "parentpass123",
    firstName: "John",
    lastName: "Doe",
    role: USER_ROLES.PARENT,
    schoolId: "school-uuid-1",
  },
  {
    id: "parent-uuid-2",
    email: "mary.smith@parent.com",
    password: "smithsecure",
    firstName: "Mary",
    lastName: "Smith",
    role: USER_ROLES.PARENT,
    schoolId: "school-uuid-2",
  },
];
