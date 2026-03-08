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
import TeacherParentsView from "@/dashboard/teacher/views/ParentView";
import TeacherSubjectView from "@/dashboard/teacher/views/SubjectView";
import TeacherStudentsView from "@/dashboard/teacher/views/StudentsView";
import AssignmentsView from "@/dashboard/teacher/views/AssignmentsView";
import AssignmentsCreateView from "@/dashboard/teacher/views/AssignmentsCreateView";
import AssignmentsEditView from "@/dashboard/teacher/views/AssignmentsEditView";
import AnnouncementsView from "@/dashboard/teacher/views/AnnouncementsView";
import AnnouncementCreateView from "@/dashboard/teacher/views/AnnouncementCreateView";
import AnnouncementEditView from "@/dashboard/teacher/views/AnnouncementEditView";
import ExamsView from "@/dashboard/teacher/views/ExamsView";
import ExamsCreateView from "@/dashboard/teacher/views/ExamsCreateView";
import ExamsEditView from "@/dashboard/teacher/views/ExamsEditView";
import QuizView from "@/dashboard/teacher/views/QuizView";
import QuizCreateView from "@/dashboard/teacher/views/QuizCreateView";
import QuizEditView from "@/dashboard/teacher/views/QuizEditView";
import TeacherScheduleView from "@/dashboard/teacher/views/ScheduleView";
import TeacherSupportView from "@/dashboard/teacher/views/SupportView";
import TeacherGeneralSettingsView from "@/dashboard/teacher/views/settings/GeneralSettingsView";
import TeacherAccountSettingsView from "@/dashboard/teacher/views/settings/AccountSettingsView";
import TeacherSubjectDetailsView from "@/dashboard/teacher/views/SubjectDetailsView";
import SubjectModuleContentView from "@/dashboard/teacher/views/SubjectModuleContentView";
import SubjectModulesView from "@/dashboard/teacher/views/SubjectModulesView";
import SubjectModuleView from "@/dashboard/teacher/views/SubjectModuleView";
import SubjectUploadModuleView from "@/dashboard/teacher/views/SubjectUploadModuleView";
import TeacherAttendanceView from "@/dashboard/teacher/views/AttendanceView";
import CreateAttendanceListView from "@/dashboard/teacher/views/CreateAttendanceListView";
import AttendanceEditView from "@/dashboard/teacher/views/AttendanceEditView";
import GradesView from "@/dashboard/teacher/views/GradesView";
import CreateGradeListView from "@/dashboard/teacher/views/CreateGradeListView";
import ExportGradesView from "@/dashboard/teacher/views/ExportGradesView";
import GradeSubmissionsView from "@/dashboard/teacher/views/GradeSubmissionsView";
import GradeSubmissionDetailsView from "@/dashboard/teacher/views/GradeSubmissionDetailsView";
import GradeItemSubmissionsView from "@/dashboard/teacher/views/GradeItemSubmissionsView";
import GradeItemSubmissionDetailsView from "@/dashboard/teacher/views/GradeItemSubmissionDetailsView";
import GradeItemSubmittedListView from "@/dashboard/teacher/views/GradeItemSubmittedListView";
import GradeItemNotSubmittedListView from "@/dashboard/teacher/views/GradeItemNotSubmittedListView";
import MessagesView from "@/dashboard/teacher/views/MessagesView";
import MessageDetailsView from "@/dashboard/teacher/views/MessageDetailsView";
import QuestionBuilderCreateView from "@/dashboard/teacher/views/questions/QuestionBuilderCreateView";
import QuestionBuilderEditView from "@/dashboard/teacher/views/questions/QuestionBuilderEditView";


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

        {/* STUDENT */}
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

        {/* TEACHER */}
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
          <Route path="assignments">
            <Route index element={<AssignmentsView />} />
            <Route path="create" element={<AssignmentsCreateView />} />
            <Route path=":assignmentId/edit" element={<AssignmentsEditView />} />
          </Route>
          <Route path="announcements">
            <Route index element={<AnnouncementsView />} />
            <Route path="create" element={<AnnouncementCreateView />} />
            <Route path="edit/:announcementId" element={<AnnouncementEditView />} />
          </Route>
          <Route path="exams">
            <Route index element={<ExamsView />} />
            <Route path="create" element={<ExamsCreateView />} />
            <Route path=":examId/edit" element={<ExamsEditView />} />
          </Route>
          <Route path="quiz">
            <Route index element={<QuizView />} />
            <Route path="create" element={<QuizCreateView />} />
            <Route path=":quizId/edit" element={<QuizEditView />} />
          </Route>
          <Route path="schedule" element={<TeacherScheduleView />} />
          <Route path="attendance" element={<TeacherAttendanceView />} />
          <Route path="attendance/create" element={<CreateAttendanceListView />} />
          <Route path="attendance/:attendanceId/edit" element={<AttendanceEditView />} />
          <Route path="grades" element={<GradesView />} />
          <Route path="grades/workspace" element={<GradesView />} />
          <Route path="grades/workspace/:itemId" element={<GradeItemSubmissionsView />} />
          <Route path="grades/workspace/:itemId/submitted" element={<GradeItemSubmittedListView />} />
          <Route path="grades/workspace/:itemId/not-submitted" element={<GradeItemNotSubmittedListView />} />
          <Route
            path="grades/workspace/:itemId/submissions/:submissionId"
            element={<GradeItemSubmissionDetailsView />}
          />
          <Route path="grades/create" element={<CreateGradeListView />} />
          <Route path="grades/export" element={<ExportGradesView />} />
          <Route path="grades/submissions" element={<GradeSubmissionsView />} />
          <Route path="grades/submissions/:submissionId" element={<GradeSubmissionDetailsView />} />
          <Route path="questions/create" element={<QuestionBuilderCreateView />} />
          <Route path="questions/edit/:itemId" element={<QuestionBuilderEditView />} />
          <Route path="support" element={<TeacherSupportView />} />
          <Route path="parents" element={<TeacherParentsView />} />
          <Route path="subjects/:subjectId" element={<TeacherSubjectDetailsView />} />
          <Route path="subjects/:subjectId/modules" element={<SubjectModulesView />} />
          <Route
            path="subjects/:subjectId/modules/:moduleId/submodules/:submoduleId"
            element={<SubjectModuleContentView />}
          />
          <Route path="subjects/:subjectId/upload-module" element={<SubjectUploadModuleView />} />
          <Route path="messages" element={<MessagesView />} />
          <Route path="messages/:messageId" element={<MessageDetailsView />} />
          <Route path="subjects/:subjectId/modules/:moduleId" element={<SubjectModuleView />} />
          <Route path="settings">
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<TeacherGeneralSettingsView />} />
            <Route path="account" element={<TeacherAccountSettingsView />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard/teacher/overview" replace />} />  
        </Route>
         


        {/* SCHOOL ADMIN */}
        <Route
          path="/dashboard/schooladmin"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.SCHOOL_ADMIN}>
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

        {/* Other dashboards */}
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




