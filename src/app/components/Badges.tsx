import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Shield, Linkedin } from "lucide-react";
import { useTheme } from "./ThemeContext";

/*
  DEFINITIVE FIX — why everything before failed:

  LinkedIn's profile.js scans querySelectorAll('.LI-profile-badge') when it loads.
  If placed in <head> (async/defer) → runs BEFORE React mounts → finds nothing.
  If placed in body after React root → still may run before React's first paint.

  Solution:
  1. Badge divs are in the JSX (both themes always rendered, display-toggled).
     React puts them in the actual DOM on the very first render.
  2. useEffect (fires AFTER the first DOM paint) appends a fresh <script> tag.
     At that exact moment the badge divs ARE in the DOM.
     The script fetches, runs, finds the divs, injects iframes. ✓

  On theme change: we do NOT reload the script (badge already has iframes).
  The display:none/block toggle swaps between the two already-rendered badges.

  NOTE: LinkedIn may restrict rendering to non-localhost domains.
  The badge will work correctly after deployment to GitHub Pages.
*/

export const Badges: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const scriptInjected = useRef(false);

  // Inject script once after React first render
  useEffect(() => {
    if (scriptInjected.current) return;
    scriptInjected.current = true;
    document.getElementById("li-badge-script")?.remove();
    const script = document.createElement("script");
    script.id = "li-badge-script";
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  // On theme change, call LIRenderAll so any unprocessed badge gets its iframe
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof (window as any).LIRenderAll === "function") {
        (window as any).LIRenderAll();
      }
    }, 400);
    return () => clearTimeout(t);
  }, [isDark]);

  return (
    <section
      id="badges"
      ref={ref}
      className={`py-16 sm:py-20 ${isDark ? "bg-[#0a0a12]" : "bg-gray-50/70"}`}
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
            isDark
              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
              : "bg-purple-50 text-purple-600 border border-purple-200"
          }`}>
            Profiles &amp; Badges
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Find Me{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Online
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Badges row */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:gap-20">

          {/* ── TryHackMe ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Shield className={`w-5 h-5 ${isDark ? "text-green-400" : "text-green-600"}`} />
              <span className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                TryHackMe
              </span>
            </div>
            <div className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
              isDark ? "border-white/10 shadow-xl shadow-black/30" : "border-gray-200 shadow-lg"
            }`}>
              <iframe
                src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=2753283"
                style={{ border: "none", display: "block", width: "340px", height: "200px" }}
                title="TryHackMe Public Profile Badge"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Divider */}
          <div className={`hidden md:block w-px self-stretch mt-10 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />

          {/* ── LinkedIn ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Linkedin className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              <span className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                LinkedIn
              </span>
            </div>

            {/*
              Outer wrapper: position:relative so invisible badge sits inside it.
              Both badge divs ALWAYS have layout (visible to LI script).
              The inactive one is hidden with visibility:hidden + position:absolute
              so it takes up NO space visually but the LI script can still process it.
            */}
            <div
              className={`relative rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                isDark ? "border-white/10 shadow-xl shadow-black/30" : "border-gray-200 shadow-lg"
              }`}
              style={{ width: "310px", height: "386px", overflow: "hidden" }}
            >
              {/* Medium Vertical — DARK */}
              <div style={{
                position: isDark ? "relative" : "absolute",
                visibility: isDark ? "visible" : "hidden",
                pointerEvents: isDark ? "auto" : "none",
                top: 0, left: 0,
              }}>
                <div
                  className="badge-base LI-profile-badge"
                  data-locale="en_US"
                  data-size="medium"
                  data-theme="dark"
                  data-type="VERTICAL"
                  data-vanity="souvik-dey-code"
                  data-version="v1"
                >
                  <a
                    className="badge-base__link LI-simple-link"
                    href="https://in.linkedin.com/in/souvik-dey-code?trk=profile-badge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Souvik Dey */}
                  </a>
                </div>
              </div>

              {/* Medium Vertical — LIGHT */}
              <div style={{
                position: isDark ? "absolute" : "relative",
                visibility: isDark ? "hidden" : "visible",
                pointerEvents: isDark ? "none" : "auto",
                top: 0, left: 0,
              }}>
                <div
                  className="badge-base LI-profile-badge"
                  data-locale="en_US"
                  data-size="medium"
                  data-theme="light"
                  data-type="VERTICAL"
                  data-vanity="souvik-dey-code"
                  data-version="v1"
                >
                  <a
                    className="badge-base__link LI-simple-link"
                    href="https://in.linkedin.com/in/souvik-dey-code?trk=profile-badge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Souvik Dey */}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Localhost notice ── */}
        <p className={`text-center text-xs mt-10 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
          Follow my github and linkedin , my tryhackme account is under maintenance
          {/* renders on the deployed site (GitHub Pages). It may appear blank on localhost due to LinkedIn's domain policy. */}
        </p>
      </div>
    </section>
  );
};
