"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BookPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    const centerLoader = () => {
      const checkLoader = setInterval(() => {
        const spinner = document.querySelector(
          ".calendly-inline-widget .calendly-spinner"
        );
        if (spinner) {
          const el = spinner as HTMLElement;
          el.style.position = "absolute";
          el.style.top = "50%";
          el.style.left = "50%";
          el.style.transform = "translate(-50%, -50%)";
          el.style.zIndex = "1000";
        }

        const iframe = document.querySelector(
          ".calendly-inline-widget iframe"
        );
        if (iframe) clearInterval(checkLoader);
      }, 200);

      setTimeout(() => clearInterval(checkLoader), 10000);
    };

    setTimeout(centerLoader, 500);

    return () => {
      const existingScript = document.querySelector(
        'script[src*="calendly.com"]'
      );
      if (existingScript?.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <nav className="fixed top-0 w-full bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/[0.06] z-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="group">
              <span className="font-serif text-xl italic text-[#e5e0db] tracking-tight">
                Tommaso Rossino
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-[#8a8580] hover:text-[#c8553d] transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative pt-20 pb-0 px-0">
        <div className="w-full">
          <div className="text-center mb-4 px-4 pt-4">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#e5e0db] mb-1 tracking-tight">
              Book a Meeting
            </h1>
            <p className="text-xs text-[#5a5550]">
              Choose a time that works best for you
            </p>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{ height: "calc(100vh - 120px)" }}
          >
            <div
              className="calendly-inline-widget w-full h-full"
              data-url="https://calendly.com/tommaso-rossino"
              style={{
                minWidth: "100%",
                height: "100%",
                width: "100%",
                margin: 0,
                padding: 0,
              }}
            />
          </div>

          <div className="text-center py-2 px-4">
            <p className="text-[#5a5550] text-xs">
              Having trouble?{" "}
              <a
                href="mailto:tommaso.rossino@gmail.com"
                className="text-[#c8553d] hover:text-[#d4724e] transition"
              >
                Send me an email
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
