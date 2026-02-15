import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { ParentSidebar } from './components/ParentSidebar';
import { ParentRoutes } from './routes';

export function ParentDashboard() {
  return (
    <DashboardLayout 
      sidebar={<ParentSidebar />}
      title="Parent Dashboard"
    >
      <ParentRoutes />
    </DashboardLayout>
  );
}