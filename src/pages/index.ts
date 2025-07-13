// تصدير جميع الصفحات من مكان واحد لسهولة الاستيراد
// Export all pages from one place for easy importing

// صفحات رئيسية - Main Pages
export { default as HomePage } from './home/HomePage';
export { default as DashboardPage } from './dashboard/DashboardPage';

// صفحات التلقينات - Prompt Pages  
export { default as PromptsPage } from './prompts/PromptsPage';
export { default as VideoPromptsPage } from './video/VideoPromptsPage';
export { default as ImagePromptsPage } from './image/ImagePromptsPage';
export { default as AudioPromptsPage } from './audio/AudioPromptsPage';

// صفحات المستخدم - User Pages
export { default as ProfilePage } from './profile/ProfilePage';
export { default as SettingsPage } from './settings/SettingsPage';