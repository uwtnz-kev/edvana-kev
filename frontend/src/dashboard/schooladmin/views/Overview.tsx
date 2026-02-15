import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import { 
  SchoolInfoCard,
  StatCard,
  PerformanceChart,
  RecentActivity,
  QuickActions
} from "../components/overview";

export default function Overview() {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-8">
        {/* School Info Section */}
        <SchoolInfoCard 
          schoolName="Greenwood High School"
          schoolCode="GHS-2024"
          plan="Premium Plan"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={1247}
            accent="teal"
            icon={GraduationCap}
          />
          <StatCard
            title="Active Teachers"
            value={64}
            accent="accent"
            icon={Users}
          />
          <StatCard
            title="Subjects"
            value={28}
            accent="primary"
            icon={BookOpen}
          />
          <StatCard
            title="Performance"
            value="94%"
            accent="teal"
            icon={TrendingUp}
          />
        </div>

        {/* Charts and Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart title="School Performance Overview" />
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}