'use client'

import { FormEvent, useEffect, useState } from 'react'

import { statusMeta } from '@/lib/data'
import { supabase } from '@/lib/supabaseClient'
import type { Task, TaskPriority, TaskStatus } from '@/lib/types'

const statusOptions: TaskStatus[] = ['backlog', 'in_progress', 'done']
const priorityOptions: TaskPriority[] = ['low', 'med', 'high']

type NewTaskModalProps = {
  open: boolean
  onClose: () => void
  onSuccess: (task: Task) => void
  onError: (message: string) => void
}

export default function NewTaskModal({ open, onClose, onSuccess, onError }: NewTaskModalProps) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<TaskStatus>('backlog')
  const [priority, setPriority] = useState<TaskPriority>('med')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      setTitle('')
      setStatus('backlog')
      setPriority('med')
      setSubmitting(false)
    }
  }, [open])

  if (!open) {
    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      onError('Title is required.')
      return
    }

    if (!supabase) {
      onError('Supabase client is not configured.')
      return
    }

    setSubmitting(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title: trimmedTitle,
            status,
            priority,
            created_by: user?.id ?? null,
          },
        ])
        .select()
        .single<Task>()

      if (error) {
        throw error
      }

      if (data) {
        onSuccess(data)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create the task.'
      onError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl border bg-white p-5 shadow-xl dark:bg-[#0f0f10]">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-lg font-semibold">New Task</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Create a task to track on the board.</p>
          </div>

          <div className="space-y-1">
            <label htmlFor="new-task-title" className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Title
            </label>
            <input
              id="new-task-title"
              name="title"
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-transparent"
              placeholder="e.g. Draft Supabase integration"
              autoFocus
              disabled={submitting}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="new-task-status" className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </label>
              <select
                id="new-task-status"
                name="status"
                value={status}
                onChange={event => setStatus(event.target.value as TaskStatus)}
                className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-transparent"
                disabled={submitting}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>
                    {statusMeta[option]?.label ?? option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="new-task-priority"
                className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Priority
              </label>
              <select
                id="new-task-priority"
                name="priority"
                value={priority}
                onChange={event => setPriority(event.target.value as TaskPriority)}
                className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-transparent"
                disabled={submitting}
              >
                {priorityOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-black px-3 py-1.5 text-sm text-white dark:bg-white dark:text-black disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
