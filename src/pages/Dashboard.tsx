import { Card, ProgressBar } from '@/components/ui';
import { Activity, FileText, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">لوحة التحكم</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">إجمالي التلقينات</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">هذا الأسبوع</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Activity className="h-8 w-8 text-secondary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">المفضلة</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Users className="h-8 w-8 text-accent" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">معدل النجاح</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">تقدم الأهداف الشهرية</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>تلقينات الفيديو</span>
                <span>75%</span>
              </div>
              <ProgressBar value={75} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>تلقينات الصور</span>
                <span>60%</span>
              </div>
              <ProgressBar value={60} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>تلقينات الصوت</span>
                <span>45%</span>
              </div>
              <ProgressBar value={45} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">النشاط الأخير</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">تم إنشاء تلقين فيديو جديد</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm">تم تحديث ملف المستخدم</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm">تم حفظ تلقين في المفضلة</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
