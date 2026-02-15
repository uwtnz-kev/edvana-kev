import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Dashboard Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="glass-card border-white/20 rounded-lg backdrop-blur-md p-8 text-center max-w-md">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
            <p className="text-white/80 mb-6">
              There was an error loading this part of the dashboard. Please try refreshing or contact support if the problem persists.
            </p>
            <EnhancedButton
              onClick={this.handleReset}
              icon={<RefreshCw className="h-4 w-4" />}
              className="bg-gradient-to-r from-[#523F38] to-[#4C5454] hover:from-[#604940] hover:to-[#5A6262] text-white"
            >
              Try Again
            </EnhancedButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Reusable fallback UI component for broken student dashboard routes
export function StudentDashboardErrorFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FF715B]/20 to-[#FF715B]/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-[#FF715B]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Oops! Page not found inside student dashboard.
          </h2>
          <p className="text-white/70 text-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Link
          to="/dashboard/student"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF715B] to-[#FF715B]/90 text-white font-medium rounded-xl hover:from-[#FF715B]/90 hover:to-[#FF715B]/80 transition-all duration-200 shadow-lg hover:shadow-[#FF715B]/20"
        >
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-white/50">
            If this problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}