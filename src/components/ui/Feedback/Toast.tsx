import React, { useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../Button';

// تعريف أنماط الإشعارات
// Toast variants definition
const toastVariants = cva(
  // الأنماط الأساسية - Base styles
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      type: {
        // معلومات - Info
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
        
        // نجاح - Success
        success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
        
        // تحذير - Warning
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
        
        // خطأ - Error
        error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100'
      }
    },
    defaultVariants: {
      type: 'info'
    }
  }
);

// خصائص مكون الإشعار
// Toast component props interface
export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /**
   * الرسالة - Message
   */
  message: string;
  
  /**
   * العنوان - Title (optional)
   */
  title?: string;
  
  /**
   * المدة بالميللي ثانية - Duration in milliseconds
   */
  duration?: number;
  
  /**
   * دالة الإغلاق - Close function
   */
  onClose?: () => void;
  
  /**
   * إظهار زر الإغلاق - Show close button
   */
  showCloseButton?: boolean;
  
  /**
   * الإغلاق التلقائي - Auto dismiss
   */
  autoDismiss?: boolean;
}

/**
 * الحصول على أيقونة النوع
 * Get type icon
 */
const getTypeIcon = (type: NonNullable<ToastProps['type']>) => {
  const iconClasses = 'h-5 w-5 flex-shrink-0';
  
  switch (type) {
    case 'success':
      return <CheckCircle className={cn(iconClasses, 'text-green-600 dark:text-green-400')} />;
    case 'warning':
      return <AlertTriangle className={cn(iconClasses, 'text-yellow-600 dark:text-yellow-400')} />;
    case 'error':
      return <AlertCircle className={cn(iconClasses, 'text-red-600 dark:text-red-400')} />;
    case 'info':
    default:
      return <Info className={cn(iconClasses, 'text-blue-600 dark:text-blue-400')} />;
  }
};

/**
 * مكون الإشعار
 * Toast Component
 * 
 * @example
 * // إشعار بسيط
 * <Toast message="تم حفظ البيانات بنجاح" type="success" />
 * 
 * // إشعار مع عنوان
 * <Toast 
 *   title="عملية ناجحة" 
 *   message="تم إرسال الرسالة بنجاح" 
 *   type="success" 
 * />
 * 
 * // إشعار مع إغلاق تلقائي
 * <Toast 
 *   message="حدث خطأ في العملية" 
 *   type="error"
 *   duration={5000}
 *   onClose={() => console.log('تم الإغلاق')}
 * />
 */
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className,
    type = 'info',
    message,
    title,
    duration = 5000,
    onClose,
    showCloseButton = true,
    autoDismiss = true,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true);

    // الإغلاق التلقائي
    // Auto dismiss functionality
    useEffect(() => {
      if (autoDismiss && duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [autoDismiss, duration]);

    // التعامل مع الإغلاق
    // Handle close
    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 150); // انتظار انتهاء انيميشن الإخفاء
    };

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({ type }),
          'animate-in slide-in-from-right-full',
          !isVisible && 'animate-out slide-out-to-right-full',
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {/* الأيقونة - Icon */}
        <div className="flex-shrink-0">
          {getTypeIcon(type)}
        </div>
        
        {/* المحتوى - Content */}
        <div className="flex-1 space-y-1">
          {title && (
            <div className="text-sm font-semibold">
              {title}
            </div>
          )}
          <div className="text-sm">
            {message}
          </div>
        </div>
        
        {/* زر الإغلاق - Close Button */}
        {showCloseButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute left-2 top-2 h-6 w-6 p-0 opacity-70 hover:opacity-100"
            aria-label="إغلاق الإشعار"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        {/* شريط التقدم للإغلاق التلقائي - Auto dismiss progress bar */}
        {autoDismiss && duration > 0 && (
          <div 
            className="absolute bottom-0 left-0 h-1 bg-current opacity-30 animate-shrink"
            style={{ 
              animationDuration: `${duration}ms`,
              animationTimingFunction: 'linear'
            }}
          />
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast, toastVariants };
export type { ToastProps };
export default Toast;