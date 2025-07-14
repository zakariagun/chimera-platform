// دوال تنسيق البيانات
// Data formatting functions

/**
 * تنسيق حجم الملف
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 بايت';

  const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(1);

  return `${size} ${sizes[i]}`;
}

/**
 * تنسيق الوقت النسبي
 * Format relative time
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'الآن';
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days < 7) return `منذ ${days} يوم`;

  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

/**
 * تنسيق الأرقام للعرض
 * Format numbers for display
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ar-SA').format(num);
}

/**
 * تنسيق النسبة المئوية
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * تنسيق المدة الزمنية
 * Format duration
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * تنسيق العملة
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
}

/**
 * اقتطاع النص
 * Truncate text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * تنسيق اسم الملف
 * Format filename
 */
export function formatFilename(filename: string, maxLength: number = 30): string {
  if (filename.length <= maxLength) return filename;
  
  const extension = filename.split('.').pop();
  const name = filename.slice(0, filename.lastIndexOf('.'));
  const truncatedName = name.slice(0, maxLength - extension!.length - 4);
  
  return `${truncatedName}...${extension}`;
}

/**
 * تنسيق عدد العناصر
 * Format item count
 */
export function formatItemCount(count: number, singular: string, plural: string): string {
  if (count === 0) return `لا توجد ${plural}`;
  if (count === 1) return `${singular} واحد`;
  if (count === 2) return `${singular}ان`;
  if (count <= 10) return `${count} ${plural}`;
  return `${count} ${singular}`;
}

/**
 * تنسيق حالة التحميل
 * Format loading state
 */
export function formatLoadingMessage(progress: number): string {
  if (progress < 25) return 'جارٍ البدء...';
  if (progress < 50) return 'جارٍ المعالجة...';
  if (progress < 75) return 'جارٍ الإنهاء...';
  if (progress < 100) return 'تقريباً انتهى...';
  return 'تم الانتهاء!';
}

/**
 * تنسيق نوع التلقين
 * Format prompt type
 */
export function formatPromptType(type: string): string {
  const types: Record<string, string> = {
    video: 'تلقين فيديو',
    image: 'تلقين صورة',
    audio: 'تلقين صوتي'
  };
  return types[type] || type;
}