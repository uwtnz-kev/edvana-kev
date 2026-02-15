import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { SelfStudentSidebar } from './components/SelfStudentSidebar';
import { SelfStudentRoutes } from './routes';

export function SelfStudentDashboard() {
  return (
    <DashboardLayout 
      sidebar={<SelfStudentSidebar />}
      title="Self Student Dashboard"
    >
      <SelfStudentRoutes />
    </DashboardLayout>
  );
}