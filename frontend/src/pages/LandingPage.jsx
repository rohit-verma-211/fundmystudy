import { Link } from 'react-router-dom';
import {
  ArrowRight, Search, Sparkles, FileCheck, Bell,
  IndianRupee, Globe2, Shield, Zap, Award, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const HOW = [
  { icon: FileCheck, title: 'Fill Your Profile', desc: 'Enter your academic details, family income, category and college info in under 2 minutes.' },
  { icon: Sparkles,  title: 'AI Analyses',       desc: 'Our Claude AI engine scans hundreds of Central, State, Private and International scholarships instantly.' },
  { icon: Award,     title: 'Get Matches',        desc: 'Receive a ranked list of scholarships with eligibility %, deadlines, amounts and official links.' },
];

const BENEFITS = [
  { icon: Zap,          title: 'Instant Results',       desc: 'Get personalised scholarship matches in under 30 seconds — no manual searching required.' },
  { icon: Globe2,       title: 'India + Abroad',        desc: 'Covers Central Govt, State, College, Private, CSR, NGO and 15+ international scholarships.' },
  { icon: Shield,       title: 'Only Real Scholarships', desc: 'We only recommend active, verified scholarships with official government or institution links.' },
  { icon: Bell,         title: 'WhatsApp Updates',      desc: 'Receive scholarship deadline reminders and new opportunity alerts on WhatsApp.' },
  { icon: Search,       title: 'Smart Matching',        desc: 'AI ranks scholarships by your eligibility percentage so you know where to apply first.' },
  { icon: Users,        title: 'All Categories',        desc: 'Covers General, OBC, SC, ST, EWS, Minority, Disability and Merit-based scholarships.' },
];

const STATS = [
  { value: '500+', label: 'Scholarships Covered' },
  { value: '15+',  label: 'Countries for Study Abroad' },
  { value: 'AI',   label: 'Powered Matching' },
  { value: 'Free', label: 'Always Free to Use' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 px-6 md:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(29,78,216,0.08),transparent)]" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-200">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Scholarship Finder
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-black text-slate-900 leading-none tracking-tight">
              Find Every<br />
              <span className="text-blue-700">Scholarship</span><br />
              You Deserve
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
              India's smartest scholarship platform — enter your profile once and our AI instantly matches you with
              Government, State, Private and International scholarships ranked by eligibility.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="h-12 px-8 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-base font-semibold">
                  Find My Scholarships <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <a href="#how">
                <Button variant="outline" className="h-12 px-8 rounded-full text-base">
                  How it works
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-heading text-2xl font-black text-blue-700">{s.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <div className="relative hidden lg:block">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-xs uppercase tracking-widest text-blue-300 font-semibold">AI Match Result</div>
              <h3 className="font-heading text-2xl font-bold mt-2">PM Scholarship Scheme</h3>
              <p className="text-blue-200 text-sm mt-1">Central Government · RPF/CAPF Wards</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="text-4xl font-heading font-black">92%</div>
                <div className="flex-1">
                  <div className="text-xs text-blue-300">Eligibility Match</div>
                  <div className="h-2 bg-blue-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-800/50 rounded-xl p-3">
                  <div className="text-blue-300 text-xs">Amount</div>
                  <div className="font-semibold mt-0.5">₹25,000 / year</div>
                </div>
                <div className="bg-blue-800/50 rounded-xl p-3">
                  <div className="text-blue-300 text-xs">Deadline</div>
                  <div className="font-semibold mt-0.5">Oct 31, 2025</div>
                </div>
              </div>
              <div className="mt-4 bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-3 text-sm">
                <div className="text-emerald-300 text-xs font-semibold">Why you qualify</div>
                <div className="text-emerald-100 mt-0.5">Your CGPA 8.4 and family income below ₹5L make you highly eligible.</div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Study Abroad ✈️
            </div>
            <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              500+ Scholarships
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="py-24 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500">Simple Process</div>
            <h2 className="font-heading text-4xl font-bold text-slate-900 mt-2">How FundMyStudy Works</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">Three simple steps to find every scholarship you are eligible for.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="h-12 w-12 rounded-xl bg-blue-700 text-white flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-bold text-slate-400 mb-1">STEP {i + 1}</div>
                <h3 className="font-heading text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-600 mt-2 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two paths ── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500">Two Paths</div>
            <h2 className="font-heading text-4xl font-bold text-slate-900 mt-2">Scholarships for Every Goal</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-3xl p-8">
              <div className="h-12 w-12 rounded-xl bg-blue-700 text-white flex items-center justify-center mb-4">
                <IndianRupee className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900">Indian Scholarships</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {['Central Government (NSP, PM Scholarship, Central Sector)','State Government scholarships for your state','College & Institute scholarships','Private Foundations (Tata, Birla, Jindal)','CSR & NGO scholarships','Minority, Disability & Category-based scholarships'].map(t => (
                  <li key={t} className="flex items-start gap-2"><span className="text-blue-700 mt-0.5">✓</span>{t}</li>
                ))}
              </ul>
              <Link to="/register" className="inline-flex items-center gap-2 mt-6 text-blue-700 font-semibold text-sm hover:gap-3 transition-all">
                Find Indian Scholarships <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-3xl p-8">
              <div className="h-12 w-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900">Study Abroad Scholarships</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {['MEXT Scholarship — Japan (Fully Funded)','DAAD Scholarship — Germany','Chevening — United Kingdom','Fulbright-Nehru — United States','Erasmus Mundus — Europe','GKS — South Korea, CSC — China, Australia Awards'].map(t => (
                  <li key={t} className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span>{t}</li>
                ))}
              </ul>
              <Link to="/register" className="inline-flex items-center gap-2 mt-6 text-amber-700 font-semibold text-sm hover:gap-3 transition-all">
                Find Abroad Scholarships <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section id="benefits" className="py-24 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500">Why FundMyStudy</div>
            <h2 className="font-heading text-4xl font-bold text-slate-900 mt-2">Everything You Need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(b => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">{b.title}</h3>
                <p className="text-slate-600 mt-1 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-10 bg-blue-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-heading text-4xl font-bold">Start Finding Scholarships — It's Free</h2>
          <p className="mt-4 text-blue-200 text-lg">Join thousands of students who found funding through FundMyStudy.</p>
          <Link to="/register" className="inline-block mt-8">
            <Button className="h-12 px-10 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-semibold text-base">
              Create Free Account <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
