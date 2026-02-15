import React, { useState, useEffect } from 'react';
import { Save, Bell, Eye, Info, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettings {
  emailNotifications: boolean;
  studyReminders: boolean;
}

interface AppearanceSettings {
  darkMode: boolean;
  settingsSync: boolean;
}

export default function GeneralForm() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    studyReminders: false,
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    darkMode: false,
    settingsSync: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('schooladmin-notifications');
    const savedAppearance = localStorage.getItem('schooladmin-appearance');

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    if (savedAppearance) {
      setAppearance(JSON.parse(savedAppearance));
    }
  }, []);

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('schooladmin-notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Preferences Saved",
        description: "Your notification preferences have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Notifications */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Notifications</h3>
            <p className="text-sm text-blue-900/70">Configure your notification preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-black font-medium">Email Notifications</div>
              <div className="text-black/70 text-sm">Receive important updates via email</div>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={() => handleNotificationToggle('emailNotifications')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-black font-medium">Study Reminders</div>
              <div className="text-black/70 text-sm">Get reminders about upcoming deadlines</div>
            </div>
            <Switch
              checked={notifications.studyReminders}
              onCheckedChange={() => handleNotificationToggle('studyReminders')}
            />
          </div>

          <div className="pt-4 border-t border-white/20">
            <Button
              onClick={handleSavePreferences}
              disabled={isLoading}
              className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-teal/20 rounded-xl flex items-center justify-center">
            <Palette className="w-5 h-5 text-brand-teal" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Appearance</h3>
            <p className="text-sm text-blue-900/70">Customize your interface preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-black font-medium">Dark Mode</span>
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                  Coming Soon
                </Badge>
              </div>
              <div className="text-black/70 text-sm">Switch to dark theme interface</div>
            </div>
            <Switch
              checked={false}
              disabled={true}
              onCheckedChange={() => {}}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-black font-medium">Settings Sync</div>
              <div className="text-black/70 text-sm">Automatically sync preferences across devices</div>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="text-black/70 text-sm">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}