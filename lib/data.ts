import type { TaskStatus } from './types'

type StatusMeta = {
  label: string
  dot: string
}

export const statusMeta: Record<TaskStatus, StatusMeta> = {
  backlog: { label: 'Backlog', dot: 'bg-gray-400' },
  in_progress: { label: 'In Progress', dot: 'bg-amber-500' },
  done: { label: 'Done', dot: 'bg-emerald-500' },
}
