import { Plus, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Teacher } from "./types";
import TeacherStats from "./TeacherStats";

interface TeachersHeaderProps {
  teachers: Teacher[];
  onAdd: () => void;
  onBulkExport?: (format: 'pdf' | 'excel') => void;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon?: React.ReactNode;
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-4 shadow-xl">
      <div className="space-y-1">
        <p className="text-xs font-medium text-blue-900 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-bold text-black">
          {value}
        </p>
        <p className="text-xs text-black/70">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function TeachersHeader({ teachers, onAdd, onBulkExport }: TeachersHeaderProps) {
  // Calculate stats from teachers data
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(teacher => teacher.status === 'Active').length;
  const onLeaveTeachers = teachers.filter(teacher => teacher.status === 'On Leave').length;
  const archivedTeachers = teachers.filter(teacher => teacher.status === 'Archived').length;
  
  // Calculate average classes per teacher
  const totalClassAssignments = teachers.reduce((sum, teacher) => 
    sum + (teacher.classAssignments?.length || 0), 0
  );
  const avgClassesPerTeacher = totalTeachers > 0 ? 
    Math.round((totalClassAssignments / totalTeachers) * 10) / 10 : 0;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-4 md:p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left: Title and Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-blue-900">Teachers</h1>
          <p className="text-black/70">Manage your teaching staff and assignments</p>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex-shrink-0 flex gap-2">
          {onBulkExport && (
            <>
              <Button
                onClick={() => onBulkExport('pdf')}
                variant="outline"
                className="bg-white/10 border-white/20 text-black hover:bg-white/20 rounded-xl transition-all duration-200 shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF Report
              </Button>
              <Button
                onClick={() => onBulkExport('excel')}
                variant="outline"
                className="bg-white/10 border-white/20 text-black hover:bg-white/20 rounded-xl transition-all duration-200 shadow-lg"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Excel Report
              </Button>
            </>
          )}
          <Button
            onClick={onAdd}
            variant="primary"
            className="rounded-xl transition-all duration-200 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Teacher
          </Button>
        </div>
      </div>

      {/* Stats Cards - 4×2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 mt-6">
        {/* Row 1: Core Statistics */}
        <StatCard
          title="Total Teachers"
          value={totalTeachers}
          subtitle="All time"
        />
        <StatCard
          title="Active Teachers"
          value={activeTeachers}
          subtitle="Currently teaching"
        />
        <StatCard
          title="On Leave"
          value={onLeaveTeachers}
          subtitle="Temporarily away"
        />
        <StatCard
          title="Archived"
          value={archivedTeachers}
          subtitle="No longer active"
        />
        
        {/* Row 2: Advanced Statistics */}
        <StatCard
          title="Avg Classes"
          value={avgClassesPerTeacher}
          subtitle="Per teacher"
        />
        <TeacherStats teachers={teachers} inline />
      </div>
    </div>
  );
}