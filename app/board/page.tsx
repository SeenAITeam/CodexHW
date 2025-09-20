'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import KanbanColumn from '@/components/KanbanColumn'
import TaskCard from '@/components/TaskCard'
import { supabase } from '@/lib/supabaseClient'
import type { Task } from '@/lib/types'

export default function BoardPage() {
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

  const { backlog, inProgress, done } = useMemo(() => {
    return {
      backlog: tasks.filter(task => task.status === 'backlog'),
      inProgress: tasks.filter(task => task.status === 'in_progress'),
      done: tasks.filter(task => task.status === 'done'),
    }
  }, [tasks])

  const isLoading = loading && !error
  const columns = [
    { title: 'Backlog', tasks: backlog },
    { title: 'In Progress', tasks: inProgress },
    { title: 'Done', tasks: done },
  ]

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-3 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-900/10 dark:text-rose-200">
          Failed to load tasks: {error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        {columns.map(column => (
          <KanbanColumn
            key={column.title}
            title={column.title}
            count={column.tasks.length}
            hideEmptyState={isLoading}
          >
            {isLoading ? (
              <div className="text-xs text-gray-500/80 dark:text-gray-400 border border-dashed rounded-lg p-3 text-center">
                Loading tasks...
              </div>
            ) : (
              column.tasks.map(task => <TaskCard key={task.id} task={task} />)
            )}
          </KanbanColumn>
        ))}
      </section>
    </div>
  )
}
