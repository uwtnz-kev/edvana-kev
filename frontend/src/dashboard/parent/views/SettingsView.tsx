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
        <p className="text-gray-600 mt-1">Manage your account and notification preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-brand-teal" />
              Parent Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="parentName">Full Name</Label>
              <Input 
                id="parentName" 
                defaultValue="John Uwimana" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentEmail">Email</Label>
              <Input 
                id="parentEmail" 
                type="email" 
                defaultValue="john.uwimana@parent.rw" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentPhone">Phone Number</Label>
              <Input 
                id="parentPhone" 
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
                <Label className="font-medium">Grade Updates</Label>
                <p className="text-sm text-gray-600">New grades and assessments</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Attendance Alerts</Label>
                <p className="text-sm text-gray-600">Absence notifications</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">School Announcements</Label>
                <p className="text-sm text-gray-600">Important school updates</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}