export type BoardPieces = Record<string, string>

export interface PreviewMove {
  from: string
  to: string
}

export interface PreviewTarget {
  to: string
}
