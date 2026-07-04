"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"

export function FloatingChessPieces() {
  const shouldReduceMotion = useReducedMotion()

  const config = {
    knight: {
      animate: shouldReduceMotion ? {} : { y: [0, -15, 0], rotate: [0, 2, 0] },
      transition: { duration: 15, repeat: Infinity, ease: "easeInOut" },
    },
    queen: {
      animate: shouldReduceMotion ? {} : { y: [0, 12, 0], rotate: [0, -2, 0] },
      transition: { duration: 13, repeat: Infinity, ease: "easeInOut" },
    },
    bishop: {
      animate: shouldReduceMotion ? {} : { rotate: [-2, 3, -2], y: [0, -6, 0] },
      transition: { duration: 11, repeat: Infinity, ease: "easeInOut" },
    },
  }

  return (
    <div
      className="absolute inset-0 -z-20 overflow-hidden pointer-events-none select-none w-full h-full"
      aria-hidden="true"
    >
      {/* 1. Left Top Knight */}
      <motion.span
        animate={config.knight.animate}
        transition={{ ...config.knight.transition, delay: 0.5 }}
        style={{ fontFamily: "var(--font-chess)", opacity: 0.04 }}
        className="absolute left-4 top-[12%] text-[10rem] sm:text-[14rem] text-white/5"
      >
        {"\u265E"}
      </motion.span>

      {/* 2. Right Top Bishop (Hidden on Mobile) */}
      <motion.span
        animate={config.bishop.animate}
        transition={{ ...config.bishop.transition, delay: 1 }}
        style={{ fontFamily: "var(--font-chess)", opacity: 0.03 }}
        className="hidden md:block absolute right-[15%] top-[10%] text-[11rem] text-white/5"
      >
        {"\u265D"}
      </motion.span>

      {/* 3. Left Mid Queen (Hidden on Mobile) */}
      <motion.span
        animate={config.queen.animate}
        transition={{ ...config.queen.transition, delay: 1.5 }}
        style={{ fontFamily: "var(--font-chess)", opacity: 0.03 }}
        className="hidden md:block absolute left-[22%] top-[45%] text-[12rem] text-white/5"
      >
        {"\u265B"}
      </motion.span>

      {/* 4. Right Mid Queen */}
      <motion.span
        animate={config.queen.animate}
        transition={{ ...config.queen.transition, delay: 0 }}
        style={{ fontFamily: "var(--font-chess)", opacity: 0.04 }}
        className="absolute right-6 top-[32%] text-[12rem] sm:text-[16rem] text-white/5"
      >
        {"\u265B"}
      </motion.span>

      {/* 5. Left Bottom Bishop */}
      <motion.span
        animate={config.bishop.animate}
        transition={{ ...config.bishop.transition, delay: 0.2 }}
        style={{ fontFamily: "var(--font-chess)", opacity: 0.04 }}
        className="absolute left-8 top-[68%] text-[11rem] sm:text-[15rem] text-white/5"
      >
        {"\u265D"}
      </motion.span>

      {/* 6. Right Bottom Knight */}
      <motion.span
        animate={config.knight.animate}
        transition={{ ...config.knight.transition, delay: 0.8 }}
        style={{ fontFamily: "var(--font-chess)", opacity: 0.03 }}
        className="absolute right-[8%] top-[82%] text-[10rem] sm:text-[13rem] text-white/5"
      >
        {"\u265E"}
      </motion.span>
    </div>
  )
}
