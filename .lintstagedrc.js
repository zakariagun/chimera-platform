export default {
  // ملفات TypeScript و React
  '*.{ts,tsx}': [
    'eslint --fix --max-warnings 0',
    'prettier --write',
    'git add',
  ],
  
  // ملفات CSS و SCSS
  '*.{css,scss,sass}': [
    'prettier --write',
    'git add',
  ],
  
  // ملفات JSON
  '*.json': [
    'prettier --write',
    'git add',
  ],
  
  // ملفات Markdown
  '*.md': [
    'prettier --write',
    'git add',
  ],
  
  // ملفات YAML
  '*.{yml,yaml}': [
    'prettier --write',
    'git add',
  ],
  
  // ملفات JavaScript (للتكوينات)
  '*.js': [
    'eslint --fix',
    'prettier --write',
    'git add',
  ],
};