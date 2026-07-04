export type PieceColor = "w" | "b"
export type PieceType = "k" | "q" | "r" | "b" | "n" | "p"

export interface Piece {
  type: PieceType
  color: PieceColor
}

export type Square = [number, number] // [row, col] with row 0 = rank 8, col 0 = file a
export type Board = (Piece | null)[][]

export interface SolutionMove {
  from: Square
  to: Square
  san: string
  reply?: { from: Square; to: Square; san: string }
}

const P = (color: PieceColor, type: PieceType): Piece => ({ color, type })

// A clean, real back-rank combination (mate in two).
// 1. Qd8+  Rxd8   2. Rxd8#
export function createInitialBoard(): Board {
  const b: Board = Array.from({ length: 8 }, () => Array<Piece | null>(8).fill(null))
  // Black
  b[0][6] = P("b", "k") // Kg8
  b[0][5] = P("b", "r") // Rf8
  b[1][5] = P("b", "p") // f7
  b[1][6] = P("b", "p") // g7
  b[1][7] = P("b", "p") // h7
  // White
  b[7][6] = P("w", "k") // Kg1
  b[7][3] = P("w", "q") // Qd1
  b[7][4] = P("w", "r") // Re1
  b[6][5] = P("w", "p") // f2
  b[6][6] = P("w", "p") // g2
  b[6][7] = P("w", "p") // h2
  return b
}

export const SOLUTION: SolutionMove[] = [
  {
    from: [7, 3],
    to: [0, 3],
    san: "Qd8+",
    reply: { from: [0, 5], to: [0, 3], san: "Rxd8" },
  },
  {
    from: [7, 4],
    to: [0, 3],
    san: "Rxd8#",
  },
]

// Use the SOLID (filled) glyphs for both colors so pieces render as clear
// silhouettes on any square; color is applied via CSS to distinguish sides.
// Rendered with a monochrome chess font (Noto Sans Symbols 2) so CSS `color`
// controls the piece color instead of a substituted color-emoji font.
const SOLID: Record<PieceType, string> = {
  k: "\u265A",
  q: "\u265B",
  r: "\u265C",
  b: "\u265D",
  n: "\u265E",
  p: "\u265F",
}
export const PIECE_GLYPH: Record<PieceColor, Record<PieceType, string>> = {
  w: SOLID,
  b: SOLID,
}

export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"]

export function squareName([r, c]: Square): string {
  return `${FILES[c]}${8 - r}`
}

export function sameSquare(a: Square | null, b: Square | null): boolean {
  return !!a && !!b && a[0] === b[0] && a[1] === b[1]
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => row.map((cell) => (cell ? { ...cell } : null)))
}

export function applyMove(board: Board, from: Square, to: Square): Board {
  const next = cloneBoard(board)
  next[to[0]][to[1]] = next[from[0]][from[1]]
  next[from[0]][from[1]] = null
  return next
}
