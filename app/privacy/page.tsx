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
**Last updated:** February 17, 2026

Welcome to **BrainScroller** ("we", "our", "us"). We care about your privacy. This policy explains what we collect, how we use it, and your choices.  
Questions? **support@brainscroller.com**

---

## What we collect

### Information you provide
- Account details (e.g., email) when you sign in or contact support.
- In-app preferences (e.g., settings, completed items).

### Information collected automatically
- **Usage data**: screens, taps, session length, crash logs.
- **Device data**: model, OS, language, country/region, time zone, IP-derived region.
- **Advertising identifiers** (e.g., Google Advertising ID) for ads and measurement.
- **Push tokens** to deliver notifications to your device.

### AI assistant (optional)
When you use the **Ava AI assistant** (chat and voice features), we send your messages and voice recordings to a third-party AI service so we can provide responses.

**What we send**
- **Chat messages**: The text you type and your conversation history are sent to generate replies.
- **Voice recordings**: If you use the voice feature, your spoken audio is sent to convert speech to text.
- **Documents** (optional): If you ask to summarize a document, the file content is sent for processing.

**Who receives this data**
We use **OpenAI** (https://openai.com) to power the AI assistant. OpenAI processes your messages and voice on our behalf to generate responses. OpenAI provides data protection safeguards that meet or exceed industry standards and is contractually required to protect your data; their privacy policy applies: https://openai.com/policies/privacy-policy.

We do **not** use your AI conversations for training OpenAI's models (per our agreement with OpenAI). Data is processed to fulfill your request and is retained according to our retention policies below.

**Your permission**
We ask your permission before sending any data to the AI service. You can choose not to use the AI features; the rest of the app works without them.

### Microphone (optional)
If you enable the **voice feature**, the app accesses the microphone while you use that feature. We do **not** record or listen in the background. Audio is sent to OpenAI for transcription and is used only to fulfill your request; it is not collected or stored separately.

### Purchases (optional)
If you buy subscriptions or features, we receive non-sensitive purchase metadata (product ID, status, timestamps). We do **not** receive full payment details.

---

## How we use information
- Provide, maintain, and improve app features and performance.
- Personalize content and measure feature effectiveness.
- Show ads and limit ad frequency.
- Send push notifications you opt into (reminders, new content).
- Prevent fraud, secure our services, and comply with law.
- Provide support and respond to requests.

---

## Third-party services (processors)
We use trusted vendors to operate the app; they process data on our behalf under contract:

- **Supabase** — authentication, database, storage, sessions.
- **OpenAI** — AI assistant (chat replies, voice transcription, document summarization). Receives your messages, voice recordings, and optional document content when you use the Ava AI feature. See "AI assistant" above for details.
- **Amplitude** — product analytics.
- **Google AdMob** — ads, measurement, fraud prevention (may receive device/ad IDs and coarse location signals).
- **Expo Notifications** — delivery of push notifications.
- **RevenueCat** *(if enabled)* — subscription & purchase management.

These providers may process data on servers in various countries consistent with their own privacy commitments.

---

## News & External Sources
BrainScroller displays short summaries and images from publicly available news feeds and sources.  
We do **not** collect or transmit any additional data from those publishers beyond the same publicly provided RSS or metadata that any web browser or news reader would request.  
All linked articles open on their original publisher websites, which have their own privacy policies.  
Images and headlines are cached or proxied only for performance and do **not** constitute ownership or tracking by BrainScroller.

---

## Ads & tracking choices
- **Personalized ads**: opt out in device settings (Google settings → Ads).
- **Analytics**: we use aggregated analytics to improve the product.
- **Do Not Sell**: we **do not sell** personal information.

---

## Push notifications
We send notifications only if you allow them. Turn them off anytime in system settings or in-app (if available).

---

## Data retention
- Account/usage data: kept while your account is active and for a reasonable period thereafter for backups, security, and legal requirements.
- Crash/diagnostic data: retained for operational periods, then aggregated or deleted.
- Purchase records: retained as required for accounting and anti-fraud.
- Notification tokens: deleted on logout, disablement, or after reasonable inactivity.

---

## Security
We use safeguards including encryption in transit (HTTPS), access controls, and least-privilege practices. No method is 100% secure, but we work to protect your data.

---

## Your rights & choices
Depending on your region, you may have rights to access, correct, delete, object/restrict, or port data.  
Requests: **support@brainscroller.com** (we may need to verify your identity).

**Control permissions**
- **Microphone**: System Settings → Apps → BrainScroller → Permissions.
- **Notifications**: System Settings → Notifications → BrainScroller.
- **Ads personalization**: System Google settings → Ads → Opt out.
- **Sign-out/Delete**: use in-app options (if available) or email support.

---

## Children
BrainScroller is **not directed to children under 13**. If we learn we collected personal info from a child under 13, we'll delete it.

---

## International use
We may process data on servers outside your country with appropriate protections consistent with applicable law.

---

## Changes
We may update this policy. We'll change the "Last updated" date and, if changes are material, notify you in-app or by other reasonable means.

---

## Contact
**BrainScroller**  
**Email:** support@brainscroller.com
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
