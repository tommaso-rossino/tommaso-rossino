import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ModalProvider } from "@/components/providers/ModalProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
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
  themeColor: "#0c0c0c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} antialiased`}
    >
      <body className="font-sans bg-[#0c0c0c] text-[#e5e0db]">
        <ModalProvider>
          <div className="noise-overlay">
            {children}
          </div>
        </ModalProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
