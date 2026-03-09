import React from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MapPin, Calendar, Coffee, Code2, Star, GitBranch, Github } from "lucide-react";
import { useTheme } from "./ThemeContext";

const stats = [
  { label: "GitHub Repos", value: "20+", icon: GitBranch },
  { label: "Projects Built", value: "15+", icon: Code2 },
  { label: "GitHub Stars", value: "50+", icon: Star },
  { label: "Cups of Coffee", value: "∞", icon: Coffee },
];

export const About: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className={`py-20 sm:py-28 ${isDark ? "bg-[#0d0d14]" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
            isDark ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-purple-50 text-purple-600 border border-purple-200"
          }`}>
            About Me
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Who I{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Am
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={`p-6 sm:p-8 rounded-2xl border mb-6 ${
              isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-100"
            }`}>
              <p className={`text-base sm:text-lg leading-relaxed mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Hey there! 👋 I'm <strong className={isDark ? "text-white" : "text-gray-900"}>Souvik</strong>, a passionate Full Stack Developer who loves building
                elegant, scalable web applications. I enjoy working with modern technologies
                like React, Node.js, and exploring the latest trends in web development.
              </p>
              <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open-source projects, or learning something new. I believe in writing clean,
                maintainable code and creating experiences that make a difference.
              </p>
            </div>

            {/* Info Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: MapPin, text: "India 🇮🇳" },
                { icon: Code2, text: "Open Source Contributor" },
                { icon: Calendar, text: "Available for Freelance" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${
                    isDark
                      ? "bg-purple-500/10 border-purple-500/20 text-purple-300"
                      : "bg-purple-50 border-purple-100 text-purple-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {text}
                </div>
              ))}
            </div>

            {/* GitHub Link */}
            <motion.a
              href="https://github.com/souvik2812"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 mt-6 px-5 py-3 rounded-xl font-semibold transition-all ${
                isDark
                  ? "bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/10"
                  : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </motion.a>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`p-6 rounded-2xl border text-center transition-all hover:scale-105 cursor-default ${
                    isDark
                      ? "bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border-purple-500/20 hover:border-purple-500/40"
                      : "bg-gradient-to-br from-purple-50 to-cyan-50 border-purple-100 hover:border-purple-200 shadow-sm"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                    isDark ? "bg-purple-500/20" : "bg-purple-100"
                  }`}>
                    <stat.icon className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                  </div>
                  <div className={`text-3xl font-black mb-1 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* GitHub contribution look */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className={`mt-4 p-4 rounded-2xl border ${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-100"
              }`}
            >
              <div className={`text-xs font-medium mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                GitHub Activity
              </div>
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: 52 * 7 }).map((_, i) => {
                  const rand = Math.random();
                  return (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{
                        backgroundColor:
                          rand > 0.85
                            ? "#7c3aed"
                            : rand > 0.7
                            ? "#a855f7"
                            : rand > 0.55
                            ? "#d8b4fe"
                            : isDark
                            ? "#1a1a2e"
                            : "#e9d5ff",
                        opacity: rand > 0.55 ? 1 : 0.4,
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
