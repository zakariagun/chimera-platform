# Chimera Platform - منصة كايميرا

[![GitHub Issues](https://img.shields.io/github/issues/zakariagun/chimera-platform)](https://github.com/zakariagun/chimera-platform/issues)
[![GitHub Stars](https://img.shields.io/github/stars/zakariagun/chimera-platform)](https://github.com/zakariagun/chimera-platform/stargazers)
[![License](https://img.shields.io/github/license/zakariagun/chimera-platform)](https://github.com/zakariagun/chimera-platform/blob/main/LICENSE)

## 🌟 نظرة عامة

**منصة ثورية عربية لتوليد التلقينات الاحترافية للذكاء الاصطناعي**

تحويل الأفكار البسيطة إلى حزمة متكاملة من تلقينات الفيديو والصور والصوت المصممة خصيصاً لخدمات الذكاء الاصطناعي الحديثة.

## 📊 حالة المشروع

### التقدم الحالي: **25% مكتمل** ✅

| نقطة التحكم | الحالة | التقدم | الكريديت |
|-------------|--------|---------|-----------|
| ✅ نقطة التحكم 1 | مكتملة | 25% | 125/500 |
| 🔄 نقطة التحكم 2 | قيد العمل | 0% | 0/250 |
| ⏳ نقطة التحكم 3 | معلقة | 0% | 0/125 |
| ⏳ نقطة التحكم 4 | معلقة | 0% | 0/100 |

## 🎯 الميزات الرئيسية

### 🎬 تلقينات الفيديو
- **Veo3**: تولي تلقينات احترافية لأحدث نماذج فيديو Google
- **إرشادات CapCut**: تعليمات مونتاج متخصصة
- **تناسق الشخصيات**: حفاظ على الاتساق عبر المقاطع

### 🖼️ تلقينات الصور
- **Imagen4**: دعم نموذج Google الأحدث للصور
- **Flux Context**: تكامل مع نماذج Flux المتطورة
- **جودة عالية**: تلقينات محسنة للحصول على أفضل النتائج

### 🎵 تلقينات الصوت
- **ElevenLabs**: تولي أصوات طبيعية ومعبرة
- **Google AI Studio**: دعم خدمات Google الصوتية
- **تخصيص متقدم**: تحكم في النبرة والسرعة والأسلوب

## 🚀 البدء السريع

### المتطلبات
- Node.js 18+ 
- pnpm (موصى به) أو npm
- Git

### التثبيت

```bash
# استنساخ المستودع
git clone https://github.com/zakariagun/chimera-platform.git
cd chimera-platform

# تثبيت التبعيات
npm install

# تشغيل بيئة التطوير
npm run dev
```

### الأوامر المتاحة

```bash
# تطوير
npm run dev          # تشغيل بيئة التطوير
npm run build        # بناء للإنتاج
npm run preview      # معاينة البناء

# جودة الكود  
npm run lint         # فحص الكود
npm run lint:fix     # إصلاح مشاكل الكود
npm run format       # تنسيق الكود
```

## 🏗️ التقنيات المستخدمة

### Core Stack
- **⚛️ React 18.3** - مكتبة واجهة المستخدم
- **📘 TypeScript 5.6** - للأمان النوعي والتطوير المتقدم
- **⚡ Vite 6.0** - أداة البناء السريعة
- **🎨 Tailwind CSS 3.4** - إطار التصميم المرن

### أدوات التطوير
- **🔍 ESLint** - للتحقق من جودة الكود
- **💅 Prettier** - لتنسيق الكود التلقائي
- **🐺 Husky** - لـ Git hooks والتحقق التلقائي
- **📦 PostCSS** - معالج CSS متقدم

### مكونات UI
- **🎛️ Radix UI** - مكونات accessible ومرنة
- **🎯 Lucide React** - مكتبة أيقونات حديثة
- **🎪 Class Variance Authority** - إدارة أنماط CSS ديناميكية

## 📁 هيكل المشروع

```
chimera-platform/
├── 📁 src/
│   ├── 📁 components/      # مكونات قابلة لإعادة الاستخدام
│   │   ├── 📁 ui/          # مكونات واجهة المستخدم الأساسية
│   │   ├── 📁 layout/      # مكونات التخطيط
│   │   └── 📁 prompts/     # مكونات التلقينات المتخصصة
│   ├── 📁 pages/           # صفحات التطبيق
│   │   ├── 📁 video/       # صفحات تلقينات الفيديو
│   │   ├── 📁 image/       # صفحات تلقينات الصور
│   │   └── 📁 audio/       # صفحات تلقينات الصوت
│   ├── 📁 services/        # خدمات الـ APIs والتكامل
│   ├── 📁 types/           # تعريفات TypeScript
│   ├── 📁 utils/           # مرافق ودوال مساعدة
│   └── 📁 assets/          # الموارد الثابتة
├── 📄 DEVELOPMENT_PROGRESS.md  # تقرير التقدم التفصيلي
└── 📄 README-AR.md             # دليل المشروع بالعربية
```

## 🎨 تصميم النظام

### الألوان الأساسية
```css
/* ألوان Chimera Platform */
--primary: #2B5D3A     /* أخضر داكن - للعناصر الرئيسية */
--secondary: #4A90E2   /* أزرق - للعناصر الثانوية */
--accent: #F5A623      /* برتقالي - للتأكيد والتمييز */
```

### الميزات التصميمية
- ✅ **تصميم متجاوب** على جميع الأجهزة
- ✅ **Dark Mode** مدعوم بالكامل
- ✅ **دعم RTL/LTR** للغة العربية والإنجليزية
- ✅ **Accessibility** وفقاً لمعايير WCAG

## 📋 المهام المكتملة

### ✅ نقطة التحكم 1 (25% - 125 كريديت)

#### 1. إعداد مشروع React + TypeScript + Vite
- ✅ إنشاء مشروع جديد مع Vite
- ✅ تكوين TypeScript بشكل صحيح  
- ✅ إعداد متغيرات البيئة
- ✅ تحديث package.json
- ✅ اختبار التشغيل والبناء

#### 2. تكوين Tailwind CSS
- ✅ تثبيت Tailwind مع PostCSS
- ✅ تكوين الألوان المخصصة
- ✅ إعداد responsive breakpoints
- ✅ تكوين Dark mode
- ✅ إضافة animations

#### 3. إنشاء هيكل المجلدات المعياري
- ✅ 10 مجلدات رئيسية منطقية
- ✅ 45+ مجلد فرعي متخصص
- ✅ ملفات index.ts للفهرسة
- ✅ توثيق شامل للهيكل
- ✅ أمثلة أساسية وثوابت

### 🔄 نقطة التحكم 2 (50% - 250 كريديت) - قيد العمل

**المهام المطلوبة:**
- 🏗️ تطوير مكونات Layout الأساسية
- ⚙️ إعداد أدوات التطوير (ESLint, Prettier, Husky)
- 🎨 إنشاء مكونات UI الأساسية

**تتبع التقدم:** [GitHub Issue #1](https://github.com/zakariagun/chimera-platform/issues/1)

## 🤝 المساهمة

نرحب بالمساهمات من المطورين! اقرأ [دليل المساهمة](CONTRIBUTING.md) للتفاصيل.

### خطوات المساهمة
1. **Fork** المستودع
2. إنشاء **branch** جديد للميزة
3. **Commit** التغييرات مع رسائل واضحة
4. **Push** إلى branch الخاص بك
5. إنشاء **Pull Request**

## 📞 التواصل والدعم

- **GitHub Issues**: [إبلاغ عن مشاكل أو طلب ميزات](https://github.com/zakariagun/chimera-platform/issues)
- **المطور**: [@zakariagun](https://github.com/zakariagun)

## 📄 الترخيص

هذا المشروع مرخص تحت [رخصة MIT](LICENSE) - راجع ملف الترخيص للتفاصيل.

## 🌟 الخريطة المستقبلية

### المراحل القادمة
- **المرحلة 3**: قاعدة البيانات والمصادقة
- **المرحلة 4**: إدارة المفاتيح والواجهات الأساسية  
- **المرحلة 5**: تكامل APIs والخدمات الخارجية
- **المرحلة 6**: محرك تحليل الوسائط ونظام Workflow
- **المرحلة 7**: محرك تلقينات الفيديو (Veo3)
- **المرحلة 8**: محرك تلقينات الصور (Imagen4/Flux)
- **المرحلة 9**: محرك تلقينات الصوت ونظام الجودة
- **المرحلة 10**: التكامل النهائي والنشر

---

<div align="center">

**صُنع بـ ❤️ للمجتمع العربي**

[⭐ ضع نجمة](https://github.com/zakariagun/chimera-platform/stargazers) • [🐛 أبلغ عن خطأ](https://github.com/zakariagun/chimera-platform/issues) • [💡 اقترح ميزة](https://github.com/zakariagun/chimera-platform/issues/new)

</div>