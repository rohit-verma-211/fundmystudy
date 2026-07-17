const express       = require('express');
const Search        = require('../models/Search');
const protect        = require('../middleware/auth');

const router = express.Router();
const GEMINI_MODEL = 'gemini-2.5-flash'; // fast + free-tier friendly; use 'gemini-2.5-pro' for higher quality if you have quota

// @google/genai ships as an ES Module, so it must be loaded with dynamic import()
// even though this file is CommonJS. We cache the client after first load.
let aiClientPromise;
function getAiClient() {
  if (!aiClientPromise) {
    aiClientPromise = import('@google/genai').then(
      ({ GoogleGenAI }) => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    );
  }
  return aiClientPromise;
}

// ─── INDIA PROMPT ─────────────────────────────────────────────────────────────
const INDIA_SYSTEM = `You are an expert Scholarship Advisor AI for Indian college students.
Analyze the student profile carefully and respond ONLY with valid JSON. No markdown, no backticks, no explanation — pure JSON only.

Return this exact structure:
{
  "student_summary": "2-line profile summary mentioning key eligibility factors",
  "scholarships": [
    {
      "name": "Full scholarship name",
      "provider": "Organization providing it",
      "type": "Central Government",
      "match_percentage": 88,
      "amount": "Rs 20,000 per year",
      "benefits": "Tuition fee + maintenance allowance",
      "deadline": "October 31, 2025",
      "official_link": "https://scholarships.gov.in",
      "documents_required": ["Aadhaar Card", "Income Certificate from SDM", "Latest Marksheet", "Bank Passbook", "Caste Certificate"],
      "eligibility_criteria": "Concise eligibility — income limit, marks, category etc.",
      "why_eligible": "Exact reason this specific student qualifies based on their data"
    }
  ],
  "top_picks": ["Scholarship Name 1", "Scholarship Name 2", "Scholarship Name 3", "Scholarship Name 4", "Scholarship Name 5"],
  "next_steps": [
    "Register on National Scholarship Portal at scholarships.gov.in by October",
    "Obtain Income Certificate from your SDM office",
    "Collect latest marksheet and get it attested"
  ]
}

IMPORTANT RULES:
- type must be EXACTLY one of: Central Government, State Government, College/Institute, Private Foundation, CSR, NGO
- Only include scholarships with match_percentage >= 60
- Include 6-10 scholarships minimum if student qualifies
- Use only real, active scholarship links
- Consider ALL these categories based on student profile:
  * NSP Portal scholarships (scholarships.gov.in) — Post-Matric, Merit-cum-Means, Top Class
  * AICTE Pragati (girls in technical courses) and Saksham (disability)
  * PM Scholarship Scheme (CAPF/RPF wards)
  * Central Sector Scheme of Scholarships for College Students
  * State-specific scholarships for the student's state
  * SC/ST/OBC scholarships from Ministry of Social Justice
  * Minority scholarships from Ministry of Minority Affairs (if applicable)
  * Disability scholarships (if applicable)
  * Sitaram Jindal Foundation — sitaramjindalfoundation.org
  * Aditya Birla Capital Scholarship — adityabirlacapital.com
  * Tata Capital Pankh Scholarship — tatacapital.com
  * Swami Vivekananda Scholarship (West Bengal students)
  * Inspire SHE (science students with 90%+ in 12th)
  * HDFC Bank Educational Crisis Scholarship
  * Kotak Kanya Scholarship (girls)
  * Buddy4Study listings — buddy4study.com`;

// ─── ABROAD PROMPT ────────────────────────────────────────────────────────────
const ABROAD_SYSTEM = `You are an expert Study Abroad Scholarship Advisor for Indian students.
Analyze the student profile carefully and respond ONLY with valid JSON. No markdown, no backticks, no explanation — pure JSON only.

Return this exact structure:
{
  "student_summary": "2-line profile summary mentioning degree goal and target region",
  "scholarships": [
    {
      "name": "MEXT Scholarship",
      "country": "Japan",
      "degree_level": "Master's",
      "funding": "Fully Funded",
      "monthly_stipend": "Rs 1,17,000 (approx 200,000 JPY)",
      "tuition_coverage": "Full tuition waived by host university",
      "accommodation_coverage": "University dormitory or monthly housing allowance",
      "air_ticket": "Yes — round trip economy class covered",
      "medical_insurance": "Yes — JIS (Japanese health insurance) included",
      "eligibility_criteria": "Age under 35, Bachelor's degree, good academic record, apply through Japanese Embassy in India",
      "official_link": "https://www.studyinjapan.go.jp/en/smap-stopj-applications-monbukagakusho.html",
      "deadline": "May–June 2026 (Embassy screening round)",
      "required_exams": ["No IELTS required", "JLPT preferred but not mandatory for most universities"],
      "match_percentage": 82,
      "why_suitable": "Exact reason this student is a strong fit based on their profile data"
    }
  ],
  "top_picks": ["MEXT Scholarship", "DAAD Scholarship", "Chevening Scholarship", "Erasmus Mundus", "GKS Scholarship"],
  "next_steps": [
    "Start IELTS preparation aiming for 6.5+ band for UK/Australia scholarships",
    "Write a strong Statement of Purpose focusing on your research motivation",
    "Contact professors at target universities before applying",
    "Obtain 3 strong Letters of Recommendation from faculty members"
  ]
}

Include scholarships from this list where eligible. Use REAL links only:
- MEXT (Japan): https://www.studyinjapan.go.jp/en/
- DAAD (Germany): https://www.daad.de/en/
- Chevening (UK): https://www.chevening.org/
- Fulbright-Nehru (USA): https://www.usief.org.in/
- Erasmus Mundus (Europe): https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus_en
- GKS/KGSP (South Korea): https://www.studyinkorea.go.kr/en/sub/gks/allnew_gks.do
- CSC (China): https://www.csc.edu.cn/
- Australia Awards: https://www.australiaawards.gov.au/
- Commonwealth Scholarship (UK): https://cscuk.fcdo.gov.uk/scholarships/
- Stipendium Hungaricum (Hungary): https://stipendiumhungaricum.hu/
- Swiss Government Excellence: https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html
- NUS Research Scholarship (Singapore): https://nusgs.nus.edu.sg/scholarships/
- Holland Scholarship (Netherlands): https://www.studyinholland.nl/scholarships/holland-scholarship
- VLIR-UOS (Belgium): https://www.vliruos.be/en/scholarships
- KAS Scholarship (Germany): https://www.kas.de/en/web/begabtenfoerderung-und-kultur/stipendien

IMPORTANT: match_percentage should reflect how well the student's current qualification matches the scholarship requirements.`;

