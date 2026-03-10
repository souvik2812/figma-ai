import React, { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Mail, Github, MapPin, Send, CheckCircle,
  MessageSquare, User, AtSign, Linkedin,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

// ─── Formspree endpoint (from ContactMe.jsx) ──────────────────────────────
// This sends form submissions directly to deysouvik023@gmail.com via Formspree.
// No credentials needed — just make sure the Formspree form is activated by
// visiting https://formspree.io/f/mjkbvkwb and confirming your email there.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjkbvkwb";

export const Contact: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: form.name,
          Email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 6000);
      } else {
        const data = await response.json();
        setError(
          data?.errors?.[0]?.message ||
            "Failed to send. Please try again or email me directly."
        );
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };


  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "deysouvik023@gmail.com",
      href: "mailto:deysouvik023@gmail.com",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/souvik2812",
      href: "https://github.com/souvik2812",
      color: "from-gray-600 to-gray-800",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/souvik2812",
      href: "https://www.linkedin.com/in/souvik2812/",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India 🇮🇳",
      href: null,
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-20 sm:py-28 ${
        isDark
          ? "bg-[#0a0a0f]"
          : "bg-gradient-to-br from-slate-50 via-purple-50/30 to-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
              isDark
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                : "bg-purple-50 text-purple-600 border border-purple-200"
            }`}
          >
            Get In Touch
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Have a project in mind or want to collaborate? I'd love to hear from
            you!
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Left: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3
              className={`text-xl sm:text-2xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Ready to work together? 🚀
            </h3>
            <p
              className={`text-base leading-relaxed mb-8 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              I'm currently open to new opportunities and exciting projects.
              Whether you have a question, a project idea, or just want to say
              hello — my inbox is always open!
            </p>

            {/* Contact Cards */}
            <div className="space-y-3">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all group ${
                        isDark
                          ? "bg-white/5 border-white/10 hover:border-purple-500/40 hover:bg-purple-500/5"
                          : "bg-white border-gray-100 hover:border-purple-200 hover:shadow-md shadow-sm"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-xs font-semibold mb-0.5 ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          {item.label}
                        </div>
                        <div
                          className={`text-sm font-medium truncate ${
                            isDark ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div
                      className={`flex items-center gap-4 p-4 rounded-xl border ${
                        isDark
                          ? "bg-white/5 border-white/10"
                          : "bg-white border-gray-100 shadow-sm"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div
                          className={`text-xs font-semibold mb-0.5 ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          {item.label}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            isDark ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {item.value}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              className={`p-6 sm:p-8 rounded-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-100 shadow-xl shadow-purple-100/50"
              }`}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/15 mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Message Sent! 🎉
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Your message has been delivered to Souvik.
                    He'll get back to you as soon as possible!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-1.5 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Your Name <span className="text-purple-500">*</span>
                    </label>
                    <div className="relative">
                      <User
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all text-sm ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-purple-500 focus:bg-purple-500/5"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold mb-1.5 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Your Email <span className="text-purple-500">*</span>
                    </label>
                    <div className="relative">
                      <AtSign
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all text-sm ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-purple-500 focus:bg-purple-500/5"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold mb-1.5 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Message <span className="text-purple-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className={`absolute left-3 top-3.5 w-4 h-4 pointer-events-none ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Tell me about your project or idea…"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all text-sm resize-none ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-purple-500 focus:bg-purple-500/5"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-red-500 text-sm font-medium">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p
                    className={`text-xs text-center ${
                      isDark ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Your message will be delivered directly to Souvik's inbox.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
