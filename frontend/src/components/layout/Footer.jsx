import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-heading font-bold text-slate-800">FundMyStudy</span>
          </Link>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} FundMyStudy. Helping students fund their futures.</p>
          <p className="text-sm text-slate-500">Made with ❤️ for Indian students</p>
        </div>
      </div>
    </footer>
  );
}
