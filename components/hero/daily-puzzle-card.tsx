"use client"

import React from "react"
import { motion } from "motion/react"
import { ChessPuzzle } from "@/components/chess-puzzle"
import { createPuzzleCardVariants } from "./hero-animations"

interface DailyPuzzleCardProps {
  shouldReduceMotion: boolean
}

export function DailyPuzzleCard({ shouldReduceMotion }: DailyPuzzleCardProps) {
  const puzzleCardVariants = createPuzzleCardVariants(shouldReduceMotion)

  return (
    <motion.div
      variants={puzzleCardVariants}
      className="relative w-full"
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/20 to-transparent blur-2xl"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-2xl sm:p-6 lg:p-4"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-green-accent shadow-[0_0_10px_var(--green-accent)]" />
            <span className="text-sm font-semibold text-white">Daily Puzzle</span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60">
            Rated 1500
          </span>
        </div>
        <ChessPuzzle />
      </motion.div>
    </motion.div>
  )
}
