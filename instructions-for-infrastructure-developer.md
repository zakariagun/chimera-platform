# 🏗️ تعليمات للوكيل التالي - المرحلة 2: البنية التحتية الأساسية

## 🎯 مهمتك الرئيسية 
**تطوير البنية التحتية الأساسية لمنصة Chimera باستخدام React/TypeScript**

---

## 💰 الموارد المخصصة
- **الكريديت المخصص**: 500 كريديت (حد أقصى صارم)
- **المدة المقدرة**: 2-3 ساعات
- **الأولوية**: حرجة - أساس لجميع المراحل القادمة

---

## 📋 المهام المحددة بدقة

### 1. إعداد مشروع React/TypeScript الأساسي (150 كريديت)
**المتطلبات**:
- إنشاء مشروع Vite جديد مع React + TypeScript template
- تكوين TypeScript في strict mode
- إعداد ESLint و Prettier بالمعايير المطلوبة
- تكوين ملفات package.json و tsconfig.json

**معايير النجاح**:
- [ ] مشروع React يعمل بدون أخطاء TypeScript
- [ ] ESLint configured بدون warnings
- [ ] Prettier يعمل تلقائياً
- [ ] npm run dev يشتغل بنجاح

### 2. تكوين Tailwind CSS والأنماط (100 كريديت)
**المتطلبات**:
- تثبيت وإعداد Tailwind CSS
- تطبيق نظام الألوان المحدد في المواصفات:
  ```css
  :root {
    --primary: #6366f1;      /* بنفسجي */
    --secondary: #8b5cf6;    /* بنفسجي فاتح */
    --accent: #06b6d4;       /* سماوي */
    --background: #0f172a;   /* أزرق داكن */
    --surface: #1e293b;      /* رمادي داكن */
    --text-primary: #f8fafc; /* أبيض مكسور */
    --text-secondary: #cbd5e1; /* رمادي فاتح */
  }
  ```
- إعداد responsive design breakpoints
- إنشاء ملف globals.css أساسي

**معايير النجاح**:
- [ ] Tailwind CSS يعمل في المشروع
- [ ] نظام الألوان المحدد مطبق
- [ ] Responsive design جاهز
- [ ] Dark mode enabled بالألوان المحددة

### 3. إنشاء مكونات UI الأساسية (200 كريديت)
**المكونات المطلوبة**:

#### أ) Button Component (50 كريديت)
- متغيرات: primary, secondary, danger, ghost
- أحجام: small, medium, large
- حالات: normal, loading, disabled
- دعم icons

#### ب) Input Components (75 كريديت)
- TextInput: دعم placeholder, validation, icons
- TextArea: للنصوص الطويلة
- Select: dropdown مع options
- جميعها تدعم error states

#### ج) Modal/Dialog Component (50 كريديت)
- فتح وإغلاق smooth
- backdrop click للإغلاق
- دعم ESC key
- different sizes

#### د) Layout Components (25 كريديت)
- Header component أساسي
- Sidebar component
- Container wrapper
- Grid system أساسي

**معايير النجاح**:
- [ ] جميع المكونات تعمل بشكل صحيح
- [ ] TypeScript types محددة لجميع props
- [ ] Responsive design يعمل على جميع الأحجام
- [ ] Accessibility features مطبقة (ARIA labels)

### 4. إعداد بنية المجلدات والاختبار (50 كريديت)
**بنية المجلدات المطلوبة**:
```
src/
├── components/
│   ├── ui/          # المكونات الأساسية
│   ├── layout/      # مكونات التخطيط
│   └── forms/       # مكونات النماذج
├── pages/           # صفحات التطبيق
├── hooks/           # React hooks مخصصة
├── utils/           # utility functions
├── types/           # TypeScript type definitions
├── styles/          # ملفات CSS
└── constants/       # ثوابت التطبيق
```

**اختبارات مطلوبة**:
- اختبار تشغيل جميع المكونات
- اختبار responsive design
- اختبار Dark mode
- performance check أساسي

---

## 📚 الملفات الإجبارية للقراءة

### قبل البدء (60 دقيقة):
1. **[docs/guides/agent_handbook.md](docs/guides/agent_handbook.md)** (15 دقيقة)
   - فهم أهداف مشروع Chimera ومسؤولياتك
   - التعرف على المستخدمين المستهدفين

2. **[docs/architecture/technical_specs.md](docs/architecture/technical_specs.md)** (20 دقيقة)
   - المواصفات التقنية المفصلة للمشروع
   - متطلبات الأداء والأمان

3. **[docs/guides/quality_checklist.md](docs/guides/quality_checklist.md)** (10 دقيقة)
   - معايير الجودة الواجب اتباعها
   - قائمة فحص شاملة

4. **[docs/project-plan/updated_progress_tracker_500_credits.md](docs/project-plan/updated_progress_tracker_500_credits.md)** (15 دقيقة)
   - حالة المشروع الحالية
   - التوجيهات للمرحلة القادمة

---

## 🔧 الأدوات والموارد المطلوبة

### أدوات التطوير:
- **Node.js** (LTS version)
- **npm** أو **yarn** لإدارة الحزم
- **Vite** كأداة بناء سريعة
- **TypeScript** للأمان النوعي

### المكتبات الأساسية:
- **React 18+**
- **TypeScript 5+**
- **Tailwind CSS 3+**
- **ESLint + Prettier**
- **React Router** (إذا لزم الأمر)

### أدوات اختيارية مفيدة:
- **Zustand** لإدارة الحالة (إذا احتجت)
- **React Hook Form** للنماذج
- **Framer Motion** للحركات (إذا اتسع الوقت)

---

## ✅ معايير النجاح والجودة

