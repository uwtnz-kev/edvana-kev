import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Settings, User, Bell, Lock } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-brand-teal" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                defaultValue="John" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                defaultValue="Doe" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue="john.doe@teacher.rw" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                defaultValue="+250 780 123 456" 
                className="glass-input"
              />
            </div>
            <Button className="glass-button text-white">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-brand-accent" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Student Submissions</Label>
                <p className="text-sm text-gray-600">Notify when students submit work</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Course Updates</Label>
                <p className="text-sm text-gray-600">Updates about course changes</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">System Announcements</Label>
                <p className="text-sm text-gray-600">Important platform updates</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass-card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2 text-brand-brown" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    className="glass-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    className="glass-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    className="glass-input"
                  />
                </div>
                <Button variant="outline" className="glass-button-secondary">
                  Change Password
                </Button>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" className="glass-button-secondary">
                    Enable 2FA
                  </Button>
                </div>
                <div className="glass-card p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Login Sessions</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Manage your active login sessions
                  </p>
                  <Button variant="outline" className="glass-button-secondary">
                    View Sessions
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}