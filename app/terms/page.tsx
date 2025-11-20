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

export default function TermsPage() {
  const markdown = `
# BrainScroller — Terms of Service
**Last updated:** October 1, 2025

Welcome to **BrainScroller**.  
By using our app, website, or services (the “Service”), you agree to these Terms.  
If you do not agree, please do not use the Service.

---

## 1. Eligibility
You must be at least 13 years old to use BrainScroller.

---

## 2. Accounts
You are responsible for your login credentials and any activity under your account.  
Do not share, sell, or impersonate others. We may suspend or terminate accounts that violate law or these Terms.

---

## 3. Intellectual Property
All content, design, and data belong to **BrainScroller** or its licensors.  
You may not copy, modify, or reverse-engineer any part without permission.

---

## 4. News Attribution & Fair Use
BrainScroller summarizes publicly available news from reputable publishers.  
Headlines / images remain property of their respective owners.  
Each card links to the original source. Publishers may request changes via **brainscroller@gmail.com**.

---

## 5. External Links
Third-party links are not controlled by BrainScroller.  
We are not responsible for their content or availability.

---

## 6. User Conduct
You agree **not to**:
- Upload or share illegal, harmful, or offensive content.  
- Hack, disrupt, or scrape the Service.  
- Circumvent paywalls or premium restrictions.

---

## 7. Subscriptions & Purchases
Some features (e.g. **Brain+**) require paid subscriptions.  
Prices / renewals / refunds follow App Store & Play Store policies.

---

## 8. Termination
We may suspend or remove access for policy violations or prolonged inactivity.  
You can delete your account anytime via **brainscroller@gmail.com**.

---

## 9. Disclaimer
The Service is provided **“as is” / “as available”** without warranty.  
Use is at your own risk.

---

## 10. Liability Limit
BrainScroller is not liable for indirect or consequential damages, including data or revenue loss.

---

## 11. Changes
We may update these Terms and will revise the “Last updated” date.  
Material updates will be communicated reasonably in-app.

---

## 12. Governing Law
These Terms are governed by the laws of the **United Arab Emirates**.

---

## 13. Contact
**Email:** brainscroller@gmail.com
`;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-zinc-950 to-black text-zinc-100">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,150,0.18),transparent_70%)] blur-[180px]" />
      </div>

      <BackBar title="Terms of Service" />

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
