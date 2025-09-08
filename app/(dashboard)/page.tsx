'use client'
import KpiCard from '@/components/KpiCard'
import { initialTasks } from '@/lib/data'

export default function OverviewPage() {
  const tasks = initialTasks()
  const total = tasks.length
  const inProg = tasks.filter(t => t.status === 'in_progress').length
  const done = tasks.filter(t => t.status === 'done').length

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard label="Total Tasks" value={total} sub="All tasks tracked in the board" />
        <KpiCard label="In Progress" value={inProg} sub="Currently being worked on" />
        <KpiCard label="Done" value={done} sub="Completed tasks" />
      </div>

      <div className="rounded-2xl border p-4 bg-white/70 dark:bg-white/5">
        <h3 className="font-semibold mb-2">What is this?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          This MVP shows the shell we’ll give Codex: a clean layout, quick progress trackers at the top,
          and a Kanban board for task flow. We’ll start static, then add movement (drag & drop) and
          persistence (Supabase) in phases.
        </p>
      </div>
    </section>
  )
}
