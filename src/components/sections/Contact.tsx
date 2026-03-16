"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar, Phone } from "lucide-react";
import { personal } from "@/data/personal";

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative py-32 px-6 sm:px-8 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="section-label text-[#c8553d] mb-3">Connect</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#e5e0db] tracking-tight mb-6">
            Get In Touch
          </h2>
          <p className="text-[#8a8580] mb-12 leading-relaxed">
            {personal.contactMessage}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="group flex items-center gap-3 px-5 py-4 bg-[#c8553d] text-[#0c0c0c] rounded-md hover:bg-[#d4724e] transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Email Me</span>
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-4 border border-white/[0.1] text-[#e5e0db] rounded-md hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-200"
          >
            <Linkedin className="w-4 h-4 text-[#8a8580]" />
            <span className="text-sm">LinkedIn</span>
          </a>
          <Link
            href="/book"
            className="group flex items-center gap-3 px-5 py-4 border border-white/[0.1] text-[#e5e0db] rounded-md hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-200"
          >
            <Calendar className="w-4 h-4 text-[#8a8580]" />
            <span className="text-sm">Book a Meeting</span>
          </Link>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="group flex items-center gap-3 px-5 py-4 border border-white/[0.1] text-[#e5e0db] rounded-md hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-[#8a8580]" />
            <span className="text-sm">Call Me</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