// ─── Helper ───────────────────────────────────────────────────────────────────
async function callGemini(system, userContent) {
  const ai = await getAiClient();
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: userContent,
    config: {
      systemInstruction: system,
      responseMimeType: 'application/json', // forces valid JSON back, no markdown/backticks to strip
      temperature: 0.4,
    },
  });

  const raw = response.text?.trim() || '{}';

  try {
    return JSON.parse(raw);
  } catch {
    console.error('Gemini JSON parse failed. Raw:', raw.slice(0, 400));
    return {
      student_summary: 'Profile analyzed.',
      scholarships:    [],
      top_picks:       [],
      next_steps:      ['Please try again — AI response could not be parsed.'],
    };
  }
}

// ─── POST /api/scholarships/india ─────────────────────────────────────────────
router.post('/india', protect, async (req, res, next) => {
  try {
    const {
      full_name, mobile, college_name, course, branch, current_year,
      cgpa, twelfth_percentage, tenth_percentage,
      family_income, category, gender, state, disability, minority,
    } = req.body;

    const required = { full_name, mobile, college_name, course, branch, current_year, family_income, category, gender, state };
    for (const [k, v] of Object.entries(required))
      if (!v) return res.status(400).json({ detail: `Please fill: ${k.replace(/_/g, ' ')}` });

    const userContent = `Recommend Indian scholarships for this student:

Full Name: ${full_name}
College: ${college_name}
Course: ${course} — ${branch}
Current Year: ${current_year}
CGPA: ${cgpa || 'N/A (1st year)'}
12th Percentage: ${twelfth_percentage || 'N/A'}%
10th Percentage: ${tenth_percentage || 'N/A'}%
Family Annual Income: Rs ${family_income}
Category: ${category}
Gender: ${gender}
State: ${state}
Disability: ${disability ? 'Yes' : 'No'}
Minority Community: ${minority ? 'Yes' : 'No'}`;

    const result = await callGemini(INDIA_SYSTEM, userContent);

    const doc = await Search.create({
      userId: req.user.id,
      kind:   'india',
      form:   req.body,
      result,
      count:  result.scholarships?.length || 0,
    });

    return res.status(201).json({ id: doc.id });
  } catch (err) { next(err); }
});

// ─── POST /api/scholarships/abroad ────────────────────────────────────────────
router.post('/abroad', protect, async (req, res, next) => {
  try {
    const {
      name, nationality, latest_qualification, cgpa_or_percentage,
      course_interested, preferred_country, english_test_status, degree_level,
    } = req.body;

    const required = { name, nationality, latest_qualification, cgpa_or_percentage, course_interested, preferred_country, english_test_status, degree_level };
    for (const [k, v] of Object.entries(required))
      if (!v) return res.status(400).json({ detail: `Please fill: ${k.replace(/_/g, ' ')}` });

    const userContent = `Recommend study abroad scholarships for this student:

Name: ${name}
Nationality: ${nationality}
Latest Qualification: ${latest_qualification}
CGPA / Percentage: ${cgpa_or_percentage}
Degree Level Wanted: ${degree_level}
Course Interested In: ${course_interested}
Preferred Country: ${preferred_country}
English Test Status: ${english_test_status}`;

    const result = await callGemini(ABROAD_SYSTEM, userContent);

    const doc = await Search.create({
      userId: req.user.id,
      kind:   'abroad',
      form:   req.body,
      result,
      count:  result.scholarships?.length || 0,
    });

    return res.status(201).json({ id: doc.id });
  } catch (err) { next(err); }
});

// ─── GET /api/scholarships/history ────────────────────────────────────────────
router.get('/history', protect, async (req, res, next) => {
  try {
    const items = await Search.find({ userId: req.user.id })
      .select('-result')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.json({
      items: items.map(i => ({
        id:         i.id,
        kind:       i.kind,
        form:       i.form,
        count:      i.count,
        created_at: i.createdAt,
      })),
    });
  } catch (err) { next(err); }
});

// ─── GET /api/scholarships/search/:id ─────────────────────────────────────────
router.get('/search/:id', protect, async (req, res, next) => {
  try {
    const doc = await Search.findOne({ id: req.params.id }).lean();
    if (!doc) return res.status(404).json({ detail: 'Search not found' });

    return res.json({
      id:         doc.id,
      kind:       doc.kind,
      form:       doc.form,
      result:     doc.result,
      count:      doc.count,
      created_at: doc.createdAt,
    });
  } catch (err) { next(err); }
});

module.exports = router;