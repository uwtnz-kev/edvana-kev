import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OverviewView } from './views/OverviewView';
import { ChildrenView } from './views/ChildrenView';
import { ProgressView } from './views/ProgressView';
import { CommunicationView } from './views/CommunicationView';
import { SettingsView } from './views/SettingsView';

export function ParentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OverviewView />} />
      <Route path="/overview" element={<OverviewView />} />
      <Route path="/children" element={<ChildrenView />} />
      <Route path="/progress" element={<ProgressView />} />
      <Route path="/communication" element={<CommunicationView />} />
      <Route path="/settings" element={<SettingsView />} />
      <Route path="*" element={<OverviewView />} />
    </Routes>
  );
}