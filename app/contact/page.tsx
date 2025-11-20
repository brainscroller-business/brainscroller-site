"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

function BackBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-900/60 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:border-zinc-700"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          Back
        </button>
        <div className="ml-1 text-sm text-zinc-500">/ {title}</div>
      </div>
    </header>
  );
}

export default function ContactPage() {
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  // Same permissive any-TLD pattern as server
  const EMAIL_REGEX = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
  const emailTouched = form.email.length > 0;
  const emailInvalid = emailTouched && !EMAIL_REGEX.test(form.email);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.message) {
      setError("Please fill in your name and message.");
      return;
    }
    if (emailInvalid) {
      setError("Please enter a valid email address, or leave it empty.");
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());
      setState("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setState("error");
      setError("Could not send your message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-zinc-950 to-black text-zinc-100">
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,150,0.18),transparent_70%)] blur-[180px]" />
      </div>

      <BackBar title="Contact" />

      <section className="mx-auto max-w-5xl px-6 py-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* LEFT COLUMN — FORM */}
        <div className="rounded-2xl border border-zinc-800/70 bg-[rgba(10,10,10,0.85)] p-6 shadow-[0_0_28px_-12px_rgba(255,215,130,0.25)]">
          <h1 className="text-3xl font-semibold text-amber-300 mb-2">Get in touch</h1>
          <p className="text-zinc-400 mb-6">
            Business email goes straight to our inbox. No mail app — sent securely from here.
          </p>

          <form onSubmit={onSubmit} className="grid gap-4" noValidate>
            {/* Name */}
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm text-zinc-300">Your name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-amber-400/60"
                placeholder="Ada Lovelace"
                required
              />
            </div>

            {/* Optional Email (validated if present) */}
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm text-zinc-300">
                Your email <span className="text-zinc-500">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={[
                  "rounded-xl border px-4 py-3 text-zinc-100 outline-none",
                  "bg-zinc-900 focus:border-amber-400/60",
                  emailInvalid ? "border-red-600 focus:border-red-500" : "border-zinc-800",
                ].join(" ")}
                placeholder="you@example.com"
                aria-invalid={emailInvalid || undefined}
                aria-describedby={emailInvalid ? "email-error" : undefined}
              />
              {emailInvalid && (
                <p id="email-error" className="text-xs text-red-400">
                  Please enter a valid email address, or leave this field empty.
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="grid gap-2">
              <label htmlFor="subject" className="text-sm text-zinc-300">Subject (optional)</label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-amber-400/60"
                placeholder="Partnership, press, feedback…"
              />
            </div>

            {/* Message */}
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm text-zinc-300">Message</label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="min-h-[140px] rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-amber-400/60"
                placeholder="Tell us a bit more…"
                required
              />
            </div>

            {/* Errors or Success */}
            {error && <p className="text-sm text-red-400">{error}</p>}
            {state === "sent" && (
              <p className="text-sm text-green-400">✅ Message sent successfully! We'll get back to you soon.</p>
            )}

            {/* Submit */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={state === "loading" || state === "sent"}
                className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] disabled:opacity-60"
              >
                {state === "loading" ? "Sending..." : state === "sent" ? "Sent ✓" : "Send message"}
              </button>
              <span className="text-xs text-zinc-500">
                We’ll reply from <span className="text-amber-300">support@brainscroller.com</span>.
              </span>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN — INFO CARDS */}
        <aside className="grid gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold text-amber-200 mb-2">Business</h2>
            <div className="text-zinc-300">support@brainscroller.com</div>
            <p className="mt-2 text-sm text-zinc-500">Primary inbox for partnerships, press, and support.</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold text-amber-200 mb-2">Personal</h2>
            <div className="text-zinc-300">hamadalmheiribusiness29@gmail.com</div>
            <p className="mt-2 text-sm text-zinc-500">Personal contact for direct outreach.</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold text-amber-200 mb-3">Social</h2>
            <ul className="grid gap-2 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/in/hamad-almheiri-3870a5289/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-300 hover:underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/brainscroller"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-300 hover:underline"
                >
                  Instagram (@brainscroller)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@BrainScroller/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-300 hover:underline"
                >
                  YouTube (@BrainScroller)
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
