import type { Member, Task } from '@/lib/types';

export default function TaskCard({ task, assignee }: { task: Task; assignee?: Member }) {
  return (
    <div className="mb-2 rounded border bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{task.title}</h4>
        {task.priority && (
          <span className="ml-2 rounded bg-gray-200 px-2 py-0.5 text-xs capitalize">
            {task.priority}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        {assignee && <span>{assignee.name}</span>}
        <span className="capitalize">{task.status.replace('_', ' ')}</span>
      </div>
    </div>
  );
}
