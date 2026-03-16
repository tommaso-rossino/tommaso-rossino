"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { ExperienceCard } from "@/components/ui/ExperienceCard";

export function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative py-24 px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-label text-[#c8553d] mb-3">Career</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#e5e0db] tracking-tight">
            Experience
          </h2>
        </div>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
