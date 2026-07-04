"use client"

import React from "react"
import { motion } from "motion/react"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroStats } from "./hero-stats"
import {
  badgeVariants,
  createLeftContainerVariants,
  createHeadingContainerVariants,
  createHeadingGroupVariants,
  createParagraphVariants,
  ctaContainerVariants,
} from "./hero-animations"

interface HeroContentProps {
  shouldReduceMotion: boolean
}

export function HeroContent({ shouldReduceMotion }: HeroContentProps) {
  const leftContainerVariants = createLeftContainerVariants(shouldReduceMotion)
  const headingContainerVariants = createHeadingContainerVariants(shouldReduceMotion)
  const headingGroupVariants = createHeadingGroupVariants(shouldReduceMotion)
  const paragraphVariants = createParagraphVariants(shouldReduceMotion)

  return (
    <motion.div variants={leftContainerVariants} className="max-w-xl">
      <motion.div
        variants={badgeVariants}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur"
      >
        <span className="flex size-1.5 rounded-full bg-green-accent" />
        Trusted by 2M+ players worldwide
      </motion.div>

      <motion.h1
        variants={headingContainerVariants}
        className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl"
      >
        <motion.span className="inline-block" variants={headingGroupVariants}>
          Build the Future of
        </motion.span>{" "}
        <motion.span
          className="inline-block bg-gradient-to-r from-brand-muted to-purple-pink bg-clip-text text-transparent"
          variants={headingGroupVariants}
        >
          Online Chess
        </motion.span>
      </motion.h1>

      <motion.p
        variants={paragraphVariants}
        className="mt-5 text-lg leading-relaxed text-white/60 text-pretty"
      >
        A complete platform to play, learn, compete, and grow&mdash;crafted to become the
        world&apos;s #1 destination for chess. Make the best move on your way to the top.
      </motion.p>

      <motion.div
        variants={ctaContainerVariants}
        className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8"
      >
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/button:translate-x-0.5" />}
        >
          Start Playing
        </Button>
        <Button
          variant="secondary"
          size="lg"
          leftIcon={<Play aria-hidden="true" className="size-4 fill-current" />}
        >
          Watch Demo
        </Button>
      </motion.div>

      {/* Stats */}
      <HeroStats shouldReduceMotion={shouldReduceMotion} />
    </motion.div>
  )
}
