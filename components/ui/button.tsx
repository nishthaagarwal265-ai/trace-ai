import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    const variants: Record<string, string> = {
      primary:
        "bg-accent text-white hover:bg-[#2E71DE] shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_4px_16px_-4px_rgba(59,130,246,0.5)]",
      secondary: "bg-surface-2 text-text border border-border hover:bg-[#1A212B] hover:border-[#2C3644]",
      outline: "bg-transparent text-text border border-border hover:border-accent/50 hover:text-accent-2",
      ghost: "bg-transparent text-text-muted hover:text-text hover:bg-surface-2",
      danger: "bg-critical/10 text-[#FF8A83] border border-[#4A1E1B] hover:bg-critical/20",
    };
    const sizes: Record<string, string> = {
      sm: "h-8 px-3 text-[12.5px] gap-1.5",
      md: "h-9 px-4 text-[13px] gap-2",
      lg: "h-11 px-5 text-[14px] gap-2",
    };
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
