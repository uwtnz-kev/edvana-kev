import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "./ResourceCard";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  subject: string;
  fileSize: string;
  downloadCount: number;
  rating: number;
  lastUpdated: string;
  icon: any;
  color: string;
}

interface ResourceListProps {
  resources: Resource[];
  onDownload: (resource: Resource) => void;
}

export function ResourceList({ resources, onDownload }: ResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center">
        <Package className="h-16 w-16 text-white/40 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
        <p className="text-white/70">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          {...resource}
          onDownload={() => onDownload(resource)}
        />
      ))}
    </div>
  );
}