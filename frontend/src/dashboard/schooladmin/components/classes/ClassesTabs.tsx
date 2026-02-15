import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ClassesTabsProps {
  activeTab: 'level' | 'grade' | 'subgrade';
  onTabChange: (tab: 'level' | 'grade' | 'subgrade') => void;
}

export default function ClassesTabs({ activeTab, onTabChange }: ClassesTabsProps) {
  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as any)}>
        <TabsList className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-1">
          <TabsTrigger 
            value="level" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-blue-900 data-[state=active]:font-semibold text-white/70 hover:text-white transition-all rounded-lg px-6 py-2"
          >
            By Level
          </TabsTrigger>
          <TabsTrigger 
            value="grade" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-blue-900 data-[state=active]:font-semibold text-white/70 hover:text-white transition-all rounded-lg px-6 py-2"
          >
            By Grade
          </TabsTrigger>
          <TabsTrigger 
            value="subgrade" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-blue-900 data-[state=active]:font-semibold text-white/70 hover:text-white transition-all rounded-lg px-6 py-2"
          >
            By Sub-grade
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}