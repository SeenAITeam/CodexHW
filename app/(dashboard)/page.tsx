'use client'

import { useCallback, useEffect, useState } from 'react'

import KpiCard from '@/components/KpiCard'
import { supabase } from '@/lib/supabaseClient'
import type { Task } from '@/lib/types'

export default function OverviewPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    if (!supabase) {
      setError('Supabase client is not configured.')
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setTasks(data ?? [])
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load tasks.'
      setError(message)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()

    const handleUpdated = () => {
      fetchTasks()
    }

    window.addEventListener('tasks:updated', handleUpdated)
    return () => {
      window.removeEventListener('tasks:updated', handleUpdated)
    }
  }, [fetchTasks])

  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const done = tasks.filter(t => t.status === 'done').length

  const valueFor = (count: number) => (loading || error ? '—' : count)

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard label="Total Tasks" value={valueFor(total)} sub="All tasks tracked in the board" />
        <KpiCard label="In Progress" value={valueFor(inProgress)} sub="Currently being worked on" />
        <KpiCard label="Done" value={valueFor(done)} sub="Completed tasks" />
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-3 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-900/10 dark:text-rose-200">
          Failed to load tasks: {error}
        </div>
      ) : null}

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
