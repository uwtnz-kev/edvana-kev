import { Plus, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Subject } from "./types";

interface SubjectsHeaderProps {
  subjects: Subject[];
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

export default function SubjectsHeader({ subjects, onAdd, onBulkExport }: SubjectsHeaderProps) {
  // Calculate stats from subjects data
  const totalSubjects = subjects.length;
  const activeSubjects = subjects.filter(subject => subject.status === 'Active').length;
  const inactiveSubjects = subjects.filter(subject => subject.status === 'Inactive').length;
  
  // Mock average completion percentage (since completion field doesn't exist in current data)
  const avgCompletion = totalSubjects > 0 ? Math.round((activeSubjects / totalSubjects) * 100) : 0;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-4 md:p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left: Title and Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-blue-900">Subjects</h1>
          <p className="text-black/70">Manage your subjects and curriculum</p>
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
            className="bg-brand-accent hover:bg-white/20 hover:backdrop-blur-sm text-white border-0 rounded-xl transition-all duration-200 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <StatCard
          title="Total Subjects"
          value={totalSubjects}
          subtitle="All time"
        />
        <StatCard
          title="Active Subjects"
          value={activeSubjects}
          subtitle="Currently running"
        />
        <StatCard
          title="Inactive Subjects"
          value={inactiveSubjects}
          subtitle="Not active"
        />
        <StatCard
          title="Avg Completion"
          value={`${avgCompletion}%`}
          subtitle="Course progress"
        />
      </div>
    </div>
  );
}