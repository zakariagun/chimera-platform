import React from 'react';
import { TrendingUp, Clock, Star, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون الإحصائيات السريعة للمستخدم
 * Component for displaying quick user statistics
 */

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  labelAr: string;
  labelEn: string;
  value: string | number;
  color: string;
  trend?: string;
}

const UserStats: React.FC = () => {
  const { isRTL } = useLanguage();

  // بيانات وهمية للإحصائيات - في المستقبل ستأتي من API
  const stats: StatItem[] = [
    {
      icon: Zap,
      labelAr: 'إجمالي التلقينات',
      labelEn: 'Total Prompts',
      value: 127,
      color: 'text-purple-600 dark:text-purple-400',
      trend: '+12%'
    },
    {
      icon: Clock,
      labelAr: 'هذا الأسبوع',
      labelEn: 'This Week',
      value: 23,
      color: 'text-blue-600 dark:text-blue-400',
      trend: '+8%'
    },
    {
      icon: Star,
      labelAr: 'المفضلة',
      labelEn: 'Favorites',
      value: 15,
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: TrendingUp,
      labelAr: 'معدل النجاح',
      labelEn: 'Success Rate',
      value: '94%',
      color: 'text-green-600 dark:text-green-400',
      trend: '+2%'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className={`text-sm font-semibold text-gray-600 dark:text-gray-300 px-3 ${
        isRTL ? 'text-right' : 'text-left'
      }`}>
        {isRTL ? 'إحصائياتك' : 'Your Stats'}
      </h3>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const label = isRTL ? stat.labelAr : stat.labelEn;
            
            return (
              <div
                key={index}
                className="relative group cursor-pointer"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className={`
                    w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 
                    flex items-center justify-center group-hover:scale-110 
                    transition-transform duration-200
                  `}>
                    <IconComponent className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                      {stat.trend && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          {stat.trend}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* رسم بياني بسيط */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 ${
            isRTL ? 'flex-row-reverse' : ''
          }`}>
            <span>{isRTL ? 'النشاط الأسبوعي' : 'Weekly Activity'}</span>
            <span>{isRTL ? 'الأيام السبعة الماضية' : 'Last 7 days'}</span>
          </div>
          
          <div className="flex items-end space-x-1 rtl:space-x-reverse h-8">
            {[3, 7, 4, 8, 5, 9, 6].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-primary/60 to-primary/30 rounded-sm min-h-[2px]"
                style={{ height: `${height * 12}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;