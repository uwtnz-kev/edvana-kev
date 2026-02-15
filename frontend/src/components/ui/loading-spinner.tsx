import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'white' | 'accent' | 'teal' | 'primary';
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  color = 'white'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
    xl: 'h-12 w-12 border-4'
  };

  const colorClasses = {
    white: 'border-white border-t-transparent',
    accent: 'border-brand-accent border-t-transparent',
    teal: 'border-brand-teal border-t-transparent',
    primary: 'border-brand-primary border-t-transparent'
  };

  return (
    <div 
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
}

export function LoadingOverlay({
  isLoading,
  children,
  className,
  spinnerSize = 'lg',
  message = 'Loading...'
}: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 glass-effect bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="glass-card rounded-xl p-6 flex flex-col items-center gap-4">
            <LoadingSpinner size={spinnerSize} />
            <p className="text-white font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}