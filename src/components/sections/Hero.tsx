"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Calendar, ArrowDownRight } from "lucide-react";
import { personal } from "@/data/personal";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 sm:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto"
      >
        <motion.p
          variants={item}
          className="section-label text-[#c8553d] mb-6"
        >
          Staff Software Engineer
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#e5e0db] mb-8 leading-[0.9] tracking-tight max-w-4xl"
        >
          Engineering
          <br />
          <span className="text-[#c8553d]">Performance</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base md:text-lg text-[#a09890] max-w-xl mb-12 leading-relaxed"
        >
          {personal.heroSubtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-3 mb-16"
        >
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#c8553d] text-[#0c0c0c] text-sm font-medium rounded-md hover:bg-[#d4724e] transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-5 py-3 border border-white/[0.1] text-[#e5e0db] text-sm rounded-md hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Meeting</span>
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-wrap gap-6 text-[13px] text-[#5a5550]"
        >
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 hover:text-[#c8553d] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{personal.email}</span>
          </a>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>{personal.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Los Angeles, CA</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
