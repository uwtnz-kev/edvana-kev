import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OverviewView } from './views/OverviewView';
import { SystemView } from './views/SystemView';
import { SchoolsView } from './views/SchoolsView';
import { UsersView } from './views/UsersView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsView } from './views/SettingsView';

export function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OverviewView />} />
      <Route path="/overview" element={<OverviewView />} />
      <Route path="/system" element={<SystemView />} />
      <Route path="/schools" element={<SchoolsView />} />
      <Route path="/users" element={<UsersView />} />
      <Route path="/analytics" element={<AnalyticsView />} />
      <Route path="/settings" element={<SettingsView />} />
      <Route path="*" element={<OverviewView />} />
    </Routes>
  );
}