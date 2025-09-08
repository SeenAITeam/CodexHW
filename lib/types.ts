export type Status = 'backlog' | 'in_progress' | 'done'
export type Priority = 'low' | 'med' | 'high'

export type Task = {
  id: string
  title: string
  status: Status
  priority?: Priority
  assignee?: string | null
  createdAt: string // ISO
  dueDate?: string  // ISO
}
