import React, { useEffect, useRef, useMemo, memo } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface MoveHistoryProps {
  moves: string[]
}

export const MoveHistory = memo(function MoveHistory({ moves }: MoveHistoryProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest move on change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [moves])

  // Group flat moves list into pairs [White Move, Black Move (optional)]
  const movePairs = useMemo(() => {
    const pairs: [string, string?][] = []
    for (let i = 0; i < moves.length; i += 2) {
      pairs.push([moves[i], moves[i + 1]])
    }
    return pairs
  }, [moves])

  return (
    <div className="w-full">
      {moves.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-6 px-4 text-center bg-white/[0.02] border border-white/5 rounded-xl select-none">
          <span
            style={{ fontFamily: "var(--font-chess)" }}
            className="text-4xl text-white/15 mb-2 leading-none"
          >
            {"\u265E"}
          </span>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 leading-none">
            Your game begins here
          </h4>
          <p className="text-[11px] text-white/30 mt-1 leading-none">
            Make your first move
          </p>
        </div>
      ) : (
        /* Moves List State */
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="mb-2 flex items-center justify-between border-b border-white/5 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
            <span>Move</span>
            <span className="w-24 text-left">White</span>
            <span className="w-24 text-left">Black</span>
          </div>

          <div className="max-h-[100px] overflow-y-auto pr-1 flex flex-col gap-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {movePairs.map(([whiteMove, blackMove], index) => {
              const moveNumber = index + 1
              const isWhiteLatest = index * 2 === moves.length - 1
              const isBlackLatest = index * 2 + 1 === moves.length - 1

              return (
                <div
                  key={moveNumber}
                  className="flex items-center justify-between text-xs py-1 px-1.5 rounded-lg transition-colors hover:bg-white/[0.02]"
                >
                  {/* Move index number */}
                  <span className="font-mono text-white/30 font-semibold w-8">
                    {moveNumber}.
                  </span>

                  {/* White move */}
                  <div className="w-24 text-left">
                    <motion.span
                      initial={{ opacity: 0, x: -3 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "font-medium",
                        isWhiteLatest
                          ? "text-brand-muted font-bold drop-shadow-[0_0_8px_rgba(206,170,255,0.35)]"
                          : "text-white/80"
                      )}
                    >
                      {whiteMove}
                    </motion.span>
                  </div>

                  {/* Black move */}
                  <div className="w-24 text-left">
                    {blackMove ? (
                      <motion.span
                        initial={{ opacity: 0, x: -3 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "font-medium",
                          isBlackLatest
                            ? "text-brand-muted font-bold drop-shadow-[0_0_8px_rgba(206,170,255,0.35)]"
                            : "text-white/80"
                        )}
                      >
                        {blackMove}
                      </motion.span>
                    ) : (
                      <span className="text-white/10 font-mono">-</span>
                    )}
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </div>
  )
})
