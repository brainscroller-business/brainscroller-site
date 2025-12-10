"use client";

import logoUrl from "@/public/logo.png";
import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

/** =========================
 *  CONFIG
 *  ========================= */
const IOS_STORE = "https://apps.apple.com/app/id6754678719";
const ANDROID_STORE =
  "https://play.google.com/store/apps/details?id=com.yourcompany.app59v5";

/** =========================
 *  UTILS & UI PRIMS
 *  ========================= */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cx("h-5 w-5", className)} aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Logo({ size = 40 }: { size?: number }) {
  const [src, setSrc] = useState<string | StaticImageData>(logoUrl);
  return (
    <Image
      src={src}
      alt="BrainScroller"
      width={size}
      height={size}
      className="object-contain drop-shadow-[0_0_10px_rgba(250,204,21,0.35)]"
      priority
      onError={() => setSrc("/brain.png")}
    />
  );
}

/** =========================
 *  TYPO FX
 *  ========================= */
function AnimatedWords({
  text,
  delay = 0.2,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const letters = useMemo(() => Array.from(text), [text]);
  const [reduce] = useState<boolean>(
    () =>
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) ||
      false
  );

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span role="text" className={cx("whitespace-nowrap", className)}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.45,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}
function Ellipsis({ className = "" }: { className?: string }) {
  const [reduce] = useState<boolean>(
    () =>
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) ||
      false
  );
  if (reduce) return <span className={className}>…</span>;
  return (
    <span className={className} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.28,
          }}
          className="inline-block"
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

/** =========================
 *  HERO PARTICLES (kept for future)
 *  ========================= */
// (omitted from use for perf)

const goldGlass =
  "rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-400/10 to-amber-400/5 ring-1 ring-inset ring-amber-400/10 shadow-[0_0_40px_-12px_rgba(251,191,36,0.25)]";
const darkGlass = "rounded-2xl border border-zinc-800 bg-zinc-900/40";
const goldText =
  "bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent";

/** =========================
 *  DOOMSCROLLING MATH  (FIXED JSX)
 *  ========================= */

