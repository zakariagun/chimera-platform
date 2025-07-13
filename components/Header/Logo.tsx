import React from 'react';
import { Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Logo: React.FC = () => {
  const { theme } = useTheme();
  const { translations } = useLanguage();

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <div className={`
        p-2 rounded-lg transition-all duration-300 transform hover:scale-105
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-blue-500/25' 
          : 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-blue-500/30'
        }
        shadow-lg hover:shadow-xl
      `}>
        <Zap 
          size={24} 
          className="text-white animate-pulse" 
        />
      </div>
      <div className="flex flex-col">
        <h1 className={`
          text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
          ${theme === 'dark' ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'}
        `}>
          {translations.platformName}
        </h1>
        <span className={`
          text-xs font-medium
          ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}
        `}>
          {translations.platformSubtitle}
        </span>
      </div>
    </div>
  );
};

export default Logo;