export default function KpiCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="rounded-2xl border bg-white/70 dark:bg-white/5 p-4 shadow-sm flex flex-col gap-1">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      {sub ? <div className="text-xs text-gray-500 dark:text-gray-400">{sub}</div> : null}
    </div>
  )
}
