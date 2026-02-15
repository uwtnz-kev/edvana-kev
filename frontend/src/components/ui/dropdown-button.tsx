import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  EnhancedButton,
  EnhancedButtonProps,
} from "@/components/ui/enhanced-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

interface DropdownButtonProps
  extends Omit<EnhancedButtonProps, "onClick" | "onSelect"> {
  options: DropdownOption[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  align?: "start" | "center" | "end";
}

const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  (
    {
      options,
      placeholder = "Select option",
      onSelect,
      align = "start",
      className,
      children,
      icon,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = React.useState<string>("");
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
      onSelect?.(value);

      // Execute the option's onClick if it exists
      const option = options.find((opt) => opt.value === value);
      option?.onClick?.();
    };

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const displayText = selectedOption?.label || children || placeholder;

    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <EnhancedButton
            ref={ref}
            className={cn("justify-between", className)}
            icon={icon || selectedOption?.icon}
            {...props}
          >
            <span className="flex-1 text-left">{displayText}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </EnhancedButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          className="glass-card border-white/20 min-w-[200px]"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              disabled={option.disabled}
              className={cn(
                "text-white hover:text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                option.className // 👈 this enables per-item customization
              )}
            >
              {option.icon && (
                <span className="mr-2 h-4 w-4 flex items-center justify-center">
                  {option.icon}
                </span>
              )}
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
DropdownButton.displayName = "DropdownButton";

export { DropdownButton, type DropdownOption };
