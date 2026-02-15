import { Clock, UserPlus, BookOpen, GraduationCap, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ActivityItem {
  id: string;
  type: "teacher" | "student" | "class" | "subject" | "system";
  title: string;
  description: string;
  timestamp: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "teacher",
    title: "New Teacher Added",
    description: "Sarah Johnson joined as Mathematics teacher",
    timestamp: "2 hours ago"
  },
  {
    id: "2", 
    type: "student",
    title: "Student Enrollment",
    description: "25 new students enrolled for Grade 10",
    timestamp: "4 hours ago"
  },
  {
    id: "3",
    type: "class",
    title: "Class Schedule Updated",
    description: "Physics lab timing changed for Grade 12",
    timestamp: "6 hours ago"
  },
  {
    id: "4",
    type: "subject",
    title: "New Subject Added",
    description: "Computer Science curriculum updated",
    timestamp: "1 day ago"
  },
  {
    id: "5",
    type: "system",
    title: "System Backup",
    description: "Weekly data backup completed successfully",
    timestamp: "2 days ago"
  }
];

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "teacher": return UserPlus;
    case "student": return GraduationCap;
    case "class": return Clock;
    case "subject": return BookOpen;
    case "system": return Settings;
    default: return Clock;
  }
};

const getActivityColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "teacher": return "text-brand-accent";
    case "student": return "text-brand-teal";
    case "class": return "text-brand-primary";
    case "subject": return "text-blue-600";
    case "system": return "text-gray-600";
    default: return "text-gray-600";
  }
};

export default function RecentActivity() {
  return (
    <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Recent Activity</h3>
          <p className="text-sm text-black/60 mt-1">Latest updates and changes</p>
        </div>
        
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);
            
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/30 transition-colors">
                <div className={`p-2 rounded-full bg-white/20 ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900">{activity.title}</p>
                  <p className="text-xs text-black mt-1">{activity.description}</p>
                  <p className="text-xs text-black/60 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-white/20">
          <button className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium transition-colors">
            View all activity →
          </button>
        </div>
      </div>
    </Card>
  );
}