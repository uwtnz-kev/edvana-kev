import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface SuccessToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  duration?: number;
}

export function SuccessToast({
  isOpen,
  onClose,
  title,
  description,
  duration = 5000
}: SuccessToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 glass-card border-green-500/20 bg-green-500/10 backdrop-blur-md rounded-xl p-4 max-w-sm w-full transform transition-all duration-300 animate-in slide-in-from-top-2">
      <div className="flex items-start gap-3">
        <div className="glass-brand-teal rounded-full p-1">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold">{title}</h4>
          {description && (
            <p className="text-white/80 text-sm mt-1">{description}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}