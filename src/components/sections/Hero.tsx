"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, Calendar } from "lucide-react";
import { personal } from "@/data/personal";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div variants={item} className="mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs">
            <MapPin className="w-3 h-3 text-blue-400" />
            LA Based
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 leading-tight"
        >
          Engineering{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Performance
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-white/60 font-medium mb-3"
        >
          Staff Software Engineer
        </motion.p>

        <motion.p
          variants={item}
          className="text-sm md:text-base text-white/40 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {personal.heroSubtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition text-xs"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>{personal.email}</span>
          </a>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-white/70 text-xs">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>{personal.phone}</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex justify-center gap-3">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 hover:scale-105"
          >
            <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">LinkedIn</span>
          </a>
          <Link
            href="/book"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Book a Meeting</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
