"use client"

import React from "react"
import dynamic from "next/dynamic"
import { EvaluationBar } from "@/components/evaluation-bar"
import type { BoardPieces } from "./chess-preview-types"

const Chessboard = dynamic(
  () => import("react-chessboard").then((mod) => mod.Chessboard),
  { ssr: false }
)

interface ChessBoardPreviewProps {
  boardPieces: BoardPieces
  customSquareStyles: Record<string, React.CSSProperties>
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean
  onSquareClick: (square: string) => void
}

export function ChessBoardPreview({
  boardPieces,
  customSquareStyles,
  onPieceDrop,
  onSquareClick,
}: ChessBoardPreviewProps) {
  return (
    <div className="relative flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-2 shadow-2xl sm:p-3 min-h-0">
      <EvaluationBar evalText="M2" whiteHeight={50} />

      <div
        role="region"
        aria-label="Interactive chess puzzle preview for the XLChess hero section."
        className="flex-1 min-w-0 min-h-0 w-full aspect-square overflow-hidden rounded-xl ring-1 ring-white/10"
      >
        <Chessboard
          id="evergreen-board"
          key={JSON.stringify(boardPieces)}
          position={boardPieces}
          onPieceDrop={onPieceDrop}
          onSquareClick={onSquareClick}
          customBoardStyle={{
            borderRadius: "0.75rem",
          }}
          customDarkSquareStyle={{ backgroundColor: "var(--board-dark)" }}
          customLightSquareStyle={{ backgroundColor: "var(--board-light)" }}
          customSquareStyles={customSquareStyles}
          arePiecesMovableByDrag={true}
        />
      </div>
    </div>
  )
}
