import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Globe2 } from 'lucide-react';
import { api, formatApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input }  from '@/components/ui/input';
import { Label }  from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const COUNTRIES = ['Japan','Germany','United Kingdom','United States','Australia','Canada','South Korea','China','France','Netherlands','Switzerland','Sweden','Norway','Italy','Hungary','Belgium','Singapore','New Zealand','Ireland','Spain','Any / Open to suggestions'];
const ENGLISH   = ['Not taken yet','IELTS','TOEFL','PTE','Duolingo English Test','Native / Exempt'];
const DEGREES   = ["Bachelor's","Master's","PhD","Exchange Program","Professional Certification"];

export default function AbroadForm() {
  const navigate   = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', nationality: 'Indian', latest_qualification: '',
    cgpa_or_percentage: '', course_interested: '',
    preferred_country: '', english_test_status: '', degree_level: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/scholarships/abroad', form);
      toast.success('Found your international matches!');
      navigate(`/results/${data.id}`);
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
            <Globe2 className="h-5 w-5" />
          </div>
          <div className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500">Study Abroad</div>
        </div>
        <h1 className="font-heading text-4xl font-bold text-slate-900">Tell us your study-abroad goal</h1>
        <p className="text-slate-600 mt-2">We'll match you with fully-funded international scholarships ranked by fit.</p>

        <form onSubmit={submit} className="mt-10 bg-white border border-slate-200 rounded-3xl p-8 space-y-5">
          <Field label="Full Name" required>
            <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
          </Field>

          <Field label="Nationality" required>
            <Input value={form.nationality} onChange={e => set('nationality', e.target.value)} />
          </Field>

          <Field label="Latest Qualification" required>
            <Input value={form.latest_qualification} onChange={e => set('latest_qualification', e.target.value)} placeholder="e.g. B.Tech CSE, 2025 — IIT Delhi" />
          </Field>

          <Field label="CGPA or Percentage" required>
            <Input value={form.cgpa_or_percentage} onChange={e => set('cgpa_or_percentage', e.target.value)} placeholder="e.g. 8.5 CGPA or 85%" />
          </Field>

          <Field label="Degree Level You Want to Pursue" required>
            <Sel value={form.degree_level} onChange={v => set('degree_level', v)} options={DEGREES} placeholder="Select degree level" />
          </Field>

          <Field label="Course / Field Interested In" required>
            <Input value={form.course_interested} onChange={e => set('course_interested', e.target.value)} placeholder="e.g. MS in Computer Science, MBA, PhD in Physics" />
          </Field>

          <Field label="Preferred Country" required>
            <Sel value={form.preferred_country} onChange={v => set('preferred_country', v)} options={COUNTRIES} placeholder="Select country" />
          </Field>

          <Field label="English Language Test Status" required>
            <Sel value={form.english_test_status} onChange={v => set('english_test_status', v)} options={ENGLISH} placeholder="Select test status" />
          </Field>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full md:w-auto h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white px-8">
              {loading
                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Analysing your profile…</>
                : 'Find International Scholarships'}
            </Button>
            <p className="text-xs text-slate-500 mt-3">AI analysis usually takes 15–30 seconds.</p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <Label className="text-slate-700">{label}{required && <span className="text-rose-500 ml-0.5">*</span>}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Sel({ value, onChange, options, placeholder }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-11"><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent className="max-h-72">
        {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
