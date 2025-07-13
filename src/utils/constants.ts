// الثوابت العامة للتطبيق
// General application constants

// أنواع التلقينات المدعومة
export const PROMPT_TYPES = {
  VIDEO: 'video',
  IMAGE: 'image', 
  AUDIO: 'audio'
} as const;

// خدمات الذكاء الاصطناعي المدعومة
export const AI_SERVICES = {
  VIDEO: {
    VEO3: 'veo3'
  },
  IMAGE: {
    IMAGEN4: 'imagen4',
    FLUX: 'flux'
  },
  AUDIO: {
    ELEVENLABS: 'elevenlabs',
    GOOGLE_AI_STUDIO: 'google-ai-studio'
  }
} as const;

// فئات التلقينات
export const PROMPT_CATEGORIES = {
  BUSINESS: 'business',
  CREATIVE: 'creative',
  EDUCATIONAL: 'educational',
  ENTERTAINMENT: 'entertainment',
  MARKETING: 'marketing',
  TECHNICAL: 'technical'
} as const;

// حالات التطبيق
export const APP_STATES = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle'
} as const;

// أحجام الملفات (بالبايت)
export const FILE_SIZES = {
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_AUDIO_SIZE: 50 * 1024 * 1024 // 50MB
} as const;

// أنواع الملفات المدعومة
export const SUPPORTED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  VIDEO: ['video/mp4', 'video/webm', 'video/avi'],
  AUDIO: ['audio/mp3', 'audio/wav', 'audio/ogg']
} as const;

// رسائل النظام
export const MESSAGES = {
  SUCCESS: {
    PROMPT_CREATED: 'تم إنشاء التلقين بنجاح',
    PROMPT_UPDATED: 'تم تحديث التلقين بنجاح',
    PROMPT_DELETED: 'تم حذف التلقين بنجاح'
  },
  ERROR: {
    GENERIC: 'حدث خطأ غير متوقع',
    NETWORK: 'خطأ في الاتصال بالشبكة',
    UNAUTHORIZED: 'غير مخول للوصول',
    FILE_TOO_LARGE: 'حجم الملف كبير جداً',
    INVALID_FILE_TYPE: 'نوع الملف غير مدعوم'
  }
} as const;

// روابط المراجع والتوثيق
export const REFERENCE_LINKS = {
  VEO3_DOCS: 'https://developers.google.com/veo',
  IMAGEN4_DOCS: 'https://developers.google.com/imagen',
  FLUX_DOCS: 'https://blackforestlabs.ai/flux-1/',
  ELEVENLABS_DOCS: 'https://elevenlabs.io/docs',
  CAPCUT_GUIDE: 'https://www.capcut.com/tutorials'
} as const;