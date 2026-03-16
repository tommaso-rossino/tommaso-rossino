"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";

export function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative py-24 px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-label text-[#c8553d] mb-3">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#e5e0db] tracking-tight">
            Featured Projects
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
      <ProjectModal />
    </motion.section>
  );
}
