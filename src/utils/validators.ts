// دوال التحقق من صحة البيانات
// Data validation functions

import { z } from 'zod';

/**
 * التحقق من البريد الإلكتروني
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .min(1, 'البريد الإلكتروني مطلوب')
  .email('البريد الإلكتروني غير صحيح');

/**
 * التحقق من كلمة المرور
 * Password validation schema
 */
export const passwordSchema = z
  .string()
  .min(8, 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل')
  .regex(/[A-Z]/, 'كلمة المرور يجب أن تحتوي على حرف كبير')
  .regex(/[a-z]/, 'كلمة المرور يجب أن تحتوي على حرف صغير')
  .regex(/[0-9]/, 'كلمة المرور يجب أن تحتوي على رقم');

/**
 * التحقق من النص العام
 * General text validation schema
 */
export const textSchema = z
  .string()
  .min(1, 'هذا الحقل مطلوب')
  .max(500, 'النص طويل جداً (الحد الأقصى 500 حرف)');

/**
 * التحقق من النص الطويل
 * Long text validation schema
 */
export const longTextSchema = z
  .string()
  .min(1, 'هذا الحقل مطلوب')
  .max(5000, 'النص طويل جداً (الحد الأقصى 5000 حرف)');

/**
 * التحقق من الرقم
 * Number validation schema
 */
export const numberSchema = z
  .number()
  .min(0, 'الرقم يجب أن يكون موجباً');

/**
 * التحقق من عنوان URL
 * URL validation schema
 */
export const urlSchema = z
  .string()
  .url('عنوان URL غير صحيح');

/**
 * دالة التحقق من البريد الإلكتروني
 * Validate email function
 */
export function isValidEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

/**
 * دالة التحقق من كلمة المرور
 * Validate password function
 */
export function isValidPassword(password: string): boolean {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
}

/**
 * دالة التحقق من الملف
 * Validate file function
 */
export function isValidFile(
  file: File,
  allowedTypes: string[],
  maxSize: number
): { valid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'نوع الملف غير مدعوم'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'حجم الملف كبير جداً'
    };
  }

  return { valid: true };
}

/**
 * دالة التحقق من أنواع التلقينات
 * Validate prompt type function
 */
export function isValidPromptType(type: string): boolean {
  const validTypes = ['video', 'image', 'audio'];
  return validTypes.includes(type);
}

/**
 * دالة التحقق من الحقول المطلوبة
 * Validate required fields function
 */
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): { valid: boolean; missingFields?: string[] } {
  const missingFields = requiredFields.filter(field => 
    !data[field] || data[field] === '' || data[field] === null || data[field] === undefined
  );

  return {
    valid: missingFields.length === 0,
    missingFields: missingFields.length > 0 ? missingFields : undefined
  };
}