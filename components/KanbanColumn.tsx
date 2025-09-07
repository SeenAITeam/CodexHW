import TaskCard from './TaskCard';
import type { Member, Task } from '@/lib/types';

export default function KanbanColumn({
  title,
  tasks,
  members,
}: {
  title: string;
  tasks: Task[];
  members: Member[];
}) {
  return (
    <div className="flex flex-col rounded bg-gray-100 p-2">
      <h3 className="mb-2 text-sm font-semibold">
        {title} ({tasks.length})
      </h3>
      {tasks.length === 0 && (
        <p className="text-xs text-gray-500">No tasks</p>
      )}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          assignee={members.find((m) => m.id === task.assigneeId)}
        />
      ))}
    </div>
  );
}
