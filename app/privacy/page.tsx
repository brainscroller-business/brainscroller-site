"use client";

import React from "react";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/navigation";

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
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          Back
        </button>
        <div className="ml-1 text-sm text-zinc-500">/ {title}</div>
      </div>
    </header>
  );
}

export default function PrivacyPage() {
  const markdown = `
# BrainScroller — Privacy Policy
**Last updated:** October 1, 2025

Welcome to **BrainScroller** (“we”, “our”, “us”). We care about your privacy. This policy explains what we collect, how we use it, and your choices.  
Questions? **brainscroller@gmail.com**

---

## What we collect

### Information you provide
- Account details (e.g., email) when you sign in or contact support.
- In-app preferences (e.g., settings, completed items).

### Information collected automatically
- **Usage data**: screens, taps, session length, crash logs.
- **Device data**: model, OS, language, region, IP-derived location.
- **Advertising identifiers** for ads and measurement.
- **Push tokens** to deliver notifications to your device.

### Microphone (optional)
If you enable **voice features**, audio is used only to fulfill your request and is not recorded or stored.

### Purchases (optional)
We receive non-sensitive purchase metadata (product ID, status, timestamps).  
Payment details stay with the App Store / Play Store provider.

---

## How we use information
- Provide and improve app features and performance.  
- Personalize content and measure effectiveness.  
- Show ads and limit frequency.  
- Send notifications (only with permission).  
- Prevent fraud, secure services, and comply with law.  
- Offer support and respond to requests.

---

## Third-party processors
- **Supabase** — authentication, database, storage.  
- **Amplitude** — analytics.  
- **Google AdMob** — ads, measurement, fraud prevention.  
- **Expo Notifications** — push delivery.  
- **RevenueCat** *(if enabled)* — subscription management.

These providers process data under their own privacy commitments and may operate globally.

---

## News & External Sources
BrainScroller displays short summaries and images from public RSS/news feeds.  
We do **not** collect extra data from publishers or track users on those sites.  
Linked articles open on their original publisher websites.

---

## Ads & Tracking Choices
- Turn off personalized ads in device settings.  
- Analytics data are aggregated only.  
- We **do not sell** personal information.

---

## Push Notifications
Sent only if you allow them. You can disable them anytime.

---

## Data Retention
- Account / usage data: retained while active.  
- Crash logs: deleted after aggregation.  
- Purchases: kept as required by law.  
- Notification tokens: removed when disabled or inactive.

---

## Security
We use encryption, access control, and least-privilege practices.  
No method is 100% secure, but we continually improve safeguards.

---

## Your Rights & Choices
Depending on your region, you may request access, correction, or deletion.  
Contact **brainscroller@gmail.com** for verified requests.

Control permissions directly in system settings (Microphone, Notifications, Ads Personalization, etc).

---

## Children
Not directed to users under 13. Data from minors is deleted upon discovery.

---

## International Use
Data may be processed on servers outside your country with adequate protections.

---

## Updates
We may revise this policy and update the “Last updated” date.  
Material changes will be notified in-app.

---

## Contact
**BrainScroller**  
**Email:** brainscroller@gmail.com
`;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-zinc-950 to-black text-zinc-100">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,150,0.18),transparent_70%)] blur-[180px]" />
      </div>

      <BackBar title="Privacy Policy" />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <Markdown
          options={{
            overrides: {
              h1: { props: { className: "text-3xl font-semibold text-amber-300 mb-6" } },
              h2: { props: { className: "text-2xl font-semibold text-amber-200 mt-8 mb-3" } },
              h3: { props: { className: "text-xl font-medium text-amber-100 mt-6 mb-2" } },
              p: { props: { className: "text-zinc-400 leading-relaxed mb-3" } },
              li: { props: { className: "text-zinc-400 leading-snug mb-1 ml-4 list-disc" } },
            },
          }}
        >
          {markdown}
        </Markdown>
      </section>
    </main>
  );
}
