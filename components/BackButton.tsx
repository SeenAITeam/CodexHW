'use client'

import type { ButtonHTMLAttributes } from 'react'

type BackButtonProps = {
  onBack: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

export function BackButton({ onBack, className = '', ...props }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label="Go back"
      className={`inline-flex h-10 min-w-[40px] items-center gap-2 rounded-lg px-3 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="text-lg leading-none">
        ←
      </span>
      <span>Back</span>
    </button>
  )
}
