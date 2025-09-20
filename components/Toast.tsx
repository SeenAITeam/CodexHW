'use client'

import clsx from 'clsx'

type ToastProps = {
  message: string
  type: 'success' | 'error'
  onDismiss?: () => void
}

export default function Toast({ message, type, onDismiss }: ToastProps) {
  return (
    <div
      className={clsx(
        'fixed bottom-6 right-6 z-50 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur',
        type === 'success'
          ? 'border-emerald-200 bg-white/80 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200'
          : 'border-rose-200 bg-white/80 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200',
      )}
      role="status"
    >
      <span className="font-medium">{type === 'success' ? 'Success' : 'Error'}:</span>
      <span>{message}</span>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-2 text-xs text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      ) : null}
    </div>
  )
}
