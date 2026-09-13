import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import { withBasePath } from "@/lib/basePath";
import { Dock } from "@/components/nav/Dock";
import { SwRegister } from "@/components/SwRegister";
import { AudioPrimer } from "@/components/audio/AudioPrimer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "OpeningLab", template: "%s · OpeningLab" },
  applicationName: "OpeningLab",
  description: "Spar your opening against a bot that plays like your real opponents, with a coach at your side.",
  manifest: withBasePath("/manifest.webmanifest"),
  icons: { icon: withBasePath("/icon.svg"), apple: withBasePath("/icon.svg") },
  appleWebApp: { capable: true, title: "OpeningLab", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1424" },
    { media: "(prefers-color-scheme: light)", color: "#e9eef6" },
  ],
};

// Applied before paint so there's no flash of the wrong theme (dark is default).
const NO_FLASH = `try{if(localStorage.getItem('openinglab:theme')==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${bricolage.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-ink">
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <SwRegister />
        <AudioPrimer />
        <div className="flex min-h-dvh flex-col">
          <main className="relative min-w-0 flex-1 overflow-x-hidden pt-[env(safe-area-inset-top)] pb-[calc(env(safe-area-inset-bottom)+4.5rem)]">
            {children}
          </main>
          <Dock />
        </div>
      </body>
    </html>
  );
}
