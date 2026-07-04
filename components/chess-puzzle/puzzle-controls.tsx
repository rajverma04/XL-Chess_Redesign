import React from "react"
import { Lightbulb, RotateCcw, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PuzzleControlsProps {
  onHint: () => void
  onUndo: () => void
  onReset: () => void
  canUndo: boolean
}

export function PuzzleControls({ onHint, onUndo, onReset, canUndo }: PuzzleControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        onClick={onHint}
        variant="secondary"
        size="md"
        className="flex-1"
        leftIcon={<Lightbulb aria-hidden="true" className="size-4" />}
      >
        Hint
      </Button>
      <Button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        variant="secondary"
        size="md"
        className="flex-1"
        leftIcon={<Undo2 aria-hidden="true" className="size-4" />}
      >
        Undo
      </Button>
      <Button
        type="button"
        onClick={onReset}
        variant="secondary"
        size="md"
        className="flex-1"
        leftIcon={<RotateCcw aria-hidden="true" className="size-4" />}
      >
        Reset
      </Button>
    </div>
  )
}
