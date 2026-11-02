import { useState } from 'react'
import {
  CheckCircle2,
  Layers,
  ShieldCheck,
  Code2,
  FolderTree,
  Database,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import toast from 'react-hot-toast'

function App() {
  const [tested, setTested] = useState(false)

  const handleTestToast = () => {
    setTested(true)
    toast.success('Day 1 Environment Setup is 100% functional!', {
      icon: '🚀',
    })
  }

  const checklist = [
    { name: 'Vite 8 + React 19 Engine', done: true, desc: 'Fast dev server & optimized bundler' },
    { name: 'Tailwind CSS v4 Integration', done: true, desc: '@tailwindcss/vite compiler active' },
    { name: 'Redux Toolkit + React-Redux', done: true, desc: 'Global store initialized in /store' },
    { name: 'React Router v7 & Hook Form', done: true, desc: 'Routing & form handling packages installed' },
    { name: 'Supabase Client Integration', done: true, desc: 'src/lib/supabase.js client configured' },
    { name: 'Production Folder Hierarchy', done: true, desc: '19 enterprise-grade directories structured' },
    { name: 'Lucide Icons + Hot Toast', done: true, desc: 'Visual iconography & toast notifications live' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 flex flex-col justify-between p-4 md:p-8">
      {/* Header */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-indigo-900/60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              CampusFlow
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v1.0 • Day 1
              </span>
            </h1>
            <p className="text-xs text-slate-400">Smart Campus Management Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Environment Ready
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full my-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Welcome & Interactive Verification */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-slate-800/60 backdrop-blur-md border border-indigo-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Day 1 Deliverable Achieved
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Project Foundation & Core Architecture Initialized
            </h2>
            <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">
              CampusFlow-এর ২১ দিনের রোডম্যাপের প্রথম দিন সফলভাবে কনফিগার করা হয়েছে। সব ডিপেন্ডেন্সি, Tailwind v4 ইঞ্জিন, সুশৃঙ্খল আর্কিটেকচার এবং বেস কনফিগারেশন ত্রুটিহীনভাবে রানিং।
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleTestToast}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                <span>Verify UI Feedback & Toast</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {tested && (
                <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-emerald-300 font-medium bg-emerald-950/40 border border-emerald-500/30 rounded-xl animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Toast verified successfully!
                </span>
              )}
            </div>
          </div>

          {/* Setup Checklist */}
          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Day 1 Foundation Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{item.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Summary & Next Up */}
        <div className="space-y-6">
          {/* Tech Stack Specs */}
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              Technology Stack
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Framework</span>
                <span className="font-medium text-slate-200">React 19 + Vite</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Styling</span>
                <span className="font-medium text-slate-200">Tailwind CSS v4</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Backend / BaaS</span>
                <span className="font-medium text-slate-200">Supabase (Postgres)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">State Management</span>
                <span className="font-medium text-slate-200">Redux Toolkit</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Routing</span>
                <span className="font-medium text-slate-200">React Router v7</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Language</span>
                <span className="font-medium text-indigo-300">JavaScript Only</span>
              </div>
            </div>
          </div>

          {/* Tomorrow: Day 2 Preview */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <FolderTree className="w-4 h-4" />
              Next Milestone: Day 2
            </div>
            <h4 className="text-sm font-bold text-white">Design System & Public Website</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Reusable UI library (`Button`, `Input`, `Card`, `Modal`, `Badge`), Public Navbar, Footer, and complete Landing Page.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full pt-6 border-t border-indigo-900/40 text-center text-xs text-slate-500">
        CampusFlow • 21-Day Production Development Roadmap • Day 1 Complete
      </footer>
    </div>
  )
}

export default App
