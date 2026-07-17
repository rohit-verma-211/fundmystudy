import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

import LandingPage  from '@/pages/LandingPage';
import LoginPage    from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import Dashboard    from '@/pages/Dashboard';
import IndianForm   from '@/pages/IndianForm';
import AbroadForm   from '@/pages/AbroadForm';
import ResultsPage  from '@/pages/ResultsPage';
import HistoryPage  from '@/pages/HistoryPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Public */}
          <Route path="/"         element={<LandingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected */}
          <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/find/india"   element={<ProtectedRoute><IndianForm /></ProtectedRoute>} />
          <Route path="/find/abroad"  element={<ProtectedRoute><AbroadForm /></ProtectedRoute>} />
          <Route path="/results/:id"  element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
          <Route path="/history"      element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
