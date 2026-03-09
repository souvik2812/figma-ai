import React from "react";
import { motion } from "motion/react";
import { Github, Heart, Code2, ArrowUp, Linkedin, Mail } from "lucide-react";
import { useTheme } from "./ThemeContext";

const socials = [
  {
    icon: Github,
    href: "https://github.com/souvik2812",
    label: "GitHub",
    hoverClass: "hover:text-white hover:bg-white/10",
    darkDefault: "text-gray-400",
    lightHover: "hover:text-gray-900 hover:bg-gray-100",
    lightDefault: "text-gray-500",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/souvik2812/",
    label: "LinkedIn",
    hoverClass: "hover:text-blue-400 hover:bg-blue-500/10",
    darkDefault: "text-gray-400",
    lightHover: "hover:text-blue-600 hover:bg-blue-50",
    lightDefault: "text-gray-500",
  },
  {
    icon: Mail,
    href: "mailto:deysouvik023@gmail.com",
    label: "Email",
    hoverClass: "hover:text-purple-400 hover:bg-purple-500/10",
    darkDefault: "text-gray-400",
    lightHover: "hover:text-purple-600 hover:bg-purple-50",
    lightDefault: "text-gray-500",
  },
];

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className={`border-t ${
        isDark ? "bg-[#0d0d14] border-white/10" : "bg-white border-gray-100"
      }`}
    >
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span
                className={`font-extrabold text-lg tracking-tight ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Souvik<span className="text-purple-500">.</span>
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed mb-4 ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Full Stack Developer passionate about building elegant, performant
              web experiences.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label, darkDefault, lightDefault, hoverClass, lightHover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={`p-2 rounded-lg transition-all ${
                    isDark
                      ? `${darkDefault} ${hoverClass}`
                      : `${lightDefault} ${lightHover}`
                  }`}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1">
            <h4
              className={`font-bold mb-4 text-sm uppercase tracking-wider ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className={`text-sm transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-purple-400"
                        : "text-gray-500 hover:text-purple-600"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-1">
            <h4
              className={`font-bold mb-4 text-sm uppercase tracking-wider ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:deysouvik023@gmail.com"
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-500 hover:text-purple-600"
                  }`}
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">deysouvik023@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/souvik2812"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Github className="w-4 h-4 flex-shrink-0" />
                  github.com/souvik2812
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/souvik2812/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  <Linkedin className="w-4 h-4 flex-shrink-0" />
                  linkedin.com/in/souvik2812
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`border-t ${isDark ? "border-white/10" : "border-gray-100"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className={`text-xs flex items-center gap-1.5 ${
              isDark ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            </motion.span>{" "}
            by{" "}
            <a
              href="https://github.com/souvik2812"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-400 font-semibold transition-colors"
            >
              Souvik
            </a>{" "}
            · © {new Date().getFullYear()} All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-md shadow-purple-500/30"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
