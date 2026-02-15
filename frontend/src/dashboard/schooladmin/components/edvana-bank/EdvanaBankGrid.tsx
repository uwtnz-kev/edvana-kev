import React from 'react';
import { FileText, Download, Eye, Star, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Resource {
  id: string;
  title: string;
  type: string;
  subject: string;
  grade: string;
  author: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  description: string;
  tags: string[];
}

interface EdvanaBankGridProps {
  resources: Resource[];
  viewMode: 'grid' | 'list';
}

export function EdvanaBankGrid({ resources, viewMode }: EdvanaBankGridProps) {
  if (resources.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
        <FileText className="w-16 h-16 text-blue-900/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-blue-900 mb-2">No Resources Found</h3>
        <p className="text-blue-900/70 mb-6">
          No resources match your current filters. Try adjusting your search criteria.
        </p>
        <Button 
          className="bg-brand-accent hover:bg-brand-accent/80 text-white"
          disabled
        >
          Add First Resource
        </Button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-brand-accent flex-shrink-0" />
                      <h3 className="font-semibold text-blue-900 truncate">{resource.title}</h3>
                      <Badge variant="secondary" className="bg-blue-100/20 text-blue-700 text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-900/70 mb-2 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center gap-4 text-xs text-blue-900/60">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {resource.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {resource.uploadDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {resource.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20" disabled>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20" disabled>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {resources.map((resource) => (
        <div key={resource.id} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-200 group">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-brand-accent" />
              </div>
              <Badge variant="secondary" className="bg-blue-100/20 text-blue-700 text-xs">
                {resource.type}
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-900 line-clamp-2">{resource.title}</h3>
              <p className="text-sm text-blue-900/70 line-clamp-3">{resource.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {resource.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="border-white/20 text-blue-900/60 text-xs">
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 2 && (
                <Badge variant="outline" className="border-white/20 text-blue-900/60 text-xs">
                  +{resource.tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-blue-900/60 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>{resource.rating}/5</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                <span>{resource.downloads}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                className="flex-1 bg-brand-accent/20 hover:bg-brand-accent/30 text-brand-accent border-brand-accent/30"
                variant="outline"
                disabled
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-white/10 border-white/20 text-blue-900 hover:bg-white/20"
                disabled
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}