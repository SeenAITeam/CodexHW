import KanbanColumn from '@/components/KanbanColumn';
import { getSeed, tasksByStatus } from '@/lib/data';

export default function BoardPage() {
  const { tasks, members } = getSeed();
  const grouped = tasksByStatus(tasks);
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <KanbanColumn title="Backlog" tasks={grouped.backlog} members={members} />
      <KanbanColumn title="In Progress" tasks={grouped.in_progress} members={members} />
      <KanbanColumn title="Done" tasks={grouped.done} members={members} />
    </div>
  );
}
