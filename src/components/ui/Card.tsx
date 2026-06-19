import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, selected = false, hoverable = false, onClick, children, ...props }, ref) => {
    // If onClick is present, we should render it with button characteristics (role="button" etc.)
    const Component = onClick ? 'button' : 'div';

    return (
      <Component
        ref={ref as any}
        onClick={onClick}
        className={cn(
          'w-full bg-white border rounded-md p-6 shadow-sm transition-all duration-200 outline-none text-left',
          // Selected State
          selected
            ? 'border-2 border-primary-600 bg-primary-50 shadow-md animate-[pop_200ms_ease-in-out]'
            : 'border-gray-200',
          // Hover State
          hoverable && !selected && 'hover:shadow-md hover:border-gray-300',
          // Interactive Button styles if onClick is passed
          onClick && 'cursor-pointer active:scale-[0.99] focus:ring-2 focus:ring-primary-100',
          className
        )}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
export default Card;
