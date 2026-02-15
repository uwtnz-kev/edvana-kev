import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error?: string;
  onRetry?: () => void;
}

export function SchoolAdminDashboardErrorFallback({
  error = "Something went wrong inside the School Admin dashboard.",
  onRetry,
}: ErrorDisplayProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FF715B]/20 to-[#FF715B]/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-[#FF715B]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong.</h2>
          <p className="text-white/80 text-sm">{error}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="ghost"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white hover:bg-white/30 rounded-xl shadow-md backdrop-blur-md"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          <Link
            to="/dashboard/schooladmin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF715B] to-[#FF715B]/90 text-white font-medium rounded-xl hover:from-[#FF715B]/90 hover:to-[#FF715B]/80 transition-all duration-200 shadow-lg"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-xs text-black/50">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}