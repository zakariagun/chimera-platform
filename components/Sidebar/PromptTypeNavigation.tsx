import React from 'react';
import { Video, Image, Music } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون التنقل السريع لأنواع التلقينات المختلفة
 * Component for quick navigation between different prompt types
 */

interface PromptType {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  technology: string;
  color: string;
  count: number;
}

const promptTypes: PromptType[] = [
  {
    id: 'video',
    icon: Video,
    nameAr: 'تلقينات الفيديو',
    nameEn: 'Video Prompts',
    descriptionAr: 'إنشاء مقاطع فيديو بالذكاء الاصطناعي',
    descriptionEn: 'AI-powered video generation',
    technology: 'Veo3',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    count: 15
  },
  {
    id: 'image',
    icon: Image,
    nameAr: 'تلقينات الصور',
    nameEn: 'Image Prompts',
    descriptionAr: 'توليد صور احترافية بالذكاء الاصطناعي',
    descriptionEn: 'Professional AI image generation',
    technology: 'Imagen4/Flux',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    count: 23
  },
  {
    id: 'audio',
    icon: Music,
    nameAr: 'تلقينات الصوت',
    nameEn: 'Audio Prompts',
    descriptionAr: 'إنتاج محتوى صوتي عالي الجودة',
    descriptionEn: 'High-quality audio content creation',
    technology: 'ElevenLabs',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    count: 8
  }
];

const PromptTypeNavigation: React.FC = () => {
  const { translations, isRTL } = useLanguage();

  return (
    <div className="space-y-3">
      <h3 className={`text-sm font-semibold text-gray-600 dark:text-gray-300 px-3 ${
        isRTL ? 'text-right' : 'text-left'
      }`}>
        {isRTL ? 'أنواع التلقينات' : 'Prompt Types'}
      </h3>
      
      <div className="space-y-2">
        {promptTypes.map((type) => {
          const IconComponent = type.icon;
          const name = isRTL ? type.nameAr : type.nameEn;
          const description = isRTL ? type.descriptionAr : type.descriptionEn;
          
          return (
            <button
              key={type.id}
              className={`
                w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
                transition-all duration-200 shadow-sm hover:shadow-md
                group relative overflow-hidden
                ${isRTL ? 'text-right' : 'text-left'}
              `}
            >
              {/* خلفية متدرجة خفيفة */}
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-10 
                transition-opacity duration-200 ${type.color}
              `} />
              
              <div className="relative flex items-center gap-3">
                {/* الأيقونة */}
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-lg ${type.color}
                  flex items-center justify-center shadow-sm
                `}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                
                {/* المحتوى */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {name}
                    </h4>
                    <span className="flex-shrink-0 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      {type.count}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1">
                    {description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                      {type.technology}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PromptTypeNavigation;