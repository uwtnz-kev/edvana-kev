import {
  TeacherGreeting,
  SummaryCards,
  WeeklyProgress,
} from "../components/overview";
import { Users, ClipboardList, Bot, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Overview() {
  const { user } = useAuth();

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-8">
        <TeacherGreeting
          teacherName={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
          subtitle="Ready to teach today?"
        />

        <SummaryCards
          totalSubjects={5}
          totalStudents={148}
          pendingSubmissions={23}
          weeklyHours={18}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyProgress
            lessonsGoal={12}
            lessonsCompleted={8}
            gradingGoal={25}
            gradingCompleted={14}
          />

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="w-3 h-3 bg-[#1EA896] rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">
                    14 assignments submitted
                  </p>
                  <p className="text-white/60 text-xs">
                    1 hour ago • Class S3A
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="w-3 h-3 bg-[#FF715B] rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">
                    Quiz published: Algebra Unit 2
                  </p>
                  <p className="text-white/60 text-xs">
                    Yesterday • 3 classes assigned
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="w-3 h-3 bg-[#4C5454] rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">
                    Lesson plan updated
                  </p>
                  <p className="text-white/60 text-xs">
                    2 days ago • Science Lab
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#1EA896]/20 to-[#1EA896]/10 hover:from-[#1EA896]/30 hover:to-[#1EA896]/20 border border-[#1EA896]/30 rounded-xl transition-all duration-200">
              <div className="w-8 h-8 bg-[#1EA896] rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-medium">Students</span>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#FF715B]/20 to-[#FF715B]/10 hover:from-[#FF715B]/30 hover:to-[#FF715B]/20 border border-[#FF715B]/30 rounded-xl transition-all duration-200">
              <div className="w-8 h-8 bg-[#FF715B] rounded-lg flex items-center justify-center">
                <ClipboardList className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-medium">Assignments</span>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#4C5454]/20 to-[#4C5454]/10 hover:from-[#4C5454]/30 hover:to-[#4C5454]/20 border border-[#4C5454]/30 rounded-xl transition-all duration-200">
              <div className="w-8 h-8 bg-[#4C5454] rounded-lg flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-medium">AI Tutor</span>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#523F38]/20 to-[#523F38]/10 hover:from-[#523F38]/30 hover:to-[#523F38]/20 border border-[#523F38]/30 rounded-xl transition-all duration-200">
              <div className="w-8 h-8 bg-[#523F38] rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-medium">Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
