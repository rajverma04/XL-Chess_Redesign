"use client"

import React from "react"
import { MoveHistory } from "@/components/move-history"
import { useChessPreview } from "./chess-puzzle/use-chess-preview"
import { ChessBoardPreview } from "./chess-puzzle/chess-board-preview"
import { PuzzleStatus } from "./chess-puzzle/puzzle-status"
import { PuzzleControls } from "./chess-puzzle/puzzle-controls"

export function ChessPuzzle() {
  const {
    boardPieces,
    customSquareStyles,
    statusText,
    canUndo,
    onPieceDrop,
    onSquareClick,
    showHint,
    undoMove,
    resetPuzzle,
  } = useChessPreview()

  return (
    <div className="flex flex-col gap-5 min-h-0">
      {/* Board Wrapper */}
      <ChessBoardPreview
        boardPieces={boardPieces}
        customSquareStyles={customSquareStyles}
        onPieceDrop={onPieceDrop}
        onSquareClick={onSquareClick}
      />

      {/* Status + moves left */}
      <PuzzleStatus statusText={statusText} />

      <MoveHistory moves={[]} />

      {/* Controls */}
      <PuzzleControls
        onHint={showHint}
        onUndo={undoMove}
        onReset={resetPuzzle}
        canUndo={canUndo}
      />
    </div>
  )
}
