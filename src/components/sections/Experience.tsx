"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { ExperienceCard } from "@/components/ui/ExperienceCard";

export function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-16 text-center">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
