import { USER_ROLES } from "@/constants/roles";
import { School } from "./school";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  school?: School | null; // ✅ must allow null if backend sometimes sends null
  status?: string;
  avatar?: string;
  createdAt?: string; // ✅ ISO date string, not Date object
  updatedAt?: string;
}

export interface AuthUser extends BaseUser {
  password?: string;
  dob?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  address?: string;
  grade?: string;
  gradeCombination?: string;
  subGrade?: string;
  parentId?: string;

  teacherProfile?: any;
  studentProfile?: any;
  parentProfile?: any;
}

export interface UserProfile extends AuthUser {
  parentName?: string;
  parentPhone?: string;
  emergencyContact?: string;
}

export type LoginUser = AuthUser & Partial<UserProfile> & { password: string };