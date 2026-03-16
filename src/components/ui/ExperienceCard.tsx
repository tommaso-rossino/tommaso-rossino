"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Target,
  Award,
  Users,
  Code,
} from "lucide-react";
import type { Experience } from "@/types";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Briefcase,
  Target,
  Award,
  Users,
  Code,
};

export function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="group border border-white/[0.06] rounded-lg p-6 md:p-8 hover:border-white/[0.12] transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h3 className="text-xl font-medium text-[#e5e0db] mb-1 group-hover:text-[#c8553d] transition-colors">
            {experience.company}
          </h3>
          <p className="text-[#c8553d] text-sm mb-1">
            {experience.role}
          </p>
          <p className="text-[#5a5550] text-xs tracking-wide">
            {experience.location}
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <span className="inline-block px-3 py-1.5 text-[#8a8580] text-xs border border-white/[0.08] rounded">
            {experience.period}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {experience.achievements.map((achievement, idx) => {
          const Icon = iconMap[achievement.icon] || Briefcase;
          return (
            <div
              key={idx}
              className="relative pl-4 border-l border-white/[0.06] py-2"
            >
              <div className="flex items-start gap-3 mb-1">
                <div className="text-[#c8553d]/70 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium text-[#e5e0db]">
                  {achievement.title}
                </h4>
              </div>
              <p className="text-[#8a8580] ml-7 text-[13px] leading-relaxed">
                {achievement.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
