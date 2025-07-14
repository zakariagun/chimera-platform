import React, { useState } from 'react';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import TextInput, { type TextInputProps } from './TextInput';
import { isValidEmail } from '@/utils/validators';

// خصائص مكون البريد الإلكتروني
// Email Input component props interface
export interface EmailInputProps extends Omit<TextInputProps, 'type' | 'icon'> {
  /**
   * التحقق التلقائي - Auto validation
   */
  autoValidate?: boolean;
  
  /**
   * دالة التحقق المخصصة - Custom validation function
   */
  onValidation?: (isValid: boolean, email: string) => void;
}

/**
 * مكون إدخال البريد الإلكتروني
 * Email Input Component
 * 
 * @example
 * // حقل بريد إلكتروني بسيط
 * <EmailInput label="البريد الإلكتروني" placeholder="example@domain.com" />
 * 
 * // حقل بريد إلكتروني مع تحقق تلقائي
 * <EmailInput 
 *   label="البريد الإلكتروني" 
 *   autoValidate 
 *   onValidation={(isValid, email) => console.log(isValid, email)}
 * />
 */
const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ 
    autoValidate = false,
    onValidation,
    onChange,
    value,
    error: externalError,
    ...props 
  }, ref) => {
    const [internalError, setInternalError] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [hasBeenTouched, setHasBeenTouched] = useState<boolean>(false);

    // التعامل مع تغيير القيمة
    // Handle value change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value;
      setHasBeenTouched(true);
      
      // التحقق التلقائي إذا كان مفعلاً
      // Auto validation if enabled
      if (autoValidate && email) {
        const emailIsValid = isValidEmail(email);
        setIsValid(emailIsValid);
        
        if (emailIsValid) {
          setInternalError('');
        } else {
          setInternalError('البريد الإلكتروني غير صحيح');
        }
        
        // استدعاء دالة التحقق المخصصة
        // Call custom validation function
        onValidation?.(emailIsValid, email);
      } else if (!email && hasBeenTouched) {
        setInternalError('البريد الإلكتروني مطلوب');
        setIsValid(false);
        onValidation?.(false, email);
      } else {
        setInternalError('');
        setIsValid(false);
      }
      
      // استدعاء دالة التغيير الأصلية
      // Call original onChange function
      onChange?.(e);
    };

    // تحديد الأيقونة المناسبة
    // Determine appropriate icon
    const getIcon = () => {
      if (!hasBeenTouched || !value) {
        return <Mail className="h-4 w-4" />;
      }
      
      if (autoValidate) {
        return isValid ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-destructive" />
        );
      }
      
      return <Mail className="h-4 w-4" />;
    };

    // تحديد حالة الحقل
    // Determine field variant
    const getVariant = (): 'default' | 'error' | 'success' => {
      if (externalError || internalError) return 'error';
      if (autoValidate && isValid && hasBeenTouched) return 'success';
      return 'default';
    };

    return (
      <TextInput
        {...props}
        ref={ref}
        type="email"
        value={value}
        onChange={handleChange}
        error={externalError || internalError}
        variant={getVariant()}
        icon={getIcon()}
        iconPosition="left"
        placeholder={props.placeholder || 'example@domain.com'}
        autoComplete="email"
        inputMode="email"
        dir="ltr" // البريد الإلكتروني دائماً من اليسار لليمين
      />
    );
  }
);

EmailInput.displayName = 'EmailInput';

export { EmailInput };
export default EmailInput;