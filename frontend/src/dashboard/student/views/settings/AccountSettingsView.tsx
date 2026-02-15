import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";
import { ProfileInformation, AccountEditForm } from "../../components/settings";

interface AccountFormData {
  fullName: string;
  email: string;
  currentPassword: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function AccountSettingsView() {
  const { user, updateUser, updatePassword } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Student profile data - in a real app, this would come from user context or API
  const studentProfile = {
    fullName: user?.fullName || "Alice Umutoni",
    email: user?.email || "alice.umutoni@student.gov.rw",
    role: "Student",
    gradeLevel: "S3",
    gradeCombination: "Science",
    subGrade: "A",
    schoolName: "Lycée de Kigali",
    parentName: "Jean Baptiste Umutoni",
    currentTrimester: "Trimester 2, 2025",
    trimesterStartDate: "January 27, 2025",
    trimesterEndDate: "May 10, 2025",
  };

  const handleFormSubmit = async (data: AccountFormData) => {
    setIsLoading(true);
    try {
      // Update user profile
      updateUser({
        fullName: data.fullName,
        email: data.email,
      });

      // Update password if provided
      if (data.newPassword) {
        await updatePassword(data.currentPassword, data.newPassword);
      }

      toast({
        title: "Account updated successfully",
        description: "Your account information has been saved.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description:
          "There was an error updating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            <p className="text-white/70">
              Manage your personal information and security
            </p>
          </div>
        </div>

        {/* Profile Information Section */}
        <ProfileInformation profile={studentProfile} />

        {/* Account Edit Form */}
        <AccountEditForm
          user={user || undefined}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
