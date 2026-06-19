import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, wrapperClassName, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className={cn('flex flex-col text-left', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="text-gray-700 text-sm font-semibold mb-2"
          >
            {label}
          </label>
        )}

        {/* Textarea Element */}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full bg-white border-[1.5px] rounded-sm px-3.5 py-2.5 text-gray-800 text-base placeholder-gray-400 min-h-[100px] transition-all duration-150 outline-none resize-y',
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

        {/* Hint Text */}
        {!error && hint && (
          <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
