import React from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useMobile } from '../../hooks/use-mobile';
import Logo from './Logo';
import Navigation from './Navigation';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const { language, isRTL } = useLanguage();
  const isMobile = useMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`
      sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60
      ${theme === 'dark' 
        ? 'bg-slate-900/95 border-slate-800' 
        : 'bg-white/95 border-slate-200'
      }
      ${isRTL ? 'direction-rtl' : 'direction-ltr'}
    `}>
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Logo />
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Navigation />
          </div>
        )}
        
        {/* Desktop Controls */}
        {!isMobile && (
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageToggle />
            <ThemeToggle />
            <UserMenu />
          </div>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className={`
                p-2 rounded-lg transition-colors duration-200
                ${theme === 'dark'
                  ? 'hover:bg-slate-700 text-slate-200'
                  : 'hover:bg-slate-100 text-slate-700'
                }
              `}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobile && (
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      )}
    </header>
  );
};

export default Header;