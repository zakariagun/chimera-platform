import { Button, Card, EmailInput, PasswordInput } from '@/components/ui';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
