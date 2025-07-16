import { Button, Card } from '@/components/ui';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
        <h1 className="text-4xl font-bold text-primary mb-4">
          مرحباً بك في منصة Chimera
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          منصة ذكية متقدمة لتوليد التلقينات الاحترافية للذكاء الاصطناعي
        </p>
        <Link to="/prompts">
          <Button size="lg" className="gap-2">
            ابدأ الآن <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold">1000+</h3>
          <p className="text-muted-foreground">تلقين متاح</p>
        </Card>
        <Card className="p-6 text-center">
          <Users className="h-8 w-8 text-secondary mx-auto mb-3" />
          <h3 className="text-2xl font-bold">500+</h3>
          <p className="text-muted-foreground">مستخدم نشط</p>
        </Card>
        <Card className="p-6 text-center">
          <TrendingUp className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="text-2xl font-bold">95%</h3>
          <p className="text-muted-foreground">معدل النجاح</p>
        </Card>
      </section>
    </div>
  );
}
