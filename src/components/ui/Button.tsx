import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// تعريف أنماط الأزرار
// Button variants definition
const buttonVariants = cva(
  // الأنماط الأساسية - Base styles
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // الأزرار الأساسية - Primary variant
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200',
        
        // الأزرار الثانوية - Secondary variant
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200',
        
        // أزرار التأكيد - Accent variant
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200',
        
        // الأزرار المحيطة - Outline variant
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground border-2 hover:border-accent transition-all duration-200',
        
        // الأزرار الشفافة - Ghost variant
        ghost: 'hover:bg-accent hover:text-accent-foreground transition-all duration-200'
      },
      size: {
        // صغير - Small
        sm: 'h-9 rounded-md px-3 text-xs',
        
        // متوسط - Medium (default)
        md: 'h-10 px-4 py-2',
        
        // كبير - Large
        lg: 'h-11 rounded-md px-8 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

// خصائص مكون الزر
// Button component props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * حالة التحميل - Loading state
   */
  loading?: boolean;
  
  /**
   * الأيقونة - Icon element
   */
  icon?: React.ReactNode;
  
  /**
   * موضع الأيقونة - Icon position
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * المحتوى - Content
   */
  children: React.ReactNode;
}

/**
 * مكون الزر الأساسي
 * Primary Button Component
 * 
 * @example
 * // زر أساسي
 * <Button>حفظ</Button>
 * 
 * // زر مع أيقونة
 * <Button icon={<Save />}>حفظ الملف</Button>
 * 
 * // زر في حالة تحميل
 * <Button loading>جارٍ الحفظ...</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props 
  }, ref) => {
    // تحديد حالة الإعاقة - Determine disabled state
    const isDisabled = disabled || loading;
    
    // عرض الأيقونة أو مؤشر التحميل
    // Render icon or loading spinner
    const renderIcon = () => {
      if (loading) {
        return <Loader2 className="h-4 w-4 animate-spin" />;
      }
      if (icon) {
        return <span className="h-4 w-4 flex items-center justify-center">{icon}</span>;
      }
      return null;
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* عرض الأيقونة على اليسار */}
        {iconPosition === 'left' && renderIcon()}
        
        {/* المحتوى الأساسي */}
        <span className={cn(
          'transition-opacity duration-200',
          loading && 'opacity-70'
        )}>
          {children}
        </span>
        
        {/* عرض الأيقونة على اليمين */}
        {iconPosition === 'right' && !loading && renderIcon()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;