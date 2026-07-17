import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, Loader2, IndianRupee, Globe2, ArrowRight } from 'lucide-react';
import { api, formatApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge }  from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function HistoryPage() {
  const [items, setItems] = useState(null);
  const [err,   setErr]   = useState(null);

  useEffect(() => {
    api.get('/scholarships/history')
      .then(({ data }) => setItems(data.items || []))
      .catch(e => setErr(formatApiError(e.response?.data?.detail) || e.message));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <HistoryIcon className="h-5 w-5" />
          </div>
          <div className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500">History</div>
        </div>
        <h1 className="font-heading text-4xl font-bold text-slate-900">Your Previous Searches</h1>

        {err && <p className="text-rose-600 mt-6">{err}</p>}

        {items === null && !err && (
          <div className="flex items-center gap-2 mt-12 text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading…
          </div>
        )}

        {items?.length === 0 && (
          <div className="mt-12 border border-dashed border-slate-300 rounded-2xl p-12 text-center">
            <p className="text-slate-600">You haven't run any searches yet.</p>
            <Link to="/dashboard">
              <Button className="mt-4 rounded-full bg-blue-700 hover:bg-blue-800 text-white">Find Scholarships</Button>
            </Link>
          </div>
        )}

        {items?.length > 0 && (
          <div className="mt-8 grid gap-4">
            {items.map(item => {
              const isAbroad = item.kind === 'abroad';
              const Icon     = isAbroad ? Globe2 : IndianRupee;
              const date     = item.created_at ? new Date(item.created_at).toLocaleString('en-IN') : '';
              const title    = isAbroad
                ? item.form?.course_interested || 'Study Abroad Search'
                : item.form?.full_name || 'Indian Scholarship Search';

              return (
                <Link key={item.id} to={`/results/${item.id}`} className="block">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-5">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${isAbroad ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`${isAbroad ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'} border-0`}>
                          {isAbroad ? 'Study Abroad' : 'Indian'}
                        </Badge>
                        <span className="text-xs text-slate-500">{date}</span>
                      </div>
                      <div className="font-heading font-bold text-slate-900 mt-1 truncate">{title}</div>
                      <div className="text-sm text-slate-600">{item.count} scholarships matched</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
