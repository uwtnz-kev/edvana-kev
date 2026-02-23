import { TeacherDashboardLayout } from "@/layouts/TeacherDashboardLayout";
import TeacherNavbar from "./layout/TeacherNavbar";
import TeacherSidebar from "./layout/TeacherSidebar";

export default function TeacherDashboard() {
  return (
    <TeacherDashboardLayout
      navbar={<TeacherNavbar />}
      sidebar={<TeacherSidebar />}
    />
  );
}