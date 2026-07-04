"use client"

import React, { memo } from "react"
import { motion, useReducedMotion } from "motion/react"
interface EvaluationBarProps {
  evalText: string
  whiteHeight: number
}

export const EvaluationBar = memo(function EvaluationBar({ evalText, whiteHeight }: EvaluationBarProps) {
  const shouldReduceMotion = useReducedMotion()

  const isWhiteWinning = whiteHeight >= 50

  return (
    <div
      aria-label={`Chess Evaluation Bar: ${evalText}`}
      className="relative flex w-5 sm:w-6 flex-col justify-end overflow-hidden rounded-lg bg-[#21201d] ring-1 ring-white/10 self-stretch shrink-0 select-none"
    >
      <motion.div
        initial={{ height: "50%" }}
        animate={{ height: `${whiteHeight}%` }}
        transition={{
          type: shouldReduceMotion ? "tween" : "spring",
          stiffness: 70,
          damping: 14,
          duration: shouldReduceMotion ? 0 : 0.45,
        }}
        className="w-full bg-[#e2e2e0]"
      />

      {/* Floating text evaluation indicator */}
      <div
        className={`absolute inset-x-0 pointer-events-none flex justify-center text-[9px] sm:text-[10px] font-black tracking-tighter uppercase transition-all duration-300 ${
          isWhiteWinning ? "bottom-2 text-[#21201d]" : "top-2 text-[#e2e2e0]"
        }`}
      >
        {evalText}
      </div>
    </div>
  )
})
