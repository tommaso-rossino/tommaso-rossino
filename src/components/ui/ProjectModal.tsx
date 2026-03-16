"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";
import { useScrollLock } from "@/lib/hooks/useScrollLock";

function ScreenshotCarousel({
  screenshots,
  title,
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
    <div className="relative w-full h-72 md:h-96 bg-gradient-to-br from-[#141414] to-[#1a1a1a] rounded-t-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {layout === "landscape" ? (
            <div className="relative w-full h-full">
              <Image
                src={screenshots[current]}
                alt={`${title} screenshot ${current + 1}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
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

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#0c0c0c]/60 rounded text-[#8a8580] hover:text-[#e5e0db] transition cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#0c0c0c]/60 rounded text-[#8a8580] hover:text-[#e5e0db] transition cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {screenshots.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
              idx === current ? "bg-[#c8553d] scale-125" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0c0c0c] border border-white/[0.08] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-[#0c0c0c]/80 rounded text-[#8a8580] hover:text-[#e5e0db] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

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
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
              </div>
            )}

            <div className="p-8 md:p-12 -mt-8 relative">
              <p className="text-[#5a5550] text-xs tracking-wide uppercase mb-1">
                {activeProject.company}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#e5e0db] mb-8 tracking-tight">
                {activeProject.title}
              </h2>

              <div className="space-y-8">
                {(
                  [
                    { label: "Challenge", content: activeProject.caseStudy.challenge },
                    { label: "Solution", content: activeProject.caseStudy.solution },
                    { label: "Impact", content: activeProject.caseStudy.impact },
                  ] as const
                ).map((section) => (
                  <div key={section.label}>
                    <h3 className="text-[#c8553d] text-xs tracking-widest uppercase font-medium mb-3">
                      {section.label}
                    </h3>
                    <p className="text-[#8a8580] leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/[0.06]">
                <p className="text-[#5a5550] text-xs tracking-wide uppercase mb-3">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white/[0.04] text-[#8a8580] rounded text-xs border border-white/[0.06]"
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
