import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Settings, Globe, Shield, Database } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600 mt-1">Configure global platform settings and policies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Configuration */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-brand-teal" />
              Platform Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input 
                id="platformName" 
                defaultValue="Edvana Learning Platform" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platformUrl">Platform URL</Label>
              <Input 
                id="platformUrl" 
                defaultValue="https://edvana.rw" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input 
                id="supportEmail" 
                defaultValue="support@edvana.rw" 
                className="glass-input"
              />
            </div>
            <Button className="glass-button text-white">
              Update Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-brand-accent" />
              Security & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Required
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Data Encryption</Label>
                <p className="text-sm text-gray-600">Encrypt sensitive data at rest</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Audit Logging</Label>
                <p className="text-sm text-gray-600">Log all administrative actions</p>
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