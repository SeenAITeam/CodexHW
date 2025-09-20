export type TaskStatus = 'backlog' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'med' | 'high'

export type Task = {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority | null
  assignee_id: string | null
  created_at: string
  due_date: string | null
  created_by: string | null
}
