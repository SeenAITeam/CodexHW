export default function KanbanColumn({
  title,
  count,
  children,
  hideEmptyState = false,
}: { title: string; count: number; children: React.ReactNode; hideEmptyState?: boolean }) {
  return (
    <div className="rounded-2xl border bg-gray-50/60 dark:bg-white/5 p-3 flex flex-col gap-3 min-h-[240px]">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{Math.max(count, 0)}</div>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
      {count === 0 && !hideEmptyState ? (
        <div className="text-xs text-gray-500/80 dark:text-gray-400 border border-dashed rounded-lg p-3 text-center">
          No tasks yet
        </div>
      ) : null}
    </div>
  )
}
