"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { motion } from "motion/react"
import { Check, Mail, MessageSquare, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3200)
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden py-20 sm:py-28">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark-navy via-background to-bg-navy-mid" />
        <div className="absolute left-1/2 top-0 size-[560px] -translate-x-1/2 rounded-full bg-brand/15 blur-[150px]" />
        {/* Decorative knight watermark */}
        <span className="absolute -right-10 bottom-0 select-none font-[var(--font-chess)] text-[22rem] leading-none text-white/[0.02]">
          {"\u265E"}
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          {/* Left — copy */}
          <div className="flex flex-col justify-center">
            <motion.span
              variants={item}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur"
            >
              <span className="flex size-1.5 rounded-full bg-brand-muted" />
              Get in touch
            </motion.span>
            <motion.h2
              variants={item}
              className="mt-5 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl"
            >
              Let&apos;s make your{" "}
              <span className="bg-gradient-to-r from-brand-muted to-purple-pink bg-clip-text text-transparent">
                next move
              </span>
            </motion.h2>
            <motion.p variants={item} className="mt-5 max-w-md text-lg leading-relaxed text-white/60 text-pretty">
              Questions about tournaments, coaching, or partnerships? Send us a message and our team
              will reply within one business day.
            </motion.p>
            <motion.ul variants={item} className="mt-8 flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="size-4 text-brand-muted" />
                support@xlchess.com
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare aria-hidden="true" className="size-4 text-brand-muted" />
                Live chat, 7 days a week
              </li>
            </motion.ul>
          </div>

          {/* Right — glass form card */}
          <motion.div variants={item} className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/20 to-transparent blur-2xl" />
            <form
              onSubmit={handleSubmit}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
            >
              <div className="grid gap-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white">
                    Name
                  </label>
                  <div className="relative">
                    <User aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Magnus Carlsen"
                      suppressHydrationWarning
                      className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-white placeholder:text-white/35 outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white">
                    Email
                  </label>
                  <div className="relative">
                    <Mail aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      suppressHydrationWarning
                      className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-white placeholder:text-white/35 outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us how we can help you."
                    suppressHydrationWarning
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={sent}
                  className="w-full"
                >
                  {sent ? (
                    <>
                      <Check aria-hidden="true" className="size-4 mr-2" />
                      Message sent
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send aria-hidden="true" className="size-4 ml-2 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
