import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Download, ExternalLink, FileText, Image, Video, Volume2 } from 'lucide-react';
import { Resource } from '@/shared/mocks/schooladmin/mockData';
import { isPreviewable } from '@/shared/mocks/schooladmin/resources';

interface ResourcePreviewModalProps {
  resource: Resource | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload?: (resource: Resource) => void;
}

const getPreviewIcon = (type: string) => {
  switch (type) {
    case 'PDF':
    case 'Document':
      return <FileText className="w-12 h-12 text-red-500" />;
    case 'Image':
      return <Image className="w-12 h-12 text-green-500" />;
    case 'Video':
      return <Video className="w-12 h-12 text-blue-500" />;
    case 'Audio':
      return <Volume2 className="w-12 h-12 text-purple-500" />;
    default:
      return <FileText className="w-12 h-12 text-gray-500" />;
  }
};

export default function ResourcePreviewModal({
  resource,
  open,
  onOpenChange,
  onDownload
}: ResourcePreviewModalProps) {
  if (!resource) return null;

  const canPreview = isPreviewable(resource.type);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(resource);
    }
  };

  const handleOpenExternal = () => {
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/15 backdrop-blur-xl border-white/25 text-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Resource Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resource Header */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-white/10 rounded-xl">
              {getPreviewIcon(resource.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-white mb-2">
                {resource.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <Badge className="bg-brand-teal/20 text-brand-teal border-brand-teal/30">
                  {resource.subjectName}
                </Badge>
                <Badge className="bg-brand-accent/20 text-brand-accent border-brand-accent/30">
                  {resource.type}
                </Badge>
                <Badge 
                  className={resource.status === 'Active' 
                    ? "bg-green-500/20 text-green-400 border-green-500/30" 
                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }
                >
                  {resource.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/80">
                <div>
                  <span className="text-white/60">Size:</span>
                  <div className="font-medium">{resource.size || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-white/60">Uploaded:</span>
                  <div className="font-medium">{formatDate(resource.uploadedAt)}</div>
                </div>
                <div>
                  <span className="text-white/60">Downloads:</span>
                  <div className="font-medium">{resource.downloads || 0}</div>
                </div>
                <div>
                  <span className="text-white/60">Grades:</span>
                  <div className="font-medium">{resource.gradeNames.join(', ')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {resource.description && (
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-medium mb-2">Description</h4>
              <p className="text-white/80 leading-relaxed">
                {resource.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div>
              <h4 className="text-white font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Preview Area */}
          <div className="bg-white/5 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
            {canPreview ? (
              <div className="text-center">
                {getPreviewIcon(resource.type)}
                <h4 className="text-white font-medium mt-4 mb-2">Preview Available</h4>
                <p className="text-white/70 text-sm mb-4">
                  {resource.type === 'PDF' && 'PDF document preview would be displayed here'}
                  {resource.type === 'Image' && 'Image preview would be displayed here'}
                  {resource.type === 'Video' && 'Video player would be displayed here'}
                  {resource.type === 'Audio' && 'Audio player would be displayed here'}
                </p>
                <p className="text-white/50 text-xs">
                  Mock preview - In a real application, the actual file content would be shown
                </p>
              </div>
            ) : (
              <div className="text-center">
                <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">Preview Not Available</h4>
                <p className="text-white/70 text-sm mb-4">
                  This file type cannot be previewed in the browser.
                </p>
                {resource.url ? (
                  <Button
                    onClick={handleOpenExternal}
                    className="bg-brand-accent hover:bg-brand-accent/80 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open External Link
                  </Button>
                ) : (
                  <Button
                    onClick={handleDownload}
                    className="bg-brand-accent hover:bg-brand-accent/80 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download to View
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {resource.url && (
              <Button
                onClick={handleOpenExternal}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Link
              </Button>
            )}
            <Button
              onClick={handleDownload}
              className="flex-1 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}