# 🎯 Job Board – Frontend

A **modern, accessible, beautifully animated job board web app** built with React (Vite + TS), Tailwind CSS, and Framer Motion — featuring role-based dashboards, job applications, search, and smooth UI inspired by Dribbble/Behance designs.

---

## 📁 File Structure Overview

```bash
src/
├── components/            # Reusable component library
│   ├── Jobs/              # Job listings related components
│   │   ├── JobCard.tsx
│   │   └── JobFilters.tsx
│   ├── Layout/            # Layout-related components
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   └── UI/                # Common UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── LoadingSpinner.tsx
│
├── context/               # Global context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── data/                  # Static/mock data
│   └── mockData.ts
│
├── pages/                 # Page-level views
│   ├── CandidateDashboard.tsx
│   ├── EmployerDashboard.tsx
│   ├── Home.tsx
│   ├── JobDetail.tsx
│   ├── Jobs.tsx
│   ├── Login.tsx
│   └── Register.tsx
│
├── types/                 # TypeScript interfaces/types
│   └── index.ts
│
├── App.tsx                # Root App component
├── main.tsx               # Entry point
├── index.css              # Tailwind and global styles
└── vite-env.d.ts          # Vite environment types
```

### `src/components/`
Reusable components categorized into:
- `Jobs/`: For job cards and filtering UI
- `Layout/`: Header, Footer, layout elements
- `UI/`: Inputs, buttons, modals, spinners

### `src/pages/`
Full pages for routing and views:
- `Home.tsx`: Welcome page with intro and CTA
- `Jobs.tsx`: Browse jobs list
- `JobDetail.tsx`: View a single job
- `EmployerDashboard.tsx`: Employers manage jobs
- `CandidateDashboard.tsx`: Candidates manage applications
- `Login.tsx`, `Register.tsx`: Auth pages

### `src/context/`
- `AuthContext.tsx`: Authentication context
- `ThemeContext.tsx`: Dark/light mode toggle and state

### `src/data/`
- `mockData.ts`: Placeholder jobs for testing

### `src/types/`
- Global TypeScript types

---

## 🔥 Features

- 👤 Employer & Candidate Dashboards
- 💡 Dark / Light Theme Toggle (ThemeContext)
- 🗃️ Job Filters & Cards (with mock data for now)
- 📝 Login / Register Forms
- 📩 Job Application Flow
- ✨ Framer Motion Animations (coming soon)
- ⚙️ Modular, clean, reusable components

---

## 🧰 Tools Used

- **React.js** with **TypeScript**
- **Vite** for lightning-fast dev experience
- **Tailwind CSS** for utility-first styling
- **Framer Motion** (planned) for UI animations
- **Context API** for global state
- **Modular Components & Pages**

---

## 🚀 Getting Started

```bash
git clone https://github.com/ajay-dhangar/job-board.git
cd job-board

npm install
npm run dev
````

---

## 🧠 Folder Insight Example

```bash
components/
├── Jobs/
│   ├── JobCard.tsx         # Single job preview
│   └── JobFilters.tsx      # Sidebar filters
├── Layout/
│   ├── Header.tsx          # Site navigation
│   └── Footer.tsx
└── UI/
    ├── Button.tsx
    ├── Input.tsx
    ├── Modal.tsx
    └── LoadingSpinner.tsx
```

---

## 📚 Roadmap (Frontend Only)

* [x] Project setup with Vite + Tailwind + TS
* [x] Pages: Home, Login, Register, Dashboards
* [x] Component folders organized (UI, Jobs, Layout)
* [ ] Add Framer Motion animations
* [ ] Responsive mobile layout
* [ ] Connect to backend API (coming soon)
* [ ] Resume upload (PDF)
* [ ] Email notifications
* [ ] Complete job application flow
* [ ] Compony profile pages
* [ ] Resume search functionality
* [ ] Resume Builder (optional)
* [ ] Admin dashboard (optional)
* [ ] Testing and optimization
* [ ] Deployment setup
* [ ] Documentation and README updates
* [ ] Final polish and bug fixes
* [ ] Launch!

---

## 👨‍💻 Author

**Ajay Dhangar:** Ajay is a passionate frontend developer with a keen eye for design and user experience. He loves building modern, accessible web applications that are both functional and visually appealing.

Connect with Ajay for collaboration, feedback, or just to say hi!

📌 [GitHub](https://github.com/ajay-dhangar) | 💼 [LinkedIn](https://www.linkedin.com/in/ajay-dhangar)
