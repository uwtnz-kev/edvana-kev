import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StudentSidebar } from './components/StudentSidebar';
import { StudentRoutes } from './routes';

export function StudentDashboard() {
  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />}
      title="Student Dashboard"
    >
      <StudentRoutes />
    </DashboardLayout>
  );
}