### يجب تحقيق جميع النقاط التالية:
- [ ] **مشروع React/TypeScript يعمل بدون أخطاء**
- [ ] **Tailwind CSS مُعد بنظام الألوان الصحيح**
- [ ] **4 مجموعات من مكونات UI مختبرة وجاهزة**
- [ ] **بنية مجلدات منظمة حسب المواصفات**
- [ ] **README.md محدث بتعليمات التشغيل**
- [ ] **الكريديت المستهلك ≤ 500**
- [ ] **Code quality عالية (لا errors، لا warnings)**

### معايير الأداء:
- [ ] **صفحة تحميل في أقل من 2 ثانية**
- [ ] **مكونات تستجيب في أقل من 100ms**
- [ ] **Responsive على جميع screen sizes**
- [ ] **Dark mode يعمل بشكل مثالي**

---

## ⚠️ تحذيرات حرجة

### 🚨 لا تتجاوز:
- **500 كريديت**: حد صارم غير قابل للتفاوض
- **المهام المحددة**: لا تدخل في APIs أو قاعدة البيانات
- **الوقت المقدر**: 3 ساعات حد أقصى

### 🎯 ركز على:
- **جودة المكونات**: كل component يجب أن يكون reusable
- **TypeScript strict**: لا any types إلا للضرورة القصوى
- **Performance**: optimize للسرعة من البداية
- **Accessibility**: ARIA labels ومعايير a11y

### 🚫 تجنب:
- **Over-engineering**: ابق الأمور بسيطة وواضحة
- **External dependencies المفرطة**: استخدم ما تحتاجه فقط
- **Complex state management**: اتركه للمراحل القادمة
- **Backend integration**: سيأتي في المرحلة 3

---

## 🔄 للوكيل الذي يليك (المرحلة 3: قاعدة البيانات)

### أنشئ ملف: `instructions-for-database-developer.md`

```markdown
# تعليمات للوكيل التالي - المرحلة 3: قاعدة البيانات والمصادقة

## 🎯 مهمتك
إعداد Supabase وإنشاء قاعدة البيانات الكاملة مع نظام المصادقة

## 💰 الموارد
- الكريديت: 500 (صارم)
- المدة: 2-3 ساعات

## 📋 المهام الأساسية
1. إعداد مشروع Supabase جديد (100 كريديت)
2. إنشاء 8 جداول حسب المواصفات (250 كريديت)
3. تطبيق العلاقات والفهارس (100 كريديت)
4. نظام المصادقة الأساسي (50 كريديت)

## 📚 ملفات مطلوبة للقراءة
1. docs/guides/agent_handbook.md (فهم المشروع)
2. docs/architecture/technical_specs.md (schema قاعدة البيانات)
3. docs/guides/quality_checklist.md (معايير الجودة)

## ✅ معايير النجاح
- قاعدة بيانات Supabase جاهزة ومختبرة
- 8 جداول مع العلاقات الصحيحة
- نظام مصادقة يعمل (register/login/logout)
- RLS policies مُطبقة بشكل صحيح
- Connection strings جاهزة للاستخدام

## 🔄 للوكيل الرابع
أنشئ تعليمات للمرحلة 4: إدارة المفاتيح والواجهات الأساسية
- نظام إدارة مفاتيح APIs آمن
- صفحة Dashboard الرئيسية
- صفحة إنشاء مشروع جديد
- تشفير وحفظ المفاتيح
```

---

## 📞 المساعدة والدعم

### عند الحاجة للمساعدة:
1. **راجع الملفات المرجعية أولاً**
2. **تحقق من [docs/guides/best_practices_guide.md](docs/guides/best_practices_guide.md)**
3. **اتبع [docs/guides/quality_checklist.md](docs/guides/quality_checklist.md)**
4. **عند استهلاك 400 كريديت، قيم الوضع**

### عند المشاكل التقنية:
- **TypeScript errors**: تحقق من tsconfig.json
- **Tailwind لا يعمل**: تأكد من tailwind.config.js
- **Component rendering issues**: تحقق من props types
- **Build errors**: راجع package.json dependencies

---

## 🎯 النتيجة المطلوبة

**بنية تحتية قوية تحتوي على:**
- مشروع React/TypeScript احترافي ومُحسن
- نظام مكونات UI قابل للإعادة والتوسع
- بنية كود نظيفة وقابلة للصيانة
- أساس متين لجميع مراحل التطوير القادمة

---

## 🚀 خطوات العمل السريعة

1. **إعداد البيئة** (30 دقيقة)
   - إنشاء مشروع Vite
   - تكوين TypeScript و ESLint
   - إعداد Tailwind CSS

2. **إنشاء المكونات الأساسية** (90 دقيقة)
   - Button variants وأحجام مختلفة
   - Input components مع validation
   - Modal component تفاعلي
   - Layout components

3. **الاختبار والتحسين** (30 دقيقة)
   - اختبار responsive design
   - اختبار dark mode
   - performance optimization

4. **التوثيق والتسليم** (30 دقيقة)
   - تحديث README.md
   - إنشاء تعليمات الوكيل التالي
   - مراجعة نهائية

**إجمالي**: 180 دقيقة (3 ساعات) ضمن المدة المقدرة

---

## 🌟 نصيحة أخيرة

**ابني أساساً قوياً يحمل المشروع كاملاً!** 
- كل component يجب أن يكون production-ready
- فكر في scalability من البداية
- اكتب كود يسهل على الوكيل التالي فهمه
- اجعل كل شيء type-safe مع TypeScript

**نحن نعتمد عليك لبناء القاعدة التي ستحمل منصة Chimera نحو النجاح!** 🚀

---

**⚡ بالتوفيق في بناء البنية التحتية لمستقبل إنتاج المحتوى العربي!**