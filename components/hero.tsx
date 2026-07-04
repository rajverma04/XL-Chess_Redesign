"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"
import { HeroBackground } from "@/components/hero/hero-background"
import { HeroNavbar } from "@/components/hero/hero-navbar"
import { HeroContent } from "@/components/hero/hero-content"
import { DailyPuzzleCard } from "@/components/hero/daily-puzzle-card"
import { createGridVariants } from "@/components/hero/hero-animations"

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const reducedMotion = !!shouldReduceMotion

  const gridVariants = createGridVariants(reducedMotion)

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <HeroBackground />

      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:py-5">
        {/* Nav */}
        <HeroNavbar />

        {/* Hero grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-10"
        >
          {/* Left */}
          <HeroContent shouldReduceMotion={reducedMotion} />

          {/* Right — interactive puzzle */}
          <DailyPuzzleCard shouldReduceMotion={reducedMotion} />
        </motion.div>
      </div>
    </section>
  )
}
