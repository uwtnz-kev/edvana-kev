import React, { useState } from 'react';
import { Save, Shield, Key, Eye, EyeOff, Smartphone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: string;
  loginNotifications: boolean;
  deviceTrust: boolean;
}

export default function SecurityPanel() {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: true,
    sessionTimeout: '60',
    loginNotifications: true,
    deviceTrust: false
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSettingToggle = (setting: keyof SecuritySettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePasswordChange = (field: keyof typeof passwordForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Security Settings Updated",
        description: "Your security preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save security settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Password Management */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
            <Key className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Change Password</h3>
            <p className="text-sm text-blue-900/70">Update your account password</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-blue-900 font-medium">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange('currentPassword')}
                className="bg-white/10 border-white/30 text-blue-900 placeholder:text-blue-900/60 rounded-xl pr-10"
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-blue-900/60 hover:text-blue-900"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-blue-900 font-medium">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange('newPassword')}
                  className="bg-white/10 border-white/30 text-blue-900 placeholder:text-blue-900/60 rounded-xl pr-10"
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-blue-900/60 hover:text-blue-900"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-900 font-medium">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange('confirmPassword')}
                  className="bg-white/10 border-white/30 text-blue-900 placeholder:text-blue-900/60 rounded-xl pr-10"
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-blue-900/60 hover:text-blue-900"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handlePasswordSubmit}
              disabled={isLoading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
            >
              <Key className="w-4 h-4 mr-2" />
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Two-Factor Authentication</h3>
            <p className="text-sm text-blue-900/70">Add an extra layer of security to your account</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="font-medium text-blue-900">SMS Authentication</div>
                <div className="text-sm text-blue-900/70">Receive codes via text message</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={settings.twoFactorEnabled ? "bg-green-500/20 text-green-600 border border-green-500/40" : "bg-gray-500/20 text-gray-600 border border-gray-500/40"}>
                {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
              <Switch
                checked={settings.twoFactorEnabled}
                onCheckedChange={() => handleSettingToggle('twoFactorEnabled')}
              />
            </div>
          </div>

          {settings.twoFactorEnabled && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="text-sm text-green-700">
                  <div className="font-medium mb-1">Two-factor authentication is active</div>
                  <div>You'll receive a verification code via SMS (+250 ••• ••• 567) whenever you sign in from a new device.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Preferences */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Security Preferences</h3>
            <p className="text-sm text-blue-900/70">Configure login and session settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
            <div>
              <div className="font-medium text-blue-900">Login Notifications</div>
              <div className="text-sm text-blue-900/70">Get notified when someone signs into your account</div>
            </div>
            <Switch
              checked={settings.loginNotifications}
              onCheckedChange={() => handleSettingToggle('loginNotifications')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
            <div>
              <div className="font-medium text-blue-900">Device Trust</div>
              <div className="text-sm text-blue-900/70">Remember trusted devices for 30 days</div>
            </div>
            <Switch
              checked={settings.deviceTrust}
              onCheckedChange={() => handleSettingToggle('deviceTrust')}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSecuritySave}
            disabled={isLoading}
            className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Security Settings'}
          </Button>
        </div>
      </div>
    </div>
  );
}