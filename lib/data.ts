import type { Task } from './types'

export const statusMeta = {
  backlog: { label: 'Backlog', dot: 'bg-gray-400' },
  in_progress: { label: 'In Progress', dot: 'bg-amber-500' },
  done: { label: 'Done', dot: 'bg-emerald-500' }
} as const

export function initialTasks(): Task[] {
  return [
    { id: 't1', title: 'Set up repo & README',     status: 'done',        priority: 'high', assignee: 'Anael', createdAt: '2025-09-01' },
    { id: 't2', title: 'Create Overview KPIs',     status: 'done',        priority: 'med',  assignee: 'Rayan', createdAt: '2025-09-02' },
    { id: 't3', title: 'Layout: sidebar + header', status: 'in_progress', priority: 'low',  assignee: 'Jaden', createdAt: '2025-09-03' },
    { id: 't4', title: 'Board page (static)',      status: 'in_progress', priority: 'med',  assignee: 'Nikki', createdAt: '2025-09-04' },
    { id: 't5', title: 'TaskCard component',       status: 'backlog',     priority: 'med',  assignee: null,    createdAt: '2025-09-05' },
    { id: 't6', title: 'KanbanColumn component',   status: 'backlog',     priority: 'low',  assignee: null,    createdAt: '2025-09-05' },
    { id: 't7', title: 'Empty states + skeletons', status: 'backlog',     priority: 'low',  assignee: null,    createdAt: '2025-09-05' },
    { id: 't8', title: 'Theme toggle',             status: 'backlog',     priority: 'low',  assignee: null,    createdAt: '2025-09-06' },
    { id: 't9', title: 'Drag & drop (later)',      status: 'backlog',     priority: 'med',  assignee: null,    createdAt: '2025-09-06' }
  ]
}
