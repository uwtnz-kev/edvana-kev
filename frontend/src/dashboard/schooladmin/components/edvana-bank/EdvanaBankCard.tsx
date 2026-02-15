import React from 'react';
import { Eye, Share, Calendar, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EdvanaBankCardProps {
  id: string;
  title: string;
  type: 'Exam' | 'Resource';
  subject: string;
  grade: string;
  combination?: string;
  publishedDate: string;
  onPreview: (id: string) => void;
  onPublishToSchool: (id: string) => void;
  isSchoolAdmin?: boolean;
}

export function EdvanaBankCard({
  id,
  title,
  type,
  subject,
  grade,
  combination,
  publishedDate,
  onPreview,
  onPublishToSchool,
  isSchoolAdmin = true
}: EdvanaBankCardProps) {
  const getTypeIcon = () => {
    return type === 'Exam' ? <FileText className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />;
  };

  const getTypeColor = () => {
    return type === 'Exam' ? 'bg-red-500/20 text-red-600' : 'bg-blue-500/20 text-blue-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getGradeCombination = () => {
    if (combination) {
      return `${grade} ${combination}`;
    }
    return grade;
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-200 group h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTypeColor()}`}>
            {getTypeIcon()}
          </div>
          <div>
            <Badge 
              variant="secondary" 
              className={`${type === 'Exam' ? 'bg-red-100/20 text-red-700' : 'bg-blue-100/20 text-blue-700'} text-xs`}
            >
              {type}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        {/* Title */}
        <div>
          <h3 className="font-semibold text-blue-900 line-clamp-2 text-lg leading-tight">
            {title}
          </h3>
        </div>

        {/* Metadata */}
        <div className="space-y-3">
          {/* Subject */}
          <div className="flex items-center gap-2 text-sm text-blue-900/70">
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{subject}</span>
          </div>

          {/* Grade/Combination */}
          <div className="flex items-center gap-2 text-sm text-blue-900/70">
            <GraduationCap className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{getGradeCombination()}</span>
          </div>

          {/* Published Date */}
          <div className="flex items-center gap-2 text-sm text-blue-900/70">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>Published {formatDate(publishedDate)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 pt-4 mt-auto border-t border-white/10">
        {/* Preview Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreview(id)}
          className="w-full bg-white/10 border-white/20 text-blue-900 hover:bg-white/20 justify-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>

        {/* Publish to School Button - Only for School Admin */}
        {isSchoolAdmin && (
          <Button
            size="sm"
            onClick={() => onPublishToSchool(id)}
            className="w-full bg-brand-accent hover:bg-brand-accent/80 text-white justify-center"
          >
            <Share className="w-4 h-4 mr-2" />
            Publish to School
          </Button>
        )}
      </div>
    </div>
  );
}

// Grid container component for responsive layout
interface EdvanaBankCardGridProps {
  children: React.ReactNode;
}

export function EdvanaBankCardGrid({ children }: EdvanaBankCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {children}
    </div>
  );
}