import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Tommaso Rossino - Staff Software Engineer",
  description:
    "Staff Software Engineer & Technical Lead. 15+ years of experience architecting and developing complex web applications.",
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="font-sans bg-[#050505] text-white">
        <ModalProvider>
          <AnimatedBackground />
          {children}
        </ModalProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
