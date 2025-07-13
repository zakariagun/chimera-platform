# 🚀 دليل الوكيل التالي - مكونات UI الأساسية

## 📋 المهمة المطلوبة
إنشاء **مكونات UI الأساسية** لإكمال نقطة التحكم 2 والوصول لـ **50%** من إجمالي المشروع.

---

## ✅ الوضع الحالي (ممتاز!)

### 🎯 **ما تم إنجازه (225/250 كريديت)**:
- ✅ **Header Component** - شعار، تنقل، لغات، ثيم، قائمة مستخدم
- ✅ **Sidebar Component** - تنقل التلقينات، إحصائيات، إعدادات سريعة  
- ✅ **أدوات التطوير المتقدمة** - ESLint + Prettier + Husky + Lint-staged

### 📊 **معايير الجودة المحققة**:
- TypeScript صارم مع 0 أخطاء
- ESLint مع 150+ قاعدة متقدمة
- Prettier للتنسيق التلقائي
- Git hooks للحماية من الأخطاء
- دعم RTL كامل للغة العربية
- Theme switching (فاتح/داكن)

---

## 🎯 المطلوب (25 كريديت متبقي)

### **المكونات المطلوبة**:

1. **Button Component** (5 كريديت)
   - 5 variants: primary, secondary, accent, outline, ghost
   - 3 sizes: sm, md, lg  
   - حالات: loading, disabled
   - دعم أيقونات

2. **Input Components** (8 كريديت)
   - TextInput, EmailInput, PasswordInput, TextArea
   - Validation مع zod
   - رسائل خطأ تفاعلية

3. **Card Component** (4 كريديت)
   - Header/Footer اختياريان
   - 3 أنماط مختلفة
   - تأثيرات hover

4. **Modal Component** (4 كريديت)
   - إغلاق بـ ESC/click outside
   - 4 أحجام مختلفة
   - انيميشن سلس

5. **Feedback Components** (4 كريديت)
   - LoadingSpinner, Toast, ProgressBar, Alert

---

## 🛠️ الأدوات الجاهزة للاستخدام

### **أوامر مهمة**:
```bash
# فحص الكود (إجباري قبل البدء)
npm run lint

# إصلاح المشاكل تلقائياً
npm run lint:fix

# تنسيق الكود
npm run format

# فحص TypeScript
npm run typecheck

# بدء التطوير
npm run dev
```

### **Libraries متاحة**:
- `@radix-ui/*` - مكونات UI احترافية
- `lucide-react` - أيقونات حديثة
- `class-variance-authority` - إدارة CSS variants
- `clsx` - تجميع classes
- `zod` - validation
- `tailwindcss` - styling جاهز

### **ألوان المشروع**:
```css
Primary: #2B5D3A    /* للأزرار الرئيسية */
Secondary: #4A90E2  /* للعناصر الثانوية */
Accent: #F5A623     /* للتمييز والتأكيد */
```

---

## 📂 هيكل الملفات المطلوب

```
src/components/ui/
├── Button.tsx              # مكون الزر الأساسي
├── Input/
│   ├── TextInput.tsx       # مدخل نص عادي
│   ├── EmailInput.tsx      # مدخل بريد إلكتروني
│   ├── PasswordInput.tsx   # مدخل كلمة مرور
│   ├── TextArea.tsx        # منطقة نص كبيرة
│   └── index.tsx           # تصدير جميع Inputs
├── Card.tsx                # مكون البطاقة
├── Modal.tsx               # النافذة المنبثقة
├── Feedback/
│   ├── LoadingSpinner.tsx  # مؤشر التحميل
│   ├── Toast.tsx           # الإشعارات
│   ├── ProgressBar.tsx     # شريط التقدم
│   ├── Alert.tsx           # التنبيهات
│   └── index.tsx           # تصدير جميع Feedback
└── index.tsx               # تصدير جميع المكونات
```

---

## 🎨 معايير التصميم

### **⚡ الإجباري**:
- ✅ **0 أخطاء TypeScript** - `npm run typecheck`
- ✅ **0 تحذيرات ESLint** - `npm run lint`  
- ✅ **تنسيق Prettier** - تلقائي مع الحفظ
- ✅ **Responsive design** - يعمل على جميع الأحجام
- ✅ **RTL support** - دعم كامل للغة العربية
- ✅ **Theme compatibility** - فاتح وداكن
- ✅ **JSDoc documentation** - توثيق شامل

### **🎯 التصميم المتسق**:
- اتباع نفس patterns المستخدمة في Header/Sidebar
- تأثيرات hover ناعمة ومتسقة  
- ألوان متناسقة مع نظام المشروع
- spacing متسق مع Tailwind CSS

---

## 📖 مثال عملي - Button Component

```typescript
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * مكون الزر الأساسي لمنصة Chimera Platform
 * Basic Button component for Chimera Platform
 * 
 * @example
 * <Button variant="primary" size="md">
 *   حفظ البيانات
 * </Button>
 */

const buttonVariants = cva(
  // Base classes
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2", 
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
```

---

## 🔍 خطة العمل المُوصى بها

### **المرحلة 1: الإعداد والتحقق**
1. تشغيل `npm run lint` للتأكد من عدم وجود مشاكل
2. فحص المكونات الموجودة (Header/Sidebar) لفهم الـ patterns
3. قراءة دليل أدوات التطوير: `docs/DEVELOPMENT_TOOLS.md`

### **المرحلة 2: التطوير**
1. **Button** - ابدأ بالأساس
2. **Input Components** - مطلوبة للنماذج
3. **Card** - هيكل المحتوى
4. **Modal** - التفاعل المتقدم
5. **Feedback** - تجربة المستخدم

### **المرحلة 3: الاختبار والتوثيق**
1. اختبار كل مكون على أحجام شاشة مختلفة
2. فحص RTL support
3. توثيق شامل مع أمثلة
4. تحديث DEVELOPMENT_PROGRESS.md

---

## 🎯 النتيجة المتوقعة

**بعد إكمال هذه المهام:**
- 🏆 **نقطة التحكم 2 مكتملة** (250/250 كريديت)
- 🚀 **50% من إجمالي المشروع** مكتمل
- 💎 **Foundation Layer جاهز** لباقي المراحل
- ⚡ **بيئة تطوير احترافية** مع أدوات متقدمة

---

## 📞 معلومات الدعم

**أدوات التطوير**: مكتملة ومختبرة ✅  
**التوثيق**: شامل في docs/DEVELOPMENT_TOOLS.md  
**التكامل**: Header + Sidebar جاهزان للاستخدام  
**الجودة**: معايير صارمة مطبقة تلقائياً  

**🎯 المهمة واضحة والأدوات جاهزة - وقت التنفيذ!**

---

*تم إنشاء هذا الدليل بواسطة MiniMax Agent*  
*التاريخ: 2025-07-13*