import React, { useState } from 'react';
import { Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GeneralForm, GeneralSummary } from '../../components/settings';

export default function GeneralSettingsView() {
  const [activeTab, setActiveTab] = useState<'form' | 'summary'>('form');

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-blue-900">General Settings</h1>
            <p className="text-blue-900/70 max-w-3xl">
              Configure school information, contact details, and system preferences.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setActiveTab('summary')}
              variant={activeTab === 'summary' ? 'default' : 'ghost'}
              className={
                activeTab === 'summary'
                  ? 'bg-brand-accent text-white hover:bg-brand-accent/80 rounded-xl'
                  : 'text-blue-900 hover:bg-white/20 rounded-xl'
              }
            >
              <Info className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              onClick={() => setActiveTab('form')}
              variant={activeTab === 'form' ? 'default' : 'ghost'}
              className={
                activeTab === 'form'
                  ? 'bg-brand-accent text-white hover:bg-brand-accent/80 rounded-xl'
                  : 'text-blue-900 hover:bg-white/20 rounded-xl'
              }
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Settings
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'form' ? <GeneralForm /> : <GeneralSummary />}
      </div>
    </div>
  );
}