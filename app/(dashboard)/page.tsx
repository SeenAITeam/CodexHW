import KpiCard from '@/components/KpiCard';
import { getSeed, countByStatus } from '@/lib/data';

export default function OverviewPage() {
  const { tasks } = getSeed();
  const counts = countByStatus(tasks);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total Tasks" value={tasks.length} />
        <KpiCard label="In Progress" value={counts.in_progress} />
        <KpiCard label="Done" value={counts.done} />
      </div>
      <p className="text-sm text-gray-600">
        This project is a minimal dashboard for students to explore a frontend
        workflow with Next.js and Tailwind. Tasks are local only for now.
      </p>
    </div>
  );
}
