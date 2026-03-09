import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Github, ExternalLink, Star, GitFork, Code2 } from "lucide-react";
import { useTheme } from "./ThemeContext";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing my projects, skills, and experience. Built with React and Tailwind CSS with smooth animations and dark/light mode.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/souvik2812/portfolio",
    live: "https://github.com/souvik2812/portfolio",
    stars: 12,
    forks: 4,
    category: "Frontend",
    gradient: "from-purple-500 to-violet-600",
    emoji: "🎨",
  },
  {
    title: "E-Commerce App",
    description:
      "A full-stack e-commerce application with product listings, cart management, user authentication, and payment integration using Stripe.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/souvik2812",
    live: "https://github.com/souvik2812",
    stars: 18,
    forks: 6,
    category: "Full Stack",
    gradient: "from-cyan-500 to-blue-600",
    emoji: "🛒",
  },
  {
    title: "Task Manager",
    description:
      "A productivity app for managing tasks with drag-and-drop functionality, priority levels, deadlines, and team collaboration features.",
    tags: ["React", "TypeScript", "MongoDB"],
    github: "https://github.com/souvik2812",
    live: "https://github.com/souvik2812",
    stars: 9,
    forks: 3,
    category: "Full Stack",
    gradient: "from-green-500 to-emerald-600",
    emoji: "✅",
  },
  {
    title: "Chat Application",
    description:
      "Real-time chat application with WebSocket support, user authentication, message history, and multi-room functionality.",
    tags: ["React", "Socket.io", "Node.js", "Express"],
    github: "https://github.com/souvik2812",
    live: "https://github.com/souvik2812",
    stars: 15,
    forks: 5,
    category: "Full Stack",
    gradient: "from-orange-500 to-red-500",
    emoji: "💬",
  },
  {
    title: "Weather Dashboard",
    description:
      "A weather dashboard that displays current and forecast weather data using the OpenWeatherMap API with interactive charts.",
    tags: ["React", "API", "Charts", "CSS"],
    github: "https://github.com/souvik2812",
    live: "https://github.com/souvik2812",
    stars: 8,
    forks: 2,
    category: "Frontend",
    gradient: "from-yellow-500 to-orange-500",
    emoji: "🌤️",
  },
  {
    title: "URL Shortener",
    description:
      "A fast URL shortening service with analytics, custom aliases, QR code generation, and click tracking built with Node.js.",
    tags: ["Node.js", "Express", "MongoDB", "React"],
    github: "https://github.com/souvik2812",
    live: "https://github.com/souvik2812",
    stars: 11,
    forks: 4,
    category: "Full Stack",
    gradient: "from-pink-500 to-rose-600",
    emoji: "🔗",
  },
];

const categories = ["All", "Frontend", "Full Stack"];

export const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-20 sm:py-28 ${isDark ? "bg-[#0d0d14]" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
            isDark ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-purple-50 text-purple-600 border border-purple-200"
          }`}>
            Portfolio
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            A collection of projects I've built with passion and purpose
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mb-8" />

          {/* Filter Tabs */}
          <div className={`inline-flex rounded-xl p-1 gap-1 ${isDark ? "bg-white/5 border border-white/10" : "bg-gray-100"}`}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30"
                    : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: activeCategory === cat ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group relative rounded-2xl border overflow-hidden ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:border-purple-500/40"
                    : "bg-white border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-xl hover:shadow-purple-100"
                } transition-all duration-300`}
                whileHover={{ y: -5 }}
              >
                {/* Top Gradient Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

                <div className="p-6">
                  {/* Icon & Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      isDark ? "bg-white/10" : "bg-gray-50"
                    }`}>
                      {project.emoji}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-50 text-purple-600"
                    }`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                          isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    {/* Stats */}
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        <Star className="w-3.5 h-3.5 text-yellow-400" />
                        {project.stars}
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        <GitFork className="w-3.5 h-3.5 text-blue-400" />
                        {project.forks}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-all ${
                          isDark
                            ? "text-gray-400 hover:text-white hover:bg-white/10"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-all ${
                          isDark
                            ? "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
                            : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/souvik2812"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold border transition-all ${
              isDark
                ? "border-purple-500/40 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500"
                : "border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-100"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            See All Projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
