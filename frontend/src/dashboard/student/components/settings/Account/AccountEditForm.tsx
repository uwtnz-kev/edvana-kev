import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Eye, EyeOff, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const accountSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
  confirmPassword: z.string().optional().or(z.literal(""))
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type AccountFormData = z.infer<typeof accountSchema>;

interface AccountEditFormProps {
  user?: { fullName?: string; email?: string };
  onSubmit: (data: AccountFormData) => Promise<void>;
  isLoading: boolean;
}

export function AccountEditForm({ user, onSubmit, isLoading }: AccountEditFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  id="fullName"
                  {...form.register("fullName")}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF715B] focus:ring-[#FF715B]/20"
                  placeholder="Enter your full name"
                />
              </div>
              {form.formState.errors.fullName && (
                <p className="text-[#FF715B] text-sm">{form.formState.errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF715B] focus:ring-[#FF715B]/20"
                  placeholder="Enter your email"
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-[#FF715B] text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Change Password</h3>
          <p className="text-white/60 text-sm">Leave password fields blank if you don't want to change your password</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white font-medium">
                Current Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...form.register("currentPassword")}
                  className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF715B] focus:ring-[#FF715B]/20"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.formState.errors.currentPassword && (
                <p className="text-[#FF715B] text-sm">{form.formState.errors.currentPassword.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    {...form.register("newPassword")}
                    className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF715B] focus:ring-[#FF715B]/20"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.formState.errors.newPassword && (
                  <p className="text-[#FF715B] text-sm">{form.formState.errors.newPassword.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...form.register("confirmPassword")}
                    className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF715B] focus:ring-[#FF715B]/20"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-[#FF715B] text-sm">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80 hover:from-[#FF715B]/90 hover:to-[#FF715B]/70 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}