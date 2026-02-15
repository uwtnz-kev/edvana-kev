import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "glass-effect text-white hover:bg-white/20",
        destructive: "bg-red-600 text-white hover:bg-red-700 border-0",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: "glass-card text-white hover:bg-white/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "glass-brand-accent text-white border-0",
        teal: "glass-brand-teal text-white border-0",
        primary: "glass-brand-primary text-white border-0",
        cancel: "bg-transparent border border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-xl px-10 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  loadingText?: string
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, icon, loadingText, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(enhancedButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" />
            {loadingText || 'Loading...'}
          </>
        ) : (
          <>
            {icon && icon}
            {children}
          </>
        )}
      </Comp>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, enhancedButtonVariants }