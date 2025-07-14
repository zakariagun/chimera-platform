import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// تعريف أنماط مؤشر التحميل
// Loading Spinner variants definition
const spinnerVariants = cva(
  // الأنماط الأساسية - Base styles
  'animate-spin',
  {
    variants: {
      size: {
        // صغير - Small
        sm: 'h-4 w-4',
        
        // متوسط - Medium (default)
        md: 'h-6 w-6',
        
        // كبير - Large
        lg: 'h-8 w-8'
      },
      variant: {
        // الأساسي - Primary
        primary: 'text-primary',
        
        // الثانوي - Secondary
        secondary: 'text-secondary',
        
        // أبيض - White
        white: 'text-white',
        
        // مكتوم - Muted
        muted: 'text-muted-foreground'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary'
    }
  }
);

// خصائص مكون مؤشر التحميل
// Loading Spinner component props interface
export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * النص المصاحب - Accompanying text
   */
  text?: string;
  
  /**
   * وضع المركز - Center mode
   */
  center?: boolean;
  
  /**
   * ملء الحاوي - Fill container
   */
  fullScreen?: boolean;
}

/**
 * مكون مؤشر التحميل
 * Loading Spinner Component
 * 
 * @example
 * // مؤشر تحميل بسيط
 * <LoadingSpinner />
 * 
 * // مؤشر تحميل مع نص
 * <LoadingSpinner text="جارٍ التحميل..." />
 * 
 * // مؤشر تحميل كبير ومتمركز
 * <LoadingSpinner size="lg" center text="جارٍ معالجة البيانات..." />
 * 
 * // مؤشر تحميل ملء الشاشة
 * <LoadingSpinner fullScreen text="جارٍ تحميل المحتوى..." />
 */
const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ 
    className,
    size,
    variant,
    text,
    center = false,
    fullScreen = false,
    ...props 
  }, ref) => {
    const containerClasses = cn(
      'flex items-center gap-2',
      center && 'justify-center',
      fullScreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      fullScreen && center && 'flex-col',
      className
    );

    return (
      <div
        ref={ref}
        className={containerClasses}
        role="status"
        aria-label={text || 'جارٍ التحميل'}
        {...props}
      >
        <Loader2 className={cn(spinnerVariants({ size, variant }))} />
        
        {text && (
          <span className={cn(
            'text-sm text-muted-foreground',
            fullScreen && 'mt-2'
          )}>
            {text}
          </span>
        )}
        
        {/* للقراء الشاشة - For screen readers */}
        <span className="sr-only">
          {text || 'جارٍ التحميل'}
        </span>
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner, spinnerVariants };
export type { LoadingSpinnerProps };
export default LoadingSpinner;