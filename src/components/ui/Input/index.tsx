// مكونات الإدخال
// Input Components

// تصدير مكون الإدخال النصي
// Export TextInput component
export { default as TextInput, type TextInputProps } from './TextInput';

// تصدير مكون البريد الإلكتروني
// Export EmailInput component
export { default as EmailInput, type EmailInputProps } from './EmailInput';

// تصدير مكون كلمة المرور
// Export PasswordInput component
export { default as PasswordInput, type PasswordInputProps } from './PasswordInput';

// تصدير مكون منطقة النص
// Export TextArea component
export { default as TextArea, type TextAreaProps } from './TextArea';

// تصدير جميع المكونات كـ default
// Export all components as default
export {
  TextInput,
  EmailInput, 
  PasswordInput,
  TextArea
};