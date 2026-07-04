export type PieceColor = "w" | "b"
export type PieceType = "k" | "q" | "r" | "b" | "n" | "p"

export interface Piece {
  type: PieceType
  color: PieceColor
}

export type PuzzleStatus = "idle" | "playing" | "incorrect" | "solved"

export interface PuzzleData {
  id: string
  title: string
  rating: number
  fen: string
  sideToMove: "w" | "b"
  solution: string[] // List of alternating player and opponent moves in UCI format (e.g. ['d1d8', 'f8d8', 'e1d8'])
  description: string
}
