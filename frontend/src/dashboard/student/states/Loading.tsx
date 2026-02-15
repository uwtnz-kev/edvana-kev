import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="glass-card border-white/20 rounded-lg backdrop-blur-md p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
        <p className="text-white/80">{message}</p>
      </div>
    </div>
  );
}