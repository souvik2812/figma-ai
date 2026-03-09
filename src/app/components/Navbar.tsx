import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Github, Code2, Linkedin } from "lucide-react";
import { useTheme } from "./ThemeContext";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "about", "skills", "projects", "contact"];
      // Use spread to avoid mutating the original array with .reverse()
      const reversed = [...sections].reverse();
      for (const section of reversed) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isDark = theme === "dark";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-purple-500/20 shadow-xl shadow-black/30"
              : "bg-white/95 backdrop-blur-xl border-b border-purple-200/60 shadow-lg shadow-purple-100/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className={`font-extrabold text-lg tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Souvik<span className="text-purple-500">.</span>
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    activeSection === link.href
                      ? "text-purple-500"
                      : isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-1.5">
              {/* GitHub – desktop only */}
              <a
                href="https://github.com/souvik2812"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>

              {/* LinkedIn – desktop only */}
              <a
                href="https://www.linkedin.com/in/souvik2812/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isDark
                    ? "text-gray-300 hover:text-blue-400 hover:bg-blue-500/10"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDark
                    ? "bg-white/10 text-yellow-400 hover:bg-white/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <Sun className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <Moon className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen((o) => !o)}
                aria-label="Toggle menu"
                className={`md:hidden p-2 rounded-lg transition-all ${
                  isDark
                    ? "text-white hover:bg-white/10"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              key="menu"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`fixed top-16 left-0 right-0 z-[999] md:hidden border-b ${
                isDark
                  ? "bg-[#0a0a0f] border-purple-500/20"
                  : "bg-white border-purple-100"
              }`}
            >
              <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left w-full px-4 py-3 rounded-xl font-semibold transition-all ${
                      activeSection === link.href
                        ? "bg-purple-500/15 text-purple-500"
                        : isDark
                        ? "text-gray-300 hover:bg-white/5 hover:text-white"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}

                {/* Divider */}
                <div className={`my-1 h-px ${isDark ? "bg-white/10" : "bg-gray-100"}`} />

                {/* Social links */}
                <motion.a
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  href="https://github.com/souvik2812"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    isDark ? "text-gray-300 hover:bg-white/5 hover:text-white" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Github className="w-5 h-5" />
                  GitHub Profile
                </motion.a>

                <motion.a
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  href="https://www.linkedin.com/in/souvik2812/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-xl font-semibold transition-all ${
                    isDark ? "text-blue-400 hover:bg-blue-500/10" : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn Profile
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
