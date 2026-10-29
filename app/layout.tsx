import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { IconSprite } from "@/components/Icon";
import { Providers } from "@/components/Providers";
import { detectOsScript } from "@/lib/detectOs";
import "./globals.css";

const onest = localFont({
  src: "./fonts/onest-latin.woff2",
  weight: "400 800",
  display: "swap",
  variable: "--font-onest",
});

const description =
  "A free, open-source photo and video gallery for Linux, Windows and macOS. The folders you choose, newest first and grouped by day, styled after Samsung One UI.";

export const metadata: Metadata = {
  title: "One Gallery: your phone's gallery, on your desktop",
  description,
  icons: { icon: { url: "/assets/icon.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F6F6" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// before the first paint (no flash): mark that scripts run, pick the install tab for this system,
// and set the theme
const themeScript = `document.documentElement.classList.add("js");
${detectOsScript}
try {
  var t = localStorage.getItem("og-theme");
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
} catch (e) {}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={onest.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* written by hand to keep the image path relative to wherever the site is hosted */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="One Gallery: your phone's gallery, on your desktop" />
        <meta property="og:description"
          content="A free, open-source photo and video gallery for Linux, Windows and macOS, styled after Samsung One UI." />
        <meta property="og:image" content="assets/social.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="One Gallery" />
        <meta name="twitter:description" content="Your phone's gallery, on your desktop. Free and open source." />
        <meta name="twitter:image" content="assets/social.jpg" />
      </head>
      <body>
        <IconSprite />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
