"use client"

import { motion } from "motion/react"
import { ArrowRight, Play, Star, Users, Zap } from "lucide-react"
import { ChessPuzzle } from "@/components/chess-puzzle"

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand to-[oklch(0.5_0.2_280)] shadow-lg shadow-brand/30">
        <span className="text-2xl leading-none text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
          {"\u265E"}
        </span>
      </div>
      <div className="leading-none">
        <p className="font-display text-lg font-bold tracking-tight text-white">XLCHESS</p>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          Excel at Chess
        </p>
      </div>
    </div>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.06_275)] via-background to-[oklch(0.16_0.04_268)]" />
        <div className="absolute -left-40 top-[-10%] size-[520px] rounded-full bg-brand/25 blur-[130px]" />
        <div className="absolute -right-32 top-1/3 size-[480px] rounded-full bg-[oklch(0.5_0.2_280)]/20 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        {/* Nav */}
        <header className="flex items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
            <a className="transition hover:text-white" href="#play">
              Play
            </a>
            <a className="transition hover:text-white" href="#learn">
              Learn
            </a>
            <a className="transition hover:text-white" href="#compete">
              Compete
            </a>
            <a className="transition hover:text-white" href="#puzzles">
              Puzzles
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </nav>
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Sign in
          </button>
        </header>

        {/* Hero grid */}
        <div className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
          {/* Left */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur"
            >
              <span className="flex size-1.5 rounded-full bg-[oklch(0.82_0.16_150)]" />
              Trusted by 2M+ players worldwide
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl"
            >
              Build the Future of{" "}
              <span className="bg-gradient-to-r from-brand-muted to-[oklch(0.68_0.19_300)] bg-clip-text text-transparent">
                Online Chess
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg leading-relaxed text-white/60 text-pretty"
            >
              A complete platform to play, learn, compete, and grow&mdash;crafted to become the
              world&apos;s #1 destination for chess. Make the best move on your way to the top.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-base font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition hover:brightness-110 hover:shadow-brand/50"
              >
                Start Playing
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <Play className="size-4 fill-current" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.dl
              variants={item}
              className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              {[
                { icon: Users, value: "2M+", label: "Active players" },
                { icon: Zap, value: "50M+", label: "Games played" },
                { icon: Star, value: "4.9", label: "App rating" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label}>
                  <Icon className="mb-2 size-4 text-brand-muted" />
                  <dd className="font-display text-2xl font-bold text-white">{value}</dd>
                  <dt className="mt-0.5 text-xs text-white/50">{label}</dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Right — interactive puzzle */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 6 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            <motion.div
              aria-hidden
              animate={{ opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/20 to-transparent blur-2xl"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-2xl sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex size-2 rounded-full bg-[oklch(0.82_0.16_150)] shadow-[0_0_10px_oklch(0.82_0.16_150)]" />
                  <span className="text-sm font-semibold text-white">Daily Puzzle</span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60">
                  Rated 1500
                </span>
              </div>
              <ChessPuzzle />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
