import React from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { useTheme } from "./ThemeContext";

const skillCategories = [
  {
    title: "Frontend",
    emoji: "🎨",
    skills: [
      { name: "React.js", level: 90, color: "#61dafb" },
      { name: "JavaScript", level: 88, color: "#f7df1e" },
      { name: "TypeScript", level: 80, color: "#3178c6" },
      { name: "HTML/CSS", level: 92, color: "#e34f26" },
      { name: "Tailwind CSS", level: 85, color: "#38bdf8" },
    ],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    skills: [
      { name: "Node.js", level: 82, color: "#8cc84b" },
      { name: "Express.js", level: 80, color: "#68d391" },
      { name: "MongoDB", level: 75, color: "#4db33d" },
      { name: "REST APIs", level: 85, color: "#a78bfa" },
      { name: "PostgreSQL", level: 70, color: "#336791" },
    ],
  },
  {
    title: "Tools & Others",
    emoji: "🛠️",
    skills: [
      { name: "Git & GitHub", level: 88, color: "#f05032" },
      { name: "Docker", level: 65, color: "#2496ed" },
      { name: "VS Code", level: 95, color: "#007acc" },
      { name: "Postman", level: 82, color: "#ff6c37" },
      { name: "Linux", level: 70, color: "#fcc624" },
    ],
  },
];

const techStack = [
  { name: "React", color: "#61dafb", bg: "#61dafb20" },
  { name: "Node.js", color: "#8cc84b", bg: "#8cc84b20" },
  { name: "TypeScript", color: "#3178c6", bg: "#3178c620" },
  { name: "MongoDB", color: "#4db33d", bg: "#4db33d20" },
  { name: "Express", color: "#68d391", bg: "#68d39120" },
  { name: "Tailwind", color: "#38bdf8", bg: "#38bdf820" },
  { name: "Git", color: "#f05032", bg: "#f0503220" },
  { name: "Docker", color: "#2496ed", bg: "#2496ed20" },
  { name: "REST API", color: "#a78bfa", bg: "#a78bfa20" },
  { name: "PostgreSQL", color: "#336791", bg: "#33679120" },
  { name: "JavaScript", color: "#f7df1e", bg: "#f7df1e20" },
  { name: "Linux", color: "#fcc624", bg: "#fcc62420" },
];

export const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className={`py-20 sm:py-28 ${isDark ? "bg-[#0a0a0f]" : "bg-gradient-to-br from-slate-50 via-purple-50/30 to-white"}`}
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
            My Skills
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Tech{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Technologies I work with to bring ideas to life
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Tech Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.05 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border cursor-default ${
                isDark ? "border-white/10" : "border-gray-200"
              }`}
              style={{ color: tech.color, backgroundColor: tech.bg }}
            >
              {tech.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + catIdx * 0.15 }}
              className={`p-6 rounded-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10 hover:border-purple-500/30"
                  : "bg-white border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-md"
              } transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.emoji}</span>
                <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-100"}`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + catIdx * 0.15 + skillIdx * 0.1,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
