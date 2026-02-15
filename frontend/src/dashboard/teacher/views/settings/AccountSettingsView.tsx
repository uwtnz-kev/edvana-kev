import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";

import { AccountEditForm } from "@/dashboard/student/components/settings/Account/AccountEditForm";
import TeacherProfileInformation from "../../components/settings/Account/TeacherProfileInformation";


interface AccountFormData {
  fullName: string;
  email: string;
  currentPassword: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function AccountSettingsView() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const teacherProfile = {
    fullName: user ? `${user.firstName} ${user.lastName}` : "Teacher Name",
    email: user?.email || "teacher@school.edu",
    role: "Teacher",
    subjects: "Mathematics, Physics",
    classes: "S3A, S3B, S4A",
    schoolName: user?.school?.name || "School Name",
    academicPeriod: "Term 2, 2025",
    termStartDate: "January 27, 2025",
    termEndDate: "May 10, 2025",
  };

  const handleFormSubmit = async (data: AccountFormData) => {
    setIsLoading(true);
    try {
      const first = data.fullName.split(" ")[0] || user?.firstName || "";
      const last = data.fullName.split(" ").slice(1).join(" ") || user?.lastName || "";

      updateUser({
        ...(user as any),
        firstName: first,
        lastName: last,
        email: data.email,
      });

      if (data.newPassword) {
        toast({
          title: "Password update",
          description: "Password update will be enabled when the backend endpoint is available.",
        });
      }

      toast({
        title: "Account updated successfully",
        description: "Your account information has been saved.",
      });
    } catch {
      toast({
        title: "Update failed",
        description: "There was an error updating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            <p className="text-white/70">Manage your personal information and security</p>
          </div>
        </div>

        <TeacherProfileInformation profile={teacherProfile} />

        <AccountEditForm
          user={{ fullName: teacherProfile.fullName, email: teacherProfile.email }}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
