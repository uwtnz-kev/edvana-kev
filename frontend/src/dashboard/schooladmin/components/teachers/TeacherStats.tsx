import { Users, BookOpen, Award } from "lucide-react";
import { Teacher, TeacherStatus } from "./types";

interface TeacherStatsProps {
  teachers: Teacher[];
  inline?: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon?: React.ReactNode;
  tooltip: string;
}

function StatCard({ title, value, subtitle, icon, tooltip }: StatCardProps) {
  return (
    <div 
      className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-4 shadow-xl"
      title={tooltip}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {icon && <div className="text-blue-900">{icon}</div>}
          <p className="text-xs font-medium text-blue-900 uppercase tracking-wide">
            {title}
          </p>
        </div>
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

// Mock class data with student counts for calculation
const mockClassData = {
  'P1-A': 28, 'P1-B': 26, 'P2-A': 30, 'P2-B': 29, 'P3-A': 27, 'P3-B': 31,
  'P4-A': 25, 'P4-B': 29, 'P5-A': 32, 'P5-B': 28, 'P6-A': 30, 'P6-B': 26,
  'S1-A': 35, 'S1-B': 33, 'S2-A': 34, 'S2-B': 36, 'S3-A': 32, 'S3-B': 31,
  'S4-SCI': 25, 'S4-ART': 28, 'S5-SCI': 22, 'S5-ART': 24, 'S6-SCI': 20, 'S6-ART': 23
};

export default function TeacherStats({ teachers, inline = false }: TeacherStatsProps) {
  // Filter active teachers only for calculations
  const activeTeachers = teachers.filter(teacher => teacher.status === TeacherStatus.ACTIVE);
  
  // 1. Calculate Average Students per Teacher
  const calculateAvgStudentsPerTeacher = (): string => {
    if (activeTeachers.length === 0) return "—";
    
    let totalStudents = 0;
    const processedClasses = new Set<string>();
    
    // Sum unique students from all classes assigned to active teachers
    activeTeachers.forEach(teacher => {
      teacher.classes.forEach(classId => {
        if (!processedClasses.has(classId)) {
          const studentCount = mockClassData[classId as keyof typeof mockClassData] || 0;
          totalStudents += studentCount;
          processedClasses.add(classId);
        }
      });
    });
    
    return Math.round(totalStudents / activeTeachers.length).toString();
  };
  
  // 2. Calculate Most Assigned Subject
  const calculateMostAssignedSubject = (): string => {
    if (teachers.length === 0) return "No data";
    
    const subjectCounts: Record<string, number> = {};
    
    // Count subject assignments across all teachers
    teachers.forEach(teacher => {
      teacher.subjectAssignments.forEach(assignment => {
        const subjectName = assignment.subjectName;
        subjectCounts[subjectName] = (subjectCounts[subjectName] || 0) + 1;
      });
    });
    
    if (Object.keys(subjectCounts).length === 0) return "No data";
    
    // Find subject with highest count
    let maxCount = 0;
    let mostAssignedSubject = "No data";
    
    Object.entries(subjectCounts).forEach(([subject, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostAssignedSubject = subject;
      }
    });
    
    return mostAssignedSubject;
  };
  
  // 3. Calculate Average Experience (Years)
  const calculateAvgExperience = (): string => {
    if (activeTeachers.length === 0) return "—";
    
    const totalExperience = activeTeachers.reduce((sum, teacher) => {
      return sum + (teacher.experience || 0);
    }, 0);
    
    const avgExperience = totalExperience / activeTeachers.length;
    return avgExperience.toFixed(1);
  };

  if (inline) {
    // Return individual cards for inline usage in parent grid
    return (
      <>
        <StatCard
          title="Avg Students/Teacher"
          value={calculateAvgStudentsPerTeacher()}
          subtitle="Per active teacher"
          icon={<Users className="h-4 w-4" />}
          tooltip="Total students ÷ active teachers"
        />
        <StatCard
          title="Most Assigned Subject"
          value={calculateMostAssignedSubject()}
          subtitle="Highest assignments"
          icon={<BookOpen className="h-4 w-4" />}
          tooltip="Subject with most teachers assigned"
        />
        <StatCard
          title="Avg Experience"
          value={calculateAvgExperience()}
          subtitle="Years (active teachers)"
          icon={<Award className="h-4 w-4" />}
          tooltip="Avg years of experience (active teachers)"
        />
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <StatCard
        title="Avg Students/Teacher"
        value={calculateAvgStudentsPerTeacher()}
        subtitle="Per active teacher"
        icon={<Users className="h-4 w-4" />}
        tooltip="Total students ÷ active teachers"
      />
      <StatCard
        title="Most Assigned Subject"
        value={calculateMostAssignedSubject()}
        subtitle="Highest assignments"
        icon={<BookOpen className="h-4 w-4" />}
        tooltip="Subject with most teachers assigned"
      />
      <StatCard
        title="Avg Experience"
        value={calculateAvgExperience()}
        subtitle="Years (active teachers)"
        icon={<Award className="h-4 w-4" />}
        tooltip="Avg years of experience (active teachers)"
      />
    </div>
  );
}