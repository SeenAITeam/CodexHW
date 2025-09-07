export type Status = 'backlog' | 'in_progress' | 'done';
export type Task = {
  id: string;
  title: string;
  status: Status;
  assigneeId?: string | null;
  priority?: 'low' | 'med' | 'high';
  createdAt: string; // ISO
};
export type Member = {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
};
