import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// تعريف أنماط شريط التقدم
// Progress Bar variants definition
const progressBarVariants = cva(
  // الأنماط الأساسية - Base styles
  'relative overflow-hidden rounded-full bg-secondary transition-all duration-300',
  {
    variants: {
      size: {
        // صغير - Small
        sm: 'h-2',
        
        // متوسط - Medium (default)
        md: 'h-3',
        
        // كبير - Large
        lg: 'h-4'
      },
      variant: {
        // افتراضي - Default
        default: 'bg-secondary',
        
        // نجاح - Success
        success: 'bg-green-100 dark:bg-green-950',
        
        // تحذير - Warning
        warning: 'bg-yellow-100 dark:bg-yellow-950',
        
        // خطأ - Error
        error: 'bg-red-100 dark:bg-red-950'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
);

// تعريف أنماط شريط التعبئة
// Progress Fill variants definition
const progressFillVariants = cva(
  // الأنماط الأساسية - Base styles
  'h-full bg-primary transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        // افتراضي - Default
        default: 'bg-primary',
        
        // نجاح - Success
        success: 'bg-green-600 dark:bg-green-400',
        
        // تحذير - Warning
        warning: 'bg-yellow-600 dark:bg-yellow-400',
        
        // خطأ - Error
        error: 'bg-red-600 dark:bg-red-400'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

// خصائص مكون شريط التقدم
// Progress Bar component props interface
export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  /**
   * القيمة الحالية - Current value
   */
  value: number;
  
  /**
   * القيمة القصوى - Maximum value
   */
  max?: number;
  
  /**
   * إظهار القيمة - Show value
   */
  showValue?: boolean;
  
  /**
   * تسمية - Label
   */
  label?: string;
  
  /**
   * تنسيق القيمة المعروضة - Value formatter
   */
  valueFormatter?: (value: number, max: number) => string;
  
  /**
   * متحرك - Animated
   */
  animated?: boolean;
  
  /**
   * متقطع - Striped
   */
  striped?: boolean;
}

/**
 * مكون شريط التقدم
 * Progress Bar Component
 * 
 * @example
 * // شريط تقدم بسيط
 * <ProgressBar value={75} />
 * 
 * // شريط تقدم مع تسمية وقيمة
 * <ProgressBar 
 *   value={450} 
 *   max={1000} 
 *   label="تقدم التحميل" 
 *   showValue 
 * />
 * 
 * // شريط تقدم متحرك مع نجاح
 * <ProgressBar 
 *   value={100} 
 *   variant="success" 
 *   animated 
 *   striped 
 *   label="مكتمل"
 * />
 */
const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className,
    size,
    variant,
    value,
    max = 100,
    showValue = false,
    label,
    valueFormatter,
    animated = false,
    striped = false,
    ...props 
  }, ref) => {
    // حساب النسبة المئوية
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    // تنسيق القيمة المعروضة
    // Format displayed value
    const formatValue = () => {
      if (valueFormatter) {
        return valueFormatter(value, max);
      }
      return `${Math.round(percentage)}%`;
    };

    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      >
        {/* التسمية والقيمة - Label and Value */}
        {(label || showValue) && (
          <div className="flex justify-between items-center text-sm">
            {label && (
              <span className="font-medium text-foreground">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-muted-foreground">
                {formatValue()}
              </span>
            )}
          </div>
        )}
        
        {/* شريط التقدم - Progress Bar */}
        <div
          className={cn(progressBarVariants({ size, variant }))}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'شريط التقدم'}
        >
          {/* شريط التعبئة - Progress Fill */}
          <div
            className={cn(
              progressFillVariants({ variant }),
              animated && 'animate-pulse',
              striped && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_20px] animate-[stripe_2s_linear_infinite]'
            )}
            style={{ 
              width: `${percentage}%`,
              transform: 'translateZ(0)' // تحسين الأداء
            }}
          />
          
          {/* خط متحرك للشريط المتقطع - Animated stripe overlay */}
          {striped && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:20px_20px] animate-[stripe_1s_linear_infinite]"
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
        
        {/* للقراء الشاشة - For screen readers */}
        <span className="sr-only">
          {label ? `${label}: ` : ''}
          {formatValue()} من {max}
        </span>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar, progressBarVariants };
export type { ProgressBarProps };
export default ProgressBar;