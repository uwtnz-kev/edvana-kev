import { Download, Star, Calendar, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  id: number;
  title: string;
  description: string;
  type: string;
  subject: string;
  fileSize: string;
  downloadCount: number;
  rating: number;
  lastUpdated: string;
  icon: LucideIcon;
  color: string;
  onDownload: () => void;
}

export function ResourceCard({
  title,
  description,
  type,
  subject,
  fileSize,
  downloadCount,
  rating,
  lastUpdated,
  icon: IconComponent,
  color,
  onDownload
}: ResourceCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 shadow-lg hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center space-x-2 text-sm">
            <span className="px-2 py-1 bg-white/10 rounded-md text-white/80">
              {subject}
            </span>
            <span className="px-2 py-1 bg-white/10 rounded-md text-white/80">
              {type}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/70 text-sm mb-4 line-clamp-3">
        {description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span>{rating}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Download className="h-4 w-4" />
          <span>{downloadCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(lastUpdated)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-white/60 text-sm font-medium">
          {fileSize}
        </span>
        <Button
          onClick={onDownload}
          className="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/90 hover:from-[#1EA896]/90 hover:to-[#1EA896]/80 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#1EA896]/20"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
}