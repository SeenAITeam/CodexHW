import { statusMeta } from '@/lib/data'
import type { Task } from '@/lib/types'
import clsx from 'clsx'

const priorityClass: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700',
  med: 'bg-blue-100 text-blue-700',
  high: 'bg-rose-100 text-rose-700',
}

export default function TaskCard({ task }: { task: Task }) {
  const priorityKey = (task.priority ?? 'med') as keyof typeof priorityClass
  const createdDate = task.created_at ? new Date(task.created_at) : null
  const createdDisplay = createdDate && !Number.isNaN(createdDate.getTime())
    ? createdDate.toLocaleDateString()
    : '—'

  return (
    <div className="rounded-xl border bg-white/80 dark:bg-white/5 p-3 shadow-sm hover:shadow transition">
      <div className="flex items-center justify-between">
        <h4 className="font-medium leading-tight pr-2">{task.title}</h4>
        <span className={clsx('text-[10px] px-2 py-0.5 rounded-full', priorityClass[priorityKey] ?? priorityClass.med)}>
          {task.priority ?? 'med'}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-1">
          <span className={clsx('h-2 w-2 rounded-full', statusMeta[task.status]?.dot)} />
          {statusMeta[task.status]?.label ?? task.status}
        </span>
        <span>•</span>
        <span>Assignee: {task.assignee_id ?? '—'}</span>
        <span>•</span>
        <span>{createdDisplay}</span>
      </div>
    </div>
  )
}
