"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand to-brand-accent shadow-lg shadow-brand/30">
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

export function HeroNavbar() {
  const shouldReduceMotion = useReducedMotion()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative z-50 flex items-center justify-between">
      <Logo />
      
      {/* Desktop Nav */}
      <nav aria-label="Main Navigation" className="hidden items-center gap-6 text-sm font-medium text-white/60 md:flex lg:gap-8">
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

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" className="hidden sm:flex">
          Sign in
        </Button>
        
        {/* Mobile Menu Toggle Button */}
        <motion.button
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex size-11 items-center justify-center rounded-lg border border-white/10 hover:border-white/25 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white md:hidden cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </motion.button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-5 top-20 z-40 rounded-2xl border border-white/10 bg-black/90 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
              <a
                className="text-base font-semibold text-white/70 transition hover:text-white"
                href="#play"
                onClick={() => setMobileMenuOpen(false)}
              >
                Play
              </a>
              <a
                className="text-base font-semibold text-white/70 transition hover:text-white"
                href="#learn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Learn
              </a>
              <a
                className="text-base font-semibold text-white/70 transition hover:text-white"
                href="#compete"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compete
              </a>
              <a
                className="text-base font-semibold text-white/70 transition hover:text-white"
                href="#puzzles"
                onClick={() => setMobileMenuOpen(false)}
              >
                Puzzles
              </a>
              <a
                className="text-base font-semibold text-white/70 transition hover:text-white"
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="mt-2 border-t border-white/10 pt-4">
                <Button variant="primary" size="md" className="w-full">
                  Sign in
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
