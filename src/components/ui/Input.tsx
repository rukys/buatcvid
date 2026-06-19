import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, wrapperClassName, id, ...props }, ref) => {
    // Generate a default ID if not provided, for accessibility
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className={cn('flex flex-col text-left', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-gray-700 text-sm font-semibold mb-2"
          >
            {label}
          </label>
        )}

        {/* Input Element */}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full bg-white border-[1.5px] rounded-sm px-3.5 py-2.5 text-gray-800 text-base placeholder-gray-400 transition-all duration-150 outline-none',
            error
              ? 'border-error-500 focus:ring-4 focus:ring-error-50'
              : 'border-gray-200 focus:border-primary-600 focus:ring-4 focus:ring-primary-50',
            props.disabled && 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
            className
          )}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p className="text-error-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {/* Hint Text (shown only if no error) */}
        {!error && hint && (
          <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
