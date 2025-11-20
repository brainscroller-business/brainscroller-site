// app/components/Badges.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";

/**
 * Shared shell so both badges have identical footprint and style.
 * Size matches common store badges (180x60).
 */
function BadgeShell({
  href = "#",
  ariaLabel,
  children,
  className = "",
}: {
  href?: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={[
        "inline-flex h-[60px] w-[180px] items-center justify-center",
        "rounded-[12px] border border-[rgba(255,215,106,0.45)] bg-black/90",
        "shadow-[0_0_0_1px_rgba(0,0,0,.5)_inset] transition-transform duration-150",
        "hover:scale-[1.01] active:scale-[0.99]",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

/**
 * Text-only placeholder badges (no logos).
 * You can drop images later without changing layout.
 */
export function AppStoreBadgeText({ href = "#" }: { href?: string }) {
  return (
    <BadgeShell href={href} ariaLabel="Download on the App Store">
      <div className="px-4 leading-tight text-left">
        <div className="text-[11px] font-semibold tracking-[0.08em] text-[rgba(255,215,106,0.9)]">
          Download on the
        </div>
        <div className="text-[20px] font-extrabold text-[#FFD76A]">
          App Store
        </div>
      </div>
    </BadgeShell>
  );
}

export function GooglePlayBadgeText({ href = "#" }: { href?: string }) {
  return (
    <BadgeShell href={href} ariaLabel="Get it on Google Play">
      <div className="px-4 leading-tight text-left">
        <div className="text-[11px] font-semibold tracking-[0.08em] text-[rgba(255,215,106,0.9)]">
          Get it on
        </div>
        <div className="text-[20px] font-extrabold text-[#FFD76A]">
          Google Play
        </div>
      </div>
    </BadgeShell>
  );
}

/**
 * Optional: image versions (keep for later).
 * Put your assets in /public/badges/app-store.svg and /public/badges/google-play.png
 * Then switch to these components.
 */
export function AppStoreBadgeImage({
  href = "#",
  src = "/badges/app-store.svg",
  alt = "Download on the App Store",
}: {
  href?: string;
  src?: string;
  alt?: string;
}) {
  return (
    <BadgeShell href={href} ariaLabel={alt}>
      <Image
        src={src}
        alt={alt}
        width={180}
        height={60}
        className="rounded-[10px]"
        priority
      />
    </BadgeShell>
  );
}

export function GooglePlayBadgeImage({
  href = "#",
  src = "/badges/google-play.png",
  alt = "Get it on Google Play",
}: {
  href?: string;
  src?: string;
  alt?: string;
}) {
  return (
    <BadgeShell href={href} ariaLabel={alt}>
      <Image
        src={src}
        alt={alt}
        width={180}
        height={60}
        className="rounded-[10px]"
        priority
      />
    </BadgeShell>
  );
}
