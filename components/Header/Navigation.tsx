import React from 'react';
import { Home, MessageSquare, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface NavItem {
  key: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const Navigation: React.FC = () => {
  const { theme } = useTheme();
  const { translations } = useLanguage();
  const [activeItem, setActiveItem] = React.useState('home');

  const navItems: NavItem[] = [
    { key: 'home', href: '/', icon: Home },
    { key: 'prompts', href: '/prompts', icon: MessageSquare },
    { key: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  ];

  const handleItemClick = (key: string) => {
    setActiveItem(key);
  };

  return (
    <nav className="flex items-center space-x-1 rtl:space-x-reverse">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeItem === item.key;
        
        return (
          <a
            key={item.key}
            href={item.href}
            onClick={() => handleItemClick(item.key)}
            className={`
              flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${isActive 
                ? theme === 'dark'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }
              transform hover:scale-105
            `}
          >
            <IconComponent 
              size={18} 
              className={isActive ? 'animate-pulse' : ''} 
            />
            <span className="text-sm">
              {translations.navigation[item.key as keyof typeof translations.navigation]}
            </span>
          </a>
        );
      })}
    </nav>
  );
};

export default Navigation;