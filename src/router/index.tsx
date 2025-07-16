import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Prompts from '@/pages/Prompts';
import Register from '@/pages/Register';
import { Route, Routes } from 'react-router-dom';

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
