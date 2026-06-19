import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ai' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Determine base and variant classes
    const baseClasses = cn(
      'inline-flex items-center justify-center font-body font-semibold transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]'
    );

    const variantClasses: Record<ButtonVariant, string> = {
      primary: cn(
        'bg-primary-600 text-white shadow-sm hover:bg-primary-500 hover:shadow-md disabled:opacity-50'
      ),
      secondary: cn(
        'bg-transparent border-[1.5px] border-gray-200 text-gray-800 hover:bg-gray-100 font-medium disabled:opacity-50'
      ),
      ai: cn(
        'ai-gradient text-white shadow-md hover:shadow-ai disabled:opacity-60 relative overflow-hidden'
      ),
      ghost: cn(
        'bg-transparent text-primary-600 hover:bg-primary-50 disabled:opacity-50'
      ),
      danger: cn(
        'bg-transparent text-error-500 hover:bg-error-50 disabled:opacity-50'
      ),
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5 rounded-sm',
      md: 'text-sm px-5 py-2.5 rounded-md',
      lg: 'text-base px-6 py-3.5 rounded-md',
    };

    // Auto-inject sparkles for AI variant if no custom icons are provided
    const showSparkles = variant === 'ai' && !loading;
    const finalLeftIcon = showSparkles ? (
      <Sparkles className="w-[18px] h-[18px] animate-[pulse_2s_infinite]" />
    ) : (
      iconLeft
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          loading && variant === 'ai' && 'shimmer text-white/90',
          className
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && variant !== 'ai' && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left Icon */}
        {!loading && finalLeftIcon && <span className="mr-2">{finalLeftIcon}</span>}

        {/* Content */}
        <span>{loading && variant === 'ai' ? 'Sedang menulis...' : children}</span>

        {/* Right Icon */}
        {!loading && iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
