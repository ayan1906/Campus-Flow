# CampusFlow 🎓

> **A Modern, Production-Ready Smart Campus Management Ecosystem**
> Built with React 19, Vite, Tailwind CSS v4, and Supabase.

---

## ⚡ Overview

**CampusFlow** is an enterprise-grade web platform designed for higher education institutions. It streamlines student life and campus administration into an integrated, human-crafted portal.

### Core Portals
- **Student Portal:** Centralized hub for academic notices, lost & found claims, campus event registrations, help desk ticketing, and personal activity logs.
- **Admin Portal:** Comprehensive governance console with department-level filtering, user management, moderation queues, and operational analytics.
- **Public Gateway:** Accessible landing page, institutional directories, and role-guarded authentication.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 + Vite 8 (JavaScript Only)
- **Styling Engine:** Tailwind CSS v4 with `@tailwindcss/vite`
- **Design System:** Custom Human-Crafted Atomic UI System (WCAG AA Compliant, Zero-Flash Light & Dark Themes)
- **State Management:** Redux Toolkit & React-Redux
- **Routing:** React Router v7
- **Backend & Database:** Supabase (PostgreSQL, Supabase Auth, Storage Buckets, Row-Level Security, Realtime)
- **Iconography:** Lucide React
- **Forms & Validation:** React Hook Form
- **Data Visualization:** Recharts
- **Notifications:** React Hot Toast

---

## 🎨 Master Design System

CampusFlow follows a human-crafted design language inspired by Linear, Stripe, and Notion:
- **Light Theme:** Warm neutral `#F8F9FC` base with `#FFFFFF` surfaces and `#4F46E5` primary accent.
- **Dark Theme:** Deep slate navy `#10131B` base with `#181D29` surfaces and `#818CF8` soft violet accent. (Never pure pitch black).
- **Typography:** Editorial typography with `Inter` and `JetBrains Mono` for tabular figures.
- **Atomic UI Components:** Button, Input, Select, Badge, Card, Modal, ConfirmDialog, Avatar, Table, Skeleton, EmptyState.

---

## 📁 Architecture & Folder Hierarchy

```text
src/
├── assets/          # Static assets and media
├── components/
│   ├── ui/          # Reusable atomic UI library
│   ├── common/      # ThemeToggle, SearchBar, Pagination
│   └── layout/      # Portals, sidebars, headers, footers
├── context/         # ThemeProvider and application contexts
├── features/        # Redux slices per domain
│   ├── auth/
│   ├── notices/
│   ├── lost-found/
│   ├── events/
│   ├── helpdesk/
│   └── notifications/
├── hooks/           # Custom React hooks (useTheme, etc.)
├── lib/             # Supabase client and external adapters
├── pages/
│   ├── public/      # Landing, About, Contact
│   ├── auth/        # Login, Register, Forgot Password
│   ├── student/     # Student portal pages
│   └── admin/       # Administrator portal pages
├── routes/          # Protected and role-based route definitions
├── services/        # Supabase API services
├── store/           # Redux configureStore
└── utils/           # Constants, formatters, validation schemas
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ayan1906/Campus-Flow.git
cd Campus-Flow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 🗓️ 21-Day Structured Roadmap

* **Week 1:** Foundation, Master Design System, Supabase & Schema, Role-Based Authentication, Base Portals.
* **Week 2:** Smart Notice Board, Lost & Found with Claim Workflow, Campus Events & Registration, Help Desk Ticketing.
* **Week 3:** Realtime Notification Engine, Student Activity Workspace, Admin Moderation, Recharts Analytics, CampusFlow AI Assistant, Production Deployment.

---

## 🔒 Security & Privacy

- All sensitive credentials are strictly confined to `.env` (git-ignored).
- Supabase Row-Level Security (RLS) policies enforce database-level access control.
- Role assignments (`student`, `admin`, `teacher`) are protected against client-side privilege escalation.
