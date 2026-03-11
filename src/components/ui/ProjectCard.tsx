"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types";
import { useModal } from "@/components/providers/ModalProvider";

const accentColors: Record<string, string> = {
  blue: "hover:border-blue-500/50",
  slate: "hover:border-slate-400/50",
  amber: "hover:border-amber-500/50",
  emerald: "hover:border-emerald-500/50",
};

const accentBg: Record<string, string> = {
  blue: "from-blue-500/20 to-blue-600/20 text-blue-200 border-blue-400/20",
  slate:
    "from-slate-400/20 to-slate-500/20 text-slate-200 border-slate-400/20",
  amber:
    "from-amber-500/20 to-amber-600/20 text-amber-200 border-amber-400/20",
  emerald:
    "from-emerald-500/20 to-emerald-600/20 text-emerald-200 border-emerald-400/20",
};

const accentDot: Record<string, string> = {
  blue: "bg-blue-400",
  slate: "bg-slate-300",
  amber: "bg-amber-400",
  emerald: "bg-emerald-400",
};

function HighlightBadge({
  highlight,
  accentColor,
}: {
  highlight: string;
  accentColor: string;
}) {
  return (
    <div className="absolute bottom-3 left-4 z-10">
      <span
        className={`inline-block px-3 py-1 bg-gradient-to-r ${accentBg[accentColor] || accentBg.blue} rounded-full text-xs font-semibold border backdrop-blur-sm`}
      >
        {highlight}
      </span>
    </div>
  );
}

function LandscapeCarousel({
  screenshots,
  title,
  accentColor,
}: {
  screenshots: string[];
  title: string;
  accentColor: string;
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
          <Image
            src={screenshots[current]}
            alt={`${title} ${current + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

      {/* Nav arrows - show on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1));
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1));
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex gap-1.5">
        {screenshots.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
              idx === current
                ? `${accentDot[accentColor] || accentDot.blue} scale-125`
                : "bg-white/40"
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-colors h-full flex flex-col ${accentColors[project.accentColor] || accentColors.blue}`}
    >
      {/* Project image area */}
      {project.screenshotLayout === "phone" && project.appScreenshots ? (
        // Phone mockups side by side (Tricon-style)
        <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
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
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050505] to-transparent" />
          <HighlightBadge
            highlight={project.highlight}
            accentColor={project.accentColor}
          />
        </div>
      ) : project.screenshotLayout === "landscape" &&
        project.appScreenshots ? (
        // Landscape carousel (FCA-style) - full bleed images
        <div className="relative">
          <LandscapeCarousel
            screenshots={project.appScreenshots}
            title={project.title}
            accentColor={project.accentColor}
          />
          <HighlightBadge
            highlight={project.highlight}
            accentColor={project.accentColor}
          />
        </div>
      ) : (
        // Default single image (Unsplash)
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <HighlightBadge
            highlight={project.highlight}
            accentColor={project.accentColor}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/40 text-sm mb-3">{project.company}</p>
        <p className="text-white/60 text-sm mb-4 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-white/5 text-white/60 rounded-lg text-xs border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={() => openModal(project)}
          className="mt-auto w-full py-2.5 text-sm font-medium text-white/70 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-pointer"
        >
          View Case Study
        </button>
      </div>
    </motion.div>
  );
}
