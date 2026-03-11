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
      {/* Compact nav */}
      <nav className="fixed top-0 w-full bg-white/5 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="group">
              <div className="font-serif text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Tommaso <span className="text-white/90">Rossino</span>
              </div>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-white/60 hover:text-blue-300 transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative pt-20 pb-0 px-0">
        <div className="w-full">
          <div className="text-center mb-4 px-4 pt-4">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1">
              Book a Meeting
            </h1>
            <p className="text-xs text-white/50">
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
            <p className="text-white/40 text-xs">
              Having trouble?{" "}
              <a
                href="mailto:tommaso.rossino@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition"
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
