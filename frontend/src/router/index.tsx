// src/router/index.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { USER_ROLES } from "../constants/roles";

// Public pages
import HomePage from "@/pages/home/HomePage";
import Login from "@/pages/Login";
import SchoolInquiry from "@/pages/SchoolInquiry";
import NotFound from "@/pages/NotFound";
import SelfStudentSignup from "@/dashboard/selfstudent/SelfStudentSignUp";
import SelfTeacherSignup from "@/dashboard/selfteacher/SelfTeacherSignUp";

// Student Dashboard
import StudentDashboard from "@/dashboard/student/StudentDashboard";
import StudentOverview from "@/dashboard/student/views/Overview";
import StudentSubjectsView from "@/dashboard/student/views/SubjectsView";
import StudentExamsView from "@/dashboard/student/views/ExamsView";
import StudentChatbotView from "@/dashboard/student/views/ai-tutor/ChatbotView";
import StudentQuizGeneratorView from "@/dashboard/student/views/ai-tutor/QuizGeneratorView";
import StudentAssignmentsView from "@/dashboard/student/views/AssignmentsView";
import StudentScheduleView from "@/dashboard/student/views/ScheduleView";
import StudentResourcesView from "@/dashboard/student/views/ResourcesView";
import StudentAccountSettingsView from "@/dashboard/student/views/settings/AccountSettingsView";
import StudentGeneralSettingsView from "@/dashboard/student/views/settings/GeneralSettingsView";
import StudentSupportView from "@/dashboard/student/views/SupportView";
import { StudentDashboardErrorFallback } from "@/dashboard/student/states/ErrorBoundary";

// Teacher Dashboard
import TeacherDashboard from "@/dashboard/teacher/TeacherDashboard";
import TeacherOverview from "@/dashboard/teacher/views/Overview";
import TeacherSubjectView from "@/dashboard/teacher/views/SubjectView";
import TeacherStudentsView from "@/dashboard/teacher/views/StudentsView";
import TeacherAssignmentsView from "@/dashboard/teacher/views/AssignmentsView";
import TeacherExamsView from "@/dashboard/teacher/views/ExamsView";
import TeacherResourcesView from "@/dashboard/teacher/views/ResourcesView";
import TeacherScheduleView from "@/dashboard/teacher/views/ScheduleView";
import TeacherSupportView from "@/dashboard/teacher/views/SupportView";
import TeacherChatbotView from "@/dashboard/teacher/views/ai-tutor/ChatbotView";
import TeacherQuizGeneratorView from "@/dashboard/teacher/views/ai-tutor/QuizGeneratorView";
import TeacherGeneralSettingsView from "@/dashboard/teacher/views/settings/GeneralSettingsView";
import TeacherAccountSettingsView from "@/dashboard/teacher/views/settings/AccountSettingsView";

// School Admin Dashboard
import SchoolAdminDashboard from "@/dashboard/schooladmin/SchoolAdminDashboard";
import SchoolAdminOverview from "@/dashboard/schooladmin/views/Overview";
import SchoolAdminSubjectsView from "@/dashboard/schooladmin/views/SubjectsView";
import SchoolAdminRolesView from "@/dashboard/schooladmin/views/RolesView";
import SchoolAdminTeachersView from "@/dashboard/schooladmin/views/TeachersView";
import SchoolAdminClassesView from "@/dashboard/schooladmin/views/ClassesView";
import SchoolAdminStudentsView from "@/dashboard/schooladmin/views/StudentsView";
import SchoolAdminResourcesView from "@/dashboard/schooladmin/views/ResourcesView";
import SchoolAdminEdvanaBankView from "@/dashboard/schooladmin/views/EdvanaBankView";
import SchoolAdminParentsView from "@/dashboard/schooladmin/views/ParentsView";
import SchoolAdminSupportView from "@/dashboard/schooladmin/views/SupportView";
import {
  GeneralSettingsView,
  AccountSettingsView,
} from "@/dashboard/schooladmin/views/settings";
import { SchoolAdminDashboardErrorFallback } from "@/dashboard/schooladmin/states/ErrorBoundary";

