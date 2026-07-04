import type { BoardPieces, PreviewTarget } from "./chess-preview-types"

// Initial Evergreen puzzle board pieces coordinate map
export const INITIAL_PREVIEW_BOARD: BoardPieces = {
  d1: "wQ", e1: "wR", g1: "wK", // White pieces
  f8: "bR", g8: "bK",          // Black pieces
  f2: "wP", g2: "wP", h2: "wP", // White pawns
  f7: "bP", g7: "bP", h7: "bP"  // Black pawns
}

// Static presentation target squares for the interactive preview
export const PREVIEW_TARGET_SQUARES: Record<string, PreviewTarget[]> = {
  d1: [
    { to: "d2" }, { to: "d3" }, { to: "d4" }, { to: "d5" }, { to: "d6" }, { to: "d7" }, { to: "d8" }
  ],
  e1: [
    { to: "e2" }, { to: "e3" }, { to: "e4" }, { to: "e5" }, { to: "e6" }, { to: "e7" }, { to: "e8" }
  ],
  g1: [
    { to: "f1" }, { to: "h1" }, { to: "f2" }, { to: "g2" }, { to: "h2" }
  ]
}
