import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { BoardPieces, PreviewMove } from "./chess-preview-types"
import { INITIAL_PREVIEW_BOARD } from "./chess-preview-data"
import { getPreviewSquareStyles } from "./chess-preview-styles"

export function useChessPreview() {
  const [boardPieces, setBoardPieces] = useState<BoardPieces>(INITIAL_PREVIEW_BOARD)
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [hintSquare, setHintSquare] = useState<string | null>(null)
  const [lastMove, setLastMove] = useState<PreviewMove | null>(null)
  const [prevPieces, setPrevPieces] = useState<BoardPieces | null>(null)

  const hintTimeoutRef = useRef<number | null>(null)

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current)
        hintTimeoutRef.current = null
      }
    }
  }, [])

  // Drag-and-drop handler (Rule-free visual piece update)
  const onPieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      if (sourceSquare === targetSquare) return false

      setPrevPieces({ ...boardPieces })
      setBoardPieces((prev) => {
        const next = { ...prev }
        const piece = next[sourceSquare]
        if (piece) {
          delete next[sourceSquare]
          next[targetSquare] = piece
        }
        return next
      })

      setLastMove({ from: sourceSquare, to: targetSquare })
      setSelectedSquare(null)
      setHintSquare(null)
      return true
    },
    [boardPieces]
  )

  // Click-to-move square interaction
  const onSquareClick = useCallback(
    (square: string) => {
      // If no square is selected, try to select one
      if (!selectedSquare) {
        const piece = boardPieces[square]
        if (piece && piece.startsWith("w")) {
          setSelectedSquare(square)
        }
        return
      }

      // Re-select another white piece
      const piece = boardPieces[square]
      if (piece && piece.startsWith("w") && selectedSquare !== square) {
        setSelectedSquare(square)
        return
      }

      // Deselect if clicked same square
      if (selectedSquare === square) {
        setSelectedSquare(null)
        return
      }

      // Move piece
      onPieceDrop(selectedSquare, square)
    },
    [selectedSquare, boardPieces, onPieceDrop]
  )

  // Hint action (Highlights White Queen start square d1)
  const showHint = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = null
    }

    setHintSquare("d1")
    hintTimeoutRef.current = window.setTimeout(() => {
      setHintSquare(null)
      hintTimeoutRef.current = null
    }, 1000)
  }, [])

  // Undo action (Restores previous board coordinates layout)
  const undoMove = useCallback(() => {
    if (prevPieces) {
      setBoardPieces(prevPieces)
      setPrevPieces(null)
      setLastMove(null)
      setSelectedSquare(null)
      setHintSquare(null)
    }
  }, [prevPieces])

  // Reset action (Restores board to initial layout)
  const resetPuzzle = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = null
    }
    setBoardPieces(INITIAL_PREVIEW_BOARD)
    setSelectedSquare(null)
    setHintSquare(null)
    setLastMove(null)
    setPrevPieces(null)
  }, [])

  // Custom highlights derivation
  const customSquareStyles = useMemo(
    () => getPreviewSquareStyles({ selectedSquare, lastMove, hintSquare, boardPieces }),
    [selectedSquare, lastMove, hintSquare, boardPieces]
  )

  // Status text derivation
  const statusText = hintSquare ? "Hint: Play Queen (d1) to d8." : "White to move."

  const canUndo = Boolean(prevPieces)

  return {
    boardPieces,
    customSquareStyles,
    statusText,
    canUndo,
    onPieceDrop,
    onSquareClick,
    showHint,
    undoMove,
    resetPuzzle,
  }
}
