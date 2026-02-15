import React from 'react';
import { X, GraduationCap, User, BookOpen, Calendar, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Student } from './types';

interface StudentDetailsData extends Student {
  studentCode?: string;
  parent?: {
    name?: string;
    email?: string;
    phone?: string;
    idNumber?: string;
  };
  history?: Array<{
    year: string;
    avgScore: number;
    classRank: number;
    classSize: number;
    subjects: Array<{
      name: string;
      score: number;
    }>;
  }>;
  attendance?: {
    currentTermPct?: number;
    lastTermPct?: number;
  };
  notes?: Array<{
    date: string;
    text: string;
  }>;
}

interface StudentDetailsPanelProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

// Mock data enrichment function
const enrichStudentData = (student: Student): StudentDetailsData => {
  // Generate consistent mock data based on student ID
  const seed = student.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const mockParent = {
    name: student.parentNationalId ? `Parent of ${student.firstName}` : undefined,
    email: student.parentEmail || undefined,
    phone: `+250 7${(78 + (seed % 22)).toString().padStart(2, '0')} ${Math.floor(seed % 900 + 100)} ${Math.floor(seed % 900 + 100)}`,
    idNumber: student.parentNationalId || undefined,
  };

  const currentYear = new Date().getFullYear();
  const mockHistory = [
    {
      year: `${currentYear - 1}`,
      avgScore: 75 + (seed % 20),
      classRank: (seed % 15) + 1,
      classSize: 30 + (seed % 10),
      subjects: [
        { name: 'Mathematics', score: 80 + (seed % 15) },
        { name: 'English', score: 75 + (seed % 20) },
        { name: 'Science', score: 78 + (seed % 17) },
        { name: 'Social Studies', score: 82 + (seed % 12) },
        { name: 'Kinyarwanda', score: 85 + (seed % 10) },
      ],
    },
    {
      year: `${currentYear - 2}`,
      avgScore: 70 + (seed % 25),
      classRank: (seed % 20) + 1,
      classSize: 28 + (seed % 12),
      subjects: [
        { name: 'Mathematics', score: 75 + (seed % 18) },
        { name: 'English', score: 70 + (seed % 22) },
        { name: 'Science', score: 73 + (seed % 20) },
        { name: 'Social Studies', score: 77 + (seed % 15) },
        { name: 'Kinyarwanda', score: 80 + (seed % 12) },
      ],
    },
  ];

  const mockAttendance = {
    currentTermPct: 85 + (seed % 12),
    lastTermPct: 80 + (seed % 15),
  };

  const mockNotes = [
    {
      date: new Date(Date.now() - seed * 86400000).toISOString().split('T')[0],
      text: 'Excellent performance in mathematics. Shows strong analytical skills.',
    },
    {
      date: new Date(Date.now() - (seed + 7) * 86400000).toISOString().split('T')[0],
      text: 'Participated actively in science fair. Demonstrated creativity in project presentation.',
    },
    {
      date: new Date(Date.now() - (seed + 14) * 86400000).toISOString().split('T')[0],
      text: 'Needs improvement in punctuality. Parent meeting scheduled.',
    },
    {
      date: new Date(Date.now() - (seed + 21) * 86400000).toISOString().split('T')[0],
      text: 'Outstanding leadership skills observed during group activities.',
    },
  ];

  return {
    ...student,
    studentCode: `STU${currentYear}${(seed % 9999).toString().padStart(4, '0')}`,
    parent: mockParent,
    history: mockHistory,
    attendance: mockAttendance,
    notes: mockNotes,
  };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Inactive':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Transferred':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Graduated':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'Suspended':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getClassSubjects = (className: string): string[] => {
  const level = className.charAt(0);
  const baseSubjects = ['Mathematics', 'English', 'Kinyarwanda'];
  
  if (level === 'P') {
    return [...baseSubjects, 'Science', 'Social Studies', 'Arts & Crafts'];
  } else {
    return [...baseSubjects, 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'ICT'];
  }
};

const DetailSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  children,
}) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-white font-medium">{title}</h3>
    </div>
    {children}
  </div>
);

const StudentDetailsContent: React.FC<{ student: StudentDetailsData }> = ({ student }) => {
  const subjects = getClassSubjects(student.class);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
          <User className="h-10 w-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {student.firstName} {student.lastName}
          </h2>
          {student.studentCode && (
            <p className="text-white/70 text-sm">Student Code: {student.studentCode}</p>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Badge className={`${getStatusColor(student.status)} border`}>
            {student.status}
          </Badge>
          <Badge className="bg-brand-accent/20 text-brand-accent border-brand-accent/30 border">
            {student.class}
          </Badge>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <DetailSection title="Parent/Guardian" icon={<Users className="h-5 w-5 text-white/70" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/70">Name</p>
            <p className="text-white">{student.parent?.name || '—'}</p>
          </div>
          <div>
            <p className="text-white/70">Email</p>
            <p className="text-white">{student.parent?.email || '—'}</p>
          </div>
          <div>
            <p className="text-white/70">Phone</p>
            <p className="text-white">{student.parent?.phone || '—'}</p>
          </div>
          <div>
            <p className="text-white/70">National ID/Passport</p>
            <p className="text-white">{student.parent?.idNumber || '—'}</p>
          </div>
        </div>
      </DetailSection>

      {/* Academic History */}
      <DetailSection title="Academic History" icon={<GraduationCap className="h-5 w-5 text-white/70" />}>
        <div className="space-y-4">
          {student.history?.map((year, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{year.year} Academic Year</h4>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white">
                    Average: <span className="font-medium text-green-400">{year.avgScore}%</span>
                  </span>
                  <span className="text-white">
                    Rank: <span className="font-medium text-blue-400">{year.classRank}/{year.classSize}</span>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {year.subjects.map((subject, subIndex) => (
                  <div key={subIndex} className="flex justify-between text-sm">
                    <span className="text-white/70">{subject.name}</span>
                    <span className="text-white font-medium">{subject.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DetailSection>

      {/* Attendance */}
      <DetailSection title="Attendance Record" icon={<Calendar className="h-5 w-5 text-white/70" />}>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-white/70 text-sm">Current Term</p>
            <p className="text-2xl font-bold text-green-400">{student.attendance?.currentTermPct || 0}%</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-white/70 text-sm">Last Term</p>
            <p className="text-2xl font-bold text-blue-400">{student.attendance?.lastTermPct || 0}%</p>
          </div>
        </div>
      </DetailSection>

      {/* Current Subjects & Teachers */}
      <DetailSection title="Current Subjects" icon={<BookOpen className="h-5 w-5 text-white/70" />}>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject, index) => (
            <Badge key={index} className="bg-white/10 text-white border-white/20 border">
              {subject}
            </Badge>
          ))}
        </div>
      </DetailSection>

      {/* Recent Notes */}
      <DetailSection title="Recent Notes" icon={<FileText className="h-5 w-5 text-white/70" />}>
        <div className="space-y-3">
          {student.notes?.slice(0, 4).map((note, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">{note.date}</span>
              </div>
              <p className="text-white text-sm">{note.text}</p>
            </div>
          ))}
        </div>
      </DetailSection>
    </div>
  );
};

export default function StudentDetailsPanel({ student, open, onClose, isMobile = false }: StudentDetailsPanelProps) {
  if (!student) return null;

  const enrichedStudent = enrichStudentData(student);

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-full max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              Student Details
            </DialogTitle>
          </DialogHeader>
          <StudentDetailsContent student={enrichedStudent} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="bg-white/15 backdrop-blur-xl border-l border-white/25 shadow-xl w-full sm:w-[600px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-white">
            Student Details
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <StudentDetailsContent student={enrichedStudent} />
        </div>
      </SheetContent>
    </Sheet>
  );
}