import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// تعريف أنماط حقل الإدخال
// Input field variants definition
const inputVariants = cva(
  // الأنماط الأساسية - Base styles
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
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
      inputSize: {
        // صغير - Small
        sm: 'h-8 px-2 text-xs',
        
        // متوسط - Medium (default)
        md: 'h-10 px-3 text-sm',
        
        // كبير - Large
        lg: 'h-12 px-4 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md'
    }
  }
);

// خصائص مكون الإدخال النصي
// Text Input component props interface
export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
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
   * أيقونة - Icon element
   */
  icon?: React.ReactNode;
  
  /**
   * موضع الأيقونة - Icon position
   */
  iconPosition?: 'left' | 'right';
}

/**
 * مكون الإدخال النصي
 * Text Input Component
 * 
 * @example
 * // حقل إدخال بسيط
 * <TextInput label="الاسم" placeholder="أدخل اسمك" />
 * 
 * // حقل إدخال مع خطأ
 * <TextInput label="البريد الإلكتروني" error="البريد الإلكتروني غير صحيح" />
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    className, 
    variant, 
    inputSize,
    label,
    helperText,
    error,
    required,
    icon,
    iconPosition = 'left',
    id,
    ...props 
  }, ref) => {
    // تحديد نوع الحقل بناءً على وجود خطأ
    // Determine variant based on error state
    const fieldVariant = error ? 'error' : variant;
    
    // إنشاء معرف فريد للحقل
    // Generate unique field ID
    const fieldId = id || `text-input-${Math.random().toString(36).substr(2, 9)}`;

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
        
        {/* حاوية الإدخال - Input Container */}
        <div className="relative">
          {/* الأيقونة على اليسار - Left Icon */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <span className="h-4 w-4 flex items-center justify-center">
                {icon}
              </span>
            </div>
          )}
          
          {/* حقل الإدخال - Input Field */}
          <input
            id={fieldId}
            className={cn(
              inputVariants({ variant: fieldVariant, inputSize }),
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {/* الأيقونة على اليمين - Right Icon */}
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <span className="h-4 w-4 flex items-center justify-center">
                {icon}
              </span>
            </div>
          )}
        </div>
        
        {/* رسالة الخطأ أو المساعدة - Error or Helper Text */}
        {(error || helperText) && (
          <p className={cn(
            'text-xs',
            error ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput, inputVariants };
export default TextInput;