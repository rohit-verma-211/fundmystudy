import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ExternalLink, Calendar, FileText, Sparkles, ArrowLeft, Award, MapPin } from 'lucide-react';
import { api, formatApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge }  from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ResultsPage() {
  const { id }   = useParams();
  const [data,   setData]   = useState(null);
  const [error,  setError]  = useState(null);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('match');

  useEffect(() => {
    let alive = true;
    api.get(`/scholarships/search/${id}`)
      .then(({ data }) => { if (alive) setData(data); })
      .catch(err => { if (alive) setError(formatApiError(err.response?.data?.detail) || err.message); });
    return () => { alive = false; };
  }, [id]);

  const scholarships = data?.result?.scholarships || [];
  const isAbroad     = data?.kind === 'abroad';

  const filterOptions = useMemo(() => {
    const set = new Set();
    scholarships.forEach(s => set.add(isAbroad ? s.country : s.type));
    return ['All', ...Array.from(set).filter(Boolean)];
  }, [scholarships, isAbroad]);

  const visible = useMemo(() => {
    let list = [...scholarships];
    if (filter !== 'All') list = list.filter(s => (isAbroad ? s.country : s.type) === filter);
    if (sortBy === 'match') list.sort((a, b) => (b.match_percentage || 0) - (a.match_percentage || 0));
    return list;
  }, [scholarships, filter, sortBy, isAbroad]);

  if (error) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto p-12 text-center">
        <h2 className="font-heading text-2xl font-bold text-rose-600">Could not load results</h2>
        <p className="text-slate-600 mt-2">{error}</p>
        <Link to="/dashboard"><Button className="mt-6 rounded-full">Back to dashboard</Button></Link>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="h-10 w-10 animate-spin text-blue-700" />
        <p className="mt-4 text-slate-600">Loading your matches…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <div className="mt-4">
          <div className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500">
            {isAbroad ? 'Study Abroad' : 'Indian Scholarships'} · AI Match
          </div>
          <h1 className="font-heading text-4xl font-bold text-slate-900 mt-1">
            {visible.length} scholarships matched for you
          </h1>
          {data.result?.student_summary && (
            <p className="text-slate-600 mt-2 max-w-3xl">{data.result.student_summary}</p>
          )}
        </div>

        {/* Top picks */}
        {data.result?.top_picks?.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-blue-800 font-heading font-bold">
              <Sparkles className="h-4 w-4" /> Top Picks for You
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.result.top_picks.map(p => (
                <Badge key={p} className="bg-white text-blue-800 border border-blue-200 hover:bg-white">{p}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 mt-8">
          {/* Sidebar filters */}
          <aside className="lg:col-span-3">
            <div className="border border-slate-200 rounded-2xl p-5 sticky top-24">
              <div className="text-sm font-heading font-bold text-slate-900 mb-3">Filter</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
                {isAbroad ? 'Country' : 'Type'}
              </div>
              <div className="space-y-1">
                {filterOptions.map(t => (
                  <button key={t} onClick={() => setFilter(t)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${filter === t ? 'bg-blue-700 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mt-5 mb-2">Sort By</div>
              <button onClick={() => setSortBy('match')}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${sortBy === 'match' ? 'bg-blue-700 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}>
                Eligibility match %
              </button>
            </div>
          </aside>

          {/* Cards */}
          <main className="lg:col-span-9 space-y-5">
            {visible.length === 0 && (
              <div className="text-center py-16 text-slate-500">No scholarships match this filter.</div>
            )}
            {visible.map((s, i) => <ScholarshipCard key={i} s={s} isAbroad={isAbroad} />)}

            {/* Next steps */}
            {data.result?.next_steps?.length > 0 && (
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="font-heading font-bold text-amber-900 mb-3">Your Next Steps</div>
                <ul className="space-y-2 text-amber-900/90 text-sm">
                  {data.result.next_steps.map((n, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold mt-0.5">{i + 1}.</span> {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ScholarshipCard({ s, isAbroad }) {
  const match = Math.max(0, Math.min(100, s.match_percentage || 0));
  const color  = match >= 80 ? 'text-emerald-700' : match >= 60 ? 'text-blue-700' : 'text-amber-700';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {isAbroad ? (
              <>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
                  <MapPin className="h-3 w-3 mr-1" />{s.country}
                </Badge>
                <Badge variant="outline">{s.degree_level}</Badge>
                {s.funding && <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0">{s.funding}</Badge>}
              </>
            ) : (
              <>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">
                  <Award className="h-3 w-3 mr-1" />{s.type}
                </Badge>
                {s.provider && <Badge variant="outline">{s.provider}</Badge>}
              </>
            )}
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-900 mt-3">{s.name}</h3>
          <p className="text-sm text-slate-600 mt-1">{s.eligibility_criteria}</p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Match</div>
          <div className={`text-3xl font-heading font-black ${color}`}>{match}%</div>
          <div className="w-24 h-1.5 mt-1 rounded-full bg-slate-100 overflow-hidden ml-auto">
            <div className={`h-full rounded-full ${match >= 80 ? 'bg-emerald-500' : match >= 60 ? 'bg-blue-700' : 'bg-amber-500'}`}
              style={{ width: `${match}%` }} />
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
        {!isAbroad && s.amount         && <KV label="Amount"><strong>{s.amount}</strong></KV>}
        {!isAbroad && s.benefits       && <KV label="Benefits">{s.benefits}</KV>}
        {isAbroad  && s.monthly_stipend        && <KV label="Monthly Stipend">{s.monthly_stipend}</KV>}
        {isAbroad  && s.tuition_coverage       && <KV label="Tuition">{s.tuition_coverage}</KV>}
        {isAbroad  && s.accommodation_coverage && <KV label="Accommodation">{s.accommodation_coverage}</KV>}
        {isAbroad  && s.air_ticket             && <KV label="Air Ticket">{s.air_ticket}</KV>}
        {isAbroad  && s.medical_insurance      && <KV label="Medical Insurance">{s.medical_insurance}</KV>}
        {s.deadline && <KV label="Deadline" icon={Calendar}>{s.deadline}</KV>}
      </div>

      {/* Why eligible */}
      {(s.why_eligible || s.why_suitable) && (
        <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">Why You're a Fit</div>
          <p className="text-sm text-emerald-900 mt-1">{s.why_eligible || s.why_suitable}</p>
        </div>
      )}

      {/* Documents / Exams */}
      {((s.documents_required?.length) || (s.required_exams?.length)) && (
        <div className="mt-4">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold flex items-center gap-1.5 mb-2">
            <FileText className="h-3 w-3" />
            {isAbroad ? 'Required Exams' : 'Documents Required'}
          </div>
          <div className="flex flex-wrap gap-2">
            {(isAbroad ? s.required_exams : s.documents_required).map((d, i) => (
              <Badge key={i} variant="outline" className="font-normal">{d}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Apply button */}
      {s.official_link && (
        <div className="mt-5">
          <a href={s.official_link} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-blue-700 hover:bg-blue-800 text-white">
              Apply on Official Site <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}

function KV({ label, icon: Icon, children }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3" />}{label}
      </div>
      <div className="text-slate-800 mt-1">{children}</div>
    </div>
  );
}
