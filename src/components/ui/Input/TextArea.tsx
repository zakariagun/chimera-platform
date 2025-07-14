import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// تعريف أنماط منطقة النص
// TextArea variants definition
const textAreaVariants = cva(
  // الأنماط الأساسية - Base styles
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none',
  {
    variants: {
      variant: {
        // العادي - Default
        default: 'border-input focus-visible:ring-primary',
        
        // خطأ - Error state
        error: 'border-destructive focus-visible:ring-destructive',
        
        // نجاح - Success state
        success: 'border-green-500 focus-visible:ring-green-500'
      },
      textAreaSize: {
        // صغير - Small
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        
        // متوسط - Medium (default)
        md: 'min-h-[80px] px-3 py-2 text-sm',
        
        // كبير - Large
        lg: 'min-h-[120px] px-4 py-3 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      textAreaSize: 'md'
    }
  }
);

// خصائص مكون منطقة النص
// TextArea component props interface
export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textAreaVariants> {
  /**
   * تسمية الحقل - Field label
   */
  label?: string;
  
  /**
   * رسالة المساعدة - Helper text
   */
  helperText?: string;
  
  /**
   * رسالة الخطأ - Error message
   */
  error?: string;
  
  /**
   * مطلوب - Required field
   */
  required?: boolean;
  
  /**
   * عدد الأحرف الأقصى - Maximum character count
   */
  maxLength?: number;
  
  /**
   * إظهار عداد الأحرف - Show character counter
   */
  showCharacterCount?: boolean;
  
  /**
   * تغيير الحجم التلقائي - Auto resize
   */
  autoResize?: boolean;
}

/**
 * مكون منطقة النص
 * TextArea Component
 * 
 * @example
 * // منطقة نص بسيطة
 * <TextArea label="الوصف" placeholder="أدخل الوصف هنا..." />
 * 
 * // منطقة نص مع عداد الأحرف
 * <TextArea 
 *   label="التعليق" 
 *   maxLength={500} 
 *   showCharacterCount 
 * />
 * 
 * // منطقة نص مع تغيير الحجم التلقائي
 * <TextArea label="المحتوى" autoResize />
 */
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    className, 
    variant, 
    textAreaSize,
    label,
    helperText,
    error,
    required,
    maxLength,
    showCharacterCount = false,
    autoResize = false,
    onChange,
    value,
    id,
    ...props 
  }, ref) => {
    const [characterCount, setCharacterCount] = useState<number>(
      typeof value === 'string' ? value.length : 0
    );

    // تحديد نوع الحقل بناءً على وجود خطأ
    // Determine variant based on error state
    const fieldVariant = error ? 'error' : variant;
    
    // إنشاء معرف فريد للحقل
    // Generate unique field ID
    const fieldId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    // التعامل مع تغيير المحتوى
    // Handle content change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCharacterCount(newValue.length);
      
      // تغيير الحجم التلقائي
      // Auto resize functionality
      if (autoResize) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
      
      // استدعاء دالة التغيير الأصلية
      // Call original onChange function
      onChange?.(e);
    };

    // تحديد لون عداد الأحرف
    // Determine character counter color
    const getCounterColor = () => {
      if (!maxLength) return 'text-muted-foreground';
      
      const percentage = (characterCount / maxLength) * 100;
      if (percentage >= 100) return 'text-destructive';
      if (percentage >= 80) return 'text-yellow-600';
      return 'text-muted-foreground';
    };

    return (
      <div className="w-full space-y-2">
        {/* تسمية الحقل - Field Label */}
        {label && (
          <label 
            htmlFor={fieldId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
          >
            {label}
            {required && (
              <span className="text-destructive">*</span>
            )}
          </label>
        )}
        
        {/* منطقة النص - TextArea */}
        <textarea
          id={fieldId}
          className={cn(
            textAreaVariants({ variant: fieldVariant, textAreaSize }),
            autoResize && 'overflow-hidden',
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        
        {/* المعلومات الإضافية - Additional Information */}
        <div className="flex justify-between items-center">
          {/* رسالة الخطأ أو المساعدة - Error or Helper Text */}
          <div className="flex-1">
            {(error || helperText) && (
              <p className={cn(
                'text-xs',
                error ? 'text-destructive' : 'text-muted-foreground'
              )}>
                {error || helperText}
              </p>
            )}
          </div>
          
          {/* عداد الأحرف - Character Counter */}
          {showCharacterCount && (
            <p className={cn('text-xs', getCounterColor())}>
              {characterCount}
              {maxLength && ` / ${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea, textAreaVariants };
export default TextArea;