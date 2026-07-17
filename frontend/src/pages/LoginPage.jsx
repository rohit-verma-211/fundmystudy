import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login, formatApiError } = useAuth();
  const navigate                  = useNavigate();
  const [email,    setEmail]      = useState('');
  const [password, setPassword]   = useState('');
  const [loading,  setLoading]    = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left panel */}
      <div className="hidden lg:flex relative bg-blue-700 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,white,transparent)]" />
        <div className="relative max-w-md text-white">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="h-10 w-10 rounded-xl bg-white text-blue-700 flex items-center justify-center">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-heading text-2xl font-extrabold">FundMyStudy</span>
          </Link>
          <h2 className="font-heading text-4xl font-bold leading-tight">Welcome back. Let's find more scholarships.</h2>
          <p className="mt-4 text-blue-200">Log in to access your dashboard, previous searches and AI scholarship matches.</p>
          <ul className="mt-8 space-y-3 text-blue-100 text-sm">
            <li>✓ Indian Govt, State, College & Private scholarships</li>
            <li>✓ Fully-funded study-abroad picks ranked by eligibility</li>
            <li>✓ Deadlines, documents and official links</li>
          </ul>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-heading font-bold text-slate-900">FundMyStudy</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-slate-900">Log in to your account</h1>
          <p className="text-slate-500 mt-2 text-sm">Enter your email and password below.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <Label className="text-slate-700">Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@college.edu" className="mt-2" />
            </div>
            <div>
              <Label className="text-slate-700">Password</Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Your password" className="mt-2" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 rounded-full bg-blue-700 hover:bg-blue-800 text-white">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Log in'}
            </Button>
          </form>

          <p className="mt-6 text-sm text-slate-600 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-700 font-semibold hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
