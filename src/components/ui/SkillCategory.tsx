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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group p-6 border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-colors"
    >
      <div className="text-[#c8553d] mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-medium text-[#e5e0db] mb-4 tracking-wide">
        {skill.title}
      </h3>
      <ul className="space-y-2">
        {skill.skills.map((s, idx) => (
          <li key={idx} className="text-[#8a8580] flex items-center text-[13px]">
            <span className="w-1 h-1 bg-[#c8553d]/60 rounded-full mr-3 shrink-0" />
            {s}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
