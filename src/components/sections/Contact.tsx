"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar, Phone } from "lucide-react";
import { personal } from "@/data/personal";

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
          Get In Touch
        </h2>
        <p className="text-lg text-white/50 mb-12">{personal.contactMessage}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 hover:scale-105"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Email Me</span>
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">LinkedIn</span>
          </a>
          <Link
            href="/book"
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Book a Meeting</span>
          </Link>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Call Me</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
