import { useMemo, useState } from "react";
import { TeacherGreeting, SummaryCards, WeeklyProgress } from "../components/overview";
import { useAuth } from "@/context/AuthContext";

type ActivityItem = {
  id: string;
  tone: "teal" | "coral" | "slate";
  title: string;
  meta: string;
};

function toneDot(tone: ActivityItem["tone"]) {
  if (tone === "teal") return "bg-[#1EA896]";
  if (tone === "coral") return "bg-[#FF715B]";
  return "bg-[#4C5454]";
}

export default function Overview() {
  const { user } = useAuth();
  const [activityExpanded, setActivityExpanded] = useState(false);

  const activities: ActivityItem[] = useMemo(
    () => [
      { id: "a1", tone: "teal", title: "14 assignments submitted", meta: "1 hour ago • Class S3A" },
      { id: "a2", tone: "coral", title: "Quiz published: Algebra Unit 2", meta: "Yesterday • 3 classes assigned" },
      { id: "a3", tone: "slate", title: "Lesson plan updated", meta: "2 days ago • Science Lab" },
      { id: "a4", tone: "teal", title: "New student joined your class", meta: "2 days ago • Class S2B" },
      { id: "a5", tone: "coral", title: "Assignment deadline approaching", meta: "Tomorrow • Math S3A" },
      { id: "a6", tone: "slate", title: "Grades exported", meta: "3 days ago • Term report" },
    ],
    []
  );

  const visibleActivities = activityExpanded ? activities : activities.slice(0, 3);

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-8">
        <TeacherGreeting
          teacherName={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "Teacher"}
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

          <section
            className="
              group
              bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6
              transition-all duration-300
              hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1
              min-w-0
            "
            aria-label="Recent activity"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>

              <button
                type="button"
                className="text-white/80 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-white/15 bg-white/5"
                onClick={() => setActivityExpanded((v) => !v)}
                aria-expanded={activityExpanded}
              >
                {activityExpanded ? "Hide" : "View all"}
              </button>
            </div>

            <div className="space-y-3">
              {visibleActivities.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 min-w-0"
                >
                  <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${toneDot(item.tone)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium break-words">{item.title}</p>
                    <p className="text-white/60 text-xs break-words">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            {!activityExpanded && activities.length > 3 && (
              <p className="mt-4 text-white/50 text-xs">
                Showing 3 of {activities.length}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}