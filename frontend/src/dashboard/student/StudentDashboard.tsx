// src/dashboard/student/StudentDashboard.tsx
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StudentNavbar } from "./layout/StudentNavbar";
import { StudentSidebar } from "./layout/StudentSidebar";

export default function StudentDashboard() {
  return (
    <DashboardLayout navbar={<StudentNavbar />} sidebar={<StudentSidebar />} />
  );
}
