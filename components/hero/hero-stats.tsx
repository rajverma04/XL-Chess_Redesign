"use client"

import React from "react"
import { motion } from "motion/react"
import { Users, Zap, Star, LucideIcon } from "lucide-react"
import { AnimatedStatValue } from "./animated-stat-value"
import { createStatsContainerVariants, statItemVariants } from "./hero-animations"

interface StatConfig {
  icon: LucideIcon
  value: number
  suffix: string
  decimals: number
  duration: number
  label: string
}

export const HERO_STATS: StatConfig[] = [
  { icon: Users, value: 2, suffix: "M+", decimals: 0, duration: 1.2, label: "Active players" },
  { icon: Zap, value: 50, suffix: "M+", decimals: 0, duration: 1.4, label: "Games played" },
  { icon: Star, value: 4.9, suffix: "", decimals: 1, duration: 1.1, label: "App rating" },
]

interface HeroStatsProps {
  shouldReduceMotion: boolean
}

export function HeroStats({ shouldReduceMotion }: HeroStatsProps) {
  const statsContainerVariants = createStatsContainerVariants(shouldReduceMotion)

  return (
    <motion.dl
      variants={statsContainerVariants}
      className="mt-8 grid max-w-md grid-cols-3 gap-4 sm:gap-6 border-t border-white/10 pt-6 lg:mt-10 lg:pt-7"
    >
      {HERO_STATS.map(({ icon: Icon, value, suffix, decimals, duration, label }) => (
        <motion.div key={label} variants={statItemVariants} className="min-w-0">
          <Icon aria-hidden="true" className="mb-2 size-4 text-brand-muted" />
          <dd className="font-display text-xl sm:text-2xl font-bold text-white truncate">
            <AnimatedStatValue
              value={value}
              suffix={suffix}
              decimals={decimals}
              duration={duration}
            />
          </dd>
          <dt className="mt-0.5 text-[10px] sm:text-xs text-white/50 leading-tight">{label}</dt>
        </motion.div>
      ))}
    </motion.dl>
  )
}
