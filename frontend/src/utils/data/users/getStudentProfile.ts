import { useCurrentUser } from "@/hooks/useAuth";

export function useStudentProfile() {
  const user = useCurrentUser();

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
  const grade = user?.grade ?? "Not assigned";
  const subGrade = user?.subGrade ?? "";
  const gradeLabel = subGrade ? `${grade} ${subGrade}` : grade;

  return {
    // Basic info
    fullName,
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "Email not available",
    phone: user?.phone ?? "Phone number not available",
    role: user?.role ?? "STUDENT",
    avatar: user?.avatar ?? null,
    status: user?.status ?? "ACTIVE",
    createdAt: user?.createdAt ?? null,
    updatedAt: user?.updatedAt ?? null,

    // Student-specific info
    dob: user?.dob ?? "Date of birth not set",
    gender: user?.gender ?? "Not specified",
    address: user?.address ?? "Address not provided",
    parentId: user?.parentId ?? null,
    grade,
    subGrade,
    gradeLabel,

    // School info
    school: {
      id: user?.school?.id ?? "",
      name: user?.school?.name ?? "School not assigned",
      email: user?.school?.email ?? "Email not available",
      phone: user?.school?.phone ?? "Phone number not available",
      address: user?.school?.address ?? "Address not available",
      createdAt: user?.school?.createdAt ?? null,
      updatedAt: user?.school?.updatedAt ?? null,
    },
  };
}