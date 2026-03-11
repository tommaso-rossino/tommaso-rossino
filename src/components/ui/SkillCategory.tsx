"use client";

import { motion } from "framer-motion";
import { Code, Database, Cloud } from "lucide-react";
import type { SkillCategory as SkillCategoryType } from "@/types";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code,
  Database,
  Cloud,
};

export function SkillCategoryCard({
  skill,
  index,
}: {
  skill: SkillCategoryType;
  index: number;
}) {
  const Icon = iconMap[skill.icon] || Code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
    >
      <div className="text-blue-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{skill.title}</h3>
      <ul className="space-y-2">
        {skill.skills.map((s, idx) => (
          <li key={idx} className="text-white/60 flex items-center text-sm">
            <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 shrink-0" />
            {s}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
