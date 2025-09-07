import seed from '@/data/seed.json';
import type { Member, Status, Task } from './types';

type Seed = {
  tasks: Task[];
  members: Member[];
};

export function getSeed(): Seed {
  return seed as Seed;
}

export function countByStatus(tasks: Task[]) {
  return tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { backlog: 0, in_progress: 0, done: 0 } as Record<Status, number>,
  );
}

export function tasksByStatus(tasks: Task[]) {
  return tasks.reduce(
    (acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    },
    { backlog: [], in_progress: [], done: [] } as Record<Status, Task[]>,
  );
}
