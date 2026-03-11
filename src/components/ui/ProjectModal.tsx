"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";
import { useScrollLock } from "@/lib/hooks/useScrollLock";

const accentText: Record<string, string> = {
  blue: "text-blue-400",
  slate: "text-slate-300",
  amber: "text-amber-400",
  emerald: "text-emerald-400",
};

const accentDot: Record<string, string> = {
  blue: "bg-blue-400",
  slate: "bg-slate-300",
  amber: "bg-amber-400",
  emerald: "bg-emerald-400",
};

function ScreenshotCarousel({
  screenshots,
  title,
  accentColor,
  layout = "phone",
}: {
  screenshots: string[];
  title: string;
  accentColor: string;
  layout?: "phone" | "landscape";
}) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1)),
    [screenshots.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1)),
    [screenshots.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  return (
    <div className="relative w-full h-72 md:h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-2xl overflow-hidden">
      {/* Screenshots */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className={
            layout === "landscape"
              ? "absolute inset-0"
              : "absolute inset-0 flex items-center justify-center py-6"
          }
        >
          {layout === "landscape" ? (
            <Image
              src={screenshots[current]}
              alt={`${title} screenshot ${current + 1}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          ) : (
            <div className="relative h-full w-48 md:w-56">
              <Image
                src={screenshots[current]}
                alt={`${title} screenshot ${current + 1}`}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="224px"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white/60 hover:text-white transition cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white/60 hover:text-white transition cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {screenshots.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              idx === current
                ? `${accentDot[accentColor] || accentDot.blue} scale-125`
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}

export function ProjectModal() {
  const { activeProject, closeModal } = useModal();
  useScrollLock(!!activeProject);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/60 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image header */}
            {activeProject.appScreenshots ? (
              <ScreenshotCarousel
                screenshots={activeProject.appScreenshots}
                title={activeProject.title}
                accentColor={activeProject.accentColor}
                layout={activeProject.screenshotLayout || "phone"}
              />
            ) : (
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  fill
                  className="object-cover rounded-t-2xl"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12 -mt-8 relative">
              <p className="text-white/40 text-sm mb-1">
                {activeProject.company}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                {activeProject.title}
              </h2>

              <div className="space-y-8">
                {(
                  [
                    {
                      label: "Challenge",
                      content: activeProject.caseStudy.challenge,
                    },
                    {
                      label: "Solution",
                      content: activeProject.caseStudy.solution,
                    },
                    {
                      label: "Impact",
                      content: activeProject.caseStudy.impact,
                    },
                  ] as const
                ).map((section) => (
                  <div key={section.label}>
                    <h3
                      className={`text-lg font-semibold mb-3 ${accentText[activeProject.accentColor] || accentText.blue}`}
                    >
                      {section.label}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-sm mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/5 text-white/70 rounded-lg text-sm border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
