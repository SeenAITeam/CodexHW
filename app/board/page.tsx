'use client'
import KanbanColumn from '@/components/KanbanColumn'
import TaskCard from '@/components/TaskCard'
import { initialTasks } from '@/lib/data'

export default function BoardPage() {
  const tasks = initialTasks()
  const backlog = tasks.filter(t => t.status === 'backlog')
  const inProgress = tasks.filter(t => t.status === 'in_progress')
  const done = tasks.filter(t => t.status === 'done')

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <KanbanColumn title="Backlog" count={backlog.length}>
        {backlog.map(t => <TaskCard key={t.id} task={t} />)}
      </KanbanColumn>
      <KanbanColumn title="In Progress" count={inProgress.length}>
        {inProgress.map(t => <TaskCard key={t.id} task={t} />)}
      </KanbanColumn>
      <KanbanColumn title="Done" count={done.length}>
        {done.map(t => <TaskCard key={t.id} task={t} />)}
      </KanbanColumn>
    </section>
  )
}
