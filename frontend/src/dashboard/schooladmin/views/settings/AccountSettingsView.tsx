import React, { useState } from 'react';
import { User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccountForm, SecurityPanel } from '../../components/settings';

export default function AccountSettingsView() {
  const [activeTab, setActiveTab] = useState<'account' | 'security'>('account');

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-blue-900">Account Settings</h1>
            <p className="text-blue-900/70 max-w-3xl">
              Manage your personal information and security preferences.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setActiveTab('account')}
              variant={activeTab === 'account' ? 'default' : 'ghost'}
              className={
                activeTab === 'account'
                  ? 'bg-brand-accent text-white hover:bg-brand-accent/80 rounded-xl'
                  : 'text-blue-900 hover:bg-white/20 rounded-xl'
              }
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              onClick={() => setActiveTab('security')}
              variant={activeTab === 'security' ? 'default' : 'ghost'}
              className={
                activeTab === 'security'
                  ? 'bg-brand-accent text-white hover:bg-brand-accent/80 rounded-xl'
                  : 'text-blue-900 hover:bg-white/20 rounded-xl'
              }
            >
              <Shield className="w-4 h-4 mr-2" />
              Security
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'account' ? <AccountForm /> : <SecurityPanel />}
      </div>
    </div>
  );
}