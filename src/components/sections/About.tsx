"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";

export function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-12 text-center">
          About
        </h2>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
          <p className="text-white/70 leading-relaxed text-lg md:text-xl">
            {personal.about}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
