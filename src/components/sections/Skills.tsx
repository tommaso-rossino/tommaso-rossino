"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { SkillCategoryCard } from "@/components/ui/SkillCategory";

export function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-16 text-center">
          Core Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCategoryCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
