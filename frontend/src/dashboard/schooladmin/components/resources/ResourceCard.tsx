import React from 'react';
import { 
  FileText, 
  Video, 
  Headphones, 
  Link, 
  Image, 
  File,
  Eye,
  Download,
  Edit,
  Trash2,
  Calendar,
  HardDrive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Resource } from '@/shared/mocks/schooladmin/mockData';

interface ResourceCardProps {
  resource: Resource;
  onPreview?: (resource: Resource) => void;
  onDownload?: (resource: Resource) => void;
  onEdit?: (resource: Resource) => void;
  onDelete?: (resource: Resource) => void;
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText className="w-6 h-6 text-red-500" />;
    case 'video':
      return <Video className="w-6 h-6 text-blue-500" />;
    case 'audio':
      return <Headphones className="w-6 h-6 text-green-500" />;
    case 'link':
      return <Link className="w-6 h-6 text-purple-500" />;
    case 'image':
      return <Image className="w-6 h-6 text-orange-500" />;
    default:
      return <File className="w-6 h-6 text-gray-500" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function ResourceCard({
  resource,
  onPreview,
  onDownload,
  onEdit,
  onDelete
}: ResourceCardProps) {
  const displayGrades = resource.gradeNames.slice(0, 3);
  const remainingGrades = resource.gradeNames.length - 3;

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-4 hover:bg-white/25 transition-all duration-200 group">
      {/* Header with Icon and Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 p-2 bg-white/10 rounded-xl">
          {getFileIcon(resource.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-blue-900 text-base leading-tight mb-1 line-clamp-2">
            {resource.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-brand-teal/20 text-brand-teal border-brand-teal/30 text-xs">
              {resource.subjectName}
            </Badge>
            {displayGrades.map((grade) => (
              <Badge key={grade} className="bg-brand-accent/20 text-brand-accent border-brand-accent/30 text-xs">
                {grade}
              </Badge>
            ))}
            {remainingGrades > 0 && (
              <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30 text-xs">
                +{remainingGrades} more
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-blue-900/80 text-sm leading-relaxed line-clamp-2">
          {resource.description || 'No description available'}
        </p>
      </div>

      {/* Meta Information */}
      <div className="flex items-center justify-between text-xs text-blue-900/60 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            <span>{resource.size || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(resource.uploadedAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Download className="w-3 h-3" />
          <span>{resource.downloads || 0} downloads</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-1">
          <TooltipProvider>
            {onPreview && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onPreview(resource)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10 rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            {onDownload && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onDownload(resource)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-blue-600 hover:text-blue-500 hover:bg-blue-600/10 rounded-lg"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            {onEdit && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onEdit(resource)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            {onDelete && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onDelete(resource)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-red-600 hover:text-red-500 hover:bg-red-600/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>

        {/* Status Badge */}
        <Badge 
          className={resource.status === 'Active' 
            ? "bg-green-500/20 text-green-600 border-green-500/30" 
            : "bg-gray-500/20 text-gray-600 border-gray-500/30"
          }
        >
          {resource.status}
        </Badge>
      </div>
    </div>
  );
}