import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900 mx-auto mb-4" />
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}