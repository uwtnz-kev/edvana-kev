import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { SuperAdminSidebar } from './components/SuperAdminSidebar';
import { SuperAdminRoutes } from './routes';

export function SuperAdminDashboard() {
  return (
    <DashboardLayout 
      sidebar={<SuperAdminSidebar />}
      title="Super Admin Dashboard"
    >
      <SuperAdminRoutes />
    </DashboardLayout>
  );
}