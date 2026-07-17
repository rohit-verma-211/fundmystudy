import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, MessageCircle, IndianRupee } from 'lucide-react';
import { api, formatApiError } from '@/lib/api';
import { Button }   from '@/components/ui/button';
import { Input }    from '@/components/ui/input';
import { Label }    from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch }   from '@/components/ui/switch';
import Navbar  from '@/components/layout/Navbar';
import Footer  from '@/components/layout/Footer';
import { toast } from 'sonner';

const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli','Daman and Diu','Lakshadweep','Puducherry'];
const COURSES = ['B.Tech','M.Tech','BCA','MCA','B.Sc','M.Sc','MBA','BBA','B.A','M.A','B.Com','M.Com','Diploma','MBBS','BDS','B.Pharm','M.Pharm','B.Ed','LLB','PhD','Other'];
const YEARS   = ['1st Year','2nd Year','3rd Year','4th Year','5th Year'];

export default function IndianForm() {
  const navigate   = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '', mobile: '', college_name: '', course: '', branch: '',
    current_year: '', cgpa: '', twelfth_percentage: '', tenth_percentage: '',
    family_income: '', category: '', gender: '', state: '',
    disability: false, minority: false,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/scholarships/india', form);
      toast.success('Found your scholarship matches!');
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
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-blue-700 text-white flex items-center justify-center">
            <IndianRupee className="h-5 w-5" />
          </div>
          <div className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500">Indian Scholarships</div>
        </div>
        <h1 className="font-heading text-4xl font-bold text-slate-900">Tell us about you</h1>
        <p className="text-slate-600 mt-2">Your details are private and used only to match scholarships.</p>

        <form onSubmit={submit} className="mt-10 bg-white border border-slate-200 rounded-3xl p-8 space-y-8">

          {/* Personal */}
          <section>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-5">Personal Details</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full Name" required>
                <Input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Your full name" />
              </Field>

              <Field label="Mobile Number" required note={
                <span className="flex items-start gap-1.5 text-xs text-slate-500 mt-1.5">
                  <MessageCircle className="h-3.5 w-3.5 mt-0.5 text-emerald-600 shrink-0" />
                  Collected only to send scholarship updates and notifications on WhatsApp.
                </span>
              }>
                <Input value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+91 9876543210" />
              </Field>

              <Field label="Gender" required>
                <Sel value={form.gender} onChange={v => set('gender', v)} options={['Male','Female','Other']} placeholder="Select gender" />
              </Field>

              <Field label="State" required>
                <Sel value={form.state} onChange={v => set('state', v)} options={STATES} placeholder="Select state" />
              </Field>

              <Field label="Category" required>
                <Sel value={form.category} onChange={v => set('category', v)} options={['General','OBC','SC','ST','EWS']} placeholder="Select category" />
              </Field>

              <Field label="Family Annual Income (INR)" required>
                <Input value={form.family_income} onChange={e => set('family_income', e.target.value)} placeholder="e.g. 250000" />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <Toggle label="Person with Disability?" value={form.disability} onChange={v => set('disability', v)} />
              <Toggle label="Minority Community?"     value={form.minority}   onChange={v => set('minority', v)} />
            </div>
          </section>

          {/* Academic */}
          <section>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-5">Academic Details</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="College / University Name" required>
                <Input value={form.college_name} onChange={e => set('college_name', e.target.value)} placeholder="e.g. Delhi Technological University" />
              </Field>

              <Field label="Course" required>
                <Sel value={form.course} onChange={v => set('course', v)} options={COURSES} placeholder="Select course" />
              </Field>

              <Field label="Branch / Specialization" required>
                <Input value={form.branch} onChange={e => set('branch', e.target.value)} placeholder="e.g. Computer Science Engineering" />
              </Field>

              <Field label="Current Year" required>
                <Sel value={form.current_year} onChange={v => set('current_year', v)} options={YEARS} placeholder="Select year" />
              </Field>

              <Field label="CGPA (for 2nd year onwards)">
                <Input value={form.cgpa} onChange={e => set('cgpa', e.target.value)} placeholder="e.g. 8.5 out of 10" />
              </Field>

              <Field label="12th Percentage (for 1st year students)">
                <Input value={form.twelfth_percentage} onChange={e => set('twelfth_percentage', e.target.value)} placeholder="e.g. 92" />
              </Field>

              <Field label="10th Percentage (optional)">
                <Input value={form.tenth_percentage} onChange={e => set('tenth_percentage', e.target.value)} placeholder="e.g. 90" />
              </Field>
            </div>
          </section>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full md:w-auto h-12 rounded-full bg-blue-700 hover:bg-blue-800 text-white px-8">
              {loading
                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Analysing your profile…</>
                : 'Find My Scholarships'}
            </Button>
            <p className="text-xs text-slate-500 mt-3">AI analysis usually takes 15–30 seconds.</p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

function Field({ label, required, note, children }) {
  return (
    <div>
      <Label className="text-slate-700">{label}{required && <span className="text-rose-500 ml-0.5">*</span>}</Label>
      <div className="mt-2">{children}</div>
      {note}
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

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between border border-slate-200 rounded-xl p-4">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}
