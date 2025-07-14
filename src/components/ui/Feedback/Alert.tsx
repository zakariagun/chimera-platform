import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../Button';

// تعريف أنماط التنبيهات
// Alert variants definition
const alertVariants = cva(
  // الأنماط الأساسية - Base styles
  'relative w-full rounded-lg border p-4 transition-all duration-200',
  {
    variants: {
      type: {
        // معلومات - Info
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100 [&>svg]:text-blue-600',
        
        // نجاح - Success
        success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100 [&>svg]:text-green-600',
        
        // تحذير - Warning
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100 [&>svg]:text-yellow-600',
        
        // خطأ - Error
        error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100 [&>svg]:text-red-600'
      }
    },
    defaultVariants: {
      type: 'info'
    }
  }
);

// خصائص مكون التنبيه
// Alert component props interface
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * العنوان - Title
   */
  title?: string;
  
  /**
   * الرسالة - Message
   */
  message: string;
  
  /**
   * أيقونة مخصصة - Custom icon
   */
  icon?: React.ReactNode;
  
  /**
   * قابل للإغلاق - Dismissible
   */
  dismissible?: boolean;
  
  /**
   * دالة الإغلاق - Dismiss function
   */
  onDismiss?: () => void;
  
  /**
   * إخفاء الأيقونة الافتراضية - Hide default icon
   */
  hideIcon?: boolean;
}

/**
 * الحصول على الأيقونة الافتراضية
 * Get default icon
 */
const getDefaultIcon = (type: NonNullable<AlertProps['type']>) => {
  const iconClasses = 'h-5 w-5 flex-shrink-0';
  
  switch (type) {
    case 'success':
      return <CheckCircle className={iconClasses} />;
    case 'warning':
      return <AlertTriangle className={iconClasses} />;
    case 'error':
      return <AlertCircle className={iconClasses} />;
    case 'info':
    default:
      return <Info className={iconClasses} />;
  }
};

/**
 * مكون التنبيه
 * Alert Component
 * 
 * @example
 * // تنبيه بسيط
 * <Alert message="هذه رسالة معلوماتية" />
 * 
 * // تنبيه مع عنوان
 * <Alert 
 *   title="عملية ناجحة" 
 *   message="تم حفظ البيانات بنجاح" 
 *   type="success" 
 * />
 * 
 * // تنبيه قابل للإغلاق
 * <Alert 
 *   title="تحذير مهم" 
 *   message="يرجى مراجعة البيانات قبل المتابعة" 
 *   type="warning"
 *   dismissible
 *   onDismiss={() => console.log('تم الإغلاق')}
 * />
 * 
 * // تنبيه مع أيقونة مخصصة
 * <Alert 
 *   message="حدث خطأ في الاتصال" 
 *   type="error"
 *   icon={<CustomIcon />}
 * />
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className,
    type = 'info',
    title,
    message,
    icon,
    dismissible = false,
    onDismiss,
    hideIcon = false,
    ...props 
  }, ref) => {
    // تحديد الأيقونة المعروضة
    // Determine displayed icon
    const displayIcon = icon || (hideIcon ? null : getDefaultIcon(type));

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ type }), className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <div className="flex gap-3">
          {/* الأيقونة - Icon */}
          {displayIcon && (
            <div className="flex-shrink-0 mt-0.5">
              {displayIcon}
            </div>
          )}
          
          {/* المحتوى - Content */}
          <div className="flex-1 space-y-1">
            {title && (
              <h4 className="text-sm font-semibold leading-none">
                {title}
              </h4>
            )}
            <div className="text-sm leading-relaxed">
              {message}
            </div>
          </div>
          
          {/* زر الإغلاق - Dismiss Button */}
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-6 w-6 p-0 opacity-70 hover:opacity-100 flex-shrink-0"
              aria-label="إغلاق التنبيه"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert, alertVariants };
export type { AlertProps };
export default Alert;