import { useCurrentUser } from "@/hooks/useAuth";

export function useSchoolAdminProfile() {
  const user = useCurrentUser();
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  return {
    // User info
    fullName,
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "Email not available",
    phone: user?.phone ?? "Phone number not available",
    role: user?.role ?? "School Administrator",
    avatar: user?.avatar ?? null,
    status: user?.status ?? "ACTIVE",
    createdAt: user?.createdAt ?? null,
    updatedAt: user?.updatedAt ?? null,

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