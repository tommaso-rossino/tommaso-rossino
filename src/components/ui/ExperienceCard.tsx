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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            {experience.company}
          </h3>
          <p className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold mb-1">
            {experience.role}
          </p>
          <p className="text-white/50">{experience.location}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-300 rounded-full text-sm font-semibold border border-blue-400/20">
            {experience.period}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {experience.achievements.map((achievement, idx) => {
          const Icon = iconMap[achievement.icon] || Briefcase;
          return (
            <div
              key={idx}
              className="relative pl-4 bg-gradient-to-r from-blue-500/5 to-transparent rounded-r-lg p-3"
            >
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l" />
              <div className="flex items-start gap-3 mb-2">
                <div className="text-blue-400 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-white">{achievement.title}</h4>
              </div>
              <p className="text-white/60 ml-8 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
