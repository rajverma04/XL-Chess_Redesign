import type { BoardPieces, PreviewMove } from "./chess-preview-types"
import { PREVIEW_TARGET_SQUARES } from "./chess-preview-data"

interface PreviewSquareStylesInput {
  selectedSquare: string | null
  lastMove: PreviewMove | null
  hintSquare: string | null
  boardPieces: BoardPieces
}

/**
 * Pure function that derives custom square styles for the chess preview board.
 * No hooks, no state mutations, no side effects.
 */
export function getPreviewSquareStyles({
  selectedSquare,
  lastMove,
  hintSquare,
  boardPieces,
}: PreviewSquareStylesInput): Record<string, React.CSSProperties> {
  const styles: Record<string, React.CSSProperties> = {}

  // 1. Highlight selected square (violet translucent highlight)
  if (selectedSquare) {
    styles[selectedSquare] = {
      background: "rgba(147, 51, 234, 0.35)",
    }

    // Highlight target squares
    const targets = PREVIEW_TARGET_SQUARES[selectedSquare]
    if (targets) {
      targets.forEach((m) => {
        const hasBlackPiece = boardPieces[m.to] && boardPieces[m.to].startsWith("b")
        if (hasBlackPiece) {
          // Capture target indicator: violet circular border
          styles[m.to] = {
            background: "radial-gradient(circle, transparent 66%, rgba(147, 51, 234, 0.55) 66%, rgba(147, 51, 234, 0.55) 75%, transparent 75%)",
          }
        } else {
          // Empty square indicator: small centered violet dot
          styles[m.to] = {
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.6) 18%, transparent 18%)",
          }
        }
      })
    }
  }

  // 2. Highlight last move (subtle double-square violet highlights)
  if (lastMove) {
    const fromName = lastMove.from
    const toName = lastMove.to
    if (fromName !== selectedSquare) {
      styles[fromName] = {
        background: "rgba(147, 51, 234, 0.15)",
      }
    }
    if (toName !== selectedSquare) {
      styles[toName] = {
        background: "rgba(147, 51, 234, 0.2)",
      }
    }
  }

  // 3. Highlight active hint
  if (hintSquare) {
    styles[hintSquare] = {
      boxShadow: "inset 0 0 0 3px var(--green-accent)",
    }
  }

  return styles
}
