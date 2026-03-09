import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, Download, ArrowDown, ExternalLink, Terminal } from "lucide-react";
import { useTheme } from "./ThemeContext";

const roles = [
  "Full Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Open Source Enthusiast",
  "Problem Solver",
];

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? "bg-[#0a0a0f]" : "bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </>
        )}
        {!isDark && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/60 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-200/60 rounded-full blur-3xl" />
          </>
        )}
        {/* Grid lines */}
        {isDark && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        )}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text Content */}
          <motion.div
            className="flex-1 order-2 md:order-1"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
                isDark
                  ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                  : "bg-purple-50 border-purple-200 text-purple-600"
              }`}>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <Terminal className="w-3 h-3" />
                Available for Work
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-3 leading-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Hi, I'm{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
                  Souvik
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 h-10 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <span className="text-purple-500">&lt;</span>
              <span>{displayed}</span>
              <span className="animate-pulse text-purple-500">|</span>
              <span className="text-purple-500">/&gt;</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-base sm:text-lg max-w-lg mb-8 leading-relaxed mx-auto md:mx-0 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Passionate developer crafting beautiful, performant web experiences.
              I love turning complex problems into simple, elegant solutions with clean code and modern technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
            >
              <motion.button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/30 flex items-center gap-2 hover:shadow-purple-500/50 transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                View Projects
              </motion.button>
              <motion.a
                href="https://github.com/souvik2812"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 border transition-all ${
                  isDark
                    ? "border-purple-500/40 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500"
                    : "border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                GitHub Profile
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              {[
                { icon: Github, href: "https://github.com/souvik2812", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/souvik2812/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:deysouvik023@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl border transition-all ${
                    isDark
                      ? "border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-purple-400 hover:bg-purple-500/10"
                      : "border-gray-200 text-gray-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar / Visual */}
          <motion.div
            className="order-1 md:order-2 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-purple-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full border border-dashed border-cyan-500/20"
              />

              {/* Avatar */}
              <div className={`relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-transparent ${
                isDark ? "" : "shadow-2xl shadow-purple-200"
              }`}
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                    : "linear-gradient(135deg, #a855f7, #22d3ee)",
                  padding: "3px",
                }}
              >
                <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center text-7xl sm:text-8xl font-black ${
                  isDark ? "bg-[#0a0a0f]" : "bg-white"
                }`}>
                  <img
                    src="https://avatars.githubusercontent.com/u/souvik2812?v=4"
                    alt="Souvik"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-7xl">👨‍💻</span>`;
                      }
                    }}
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -top-2 -right-2 px-3 py-1.5 rounded-xl text-xs font-bold ${
                  isDark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/50" : "bg-purple-500 text-white shadow-lg shadow-purple-300"
                }`}
              >
                React ⚛️
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -bottom-2 -left-2 px-3 py-1.5 rounded-xl text-xs font-bold ${
                  isDark ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50" : "bg-cyan-500 text-white shadow-lg shadow-cyan-300"
                }`}
              >
                Node.js 🚀
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToAbout}
        >
          <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-500"}`} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};