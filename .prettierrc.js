/** @type {import("prettier").Config} */
export default {
  // طباعة
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  
  // العقد النقطية
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  
  // JSX
  jsxSingleQuote: false,
  
  // العقد الختامية
  trailingComma: 'es5',
  
  // المساحات
  bracketSpacing: true,
  bracketSameLine: false,
  
  // Arrow Functions
  arrowParens: 'avoid',
  
  // نهاية السطر
  endOfLine: 'lf',
  
  // تضمين/استبعاد الملفات
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
  
  // دعم اللغات والأدوات
  plugins: [],
  
  // قواعد خاصة بـ Tailwind CSS
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
};