// Other dashboards
import { SelfStudentDashboard } from "@/dashboard/selfstudent/SelfStudentDashboard";
import { ParentDashboard } from "@/dashboard/parent/ParentDashboard";
import { SuperAdminDashboard } from "@/dashboard/superadmin/SuperAdminDashboard";

export function AppRouter() {
  return (
   <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>

        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/school-inquiry" element={<SchoolInquiry />} />
        <Route path="/selfstudent/student-signup" element={<SelfStudentSignup />} />
        <Route path="/selfteacher/teacher-signup" element={<SelfTeacherSignup />} />

        {/* STUDENT (nested) */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentOverview />} />
          <Route path="overview" element={<StudentOverview />} />
          <Route path="subjects" element={<StudentSubjectsView />} />
          <Route path="exams" element={<StudentExamsView />} />
          <Route path="assignments" element={<StudentAssignmentsView />} />
          <Route path="schedule" element={<StudentScheduleView />} />
          <Route path="resources" element={<StudentResourcesView />} />
          <Route path="support" element={<StudentSupportView />} />

          <Route path="ai-tutor">
            <Route index element={<Navigate to="chatbot" replace />} />
            <Route path="chatbot" element={<StudentChatbotView />} />
            <Route path="quiz-generator" element={<StudentQuizGeneratorView />} />
          </Route>

          <Route path="settings">
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<StudentGeneralSettingsView />} />
            <Route path="account" element={<StudentAccountSettingsView />} />
          </Route>

          <Route path="*" element={<StudentDashboardErrorFallback />} />
        </Route>

        {/* TEACHER (nested) */}
        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.TEACHER}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherOverview />} />
          <Route path="overview" element={<TeacherOverview />} />
          <Route path="subjects" element={<TeacherSubjectView />} />
          <Route path="students" element={<TeacherStudentsView />} />
          <Route path="assignments" element={<TeacherAssignmentsView />} />
          <Route path="exams" element={<TeacherExamsView />} />
          <Route path="resources" element={<TeacherResourcesView />} />
          <Route path="schedule" element={<TeacherScheduleView />} />
          <Route path="support" element={<TeacherSupportView />} />

          <Route path="ai-tutor">
            <Route index element={<Navigate to="chatbot" replace />} />
            <Route path="chatbot" element={<TeacherChatbotView />} />
            <Route path="quiz-generator" element={<TeacherQuizGeneratorView />} />
          </Route>

          <Route path="settings">
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<TeacherGeneralSettingsView />} />
            <Route path="account" element={<TeacherAccountSettingsView />} />
          </Route>

          <Route path="*" element={<Navigate to="overview" replace />} />
        </Route>

        {/* SCHOOL ADMIN (nested) */}
        <Route
          path="/dashboard/schooladmin"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <SchoolAdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<SchoolAdminOverview />} />
          <Route path="overview" element={<SchoolAdminOverview />} />
          <Route path="subjects" element={<SchoolAdminSubjectsView />} />
          <Route path="roles" element={<SchoolAdminRolesView />} />
          <Route path="teachers" element={<SchoolAdminTeachersView />} />
          <Route path="classes" element={<SchoolAdminClassesView />} />
          <Route path="students" element={<SchoolAdminStudentsView />} />
          <Route path="resources" element={<SchoolAdminResourcesView />} />
          <Route path="edvana-bank" element={<SchoolAdminEdvanaBankView />} />
          <Route path="parents" element={<SchoolAdminParentsView />} />
          <Route path="support" element={<SchoolAdminSupportView />} />
          <Route path="settings">
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<GeneralSettingsView />} />
            <Route path="account" element={<AccountSettingsView />} />
          </Route>
          <Route path="*" element={<SchoolAdminDashboardErrorFallback />} />
        </Route>

        {/* Other Dashboards */}
        <Route
          path="/dashboard/selfstudent/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.SELFSTUDENT}>
              <SelfStudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/parent/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.PARENT}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/superadmin/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.SUPER_ADMIN}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
