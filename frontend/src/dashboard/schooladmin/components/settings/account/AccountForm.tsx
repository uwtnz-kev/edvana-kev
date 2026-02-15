import React, { useState } from 'react';
import { Save, User, Mail, Phone, Building, Calendar, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AccountForm() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'Dr. Sarah Mukamana',
    email: 'sarah.mukamana@edvana.edu.rw',
    phoneNumber: '+250 788 234 567',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isPersonalLoading, setIsPersonalLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const { toast } = useToast();

  const personalForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
  });

  const passwordForm = useForm<PasswordChange>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handlePersonalInfoSubmit = async (data: PersonalInfo) => {
    setIsPersonalLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPersonalInfo(data);
      
      toast({
        title: "Personal Information Updated",
        description: "Your personal information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save personal information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPersonalLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: PasswordChange) => {
    setIsPasswordLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Reset form after successful change
      passwordForm.reset();
      
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Account Summary - Read-only */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-teal/20 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-brand-teal" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Account Overview</h3>
            <p className="text-sm text-blue-900/70">Your current account information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="text-sm text-blue-900/70">Full Name</div>
                <div className="text-black font-medium">{personalInfo.fullName}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="text-sm text-blue-900/70">Role</div>
                <div className="text-black font-medium">School Administrator</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="text-sm text-blue-900/70">School</div>
                <div className="text-black font-medium">Edvana International</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="text-sm text-blue-900/70">Academic Period</div>
                <div className="text-black font-medium">2024-2025</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="text-sm text-blue-900/70">Email</div>
                <div className="text-black font-medium text-sm">{personalInfo.email}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="text-sm text-blue-900/70">Phone</div>
                <div className="text-black font-medium">{personalInfo.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Personal Information</h3>
            <p className="text-sm text-blue-900/70">Update your basic profile details</p>
          </div>
        </div>

        <form onSubmit={personalForm.handleSubmit(handlePersonalInfoSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullName" className="text-blue-900 font-medium">Full Name</Label>
              <Input
                id="fullName"
                {...personalForm.register('fullName')}
                className="bg-white/10 border-white/30 text-black placeholder:text-black/60 rounded-xl"
                placeholder="Enter your full name"
              />
              {personalForm.formState.errors.fullName && (
                <p className="text-red-300 text-sm">{personalForm.formState.errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...personalForm.register('email')}
                className="bg-white/10 border-white/30 text-black placeholder:text-black/60 rounded-xl"
                placeholder="your.email@school.edu"
              />
              {personalForm.formState.errors.email && (
                <p className="text-red-300 text-sm">{personalForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-blue-900 font-medium">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                {...personalForm.register('phoneNumber')}
                className="bg-white/10 border-white/30 text-black placeholder:text-black/60 rounded-xl"
                placeholder="+250 XXX XXX XXX"
              />
              {personalForm.formState.errors.phoneNumber && (
                <p className="text-red-300 text-sm">{personalForm.formState.errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isPersonalLoading}
              className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              {isPersonalLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Change Password</h3>
            <p className="text-sm text-blue-900/70">Update your account password</p>
          </div>
        </div>

        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
          <p className="text-sm text-black/70 bg-white/10 p-3 rounded-xl border border-white/20">
            Leave fields blank if you don't want to change your password.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-blue-900 font-medium">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  {...passwordForm.register('currentPassword')}
                  className="bg-white/10 border-white/30 text-black placeholder:text-black/60 rounded-xl pr-12"
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4 text-black/60" />
                  ) : (
                    <Eye className="h-4 w-4 text-black/60" />
                  )}
                </Button>
              </div>
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-red-300 text-sm">{passwordForm.formState.errors.currentPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-blue-900 font-medium">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  {...passwordForm.register('newPassword')}
                  className="bg-white/10 border-white/30 text-black placeholder:text-black/60 rounded-xl pr-12"
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4 text-black/60" />
                  ) : (
                    <Eye className="h-4 w-4 text-black/60" />
                  )}
                </Button>
              </div>
              {passwordForm.formState.errors.newPassword && (
                <p className="text-red-300 text-sm">{passwordForm.formState.errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-900 font-medium">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  {...passwordForm.register('confirmPassword')}
                  className="bg-white/10 border-white/30 text-black placeholder:text-black/60 rounded-xl pr-12"
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4 text-black/60" />
                  ) : (
                    <Eye className="h-4 w-4 text-black/60" />
                  )}
                </Button>
              </div>
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-red-300 text-sm">{passwordForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isPasswordLoading}
              className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              {isPasswordLoading ? 'Changing...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}