// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "BrainScroller — Start BrainScrolling",
  description: "The Cure to DoomScrolling. Black & gold prestige landing.",
  // optional: iOS Smart App Banner (replace with your real app id)
  // other: { "apple-itunes-app": "app-id=XXXXXXXXX, app-argument=https://brainscroller.app" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
