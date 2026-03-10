import React, { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import {
  Github,
  Star,
  GitFork,
  GitCommitHorizontal,
  BookOpen,
  Users,
  UserCheck,
  MapPin,
  ExternalLink,
  Flame,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useGitHub } from "./useGitHub";
import type { Repo, ContributionWeek } from "./useGitHub";

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string;

// ─── Language colour map ──────────────────────────────────────────────────────
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

// ─── Contribution graph colour scales ────────────────────────────────────────
function getContribColor(count: number, isDark: boolean): string {
  if (count === 0) return isDark ? "#161b22" : "#ebedf0";
  if (count < 4) return isDark ? "#0e4429" : "#9be9a8";
  if (count < 8) return isDark ? "#006d32" : "#40c463";
  if (count < 12) return isDark ? "#26a641" : "#30a14e";
  return isDark ? "#39d353" : "#216e39";
}

// ─── Skeleton shimmer ─────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{ background: "rgba(139,92,246,0.08)" }}
    />
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  gradient: string;
  delay: number;
  isDark: boolean;
  isInView: boolean;
}

function StatCard({ icon, label, value, gradient, delay, isDark, isInView }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-2xl p-5 border overflow-hidden group cursor-default select-none ${
        isDark
          ? "bg-white/5 border-white/10 hover:border-purple-500/40"
          : "bg-white border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-xl hover:shadow-purple-100/60"
      } transition-all duration-300`}
      whileHover={{ y: -4 }}
    >
      {/* gradient accent */}
      <div
        className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${gradient}`}
      />
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          {icon}
        </div>
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {label}
        </span>
      </div>
      <motion.span
        className={`text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}

// ─── Repository card ──────────────────────────────────────────────────────────
function RepoCard({ repo, idx, isDark, isInView }: { repo: Repo; idx: number; isDark: boolean; isInView: boolean }) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#8b5cf6") : "#8b5cf6";

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + idx * 0.07 }}
      className={`flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-200 group ${
        isDark
          ? "bg-white/5 border-white/10 hover:border-purple-500/40 hover:bg-white/8"
          : "bg-gray-50 border-gray-100 hover:border-purple-200 hover:bg-white hover:shadow-md hover:shadow-purple-100/50"
      }`}
      whileHover={{ x: 4 }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen
            className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? "text-purple-400" : "text-purple-600"}`}
          />
          <span
            className={`font-semibold text-sm truncate ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {repo.name}
          </span>
        </div>
        {repo.description && (
          <p
            className={`text-xs leading-relaxed line-clamp-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {repo.description}
          </p>
        )}
        {repo.language && (
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: langColor }}
            />
            <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {repo.language}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className={`flex items-center gap-1 text-xs ${isDark ? "text-yellow-400" : "text-yellow-500"}`}>
          <Star className="w-3.5 h-3.5" />
          <span className="font-semibold">{repo.stargazers_count}</span>
        </div>
        <div className={`flex items-center gap-1 text-xs ${isDark ? "text-blue-400" : "text-blue-500"}`}>
          <GitFork className="w-3.5 h-3.5" />
          <span className="font-semibold">{repo.forks_count}</span>
        </div>
        <ExternalLink
          className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
            isDark ? "text-purple-400" : "text-purple-600"
          }`}
        />
      </div>
    </motion.a>
  );
}

// ─── Contribution heatmap ─────────────────────────────────────────────────────
function ContributionGraph({
  weeks,
  isDark,
  isInView,
}: {
  weeks: ContributionWeek[];
  isDark: boolean;
  isInView: boolean;
}) {
  const CELL = 13;
  const GAP = 3;
  const STEP = CELL + GAP;

  const months: { label: string; x: number }[] = [];
  weeks.forEach((week, wi) => {
    const day = week.contributionDays[0];
    if (day) {
      const d = new Date(day.date);
      if (d.getDate() <= 7) {
        months.push({
          label: d.toLocaleString("default", { month: "short" }),
          x: wi * STEP,
        });
      }
    }
  });

  const svgW = weeks.length * STEP;
  const svgH = 7 * STEP + 20; // 7 rows + month label row at top

  const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full overflow-x-auto"
    >
      <svg
        viewBox={`0 0 ${svgW + 36} ${svgH}`}
        className="w-full"
        style={{ minWidth: "600px", height: "auto" }}
      >
        {/* Day labels */}
        {DAY_LABELS.map((label, di) => (
          <text
            key={di}
            x={0}
            y={20 + di * STEP + CELL / 2 + 4}
            fontSize={9}
            fill={isDark ? "#8b949e" : "#767676"}
            textAnchor="start"
          >
            {label}
          </text>
        ))}

        {/* Month labels */}
        {months.map((m, mi) => (
          <text
            key={mi}
            x={36 + m.x}
            y={10}
            fontSize={9}
            fill={isDark ? "#8b949e" : "#767676"}
            textAnchor="start"
          >
            {m.label}
          </text>
        ))}

        {/* Cells */}
        <g transform="translate(36, 20)">
          {weeks.map((week, wi) =>
            week.contributionDays.map((day, di) => {
              const color = getContribColor(day.contributionCount, isDark);
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={wi * STEP}
                  y={di * STEP}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  ry={2}
                  fill={color}
                  className="transition-all duration-100 cursor-pointer"
                >
                  <title>
                    {day.contributionCount} contribution{day.contributionCount !== 1 ? "s" : ""} on {day.date}
                  </title>
                </rect>
              );
            })
          )}
        </g>
      </svg>

      {/* Legend */}
      <div
        className={`flex items-center gap-1.5 justify-end mt-2 text-xs ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <span>Less</span>
        {[0, 2, 5, 9, 14].map((n, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getContribColor(n, isDark) }}
          />
        ))}
        <span>More</span>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export const GitHubStats: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { repos, stats, contributionWeeks, loading, error } = useGitHub();

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const statCards = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: "Public Repos",
      value: loading ? "—" : stats.totalRepos,
      gradient: "from-purple-500 to-violet-600",
      delay: 0.1,
    },
    {
      icon: <Star className="w-4 h-4" />,
      label: "Total Stars",
      value: loading ? "—" : stats.totalStars,
      gradient: "from-yellow-400 to-orange-500",
      delay: 0.2,
    },
    {
      icon: <GitFork className="w-4 h-4" />,
      label: "Total Forks",
      value: loading ? "—" : stats.totalForks,
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.3,
    },
    {
      icon: <GitCommitHorizontal className="w-4 h-4" />,
      label: "Commits (yr)",
      value: loading ? "—" : stats.totalCommitsThisYear,
      gradient: "from-green-500 to-emerald-500",
      delay: 0.4,
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Followers",
      value: loading ? "—" : stats.followers,
      gradient: "from-pink-500 to-rose-500",
      delay: 0.5,
    },
    {
      icon: <UserCheck className="w-4 h-4" />,
      label: "Following",
      value: loading ? "—" : stats.following,
      gradient: "from-indigo-500 to-purple-600",
      delay: 0.6,
    },
  ];

  return (
    <section
      id="github"
      ref={ref}
      className={`py-20 sm:py-28 ${isDark ? "bg-[#0a0a12]" : "bg-gray-50/70"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
              isDark
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                : "bg-purple-50 text-purple-600 border border-purple-200"
            }`}
          >
            <Github className="w-4 h-4" />
            GitHub Activity
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Open Source{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Stats
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Live data pulled directly from GitHub — repos, stars, forks &amp;
            contributions
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* ── Error banner ── */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            ⚠️ Could not load GitHub data: {error}
          </div>
        )}

        {/* ── Profile strip ── */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border mb-8 ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <img
              src={stats.avatarUrl}
              alt={stats.name ?? USERNAME}
              className="w-14 h-14 rounded-full border-2 border-purple-500/50 flex-shrink-0"
            />
            <div className="text-center sm:text-left min-w-0">
              <p
                className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {stats.name ?? stats.login}
              </p>
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                @{stats.login}
              </p>
              {stats.bio && (
                <p
                  className={`text-sm mt-1 line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {stats.bio}
                </p>
              )}
            </div>
            {stats.location && (
              <div
                className={`hidden sm:flex items-center gap-1.5 text-sm ml-auto flex-shrink-0 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <MapPin className="w-4 h-4" />
                {stats.location}
              </div>
            )}
            <motion.a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all sm:ml-auto ${
                isDark
                  ? "bg-white/10 text-white hover:bg-purple-500/20 hover:text-purple-300"
                  : "bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              View Profile
            </motion.a>
          </motion.div>
        )}

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))
            : statCards.map((card) => (
                <StatCard
                  key={card.label}
                  {...card}
                  isDark={isDark}
                  isInView={isInView}
                />
              ))}
        </div>

        {/* ── Bottom: repos + graph ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Top Repositories */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-5"
            >
              <Flame
                className={`w-5 h-5 ${isDark ? "text-orange-400" : "text-orange-500"}`}
              />
              <h3
                className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Top Repositories
              </h3>
            </motion.div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {topRepos.map((repo, idx) => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                    idx={idx}
                    isDark={isDark}
                    isInView={isInView}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Contribution Graph */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-2 mb-5"
            >
              <TrendingUp
                className={`w-5 h-5 ${isDark ? "text-green-400" : "text-green-600"}`}
              />
              <h3
                className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Contribution Graph
              </h3>
            </motion.div>

            <div
              className={`p-5 rounded-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              {loading ? (
                <Skeleton className="h-40 w-full" />
              ) : contributionWeeks.length > 0 ? (
                <>
                  <ContributionGraph
                    weeks={contributionWeeks}
                    isDark={isDark}
                    isInView={isInView}
                  />
                  <p
                    className={`text-center text-xs mt-3 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {stats.totalCommitsThisYear.toLocaleString()} contributions in the last year
                  </p>
                </>
              ) : (
                <p
                  className={`text-center text-sm py-10 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  No contribution data available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
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
            Follow me on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
