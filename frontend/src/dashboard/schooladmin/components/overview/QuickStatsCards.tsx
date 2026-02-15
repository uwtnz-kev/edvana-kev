import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, UserCheck, BookOpen } from "lucide-react";

const statsData = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12% from last month",
    changeColor: "text-sky-600",
    icon: GraduationCap,
    iconBg: "from-sky-400/30 to-sky-600/30",
    iconColor: "text-sky-300"
  },
  {
    title: "Active Teachers",
    value: "87",
    change: "+2 new this week",
    changeColor: "text-rose-500",
    icon: UserCheck,
    iconBg: "from-rose-400/30 to-rose-600/30",
    iconColor: "text-rose-300"
  },
  {
    title: "Total Classes",
    value: "24",
    change: "3 new classes",
    changeColor: "text-slate-600",
    icon: BookOpen,
    iconBg: "from-slate-400/30 to-slate-600/30",
    iconColor: "text-slate-300"
  },
  {
    title: "Staff Members",
    value: "156",
    change: "+8% this month",
    changeColor: "text-emerald-600",
    icon: Users,
    iconBg: "from-emerald-400/30 to-emerald-600/30",
    iconColor: "text-emerald-300"
  }
];

export default function QuickStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {statsData.map((stat) => (
        <Card key={stat.title} className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-900">{stat.title}</CardTitle>
            <div className={`p-3 bg-gradient-to-br ${stat.iconBg} rounded-xl backdrop-blur-sm`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900 mb-1">{stat.value}</div>
            <p className={`text-sm ${stat.changeColor} font-medium`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}