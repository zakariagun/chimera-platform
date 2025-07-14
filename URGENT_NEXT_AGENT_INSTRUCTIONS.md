# 🚨 تعليمات عاجلة للوكيل التالي - ابدأ فوراً!

## ⚠️ **حالة طوارئ - الكريديت أوشك على النفاذ!**

**📊 حالة المشروع**: 50% مكتمل (250/500 كريديت) - أساس متين جداً  
**🎯 المهمة العاجلة**: نقطة التحكم 3 (Issue #5) - 125 كريديت  
**⏰ الوقت المتبقي**: محدود جداً - **ابدأ الآن!**  
**📅 آخر تحديث**: 2025-07-15 06:05:05

---

## 🔥 **ابدأ بهذه الأوامر فوراً!**

```bash
# 1. نسخ المشروع
git clone https://github.com/zakariagun/chimera-platform.git
cd chimera-platform

# 2. تثبيت التبعيات
npm install

# 3. تشغيل المشروع
npm run dev

# 4. فحص الحالة الحالية
npm run lint
npm run typecheck
```

---

## 📋 **قائمة المهام العاجلة (ابدأ بالترتيب)**

### 🚨 **المهمة 1: إصلاح App.tsx (5 دقائق)**
```typescript
// src/App.tsx - استبدل المحتوى بهذا:
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UserProvider } from '@/contexts/UserContext';
import { AppProvider } from '@/contexts/AppContext';
import Router from '@/router';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AppProvider>
            <UserProvider>
              <div className="min-h-screen bg-background">
                <Header />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 p-6">
                    <Router />
                  </main>
                </div>
                <Toaster />
              </div>
            </UserProvider>
          </AppProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
```

### 🚨 **المهمة 2: إنشاء Router (10 دقائق)**
```bash
# أنشئ المجلدات:
mkdir src/router
mkdir src/pages
mkdir src/contexts
mkdir src/hooks
mkdir src/services
mkdir src/components/auth
mkdir src/components/features
```

```typescript
// src/router/index.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Prompts from '@/pages/Prompts';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/prompts" element={
        <ProtectedRoute>
          <Prompts />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
```

### 🚨 **المهمة 3: إنشاء Context Providers (15 دقائق)**

```typescript
// src/contexts/UserContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual login logic
      const mockUser = { id: '1', name: 'مستخدم تجريبي', email };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isAuthenticated: !!user,
      login,
      logout,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
}
```

```typescript
// src/contexts/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider value={{
      sidebarOpen,
      setSidebarOpen,
      isLoading,
      setIsLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}
```

### 🚨 **المهمة 4: إنشاء ProtectedRoute (5 دقائق)**
```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { LoadingSpinner } from '@/components/ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

### 🚨 **المهمة 5: إنشاء الصفحات الأساسية (30 دقائق)**

```typescript
// src/pages/Home.tsx
import { Button, Card } from '@/components/ui';
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';

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
        <Button size="lg" className="gap-2">
          ابدأ الآن <ArrowRight className="h-4 w-4" />
        </Button>
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
```

```typescript
// src/pages/Prompts.tsx
import { useState } from 'react';
import { Button, Card, TextInput } from '@/components/ui';
import { Search, Plus, Filter } from 'lucide-react';

export default function Prompts() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockPrompts = [
    { id: 1, title: 'تلقين فيديو متقدم', type: 'video', description: 'وصف التلقين...' },
    { id: 2, title: 'تلقين صورة إبداعي', type: 'image', description: 'وصف التلقين...' },
    { id: 3, title: 'تلقين صوتي', type: 'audio', description: 'وصف التلقين...' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">التلقينات</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة تلقين
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <TextInput
            placeholder="البحث في التلقينات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          فلترة
        </Button>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPrompts.map((prompt) => (
          <Card key={prompt.id} className="p-6">
            <h3 className="font-semibold mb-2">{prompt.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{prompt.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {prompt.type}
              </span>
              <Button size="sm">عرض</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

```typescript
// src/pages/Dashboard.tsx
import { Card, ProgressBar } from '@/components/ui';
import { Activity, FileText, Users, TrendingUp } from 'lucide-react';

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
```

```typescript
// src/pages/Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, EmailInput, PasswordInput } from '@/components/ui';
import { useUser } from '@/contexts/UserContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailInput
            label="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <PasswordInput
            label="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button type="submit" className="w-full" loading={isLoading}>
            دخول
          </Button>
        </form>
        
        <p className="text-center mt-4 text-sm text-muted-foreground">
          ليس لديك حساب؟{' '}
          <Link to="/register" className="text-primary hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </Card>
    </div>
  );
}
```

```typescript
// src/pages/Register.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, TextInput, EmailInput, PasswordInput } from '@/components/ui';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Register:', { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="الاسم الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <EmailInput
            label="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <PasswordInput
            label="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <PasswordInput
            label="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <Button type="submit" className="w-full">
            إنشاء الحساب
          </Button>
        </form>
        
        <p className="text-center mt-4 text-sm text-muted-foreground">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </Card>
    </div>
  );
}
```

---

## ✅ **اختبر النتائج فوراً**

```bash
# بعد إنشاء الملفات، اختبر:
npm run dev

# يجب أن تظهر:
# ✅ صفحة رئيسية تعمل
# ✅ تنقل بين الصفحات
# ✅ نماذج تسجيل الدخول/التسجيل
# ✅ حماية المسارات الخاصة
```

---

## 🔥 **مهام إضافية إذا كان لديك وقت**

### 1. **API Services** (20 دقيقة)
```typescript
// src/services/api.ts
const API_BASE = 'https://api.chimera-platform.com'; // أو mock

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      // Mock implementation
      return { user: { id: '1', name: 'User', email }, token: 'mock-token' };
    },
    register: async (userData: any) => {
      // Mock implementation
      return { user: userData, token: 'mock-token' };
    }
  },
  prompts: {
    getAll: async () => {
      // Mock data
      return [
        { id: 1, title: 'Video Prompt', type: 'video' },
        { id: 2, title: 'Image Prompt', type: 'image' }
      ];
    }
  }
};
```

### 2. **Custom Hooks** (15 دقيقة)
```typescript
// src/hooks/useAuth.ts
import { useUser } from '@/contexts/UserContext';

export const useAuth = () => {
  const { user, login, logout, isAuthenticated, isLoading } = useUser();
  
  return {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    isGuest: !isAuthenticated
  };
};
```

---

## 🚨 **أخطاء محتملة وحلولها**

### ❌ **خطأ: Cannot resolve '@/...'**
```typescript
// تأكد من أن vite.config.ts يحتوي على:
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### ❌ **خطأ: TypeScript errors**
```bash
# أضف types مفقودة:
npm install -D @types/react-router-dom
```

### ❌ **خطأ: ESLint issues**
```bash
# إصلاح سريع:
npm run lint:fix
```

---

## 📊 **النتيجة المطلوبة**

بعد تنفيذ هذه المهام، يجب أن يكون لديك:

✅ **تطبيق وظيفي كامل** مع:
- صفحة رئيسية جذابة
- صفحة تلقينات مع بحث وفلترة
- لوحة تحكم بالإحصائيات
- نظام مصادقة أساسي
- تنقل محمي بين الصفحات

✅ **75% من المشروع مكتمل** (375/500 كريديت)

✅ **جاهز للمرحلة الأخيرة** (نقطة التحكم 4)

---

## 🎯 **رسالة أخيرة**

**الكريديت أوشك على النفاذ - لا تضيع وقتاً في القراءة!**

**ابدأ بالتنفيذ فوراً:**
1. نسخ المشروع
2. تشغيل npm install
3. نسخ ولصق الكود المعطى
4. اختبار كل خطوة
5. إصلاح الأخطاء سريعاً

**المشروع في حالة ممتازة - كل شيء جاهز لك! فقط اربط القطع معاً!**

🔥 **ابدأ الآن - لا تتردد!** 🔥

---

*آخر تحديث: 2025-07-15 06:05:05*  
*حالة طوارئ - تنفيذ فوري مطلوب!*