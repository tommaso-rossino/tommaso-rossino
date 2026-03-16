"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types";
import { useModal } from "@/components/providers/ModalProvider";

const accentColors: Record<string, string> = {
  blue: "hover:border-[#c8553d]/40",
  slate: "hover:border-[#c8553d]/40",
  amber: "hover:border-[#c8553d]/40",
  emerald: "hover:border-[#c8553d]/40",
};

function HighlightBadge({ highlight }: { highlight: string }) {
  return (
    <div className="absolute bottom-3 left-4 z-10">
      <span className="inline-block px-3 py-1 bg-[#0c0c0c]/80 backdrop-blur-sm text-[#c8553d] rounded text-xs font-medium border border-white/[0.08]">
        {highlight}
      </span>
    </div>
  );
}

function LandscapeCarousel({
  screenshots,
  title,
}: {
  screenshots: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={screenshots[current]}
              alt={`${title} ${current + 1}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1));
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#0c0c0c]/60 rounded text-[#8a8580] hover:text-[#e5e0db] transition cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1));
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#0c0c0c]/60 rounded text-[#8a8580] hover:text-[#e5e0db] transition cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex gap-1.5">
        {screenshots.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
              idx === current ? "bg-[#c8553d] scale-125" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { openModal } = useModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3 }}
      className={`group bg-white/[0.02] rounded-lg overflow-hidden border border-white/[0.06] transition-colors h-full flex flex-col ${accentColors[project.accentColor] || accentColors.blue}`}
    >
      {project.screenshotLayout === "phone" && project.appScreenshots ? (
        <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-[#141414] to-[#1a1a1a]">
          <div className="absolute inset-0 flex items-end justify-center gap-3 px-6 pt-6">
            {project.appScreenshots.map((src, idx) => (
              <div
                key={idx}
                className="relative w-1/3 h-full group-hover:translate-y-[-4px] transition-transform duration-500"
                style={{ transitionDelay: `${idx * 75}ms` }}
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
          <HighlightBadge highlight={project.highlight} />
        </div>
      ) : project.screenshotLayout === "landscape" && project.appScreenshots ? (
        <div className="relative">
          <LandscapeCarousel
            screenshots={project.appScreenshots}
            title={project.title}
          />
          <HighlightBadge highlight={project.highlight} />
        </div>
      ) : (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/30 to-transparent" />
          <HighlightBadge highlight={project.highlight} />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-medium text-[#e5e0db] mb-1 group-hover:text-[#c8553d] transition-colors">
          {project.title}
        </h3>
        <p className="text-[#5a5550] text-xs mb-3 tracking-wide uppercase">
          {project.company}
        </p>
        <p className="text-[#8a8580] text-sm mb-5 flex-grow leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-white/[0.04] text-[#8a8580] rounded text-[11px] border border-white/[0.06]"
            >
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={() => openModal(project)}
          className="mt-auto w-full py-2.5 text-sm text-[#8a8580] border border-white/[0.08] rounded-md hover:border-[#c8553d]/40 hover:text-[#c8553d] transition-all cursor-pointer"
        >
          View Case Study
        </button>
      </div>
    </motion.div>
  );
}
