import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import PromptTypeNavigation from './PromptTypeNavigation';
import UserStats from './UserStats';
import QuickSettings from './QuickSettings';

/**
 * مكون الشريط الجانبي الرئيسي
 * Main Sidebar Component
 */

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true, 
  onToggle,
  className = '' 
}) => {
  const { isRTL } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Overlay للجوال */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* الشريط الجانبي */}
      <aside className={`
        fixed lg:static top-0 z-50
        ${isRTL ? 'right-0' : 'left-0'}
        h-full lg:h-auto
        ${isCollapsed ? 'w-16' : 'w-80'}
        lg:${isCollapsed ? 'w-16' : 'w-80'}
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
        lg:translate-x-0
        transition-all duration-300 ease-in-out
        bg-white dark:bg-gray-900
        border-${isRTL ? 'l' : 'r'} border-gray-200 dark:border-gray-700
        shadow-xl lg:shadow-none
        ${className}
      `}>
        <div className="flex flex-col h-full">
          {/* Header الشريط الجانبي */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isRTL ? 'القائمة الجانبية' : 'Sidebar'}
              </h2>
            )}
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {/* زر الطي/التوسيع للشاشات الكبيرة */}
              <button
                onClick={toggleCollapse}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={isCollapsed ? (isRTL ? 'توسيع' : 'Expand') : (isRTL ? 'طي' : 'Collapse')}
              >
                {isCollapsed ? (
                  isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                ) : (
                  isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
                )}
              </button>
              
              {/* زر الإغلاق للجوال */}
              <button
                onClick={onToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={isRTL ? 'إغلاق' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* المحتوى الرئيسي */}
          <div className="flex-1 overflow-y-auto">
            {!isCollapsed ? (
              <div className="p-4 space-y-6">
                {/* التنقل السريع للتلقينات */}
                <PromptTypeNavigation />
                
                {/* الإحصائيات السريعة */}
                <UserStats />
                
                {/* الإعدادات السريعة */}
                <QuickSettings />
              </div>
            ) : (
              // الوضع المطوي - أيقونات فقط
              <div className="p-2 space-y-4">
                <div className="space-y-2">
                  {/* أيقونات مختصرة للتلقينات */}
                  <button className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                    <div className="w-6 h-6 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-md opacity-70 group-hover:opacity-100" />
                  </button>
                  <button className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                    <div className="w-6 h-6 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md opacity-70 group-hover:opacity-100" />
                  </button>
                  <button className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                    <div className="w-6 h-6 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-md opacity-70 group-hover:opacity-100" />
                  </button>
                </div>
                
                {/* فاصل */}
                <div className="border-t border-gray-200 dark:border-gray-700 mx-2" />
                
                {/* أيقونة الإعدادات */}
                <button className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Menu className="w-5 h-5 mx-auto text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {isRTL ? 'منصة خيميرا v2.0' : 'Chimera Platform v2.0'}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;