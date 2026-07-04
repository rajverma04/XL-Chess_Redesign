import React from "react"
import { Sparkles } from "lucide-react"

interface PuzzleStatusProps {
  statusText: string
}

export function PuzzleStatus({ statusText }: PuzzleStatusProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Sparkles aria-hidden="true" className="size-4 shrink-0 text-brand-muted" />
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">
            Interactive Chess Preview
          </p>
        </div>
        <p className="mt-1 text-sm font-semibold text-white" aria-live="polite" role="status">
          {statusText}
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <span className="font-display text-xl font-bold text-brand-muted">2</span>
        <span className="text-[11px] uppercase leading-tight tracking-wide text-white/50">
          moves
          <br />
          left
        </span>
      </div>
    </div>
  )
}
