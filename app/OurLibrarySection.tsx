"use client";

// =======================
// 📚 OUR LIBRARY SECTION
// =======================

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const DOT_PATTERN = [
  "....1111....",
  "...111111...",
  "...111111...",
  "...111111...",
  "...111111...",
  "..11111111..",
  "..11111111..",
  "..11111111..",
  "..11111111..",
  "...111111...",
  "...111111...",
  "...111111...",
  "..11111111..",
  "..11111111..",
  ".1111111111.",
  ".1111111111.",
  "..11111111..",
  "..11111111..",
  "...111111...",
  "...111111...",
  "...111111...",
  "...111111...",
  "...111111...",
  "..11111111..",
  ".1111111111.",
  ".1111111111.",
  "..11111111..",
  "...111111...",
  "...111111...",
  "...111111...",
  "..11111111..",
  "..11111111..",
  "..11111111..",
  "...111111...",
  "...111111...",
  "...111111...",
  "..11111111..",
  "..11111111..",
  ".1111111111.",
  ".1111111111.",
  "..11111111..",
  "..11111111..",
  "...111111...",
  "...111111...",
  "...111111...",
  "..11111111..",
  "..11111111..",
  "...111111...",
  "...111111...",
  "...111111...",
  "...111111...",
  "...111111...",
];

const DOT_SIZE = 8;
const DOT_GAP = 4;

const dotCells = DOT_PATTERN.flatMap((row, r) =>
  row.split("").map((cell, c) =>
    cell === "1"
      ? {
          key: `${r}-${c}`,
          top: r * (DOT_SIZE + DOT_GAP),
          left: c * (DOT_SIZE + DOT_GAP),
        }
      : null
  )
).filter(Boolean) as Array<{ key: string; top: number; left: number }>;

const figureWidth = Math.max(...dotCells.map((d) => d.left)) + DOT_SIZE;
const figureHeight = Math.max(...dotCells.map((d) => d.top)) + DOT_SIZE;
const dotShadow = dotCells
  .map(
    (dot) =>
      `${dot.left}px ${dot.top}px 6px rgba(251,191,36,0.9)`
  )
  .join(", ");

type Thinker = {
  name: string;
  style: CSSProperties;
};

const thinkers: Thinker[] = [
  { name: "Albert Einstein", style: { top: "6%", left: "6%" } },
  { name: "Marie Curie", style: { top: "3%", right: "8%" } },
  { name: "Isaac Newton", style: { left: "0%", bottom: "34%" } },
  { name: "Niccolò Machiavelli", style: { right: "0%", bottom: "36%" } },
  { name: "Leonardo da Vinci", style: { bottom: "0%", left: "18%" } },
  { name: "Cleopatra VII", style: { bottom: "4%", right: "16%" } },
];

function FigureOrb({ thinker }: { thinker: Thinker }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="absolute"
      style={thinker.style}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex min-w-[140px] items-center justify-center rounded-full border border-amber-300/40 bg-black/80 px-4 py-2 text-center shadow-[0_0_25px_rgba(250,204,21,0.35)] backdrop-blur"
      >
        <span className="text-xs font-semibold tracking-[0.18em] text-amber-50">
          {thinker.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function OurLibrarySection() {
  return (
    <motion.section
      id="library"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto mt-16 max-w-6xl px-4 pb-20 pt-12 text-center"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.25),transparent_70%)] blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.1] [background-image:url('/grain.png')] mix-blend-soft-light" />
      </div>

      <p className="inline-flex items-center justify-center rounded-full border border-amber-400/30 bg-black/60 px-4 py-1 text-[11px] font-semibold tracking-[0.3em] text-amber-300">
        OUR EXCLUSIVE LIBRARY
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-amber-50 md:text-4xl">
        1,800+ curated mind summaries at your fingertips.
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-amber-50/70 md:text-base">
        From Socrates to space-age visionaries, BrainScroller keeps every idea in a
        golden orbit — swipe, save, and keep learning.
      </p>

      <div className="relative mx-auto mt-12 w-full max-w-4xl">
        <div className="absolute left-1/2 top-1/2 h-[64%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-[40%] border border-amber-200/20 bg-gradient-to-b from-amber-200/10 to-transparent blur-[60px]" />

        <div
          className="relative mx-auto h-[320px] w-[260px] sm:h-[360px] sm:w-[300px]"
        >
          <span
            className="dot-figure absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: figureWidth,
              height: figureHeight,
              boxShadow: dotShadow,
            }}
          />
        </div>

        {thinkers.map((thinker) => (
          <FigureOrb thinker={thinker} key={thinker.name} />
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-sm text-amber-100/80">
        Save a card, and it stays in your Brain Library forever — revisit any concept,
        compare minds, and keep building your private atlas of wisdom.
      </p>

      <style jsx>{`
        .dot-figure {
          width: ${DOT_SIZE}px;
          height: ${DOT_SIZE}px;
          border-radius: 999px;
          background: rgba(255, 215, 130, 0.95);
          box-shadow: ${dotShadow};
          filter: drop-shadow(0 0 12px rgba(255, 215, 130, 0.4));
          opacity: 0.75;
        }
        @media (max-width: 640px) {
          .dot-figure {
            transform: translate(-50%, -50%) scale(0.75);
          }
        }
      `}</style>
    </motion.section>
  );
}
