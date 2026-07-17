# 🎓 fundMyStudy

An AI-powered full-stack scholarship recommendation platform that helps students discover **500+ Indian and international scholarships** through intelligent eligibility analysis. The platform analyzes academic performance, family income, category, state, course, career goals, and other profile details to provide personalized scholarship recommendations with eligibility scores.

## 🚀 Features

### 🇮🇳 Indian Scholarship Recommendation Engine
- Recommends **500+ Government, State, College, CSR, NGO, AICTE, and UGC scholarships**
- Personalized eligibility analysis based on:
  - Academic Performance
  - Family Income
  - Category
  - State
  - Course
  - College
  - Year of Study
- AI-generated scholarship summaries
- Eligibility score for every scholarship
- Scholarship amount, benefits, required documents, deadline, and official website

### 🌍 International Scholarship Recommendation Engine
- Country-wise scholarship recommendations
- Eligibility analysis using:
  - Latest Qualification
  - CGPA/Percentage
  - English Proficiency (IELTS/TOEFL/PTE)
  - Preferred Degree
  - Preferred Country
- Personalized scholarship matching

### 🔐 Authentication
- JWT Authentication
- Google OAuth Login
- Secure Password Hashing
- Protected Routes

### 📊 Admin Dashboard
- Manage scholarship database
- Add/Edit/Delete scholarships
- Monitor users
- Manage recommendations

### 🤖 AI Recommendation System
- Intelligent eligibility matching
- Personalized scholarship scoring
- AI-generated scholarship descriptions
- Fast recommendation engine with approximately **90% matching accuracy**

---

# 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- Google OAuth

### Other Tools
- Cloudinary
- Multer
- Render
- Vercel

---

# 📂 Project Structure

```
fundMyStudy/
│
├── client/              # React Frontend
├── server/              # Express Backend
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/fundMyStudy.git

cd fundMyStudy
```

## Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URL=your_mongodb_connection

JWT_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Run the Project

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 📸 Screenshots

> Add screenshots of:

- Home Page
- Indian Scholarship Recommendation
- International Scholarship Recommendation
- Login/Register
- Dashboard
- Scholarship Results

---

# 📡 API Overview

### Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Scholarship

```
POST /api/scholarship/recommend
POST /api/international/recommend
GET  /api/scholarship/all
```

### Admin

```
POST /api/admin/add
PUT  /api/admin/update/:id
DELETE /api/admin/delete/:id
```

---

# 🎯 Key Highlights

- AI-powered scholarship recommendation platform
- 500+ Indian & International Scholarships
- Dual Recommendation Engines
- Personalized Eligibility Score
- Approximately 90% Recommendation Accuracy
- Secure JWT & Google OAuth Authentication
- Responsive UI
- RESTful API Architecture

---

# 🚀 Future Improvements

- Email Notifications
- WhatsApp Alerts
- Scholarship Bookmarking
- AI Chatbot
- Resume Analyzer
- Mobile Application
- Recommendation History

---

# 👨‍💻 Author

**Rohit Verma**

B.Tech Electrical Engineering, Delhi Technological University (DTU)

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub!
