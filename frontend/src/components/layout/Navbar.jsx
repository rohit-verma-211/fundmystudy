import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [open, setOpen]  = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-blue-700 text-white flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-extrabold tracking-tight text-slate-900">FundMyStudy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="/#how" className="hover:text-blue-700 transition">How it works</a>
          <a href="/#benefits" className="hover:text-blue-700 transition">Benefits</a>
          {user && <Link to="/dashboard" className="hover:text-blue-700 transition">Dashboard</Link>}
          {user && <Link to="/history"   className="hover:text-blue-700 transition">History</Link>}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <User className="h-4 w-4" /><span className="font-medium">{user.name}</span>
              </div>
              <Button variant="outline" onClick={handleLogout} className="rounded-full">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="rounded-full">Log in</Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-full bg-blue-700 hover:bg-blue-800 text-white">Get started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">
          <a href="/#how"      className="block text-sm text-slate-700 hover:text-blue-700" onClick={() => setOpen(false)}>How it works</a>
          <a href="/#benefits" className="block text-sm text-slate-700 hover:text-blue-700" onClick={() => setOpen(false)}>Benefits</a>
          {user && <Link to="/dashboard" className="block text-sm text-slate-700 hover:text-blue-700" onClick={() => setOpen(false)}>Dashboard</Link>}
          {user && <Link to="/history"   className="block text-sm text-slate-700 hover:text-blue-700" onClick={() => setOpen(false)}>History</Link>}
          {user ? (
            <button onClick={handleLogout} className="block text-sm text-red-600 font-medium">Logout</button>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link to="/login"    onClick={() => setOpen(false)}><Button variant="outline" size="sm" className="rounded-full">Log in</Button></Link>
              <Link to="/register" onClick={() => setOpen(false)}><Button size="sm" className="rounded-full bg-blue-700 text-white">Get started</Button></Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
