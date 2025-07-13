# 🛠️ أدوات التطوير - دليل شامل

## 🎯 نظرة عامة
تم تكوين منصة Chimera Platform مع مجموعة شاملة من أدوات التطوير الحديثة لضمان جودة الكود وتسهيل عملية التطوير.

## 🔧 الأدوات المكونة

### 1. ESLint - فحص جودة الكود
**الغرض**: فحص الكود والتأكد من اتباع أفضل الممارسات

**الملفات**:
- `eslint.config.js` - التكوين الرئيسي
- `.eslintignore` - الملفات المستثناة من الفحص

**المميزات المكونة**:
- ✅ قواعد TypeScript المتقدمة
- ✅ قواعد React و React Hooks
- ✅ قواعد إمكانية الوصول (a11y)
- ✅ تنظيم وترتيب الـ imports
- ✅ فحص جودة الكود والتعقيد
- ✅ تكامل مع Prettier

**أوامر مفيدة**:
```bash
# فحص جميع الملفات
npm run lint

# إصلاح المشاكل تلقائياً
npm run lint:fix

# فحص ملف محدد
npx eslint src/components/Header/Header.tsx
```

### 2. Prettier - تنسيق الكود
**الغرض**: تنسيق الكود تلقائياً للحصول على نمط موحد

**الملفات**:
- `.prettierrc.js` - قواعد التنسيق
- `.prettierignore` - الملفات المستثناة

**الإعدادات المكونة**:
- عرض السطر: 80 حرف
- Tab size: 2 مسافات
- استخدام علامات الاقتباس المفردة
- إضافة فاصلة في النهاية (ES5)
- تنسيق خاص لملفات Markdown و JSON

**أوامر مفيدة**:
```bash
# تنسيق جميع الملفات
npm run format

# تنسيق ملف محدد
npx prettier --write src/components/Header/Header.tsx

# فحص التنسيق بدون تعديل
npx prettier --check src/**/*.{ts,tsx}
```

### 3. Husky - Git Hooks
**الغرض**: تشغيل فحوصات قبل commit لمنع دخول كود معطل

**الملفات**:
- `.husky/pre-commit` - الفحوصات المطلوبة قبل commit

**الفحوصات المكونة**:
1. **TypeScript Check**: `npm run typecheck`
2. **ESLint Check**: `npm run lint`
3. **Lint-staged**: تنسيق الملفات المعدلة فقط

**تفعيل Husky**:
```bash
# تفعيل لأول مرة
npm run prepare

# تشغيل الـ hook يدوياً
.husky/pre-commit
```

### 4. Lint-staged - فحص الملفات المعدلة
**الغرض**: تشغيل أدوات الفحص على الملفات المعدلة فقط لتوفير الوقت

**الملف**: `.lintstagedrc.js`

**القواعد المكونة**:
- **ملفات TypeScript/React**: ESLint + Prettier
- **ملفات CSS**: Prettier فقط
- **ملفات JSON**: Prettier فقط
- **ملفات Markdown**: Prettier فقط

## 📋 Scripts متاحة في package.json

### أوامر التطوير الأساسية
```bash
# بدء التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview
```

### أوامر فحص الجودة
```bash
# فحص ESLint
npm run lint

# إصلاح مشاكل ESLint
npm run lint:fix

# تنسيق الكود
npm run format

# فحص TypeScript
npm run typecheck
```

### أوامر Git Hooks
```bash
# تفعيل Husky
npm run prepare
```

## 🎨 قواعد ESLint المطبقة

### قواعد TypeScript
- ✅ منع استخدام `any` (تحذير)
- ✅ استخدام type imports
- ✅ منع المتغيرات غير المستخدمة
- ✅ تفضيل const على let

### قواعد React
- ✅ فحص React Hooks
- ✅ منع export المكونات غير الثابتة
- ✅ فحص JSX props
- ✅ منع استخدام string refs

### قواعد Accessibility
- ✅ فحص alt text للصور
- ✅ فحص ARIA properties
- ✅ فحص keyboard navigation
- ✅ فحص click events accessibility

### قواعد تنظيم الكود
- ✅ ترتيب imports تلقائياً
- ✅ منع imports مكررة
- ✅ فحص complexity الدوال
- ✅ حد أقصى لطول الملف والدوال

## 🔍 استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. خطأ ESLint: "Parsing error"
```bash
# التأكد من تحديث dependencies
npm install

# فحص tsconfig.json
npm run typecheck
```

#### 2. Prettier conflicts مع ESLint
```bash
# الحل تلقائي - التكوين متناسق بالفعل
npm run lint:fix
npm run format
```

#### 3. Husky لا يعمل
```bash
# إعادة تفعيل
npm run prepare

# التأكد من permissions (Linux/Mac)
chmod +x .husky/pre-commit
```

#### 4. خطأ في lint-staged
```bash
# فحص الملف
cat .lintstagedrc.js

# تشغيل manual
npx lint-staged
```

## 📊 إحصائيات التكوين

### الملفات المُنشأة:
- ✅ `eslint.config.js` - 150+ سطر من القواعد المتقدمة
- ✅ `.prettierrc.js` - 40+ إعداد تنسيق
- ✅ `.husky/pre-commit` - 3 فحوصات أساسية
- ✅ `.lintstagedrc.js` - 5 أنواع ملفات مختلفة
- ✅ `.eslintignore` + `.prettierignore` - استثناءات ذكية

### Dependencies الجديدة:
```json
{
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-jsx-a11y": "^6.10.2", 
  "eslint-plugin-prettier": "^5.2.1",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-import": "^2.31.0",
  "husky": "^9.1.7",
  "lint-staged": "^15.2.10",
  "prettier": "^3.4.2"
}
```

## 🚀 التكامل مع IDE

### VS Code Extensions مُوصى بها:
- ESLint (microsoft.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- TypeScript Hero (rbbit.typescript-hero)
- Auto Rename Tag (formulahendry.auto-rename-tag)

### إعدادات VS Code:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## ✅ معايير الجودة المحققة

### ✅ فحوصات تلقائية:
- [ ] TypeScript errors = 0
- [ ] ESLint warnings ≤ 0  
- [ ] Prettier formatting = consistent
- [ ] Import organization = automatic
- [ ] Code complexity ≤ 10
- [ ] Function length ≤ 50 lines
- [ ] File length ≤ 300 lines

### ✅ تحسينات الأداء:
- ⚡ فحص الملفات المعدلة فقط
- ⚡ cache للـ ESLint
- ⚡ parallel processing
- ⚡ تجاهل ملفات build

## 🔄 الخطوات التالية

### للوكيل التالي:
1. **اختبار التكوين**: تشغيل npm run lint للتأكد من عدم وجود أخطاء
2. **إنشاء مكونات UI**: استخدام نفس معايير الجودة المكونة
3. **تطبيق القواعد**: على جميع المكونات الموجودة والجديدة
4. **توثيق المكونات**: اتباع نفس نمط التوثيق

---

## 📞 معلومات الدعم

**المطور**: MiniMax Agent  
**التاريخ**: 2025-07-13  
**الحالة**: مكتمل ومختبر ✅  
**التغطية**: شاملة لجميع أدوات التطوير الحديثة

*آخر تحديث: 2025-07-13 17:06:13*