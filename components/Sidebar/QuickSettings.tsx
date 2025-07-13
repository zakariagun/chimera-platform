import React from 'react';
import { Settings, User, Bell, HelpCircle, Shield, Palette } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون الروابط السريعة للإعدادات
 * Component for quick settings links
 */

interface SettingLink {
  icon: React.ComponentType<{ className?: string }>;
  labelAr: string;
  labelEn: string;
  href: string;
  color: string;
  badge?: string;
}

const QuickSettings: React.FC = () => {
  const { isRTL } = useLanguage();

  const settingLinks: SettingLink[] = [
    {
      icon: User,
      labelAr: 'الملف الشخصي',
      labelEn: 'Profile',
      href: '/profile',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Settings,
      labelAr: 'الإعدادات العامة',
      labelEn: 'General Settings',
      href: '/settings',
      color: 'text-gray-600 dark:text-gray-400'
    },
    {
      icon: Bell,
      labelAr: 'الإشعارات',
      labelEn: 'Notifications',
      href: '/notifications',
      color: 'text-yellow-600 dark:text-yellow-400',
      badge: '3'
    },
    {
      icon: Palette,
      labelAr: 'تخصيص المظهر',
      labelEn: 'Appearance',
      href: '/appearance',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Shield,
      labelAr: 'الأمان والخصوصية',
      labelEn: 'Security & Privacy',
      href: '/security',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: HelpCircle,
      labelAr: 'المساعدة والدعم',
      labelEn: 'Help & Support',
      href: '/help',
      color: 'text-red-600 dark:text-red-400'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className={`text-sm font-semibold text-gray-600 dark:text-gray-300 px-3 ${
        isRTL ? 'text-right' : 'text-left'
      }`}>
        {isRTL ? 'الإعدادات السريعة' : 'Quick Settings'}
      </h3>
      
      <div className="space-y-1">
        {settingLinks.map((link, index) => {
          const IconComponent = link.icon;
          const label = isRTL ? link.labelAr : link.labelEn;
          
          return (
            <button
              key={index}
              className={`
                w-full px-3 py-2 rounded-lg
                text-sm font-medium
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors duration-200
                group relative
                ${isRTL ? 'text-right' : 'text-left'}
              `}
              onClick={() => {
                // هنا سيتم التعامل مع التنقل في المستقبل
                console.log(`Navigate to: ${link.href}`);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <IconComponent className={`w-4 h-4 ${link.color} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    {label}
                  </span>
                </div>
                
                {link.badge && (
                  <span className="flex-shrink-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* خط فاصل */}
      <div className="mx-3 border-t border-gray-200 dark:border-gray-700 pt-3">
        <button className={`
          w-full px-3 py-2 rounded-lg
          text-sm font-medium text-red-600 dark:text-red-400
          hover:bg-red-50 dark:hover:bg-red-900/20
          transition-colors duration-200
          ${isRTL ? 'text-right' : 'text-left'}
        `}>
          {isRTL ? 'تسجيل الخروج' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
};

export default QuickSettings;