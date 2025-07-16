import { Button, Card, EmailInput, PasswordInput, TextInput } from '@/components/ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
