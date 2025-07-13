import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface Translations {
  platformName: string;
  platformSubtitle: string;
  navigation: {
    home: string;
    prompts: string;
    dashboard: string;
  };
  user: {
    profile: string;
    settings: string;
    logout: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  language: {
    arabic: string;
    english: string;
  };
}

const translations: Record<Language, Translations> = {
  ar: {
    platformName: 'منصة خيميرا',
    platformSubtitle: 'منصة ذكية متقدمة',
    navigation: {
      home: 'الرئيسية',
      prompts: 'التلقينات',
      dashboard: 'لوحة التحكم',
    },
    user: {
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
    },
    theme: {
      light: 'الوضع الفاتح',
      dark: 'الوضع الداكن',
    },
    language: {
      arabic: 'العربية',
      english: 'English',
    },
  },
  en: {
    platformName: 'Chimera Platform',
    platformSubtitle: 'Advanced AI Platform',
    navigation: {
      home: 'Home',
      prompts: 'Prompts',
      dashboard: 'Dashboard',
    },
    user: {
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
    },
    theme: {
      light: 'Light Mode',
      dark: 'Dark Mode',
    },
    language: {
      arabic: 'العربية',
      english: 'English',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    }
    return 'ar'; // Default to Arabic
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      translations: translations[language],
      isRTL,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};