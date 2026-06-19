import React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  wrapperClassName?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, options, wrapperClassName, placeholder, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className={cn('flex flex-col text-left relative', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className="text-gray-700 text-sm font-semibold mb-2"
          >
            {label}
          </label>
        )}

        {/* Native Select Wrapper */}
        <div className="relative w-full">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full bg-white border-[1.5px] rounded-sm px-3.5 py-2.5 pr-10 text-gray-800 text-base placeholder-gray-400 transition-all duration-150 outline-none appearance-none cursor-pointer',
              error
                ? 'border-error-500 focus:ring-4 focus:ring-error-50'
                : 'border-gray-200 focus:border-primary-600 focus:ring-4 focus:ring-primary-50',
              props.disabled && 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Absolute Chevron Icon */}
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

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

Select.displayName = 'Select';
export default Select;
