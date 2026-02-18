import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import TeacherNavbar from "./layout/TeacherNavbar";
import TeacherSidebar from "./layout/TeacherSidebar";

export default function TeacherDashboard() {
  return (
    <DashboardLayout navbar={<TeacherNavbar />} sidebar={<TeacherSidebar />}>
      <Outlet />
    </DashboardLayout>
  );
}
