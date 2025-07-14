import React, { useState } from 'react';
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import TextInput, { type TextInputProps } from './TextInput';
import { isValidPassword } from '@/utils/validators';
import { cn } from '@/lib/utils';

// خصائص مكون كلمة المرور
// Password Input component props interface
export interface PasswordInputProps extends Omit<TextInputProps, 'type' | 'icon'> {
  /**
   * التحقق التلقائي - Auto validation
   */
  autoValidate?: boolean;
  
  /**
   * إظهار مؤشر قوة كلمة المرور - Show password strength indicator
   */
  showStrengthIndicator?: boolean;
  
  /**
   * دالة التحقق المخصصة - Custom validation function
   */
  onValidation?: (isValid: boolean, password: string, strength: number) => void;
}

/**
 * حساب قوة كلمة المرور
 * Calculate password strength
 */
function calculatePasswordStrength(password: string): number {
  let strength = 0;
  
  // الطول - Length
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  
  // الأحرف الكبيرة - Uppercase letters
  if (/[A-Z]/.test(password)) strength += 25;
  
  // الأحرف الصغيرة - Lowercase letters  
  if (/[a-z]/.test(password)) strength += 25;
  
  // الأرقام - Numbers
  if (/[0-9]/.test(password)) strength += 25;
  
  // الرموز الخاصة - Special characters
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  
  return Math.min(100, strength);
}

/**
 * الحصول على لون مؤشر القوة
 * Get strength indicator color
 */
function getStrengthColor(strength: number): string {
  if (strength < 30) return 'bg-red-500';
  if (strength < 60) return 'bg-yellow-500';
  if (strength < 80) return 'bg-blue-500';
  return 'bg-green-500';
}

/**
 * الحصول على نص مؤشر القوة
 * Get strength indicator text
 */
function getStrengthText(strength: number): string {
  if (strength < 30) return 'ضعيفة';
  if (strength < 60) return 'متوسطة';
  if (strength < 80) return 'قوية';
  return 'قوية جداً';
}

/**
 * مكون إدخال كلمة المرور
 * Password Input Component
 * 
 * @example
 * // حقل كلمة مرور بسيط
 * <PasswordInput label="كلمة المرور" />
 * 
 * // حقل كلمة مرور مع مؤشر القوة والتحقق التلقائي
 * <PasswordInput 
 *   label="كلمة المرور الجديدة" 
 *   autoValidate 
 *   showStrengthIndicator
 * />
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ 
    autoValidate = false,
    showStrengthIndicator = false,
    onValidation,
    onChange,
    value,
    error: externalError,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [internalError, setInternalError] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [hasBeenTouched, setHasBeenTouched] = useState<boolean>(false);
    const [strength, setStrength] = useState<number>(0);

    // التعامل مع تغيير القيمة
    // Handle value change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setHasBeenTouched(true);
      
      // حساب قوة كلمة المرور
      // Calculate password strength
      const passwordStrength = calculatePasswordStrength(password);
      setStrength(passwordStrength);
      
      // التحقق التلقائي إذا كان مفعلاً
      // Auto validation if enabled
      if (autoValidate && password) {
        const passwordIsValid = isValidPassword(password);
        setIsValid(passwordIsValid);
        
        if (passwordIsValid) {
          setInternalError('');
        } else {
          setInternalError('كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل أحرف كبيرة وصغيرة ورقم');
        }
        
        // استدعاء دالة التحقق المخصصة
        // Call custom validation function
        onValidation?.(passwordIsValid, password, passwordStrength);
      } else if (!password && hasBeenTouched) {
        setInternalError('كلمة المرور مطلوبة');
        setIsValid(false);
        onValidation?.(false, password, passwordStrength);
      } else {
        setInternalError('');
        setIsValid(false);
      }
      
      // استدعاء دالة التغيير الأصلية
      // Call original onChange function
      onChange?.(e);
    };

    // تبديل إظهار كلمة المرور
    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // تحديد الأيقونة المناسبة
    // Determine appropriate icon
    const getIcon = () => {
      if (autoValidate && hasBeenTouched && value) {
        return isValid ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-destructive" />
        );
      }
      
      return <Lock className="h-4 w-4" />;
    };

    // تحديد حالة الحقل
    // Determine field variant
    const getVariant = (): 'default' | 'error' | 'success' => {
      if (externalError || internalError) return 'error';
      if (autoValidate && isValid && hasBeenTouched) return 'success';
      return 'default';
    };

    return (
      <div className="w-full space-y-2">
        {/* حقل الإدخال الأساسي */}
        <div className="relative">
          <TextInput
            {...props}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            error={externalError || internalError}
            variant={getVariant()}
            icon={getIcon()}
            iconPosition="left"
            className="pr-10"
            autoComplete="current-password"
            dir="ltr" // كلمة المرور دائماً من اليسار لليمين
          />
          
          {/* زر إظهار/إخفاء كلمة المرور */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {/* مؤشر قوة كلمة المرور */}
        {showStrengthIndicator && hasBeenTouched && value && (
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">قوة كلمة المرور:</span>
              <span className={cn(
                'font-medium',
                strength < 30 && 'text-red-500',
                strength >= 30 && strength < 60 && 'text-yellow-500',
                strength >= 60 && strength < 80 && 'text-blue-500',
                strength >= 80 && 'text-green-500'
              )}>
                {getStrengthText(strength)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  getStrengthColor(strength)
                )}
                style={{ width: `${strength}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
export default PasswordInput;