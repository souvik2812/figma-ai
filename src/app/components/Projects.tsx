import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { Github, ExternalLink, Star, GitFork, AlertCircle, RefreshCw } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useGitHub } from "./useGitHub";
import type { Repo } from "./useGitHub";

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string;

// ── Language colour map ──────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Dart: "#00B4AB",
};

// Pick a gradient based on repo language / index
const GRADIENTS = [
  "from-purple-500 to-violet-600",
  "from-cyan-500 to-blue-600",
  "from-green-500 to-emerald-600",
  "from-orange-500 to-red-500",
  "from-yellow-500 to-orange-500",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-purple-600",
  "from-teal-500 to-cyan-600",
];

function gradientForRepo(repo: Repo, idx: number): string {
  const langColor = LANG_COLORS[repo.language ?? ""];
  if (langColor) {
    // Map known langs to best-fit gradient
    const map: Record<string, string> = {
      TypeScript: "from-blue-500 to-indigo-600",
      JavaScript: "from-yellow-400 to-orange-500",
      Python: "from-blue-600 to-cyan-500",
      HTML: "from-orange-500 to-red-500",
      CSS: "from-purple-500 to-violet-600",
      Go: "from-cyan-500 to-blue-600",
      Rust: "from-orange-700 to-red-600",
    };
    if (map[repo.language!]) return map[repo.language!];
  }
  return GRADIENTS[idx % GRADIENTS.length];
}

// Skeleton card
function SkeletonCard({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden animate-pulse ${
        isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-100"
      }`}
    >
      <div className="h-1.5 w-full bg-purple-500/30" />
      <div className="p-6 space-y-3">
        <div className={`h-4 w-3/4 rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
        <div className={`h-3 w-full rounded ${isDark ? "bg-white/5" : "bg-gray-100"}`} />
        <div className={`h-3 w-5/6 rounded ${isDark ? "bg-white/5" : "bg-gray-100"}`} />
        <div className="flex gap-2 pt-2">
          {[1, 2].map((i) => (
            <div key={i} className={`h-5 w-14 rounded-lg ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Single project card driven by a real GitHub repo
interface ProjectCardProps {
  repo: Repo;
  idx: number;
  isDark: boolean;
  isInView: boolean;
}

function ProjectCard({ repo, idx, isDark, isInView }: ProjectCardProps) {
  const gradient = gradientForRepo(repo, idx);
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#8b5cf6") : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 ${
        isDark
          ? "bg-white/5 border-white/10 hover:border-purple-500/40"
          : "bg-white border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-xl hover:shadow-purple-100"
      }`}
      whileHover={{ y: -5 }}
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-6 flex flex-col h-full">
        {/* Icon + language tag */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg`}
          >
            <Github className="w-5 h-5 text-white" />
          </div>
          {repo.language && (
            <span
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              {langColor && (
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor }} />
              )}
              {repo.language}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-base mb-2 leading-snug ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {repo.name}
        </h3>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed mb-4 flex-1 line-clamp-3 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {repo.description ?? "No description provided."}
        </p>

        {/* Topics as tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                  isDark ? "bg-purple-500/15 text-purple-400" : "bg-purple-50 text-purple-600"
                }`}
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer: stats + links */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-current/10">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${
                isDark ? "text-yellow-400" : "text-yellow-500"
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              {repo.stargazers_count}
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${
                isDark ? "text-blue-400" : "text-blue-500"
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks_count}
            </div>
          </div>

          <div className="flex gap-1.5">
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            {/* homepage link if set */}
            {(repo as any).homepage && (
              <motion.a
                href={(repo as any).homepage}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-all ${
                  isDark
                    ? "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Live site"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────
export const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  const { repos, loading, error } = useGitHub();

  // Sort by stars desc; show top 6 initially, all after "show more"
  const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  const visible = showAll ? sorted : sorted.slice(0, 6);

  // Collect unique languages for filter tabs
  const langs = Array.from(new Set(sorted.map((r) => r.language).filter(Boolean))) as string[];
  const [activeLang, setActiveLang] = useState("All");

  const filtered = visible.filter(
    (r) => activeLang === "All" || r.language === activeLang
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
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
              isDark
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                : "bg-purple-50 text-purple-600 border border-purple-200"
            }`}
          >
            GitHub Repos
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            My{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto mb-8 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Live data from GitHub — {loading ? "loading…" : `${repos.length} public repos`}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mb-8" />

          {/* Language filter tabs */}
          {!loading && !error && langs.length > 0 && (
            <div
              className={`inline-flex flex-wrap justify-center gap-1.5 rounded-xl p-1.5 ${
                isDark ? "bg-white/5 border border-white/10" : "bg-gray-100"
              }`}
            >
              {["All", ...langs.slice(0, 6)].map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    activeLang === lang
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: activeLang === lang ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {lang}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Error state */}
        {error && (
          <div
            className={`flex flex-col items-center gap-4 py-16 text-center ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-sm">Could not load repos: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 text-purple-400 text-sm font-semibold hover:bg-purple-500/30 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        )}

        {/* Skeleton loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} isDark={isDark} />
            ))}
          </div>
        )}

        {/* Project grid */}
        {!loading && !error && (
          <>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((repo, i) => (
                  <ProjectCard
                    key={repo.id}
                    repo={repo}
                    idx={i}
                    isDark={isDark}
                    isInView={isInView}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Show more / less */}
            {sorted.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="text-center mt-8"
              >
                <motion.button
                  onClick={() => setShowAll((s) => !s)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all ${
                    isDark
                      ? "border-purple-500/40 text-purple-400 hover:bg-purple-500/10"
                      : "border-purple-300 text-purple-600 hover:bg-purple-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAll ? "Show less" : `Show all ${sorted.length} repos`}
                </motion.button>
              </motion.div>
            )}
          </>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`https://github.com/${USERNAME}`}
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
