import { Link } from 'react-router-dom';
import { ArrowRight, IndianRupee, Globe2, History } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500">Dashboard</div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mt-2">
          Hi {firstName} — let's find your scholarships.
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl text-lg">
          Choose your path below. You can use both forms and save unlimited searches.
        </p>

        {/* Main cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* India */}
          <Link to="/find/india" className="group">
            <div className="h-full bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center">
                <IndianRupee className="h-7 w-7" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mt-6">Indian Financial Scholarships</h2>
              <p className="text-slate-600 mt-3 leading-relaxed">
                Central & State Govt, College/Institute, Private foundations, NGOs and CSR programs —
                matched to your category, family income and academic profile.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                <li className="flex items-center gap-2"><span className="text-blue-700">✓</span> NSP, PM Scholarship, Central Sector Scheme</li>
                <li className="flex items-center gap-2"><span className="text-blue-700">✓</span> SC/ST/OBC/EWS/Minority scholarships</li>
                <li className="flex items-center gap-2"><span className="text-blue-700">✓</span> Tata, Birla, Jindal, HDFC & more</li>
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 text-blue-700 font-semibold group-hover:gap-3 transition-all">
                Start India form <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Abroad */}
          <Link to="/find/abroad" className="group">
            <div className="h-full bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center">
                <Globe2 className="h-7 w-7" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mt-6">Study Abroad Finder</h2>
              <p className="text-slate-600 mt-3 leading-relaxed">
                MEXT, DAAD, Chevening, Fulbright, Erasmus Mundus, GKS, CSC, Australia Awards and 10+ more —
                fully-funded picks tailored to your goal country and degree level.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                <li className="flex items-center gap-2"><span className="text-amber-600">✓</span> Japan, Germany, UK, USA, South Korea</li>
                <li className="flex items-center gap-2"><span className="text-amber-600">✓</span> Bachelor's, Master's, PhD, Exchange</li>
                <li className="flex items-center gap-2"><span className="text-amber-600">✓</span> Stipend, tuition, airfare & insurance details</li>
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 text-amber-700 font-semibold group-hover:gap-3 transition-all">
                Start abroad form <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* History link */}
        <div className="mt-8">
          <Link to="/history">
            <Button variant="outline" className="rounded-full">
              <History className="h-4 w-4 mr-2" /> View my previous searches
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
