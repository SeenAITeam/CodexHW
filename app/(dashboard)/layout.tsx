'use client'
import React, { useMemo, useState } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#0f0f10] text-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <aside className="rounded-2xl border bg-white/70 dark:bg-white/5 p-4 h-fit lg:sticky lg:top-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Project</div>
                <div className="font-bold text-lg">SeenAI</div>
              </div>
              <button
                onClick={() => setDark(d => !d)}
                className="rounded-xl border px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {dark ? '🌙' : '☀️'}
              </button>
            </div>

            <nav className="mt-6 space-y-1 text-sm">
              <a href="/" className="block px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10">Overview</a>
              <a href="/board" className="block px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10">Board</a>
            </nav>

            <div className="mt-6 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-500/10 border text-xs text-amber-800 dark:text-amber-200">
              <div className="font-semibold mb-1">Roadmap</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Phase 1: KPIs + Static Board</li>
                <li>Phase 2: Local state move</li>
                <li>Phase 3: Drag & Drop</li>
                <li>Phase 4: Supabase persistence</li>
              </ul>
            </div>
          </aside>

          <main className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">SeenAI Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Team task dashboard preview (Option A)</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-white/10">Share</button>
                <button className="rounded-xl bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 text-sm">New Task</button>
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
