"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { SkillCategoryCard } from "@/components/ui/SkillCategory";

export function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative py-24 px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-label text-[#c8553d] mb-3">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#e5e0db] tracking-tight">
            Core Skills
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, index) => (
            <SkillCategoryCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