function DoomscrollMathSection({
  reduceMotion = false,
}: {
  reduceMotion?: boolean;
}) {
  const hoursPerDay = 2;
  const years = 5;
  const hoursPerYear = hoursPerDay * 365;
  const totalHours = hoursPerYear * years;

  const metrics: {
    label: string;
    value: string;
    sub: string;
    kind: "books" | "languages" | "writing";
  }[] = [
    {
      label: "Books you never opened",
      value: "150–225",
      sub: "A whole wall of non-fiction and novels.",
      kind: "books",
    },
    {
      label: "Languages you could speak",
      value: "2–3",
      sub: "Conversationally fluent, easily.",
      kind: "languages",
    },
    {
      label: "Pages you could have written",
      value: "1,000+",
      sub: "Essays, notes, product ideas, a first book.",
      kind: "writing",
    },
  ];

  return (
    <motion.section
      id="math"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto mt-4 max-w-6xl px-4 pb-16 pt-10"
    >
      <motion.div
        aria-hidden
        initial={{
          opacity: 0,
          clipPath: "inset(25% 25% 60% 25% round 32px)",
        }}
        whileInView={{
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0% round 0px)",
        }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.23),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,1),#020617)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:url('/grain.png')] mix-blend-soft-light" />
      </motion.div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 inline-flex items-center justify-center rounded-full border border-amber-400/30 bg-black/70 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-amber-300">
          THE MATH OF DOOMSCROLLING
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-semibold tracking-tight text-amber-100 md:text-4xl"
        >
          {years} years. {hoursPerDay} hours a day.{" "}
          <span className="block text-amber-300">
            Here&apos;s what that really costs.
          </span>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.12, duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 rounded-[999px] border border-amber-500/40 bg-black/80 px-6 py-4 shadow-[0_30px_120px_rgba(0,0,0,0.9)] md:flex-row md:justify-between md:px-9"
      >
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100"
          >
            {hoursPerDay}h
          </motion.span>
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300/90">
              Every day
            </p>
            <p className="text-sm text-amber-50/80">
              Adds up to{" "}
              <span className="font-semibold text-amber-200">
                {totalHours.toLocaleString()}+ hours
              </span>{" "}
              of pure scrolling.
            </p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-gradient-to-b from-amber-400/0 via-amber-400/40 to-amber-400/0 md:block" />

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300/80 md:flex-row md:gap-3"
        >
          <span>{hoursPerYear}+ HOURS / YEAR</span>
          <span className="hidden opacity-50 md:inline">•</span>
          <span className="md:text-[10px]">
            5 YEARS OF YOUR ATTENTION, GONE.
          </span>
        </motion.div>
      </motion.div>

      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {metrics.map((m, idx) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              delay: 0.18 + idx * 0.09,
              duration: 0.55,
              ease: "easeOut",
            }}
            className="relative overflow-hidden rounded-2xl border border-amber-500/35 bg-gradient-to-b from-black/95 to-zinc-950 px-6 py-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
            />

            {m.kind === "books" && (
              <div className="mb-4 flex items-end gap-1.5">
                {[14, 26, 38, 52, 64].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0, y: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
                    transition={{
                      scaleY: {
                        delay: 0.28 + idx * 0.06 + i * 0.05,
                        duration: 0.4,
                        ease: "easeOut",
                      },
                      ...(reduceMotion
                        ? {}
                        : {
                            y: {
                              delay: 0.9 + i * 0.12,
                              duration: 2.2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                            },
                          }),
                    }}
                    className="origin-bottom flex-1 rounded-md bg-gradient-to-t from-amber-500/90 via-amber-400/80 to-amber-200/90 shadow-[0_0_20px_rgba(251,191,36,0.45)]"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            )}

            {m.kind === "languages" && (
              <div className="mb-4 flex items-center justify-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className="relative h-20 w-20 rounded-full border border-amber-400/60 bg-black/70"
                >
                  <motion.div
                    className="absolute inset-3 rounded-full border border-amber-300/50"
                    animate={reduceMotion ? undefined : { rotate: 360 }}
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 14,
                            repeat: Infinity,
                            ease: "linear",
                          }
                    }
                  >
                    {["FR", "ES", "JP"].map((code, i) => (
                      <span
                        key={code}
                        className="absolute flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-black shadow-[0_0_12px_rgba(250,204,21,0.7)]"
                        style={
                          i === 0
                            ? {
                                top: "-6px",
                                left: "50%",
                                transform: "translateX(-50%)",
                              }
                            : i === 1
                            ? { bottom: "-6px", left: "-6px" }
                            : { bottom: "-6px", right: "-6px" }
                        }
                      >
                        {code}
                      </span>
                    ))}
                  </motion.div>
                  <div className="absolute inset-6 rounded-full bg-gradient-to-b from-amber-200/30 to-amber-500/20 blur-[2px]" />
                </motion.div>
              </div>
            )}

            {m.kind === "writing" && (
              <div className="mb-4 flex h-16 items-center gap-1.5 overflow-hidden">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12, y: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                    transition={{
                      opacity: {
                        delay: 0.25 + i * 0.06,
                        duration: 0.4,
                        ease: "easeOut",
                      },
                      x: {
                        delay: 0.25 + i * 0.06,
                        duration: 0.4,
                        ease: "easeOut",
                      },
                      ...(reduceMotion
                        ? {}
                        : {
                            y: {
                              delay: 0.8 + i * 0.15,
                              duration: 2.4,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeOut",
                            },
                          }),
                    }}
                    className="flex-1 rounded-md bg-gradient-to-b from-amber-200/70 via-amber-300/60 to-amber-100/40 p-[3px]"
                    style={{ transformOrigin: "bottom left" }}
                  >
                    <div className="h-full rounded-[6px] bg-black/80">
                      <div className="mt-1 space-y-[3px] px-2">
                        <div className="h-[2px] w-3/4 rounded-full bg-amber-300/70" />
                        <div className="h-[2px] w-1/2 rounded-full bg-amber-200/60" />
                        <div className="h-[2px] w-4/5 rounded-full bg-amber-200/40" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
              {m.label}
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-3xl font-semibold text-amber-100">
                {m.value}
              </p>
            </div>
            <p className="mt-1 text-xs text-amber-50/75">{m.sub}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/** =========================
 *  PROBLEM SPLIT SCREEN
 *  ========================= */

function ProblemStatementSection() {
  return (
    <motion.section
      id="problem"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto max-w-6xl px-4 py-24 md:py-32"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, clipPath: "inset(40% 20% 40% 20%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2"
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.28),transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:url('/grain.png')] mix-blend-soft-light" />
      </motion.div>

      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center md:min-h-[85vh]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4 inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.26em] text-amber-200"
        >
          THE REAL PROBLEM
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 26, letterSpacing: "0.1em" }}
          whileInView={{
            opacity: 1,
            y: 0,
            letterSpacing: "0.04em",
          }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl text-[1.9rem] font-semibold uppercase tracking-[0.18em] text-amber-300 sm:text-4xl md:text-[2.9rem]"
        >
          Your brain isn&apos;t the problem.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="mt-4 text-xl font-semibold text-amber-100 md:text-2xl"
        >
          The feed is.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-sm leading-7 text-amber-50/85 md:text-[15px]"
        >
          BrainScroller keeps the swipe — and gives you those years back as
          knowledge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300/80"
        >
          <span>OUR SOLUTION</span>
          <a
            href="#solution"
            className="relative inline-flex h-9 w-9 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full border border-amber-400/40" />
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-amber-300"
                aria-hidden
              >
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

/** =========================
 *  OUR SOLUTION / HOW IT WORKS
 *  ========================= */
function SolutionSection({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const steps = [
    {
      id: "01",
      title: "Replace the feed, keep the reflex with over 50+ academic topics",
      tag: "Smart Brain Feed",
    },
    {
      id: "02",
      title: "Never be unaware, with over 20+ reputable news sources",
      tag: "Daily Global Briefing",
    },
    {
      id: "03",
      title: "Build a Private Library of all your interests.",
      tag: "Brain Library",
    },
  ];

  return (
    <motion.section
      id="solution"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto max-w-6xl px-4 pb-20 pt-4"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.2),transparent_70%)] blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:url('/grain.png')] mix-blend-soft-light" />
      </motion.div>

      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-stretch">
        <div className="relative flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4 md:sticky md:top-28"
          >
            <p className="inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-black/70 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-amber-300">
              HOW IT WORKS
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-amber-50 md:text-4xl">
              We keep the{" "}
              <span className="text-amber-300">scroll</span>
              <span className="block text-[0.95em] text-amber-200">
                and hard-wire it to real knowledge and live news.
              </span>
            </h2>
            <p className="max-w-sm text-sm text-amber-50/70">
              A new kind of feed: daily global news, big ideas, and a Brain
              Library of what you save — all powered by the same swipe your
              thumb already knows.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-2 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-amber-300/80"
            >
              <span>SCROLL TO SEE</span>
              <span className="relative inline-flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-amber-400/40" />
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-amber-300"
                    aria-hidden
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative flex-1">
          <div
            aria-hidden
            className="pointer-events-none absolute left-4 top-2 bottom-4 hidden w-[2px] bg-gradient-to-b from-amber-400/0 via-amber-400/50 to-amber-400/0 md:block"
          />

          <div className="space-y-5">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: 0.12 + idx * 0.12,
                  duration: 0.55,
                  ease: "easeOut",
                }}
                className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),rgba(10,10,10,0.98))] p-5 pl-6 shadow-[0_30px_90px_rgba(0,0,0,0.9)] md:pl-16"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-[14px] top-7 hidden h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.9)] md:block"
                />

                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-xs font-semibold text-amber-200 ring-1 ring-amber-400/40">
                      {step.id}
                    </span>
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                      {step.tag}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 md:mt-3">
                  <h3 className="text-lg font-semibold text-amber-50 md:text-xl">
                    {step.title}
                  </h3>
                </div>

                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 0.9, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    delay: 0.25 + idx * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute right-0 top-0 h-full w-32 opacity-80"
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-amber-400/15 via-amber-400/0 to-transparent" />
                  {!reduceMotion && (
                    <motion.div
                      animate={{ y: ["0%", "-30%", "0%"] }}
                      transition={{
                        duration: 10 + idx * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-x-6 top-4 flex flex-col gap-2 opacity-70"
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-[2px] rounded-full bg-amber-300/70"
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/** =========================
 *  REVIEWS – FULL-WIDTH QUOTES
 *  ========================= */

const TESTIMONIALS = [
  {
    quote: "This is a really informative, useful app.",
    name: "Nicolas C.",
    meta: "Android beta tester · France",
    source: "Google Play",
  },
  {
    quote: "Very innovative and extremely addictive.",
    name: "Navjeet R.",
    meta: "Android beta tester · UAE",
    source: "Google Play",
  },
  {
    quote:
      "Fabulous app for someone like me, who adores trivia and acquiring knowledge from all kinds of superset topics.",
    name: "magicalsalad",
    meta: "Trivia addict · India",
    source: "App Store",
  },
  {
    quote:
      "The app is structured and informative. It’s easy to click on interesting topics and learn more. The UI is also fun and engaging!",
    name: "philsamar",
    meta: "Curious mind · United States",
    source: "App Store",
  },
  {
    quote: "IN LOVE WITH THIS APP. Absolutely in love.",
    name: "TheHalMan",
    meta: "Early iOS user · Canada",
    source: "App Store",
  },
  {
    quote:
      "Never seen an app like this before — it feels so creative and different.",
    name: "Julian",
    meta: "Early access user",
    source: "App Store",
  },
  {
    quote: "“BrainScrolling” is officially in my dictionary.",
    name: "Anshul",
    meta: "Early user · Daily scroller turned learner",
    source: "Word-of-mouth",
  },
];

function TestimonialsSection({ reduceMotion = false }: { reduceMotion?: boolean }) {
  return (
    <section
      id="reviews"
      className="relative mx-auto mt-6 max-w-6xl border-y border-zinc-900/80 bg-black px-4 py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.2),transparent_70%)] blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:url('/grain.png')] mix-blend-soft-light" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 inline-flex items-center justify-center rounded-full border border-amber-400/30 bg-black px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-amber-300">
          EARLY USER REVIEWS
        </p>
        <h2 className="text-3xl font-semibold text-amber-100 md:text-4xl">
          People are already{" "}
          <span className="text-amber-300">BrainScrolling</span>.
        </h2>
        <p className="mt-3 text-sm text-zinc-400 md:text-[15px]">
          No paywalls, no paid quotes. Just real words from the first wave of
          iOS and Android users.
        </p>
      </div>

      <div className="mt-14 space-y-14">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={t.name + idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: reduceMotion ? 0 : idx * 0.06,
            }}
            className="mx-auto max-w-4xl text-left sm:text-center"
          >
            <div className="mb-3 flex items-center justify-start gap-3 text-[11px] uppercase tracking-[0.22em] text-amber-300/80 sm:justify-center">
              <span className="text-[13px] text-amber-300">
                {"★★★★★".split("").join(" ")}
              </span>
              <span className="hidden h-px w-10 bg-amber-400/40 sm:inline" />
              <span className="px-2 text-[10px] text-amber-300/70">
                {t.source}
              </span>
            </div>

            <p className="text-xl leading-[1.7] text-amber-100 md:text-2xl">
              “{t.quote.replace(/(^“|”$)/g, "")}”
            </p>

            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/70 sm:text-[11px]">
              <span>{t.name}</span>
              {t.meta && (
                <>
                  <span className="mx-2 text-amber-500/50">•</span>
                  <span className="text-amber-200/70">{t.meta}</span>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/** =========================
 *  BRAIN+ SECTION
 *  ========================= */
function BrainPlusSection() {
  return (
    <motion.section
      id="brainplus"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto mt-20 max-w-5xl px-4"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(255,215,120,0.22),transparent_70%)] blur-[140px]" />
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-amber-400/25 bg-[radial-gradient(circle_at_top,rgba(15,15,15,1),rgba(0,0,0,1))] px-6 py-9 shadow-[0_40px_120px_rgba(0,0,0,0.6)] md:px-10 md:py-11">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-amber-200">
            BRAIN+ UPGRADE
          </div>
          <h2 className="text-2xl font-semibold text-amber-100 md:text-3xl">
            Start Free. Go deeper with Brain+.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-amber-100/80 md:text-[15px]">
            BrainScroller is great on the free tier. Brain+ takes it to a whole
            new level — deeper news, more categories, unlimited Ava, and a Brain
            Library that never runs out of space.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cx(
              "flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 text-sm text-zinc-200 shadow-[0_18px_40px_rgba(0,0,0,0.65)]"
            )}
          >
            <div>
              <h3 className="text-base font-semibold text-zinc-50">Free</h3>
              <ul className="mt-4 space-y-2 text-xs leading-6 text-zinc-300">
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-400" />
                  <span>
                    Daily News feed with concise, under-60-second briefings.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-400" />
                  <span>Access to a wide range of core library categories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-400" />
                  <span>
                    Chat with Ava in a limited number of conversations each
                    month.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-400" />
                  <span>Save up to 5 topics in your Brain Library.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-400" />
                  <span>
                    Supported by occasional, minimal ads to keep the free tier
                    sustainable.
                  </span>
                </li>
              </ul>
            </div>

            <a
              href={IOS_STORE}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-zinc-800 py-2.5 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 active:translate-y-[1px]"
            >
              Start Free
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
            className={cx(
              "flex flex-col justify-between rounded-2xl border border-amber-400/60 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.22),rgba(12,12,12,0.96))] px-6 py-6 text-sm text-amber-50 shadow-[0_22px_60px_rgba(250,204,21,0.35)]"
            )}
          >
            <div>
              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100">
                Most Popular
              </div>
              <h3 className="text-base font-semibold text-amber-50">
                Brain+ Premium
              </h3>
              <ul className="mt-4 space-y-2 text-xs leading-6 text-amber-50/90">
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-200" />
                  <span>
                    Brain+ News: a wider selection of sources and deeper,
                    curated coverage.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-200" />
                  <span>
                    Exclusive premium library categories with new ones added
                    regularly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-200" />
                  <span>
                    Unlimited Ava conversations when you want to go deep on any
                    topic.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-200" />
                  <span>
                    A dedicated Brain+ Library view with unlimited saves and
                    smarter organisation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[2px] h-4 w-4 text-amber-200" />
                  <span>Enjoy BrainScroller completely ad-free.</span>
                </li>
              </ul>
            </div>

            <a
              href={IOS_STORE}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-amber-400 py-2.5 text-xs font-semibold text-black hover:brightness-95 active:translate-y-[1px]"
            >
              Go Brain+
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/** =========================
 *  SMALL FAQ BOX
 *  ========================= */
function FaqBox({
  q,
  a,
  delay = 0,
}: {
  q: string;
  a: string;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className={cx(
        "group relative overflow-hidden rounded-2xl",
        "border border-zinc-800/70 bg-[rgba(10,10,10,0.85)] backdrop-blur-sm",
        "shadow-[0_0_28px_-12px_rgba(255,215,130,0.25)]"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <button
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "flex w-full items-center gap-3 px-5 py-4 text-left",
          "hover:bg-zinc-900/60 transition-colors"
        )}
        aria-expanded={open}
      >
        <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-md bg-zinc-800 ring-1 ring-zinc-700/60">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-amber-300"
            aria-hidden
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="flex-1 text-base font-semibold text-zinc-100">
          {q}
        </span>

        <svg
          viewBox="0 0 24 24"
          className={cx(
            "h-5 w-5 text-amber-300 transition-transform",
            open ? "rotate-180" : "rotate-0"
          )}
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 pt-0 text-sm leading-7 text-zinc-400">
          {a}
        </div>
      </motion.div>

      <div
        className={cx(
          "pointer-events-none absolute inset-x-0 bottom-0 h-16 translate-y-6 blur-2xl transition-opacity",
          open ? "opacity-60 bg-amber-400/20" : "opacity-0"
        )}
      />
    </motion.div>
  );
}

/** =========================
 *  PAGE
 *  ========================= */

export default function Page() {
  const brainRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const on = () => setSticky(window.scrollY > window.innerHeight * 0.4);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduceMotion(mq.matches || window.innerWidth < 768);
    };
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-zinc-950 to-black text-zinc-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
      />

      <header className="sticky top-0 z-30 border-b border-zinc-900/60 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <nav className="relative mx-auto flex max-w-6xl items-center justify-center px-4 py-3">
          <div className="flex flex-1 items-center gap-3">
            <Logo size={40} />
            <span className="hidden select-none text-sm font-semibold tracking-wider text-amber-300 sm:inline">
              BrainScroller
            </span>
          </div>

          <div className="hidden flex-1 items-center justify-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#solution" className="hover:text-zinc-100">
              How it works
            </a>
            <a href="#reviews" className="hover:text-zinc-100">
              Reviews
            </a>
            <a href="#brainplus" className="hover:text-zinc-100">
              Brain+
            </a>
            <a href="#faq" className="hover:text-zinc-100">
              FAQ
            </a>
          </div>

          <div className="flex flex-1 items-center justify-end">
            <a
              href="#get"
              className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm font-medium text-amber-300 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] hover:bg-amber-400/15 active:translate-y-[1px]"
            >
              Get the App
            </a>
          </div>
        </nav>
      </header>

      <section
        id="hero-wrap"
        aria-label="Hero"
        className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 md:pb-16 md:pt-16"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/25 blur-[120px]" />
          <div className="absolute inset-0 [background-image:radial-gradient(40%_60%_at_50%_40%,rgba(255,215,106,.18),transparent_65%)] opacity-70" />
          <div className="absolute inset-0 [background-image:url('/grain.png')] opacity-[0.08] mix-blend-soft-light" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-2 max-w-4xl text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-zinc-100 sm:text-4xl md:text-5xl"
          >
            The Cure to DoomScrolling.{" "}
            <span className={goldText}>
              <AnimatedWords text={"Start\u00A0BrainScrolling"} />
            </span>
            <Ellipsis className="text-amber-300" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base md:text-lg"
          >
            A beautiful, focused feed that turns doomscrolling into learning you
            keep — and keeps you current with what&apos;s actually happening in
            the world.
          </motion.p>

          <div ref={brainRef} className="relative mt-6 flex justify-center">
            <div
              aria-hidden
              className="absolute -inset-x-8 -top-6 bottom-0 mx-auto h-[260px] w-[260px] rounded-full bg-amber-400/20 blur-[90px] md:h-[360px] md:w-[360px]"
            />
            <div
              className="relative will-change-transform [perspective:1000px]"
              onMouseMove={(e) => {
                if (reduceMotion) return;
                const el = e.currentTarget as HTMLDivElement;
                const img = el.querySelector("img") as HTMLElement | null;
                if (!img) return;
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                img.style.transform = `rotateX(${(-y * 6).toFixed(
                  2
                )}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(0)`;
              }}
              onMouseLeave={(e) => {
                const img = (
                  e.currentTarget as HTMLDivElement
                ).querySelector("img") as HTMLElement | null;
                if (img)
                  img.style.transform =
                    "rotateX(0) rotateY(0) translateZ(0)";
              }}
            >
              <Image
                src="/brain.png"
                alt="BrainScroller neon brain"
                width={360}
                height={360}
                className="relative h-auto w-[220px] transition-transform duration-300 ease-out sm:w-[240px] md:w-[320px] xl:w-[360px]"
                priority
              />
            </div>
          </div>

          <div
            id="get"
            className="mt-6 flex flex-col items-center justify-center"
          >
            <a
              href={IOS_STORE}
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] active:translate-y-[1px] [animation:pulse_12s_ease-in-out_infinite]"
              aria-label="Get the App"
            >
              Get the App
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={IOS_STORE}
              aria-label="Download on the App Store"
              className="inline-flex h-12 items-center gap-3 rounded-[12px] border border-zinc-700/60 bg-[#0b0b0b] px-3.5 shadow-sm"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }}
            >
              <Image
                src="/badges/apple-gold.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                priority
              />
              <div className="leading-tight text-left">
                <div className="text-[10px] font-semibold tracking-wide text-zinc-400">
                  Download on the
                </div>
                <div className="text-[16px] font-bold text-amber-300">
                  App Store
                </div>
              </div>
            </a>
            <a
              href={ANDROID_STORE}
              aria-label="Get it on Google Play"
              className="inline-flex h-12 items-center gap-3 rounded-[12px] border border-zinc-700/60 bg-[#0b0b0b] px-3.5 shadow-sm"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }}
            >
              <Image
                src="/badges/android-gold.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <div className="leading-tight text-left">
                <div className="text-[10px] font-semibold tracking-wide text-zinc-400">
                  Get it on
                </div>
                <div className="text-[16px] font-bold text-amber-300">
                  Google Play
                </div>
              </div>
            </a>
          </div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-6 opacity-80 sm:gap-10">
            {["FAST", "FOCUSED", "BEAUTIFUL", "ADDICTIVELY SMART"].map(
              (t) => (
                <span
                  key={t}
                  className="text-[11px] tracking-[0.25em] text-zinc-500"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <DoomscrollMathSection reduceMotion={reduceMotion} />

      <ProblemStatementSection />

      <SolutionSection reduceMotion={reduceMotion} />

      {/* DEMO SCREENS */}
      <section id="demo" className="mx-auto -mt-4 max-w-6xl px-4">
        <h2 className="mb-2 text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
          Built like social media. Feels like an encyclopedia.
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {["feed-1.png", "feed-2.png", "feed-3.png", "feed-4.png"].map(
            (file, i) => (
              <motion.div
                key={file}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className={cx(
                  "overflow-hidden rounded-[24px] border bg-zinc-900/60 shadow-2xl",
                  "border-zinc-800",
                  "relative"
                )}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-zinc-700/40" />
                <Image
                  src={`/${file}`}
                  alt={`App screen ${i + 1}`}
                  width={280}
                  height={560}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* REVIEWS NOW DIRECTLY BEFORE BRAIN+ */}
      <TestimonialsSection reduceMotion={reduceMotion} />

      <BrainPlusSection />

      <motion.section
        id="faq"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto mt-24 max-w-5xl px-4"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,150,0.18),transparent_70%)] blur-[180px]" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-2 text-center text-3xl font-semibold text-amber-200 md:text-4xl"
        >
          Still Curious?
        </motion.h2>
        <p className="mb-8 text-center text-sm text-zinc-400">
          Tap to expand an answer.
        </p>

        <div className="grid grid-cols-1 gap-5">
          <FaqBox
            q="What platforms are supported?"
            a="iOS and Android — built with React Native + Expo so it feels fast and consistent on both."
            delay={0.0}
          />
          <FaqBox
            q="How does the Daily News refresh work?"
            a="Every 24 hours BrainScroller pulls in fresh stories from multiple sources, filters the noise, and turns them into verified under-60-second news briefs so you never feel lost in a conversation."
            delay={0.05}
          />
          <FaqBox
            q="Can I use it without an account?"
            a="Yes. Start instantly in guest mode; create an account anytime to sync saves and unlock Brain+."
            delay={0.1}
          />
          <FaqBox
            q="What does Brain+ add on top?"
            a="Brain+ unlocks premium daily news briefings, deeper library categories, unlimited Ava conversations, unlimited saves in your Brain Library, and early access to new experimental features."
            delay={0.15}
          />
        </div>
      </motion.section>

<footer className="mx-auto mt-24 max-w-6xl border-t border-zinc-900/70 px-4 py-10 text-sm text-zinc-500">
  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
    <div className="flex items-center gap-3">
      <Logo size={28} />
      <span className="text-zinc-400">
        © {new Date().getFullYear()} BrainScroller
      </span>
    </div>
    <div className="flex flex-wrap items-center gap-4 md:gap-6">
      <a
        href={IOS_STORE}
        className="rounded-lg border border-zinc-800 px-3 py-2 text-xs text-zinc-300 hover:border-zinc-700"
      >
        App Store
      </a>
      <a
        href={ANDROID_STORE}
        className="rounded-lg border border-zinc-800 px-3 py-2 text-xs text-zinc-300 hover:border-zinc-700"
      >
        Google Play
      </a>
      <a href="/contact" className="hover:text-zinc-300">
        Contact
      </a>
      <span className="hidden text-zinc-700 md:inline">·</span>
      <a href="/privacy" className="hover:text-zinc-300">
        Privacy
      </a>
      <span className="hidden text-zinc-700 md:inline">·</span>
      <a href="/terms" className="hover:text-zinc-300">
        Terms
      </a>
      <span className="hidden text-zinc-700 md:inline">·</span>
      <a href="/delete-account" className="hover:text-zinc-300">
        Delete account
      </a>
      <span className="hidden text-zinc-700 md:inline">·</span>
      <a href="/delete-data" className="hover:text-zinc-300">
        Delete data
      </a>
    </div>
  </div>
</footer>

      {sticky && (
        <div
          className="fixed inset-x-0 z-40 md:hidden"
          style={{
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          }}
        >
          <div className="mx-auto w-[94%] rounded-2xl border border-amber-400/25 bg-[rgba(0,0,0,0.86)] p-2 backdrop-blur-md">
            <a
              href={IOS_STORE}
              className="block w-full rounded-xl bg-amber-400 py-3 text-center text-sm font-semibold text-black"
            >
              Get the App
            </a>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%,
          92%,
          100% {
            transform: translateZ(0);
          }
          96% {
            transform: scale(1.015);
          }
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 0px rgba(255, 215, 0, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.9));
          }
        }

        h2:has(> .brain) {
          animation: glow 4s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (min-width: 768px) {
          #faq .group {
            animation: float 6s ease-in-out infinite;
          }
        }
      `}</style>
    </main>
  );
}

/** =========================
 *  MICROS (some unused but kept)
 *  ========================= */
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className={cx(darkGlass, "p-5 text-sm text-zinc-300")}>{children}</div>
);

const Feature = ({ title, desc }: { title: string; desc: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.5 }}
    className={cx(
      darkGlass,
      "group p-6 backdrop-blur-sm hover:border-amber-400/30 hover:shadow-[0_0_24px_-8px_rgba(251,191,36,0.25)]"
    )}
  >
    <div className="mb-2 flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/70 ring-1 ring-zinc-700/40">
        <Check className="text-amber-400" />
      </span>
      <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
    </div>
    <p className="text-sm leading-6 text-zinc-400">{desc}</p>
  </motion.div>
);

const Tier = ({
  title,
  bullets,
  cta,
  link,
  gold = false,
}: {
  title: string;
  bullets: string[];
  cta: string;
  link: string;
  gold?: boolean;
}) => (
  <div className={cx(gold ? goldGlass : darkGlass, "p-6")}>
    {gold && (
      <div className="mb-1 inline-flex items-center gap-2 rounded-md bg-amber-400/20 px-2 py-1 text-xs font-semibold text-amber-300">
        Most Popular
      </div>
    )}
    <h3
      className={cx(
        "text-lg font-semibold",
        gold ? "text-amber-200" : "text-zinc-100"
      )}
    >
      {title}
    </h3>
    <ul
      className={cx(
        "mt-4 space-y-2 text-sm",
        gold ? "text-amber-100/90" : "text-zinc-300"
      )}
    >
      {bullets.map((t) => (
        <li key={t} className="flex items-start gap-2">
          <Check className={gold ? "text-amber-300" : "text-amber-400"} /> {t}
        </li>
      ))}
    </ul>
    <a
      href={link}
      className={cx(
        "mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold",
        gold
          ? "bg-amber-400 text-black hover:brightness-95 active:translate-y-[1px]"
          : "border border-zinc-700 bg-zinc-800 text-zinc-100 hover:border-zinc-600 active:translate-y-[1px]"
      )}
    >
      {cta}
    </a>
  </div>
);

const FaqItem = ({ q, a }: { q: string; a: string }) => (
  <details className="group rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
    <summary className="cursor-pointer list-none text-zinc-200 marker:hidden">
      <span className="mr-2 inline-block rounded-md bg-zinc-800/60 px-2 py-0.5 text-xs text-zinc-400">
        FAQ
      </span>
      <span className="ml-2 font-medium">{q}</span>
    </summary>
    <div className="mt-3 text-sm leading-7 text-zinc-400">{a}</div>
  </details>
);
