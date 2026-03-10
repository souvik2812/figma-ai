import React from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Badges } from "./components/Badges";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { GitHubStats } from "./components/GitHubStats";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function Portfolio() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Badges />
        <Skills />
        <Projects />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
