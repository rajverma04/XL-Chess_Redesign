"use client"

import { useCallback, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Lightbulb, RotateCcw, Sparkles, Trophy } from "lucide-react"
import {
  applyMove,
  createInitialBoard,
  FILES,
  PIECE_GLYPH,
  sameSquare,
  SOLUTION,
  squareName,
  type Board,
  type Square,
} from "@/lib/puzzle"

type Status = "playing" | "thinking" | "wrong" | "solved"

export function ChessPuzzle() {
  const [board, setBoard] = useState<Board>(() => createInitialBoard())
  const [selected, setSelected] = useState<Square | null>(null)
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<Status>("playing")
  const [hint, setHint] = useState<Square | null>(null)
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null)

  const movesLeft = SOLUTION.length - step

  const reset = useCallback(() => {
    setBoard(createInitialBoard())
    setSelected(null)
    setStep(0)
    setStatus("playing")
    setHint(null)
    setLastMove(null)
  }, [])

  const showHint = useCallback(() => {
    if (status === "solved" || status === "thinking") return
    setHint(SOLUTION[step].from)
    setStatus("playing")
  }, [status, step])

  const handleSquare = useCallback(
    (r: number, c: number) => {
      if (status === "solved" || status === "thinking") return
      const target: Square = [r, c]
      const piece = board[r][c]

      // Selecting a piece
      if (!selected) {
        if (piece && piece.color === "w") {
          setSelected(target)
          setStatus("playing")
        }
        return
      }

      // Re-select another white piece
      if (piece && piece.color === "w" && !sameSquare(selected, target)) {
        setSelected(target)
        setStatus("playing")
        return
      }

      // Deselect
      if (sameSquare(selected, target)) {
        setSelected(null)
        return
      }

      // Attempt the move
      const expected = SOLUTION[step]
      const correct = sameSquare(selected, expected.from) && sameSquare(target, expected.to)

      if (!correct) {
        setStatus("wrong")
        setSelected(null)
        window.setTimeout(() => setStatus((s) => (s === "wrong" ? "playing" : s)), 1400)
        return
      }

      // Correct white move
      const afterWhite = applyMove(board, expected.from, expected.to)
      setBoard(afterWhite)
      setLastMove({ from: expected.from, to: expected.to })
      setSelected(null)
      setHint(null)

      if (expected.reply) {
        setStatus("thinking")
        const reply = expected.reply
        window.setTimeout(() => {
          const afterBlack = applyMove(afterWhite, reply.from, reply.to)
          setBoard(afterBlack)
          setLastMove({ from: reply.from, to: reply.to })
          setStep((s) => s + 1)
          setStatus("playing")
        }, 650)
      } else {
        setStep((s) => s + 1)
        setStatus("solved")
      }
    },
    [board, selected, status, step],
  )

  const statusText = useMemo(() => {
    switch (status) {
      case "solved":
        return "Checkmate. Brilliant finish."
      case "thinking":
        return "Black is responding\u2026"
      case "wrong":
        return "Not the winning move \u2014 look again."
      default:
        return "White to move."
    }
  }, [status])

  return (
    <div className="flex flex-col gap-5">
      {/* Board */}
      <div className="relative rounded-2xl border border-white/10 bg-black/20 p-2 shadow-2xl sm:p-3">
        <div className="grid grid-cols-8 overflow-hidden rounded-xl ring-1 ring-white/10">
          {board.map((row, r) =>
            row.map((piece, c) => {
              const isLight = (r + c) % 2 === 0
              const isSelected = sameSquare(selected, [r, c])
              const isHint = sameSquare(hint, [r, c])
              const isLast =
                sameSquare(lastMove?.from ?? null, [r, c]) || sameSquare(lastMove?.to ?? null, [r, c])
              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => handleSquare(r, c)}
                  aria-label={`${squareName([r, c])}${piece ? `, ${piece.color === "w" ? "white" : "black"} ${piece.type}` : ", empty"}`}
                  className={[
                    "relative flex aspect-square items-center justify-center outline-none transition-colors",
                    isLight ? "bg-[oklch(0.86_0.05_285)]" : "bg-[oklch(0.42_0.13_285)]",
                    "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-white/70",
                  ].join(" ")}
                >
                  {/* highlights */}
                  {isLast && <span className="absolute inset-0 bg-[oklch(0.7_0.18_290)]/35" />}
                  {isSelected && (
                    <span className="absolute inset-0 bg-[oklch(0.7_0.2_290)]/55 ring-2 ring-inset ring-[oklch(0.85_0.14_290)]" />
                  )}
                  {isHint && !isSelected && (
                    <motion.span
                      layoutId="hint"
                      className="absolute inset-1 rounded-md ring-2 ring-[oklch(0.82_0.16_150)]"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}

                  {/* file / rank coords */}
                  {c === 0 && (
                    <span
                      className={`pointer-events-none absolute left-0.5 top-0.5 text-[8px] font-semibold sm:text-[10px] ${
                        isLight ? "text-black/40" : "text-white/60"
                      }`}
                    >
                      {8 - r}
                    </span>
                  )}
                  {r === 7 && (
                    <span
                      className={`pointer-events-none absolute bottom-0.5 right-0.5 text-[8px] font-semibold sm:text-[10px] ${
                        isLight ? "text-black/40" : "text-white/60"
                      }`}
                    >
                      {FILES[c]}
                    </span>
                  )}

                  <AnimatePresence mode="popLayout">
                    {piece && (
                      <motion.span
                        key={`${piece.color}${piece.type}-${r}-${c}`}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        style={
                          piece.color === "w"
                            ? {
                                fontFamily: "var(--font-chess)",
                                color: "#f6f6ff",
                                WebkitTextStroke: "0.75px #241a3a",
                                filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.45))",
                              }
                            : {
                                fontFamily: "var(--font-chess)",
                                color: "#0b0f1f",
                                WebkitTextStroke: "0.75px rgba(232,232,255,0.5)",
                                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
                              }
                        }
                        className="relative z-[1] select-none text-2xl leading-none sm:text-3xl md:text-4xl"
                      >
                        {PIECE_GLYPH[piece.color][piece.type]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              )
            }),
          )}
        </div>

        {/* Solved overlay */}
        <AnimatePresence>
          {status === "solved" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-2 flex items-center justify-center rounded-xl bg-[oklch(0.19_0.045_268)]/70 backdrop-blur-sm sm:inset-3"
            >
              <motion.div
                initial={{ scale: 0.8, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-5 text-center backdrop-blur-xl"
              >
                <Trophy className="size-7 text-[oklch(0.85_0.15_150)]" />
                <p className="font-display text-lg font-bold text-white">Checkmate!</p>
                <p className="text-sm text-white/70">You solved the Evergreen finish.</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-1 rounded-lg bg-brand px-4 py-1.5 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
                >
                  Play again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status + controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 shrink-0 text-brand-muted" />
            <p className="text-xs font-medium uppercase tracking-wider text-white/50">
              Finish the Evergreen game
            </p>
          </div>
          <p
            className={`mt-1 text-sm font-semibold ${
              status === "wrong"
                ? "text-[oklch(0.72_0.19_25)]"
                : status === "solved"
                  ? "text-[oklch(0.82_0.16_150)]"
                  : "text-white"
            }`}
          >
            {statusText}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <span className="font-display text-xl font-bold text-brand-muted">{movesLeft}</span>
          <span className="text-[11px] uppercase leading-tight tracking-wide text-white/50">
            moves
            <br />
            left
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={showHint}
          disabled={status === "solved"}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Lightbulb className="size-4" />
          Hint
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10"
        >
          <RotateCcw className="size-4" />
          Reset puzzle
        </button>
      </div>
    </div>
  )
}
