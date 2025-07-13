# 🗺️ Job Board – Project Roadmap

Welcome to the official roadmap of the **Job Board** project — a full-stack, open-source job portal built with React, Tailwind CSS, Node.js, and MongoDB/PostgreSQL.

> ✅ This file tracks progress, future features, and priority levels for contributors and maintainers.

---

## 🚀 MVP Goals (v1.0)

| Feature                             | Status     |
|-------------------------------------|------------|
| 🔲 Project setup with Vite + Tailwind + TS | ✅ Done     |
| 🏠 Home Page (hero + CTA)           | ✅ Done     |
| 📋 Job Listings Page + Filters      | ⏳ In Progress |
| 🔍 Job Detail Page                  | ⏳ In Progress |
| 📝 Apply to Job (Resume Upload)     | ⬜ Todo     |
| 👨‍💼 Employer Dashboard (Post/Edit Jobs) | ⬜ Todo     |
| 👨‍🎓 Candidate Dashboard (Save/Apply Jobs) | ⬜ Todo     |
| 🔐 JWT Auth (Login/Register)        | ⬜ Todo     |
| 🌙 Dark/Light Mode                  | ✅ Done     |
| 📧 Email Notifications (Apply/Alerts) | ⬜ Todo     |
| 📱 Mobile Responsive UI             | ✅ Done     |

---

## 🎨 Frontend Roadmap (React + Vite + Tailwind)

### Pages
- [x] Home Page with CTA and animation
- [ ] Job Listings with filters (role, location, type, salary)
- [ ] Job Detail Page with responsibilities, perks, etc.
- [ ] Login/Register (candidate & employer roles)
- [ ] Candidate Dashboard (saved/applied jobs, profile)
- [ ] Employer Dashboard (manage jobs, edit/delete)

### Components
- [x] Job Card
- [x] Header/Footer
- [ ] Modal (Apply form, Login, etc.)
- [ ] Filters Sidebar
- [ ] Resume Upload Component

### Enhancements
- [ ] Framer Motion animations (page transitions, modals)
- [ ] Global Toasts (Success/Error messages)
- [ ] Accessibility (keyboard nav, aria, focus outlines)

---

## ⚙️ Backend Roadmap (Node.js + Express + MongoDB/PostgreSQL)

### Auth
- [ ] JWT-based login and register
- [ ] bcrypt password hashing
- [ ] Role-based access (admin, employer, candidate)

### API Endpoints
- [ ] Create/Get/Edit/Delete Jobs
- [ ] Apply to job (upload resume)
- [ ] Get employer/candidate-specific jobs
- [ ] Profile endpoints (name, skills, company info)

### Integrations
- [ ] Resume upload via Multer
- [ ] Email alerts via NodeMailer
- [ ] MongoDB or PostgreSQL DB integration

---

## 🧪 Testing Roadmap

- [ ] Unit Tests (components, routes)
- [ ] Integration Tests (job apply, auth)
- [ ] CI with GitHub Actions
- [ ] Lighthouse Performance Checks

---

## 📈 Future Enhancements

| Feature                             | Priority |
|-------------------------------------|----------|
| ⭐ Bookmark Jobs                     | Medium   |
| 🧑‍💼 Admin Dashboard (manage users, jobs) | High     |
| 🌐 SEO Meta Tags for Pages          | High     |
| 🌍 Custom Domain Support            | Medium   |
| 📱 PWA Support                      | Low      |
| 🧩 Internationalization (i18n)      | Low      |
| 🧠 AI Job Matching Suggestions      | Future   |

---

## 🙌 Community & Contribution Goals

- [x] Open Issues with templates
- [x] `CONTRIBUTING.md` guide
- [x] GitHub Discussions
- [ ] First-timers label support
- [ ] Add GitHub Actions workflows
- [ ] Organize Project Boards & Milestones

---

## 📌 Maintained by

**Ajay Dhangar**  
🔗 [GitHub](https://github.com/ajay-dhangar) | 🧠 [CodeHarborHub](https://github.com/CodeHarborHub)

---

> 💬 Have ideas or suggestions? Open a [GitHub Discussion](https://github.com/ajay-dhangar/job-board/discussions) or [file an issue](https://github.com/ajay-dhangar/job-board/issues/new)!