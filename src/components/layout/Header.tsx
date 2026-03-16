"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Menu, X } from "lucide-react";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/[0.06] z-50"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="group">
            <span className="font-serif text-xl font-bold text-[#e5e0db] tracking-tight">
              Tommaso Rossino
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const section = item.href.replace("#", "");
              const isActive = activeSection === section;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative py-2 text-[13px] tracking-wide transition-colors"
                >
                  <span
                    className={
                      isActive
                        ? "text-[#c8553d]"
                        : "text-[#8a8580] hover:text-[#e5e0db]"
                    }
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#c8553d]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
            <Link
              href="/book"
              className="ml-2 flex items-center gap-2 px-4 py-2 bg-[#c8553d] text-[#0c0c0c] text-[13px] font-medium rounded-md hover:bg-[#d4724e] transition-colors duration-200"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>
          </div>

          <button
            className="md:hidden text-[#8a8580] hover:text-[#e5e0db] transition p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/[0.06]"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-[#8a8580] hover:text-[#c8553d] transition text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/book"
                  className="flex items-center gap-2 mx-4 mt-3 px-4 py-3 bg-[#c8553d] text-[#0c0c0c] rounded-md justify-center text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
