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
      className="fixed top-0 w-full bg-white/5 backdrop-blur-xl border-b border-white/10 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#" className="group">
            <div className="font-serif text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Tommaso <span className="text-white/90">Rossino</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const section = item.href.replace("#", "");
              const isActive = activeSection === section;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm transition-colors"
                >
                  <span
                    className={
                      isActive
                        ? "text-blue-400 font-semibold"
                        : "text-white/70 hover:text-white"
                    }
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
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
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Book</span>
            </Link>
          </div>

          <button
            className="md:hidden text-white hover:text-blue-300 transition p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
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
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-white/80 hover:text-blue-400 hover:bg-white/5 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/book"
                  className="flex items-center gap-2 mx-4 mt-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full justify-center"
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
