'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { BackButton } from '@/components/BackButton'
import KanbanColumn from '@/components/KanbanColumn'
import TaskCard from '@/components/TaskCard'
import { supabase } from '@/lib/supabaseClient'
import type { Task } from '@/lib/types'

export default function BoardPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const goBack = useCallback(() => {
    if (typeof window === 'undefined') {
      router.push('/')
      return
    }

    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }, [router])

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

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const isEditable = (target: EventTarget | null) => {
      const element = target as HTMLElement | null
      if (!element) {
        return false
      }

      if (element.isContentEditable) {
        return true
      }

      const editableTags = ['INPUT', 'TEXTAREA', 'SELECT']
      if (editableTags.includes(element.tagName)) {
        return true
      }

      return Boolean(
        element.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]')
      )
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        return
      }

      if (isEditable(event.target)) {
        return
      }

      const isBackspace = event.key === 'Backspace'
      const isAltLeft = event.altKey && event.key === 'ArrowLeft'

      if (isBackspace || isAltLeft) {
        event.preventDefault()
        goBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [goBack])

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
      <header className="flex items-center justify-between">
        <BackButton onBack={goBack} />
      </header>

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
