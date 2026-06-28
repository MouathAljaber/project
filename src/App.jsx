import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import FeaturedDesigns from "./components/FeaturedDesigns";
import CTASection from "./components/CTASection";
import ShoeCustomizer from "./components/ShoeCustomizer";

export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "studio"

  const handleStartDesigning = () => {
    setView("studio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keep studio section in view
  useEffect(() => {
    if (view === "studio") {
      document.title = "SOLECRAFT — Design Studio";
    } else {
      document.title = "SOLECRAFT — Design Shoes That Are Truly Yours";
    }
  }, [view]);

  if (view === "studio") {
    return (
      <div className="min-h-screen bg-background page-enter">
        <Navbar onStartDesigning={handleStartDesigning} />
        <div className="pt-16">
          <ShoeCustomizer onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background page-enter">
      <Navbar onStartDesigning={handleStartDesigning} />
      <main>
        <Hero onStartDesigning={handleStartDesigning} />
        <HowItWorks />
        <Features />
        <FeaturedDesigns onStartDesigning={handleStartDesigning} />
        <CTASection onStartDesigning={handleStartDesigning} />
      </main>
      <footer className="py-12 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-foreground rounded-lg flex items-center justify-center text-[10px] font-black text-background">
                S
              </div>
              <span className="font-bold text-sm tracking-tight">
                SOLECRAFT
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              © 2025 SOLECRAFT. A design prototype. No authentication, payment,
              or data storage.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="cursor-default hover:text-foreground transition-colors">
                Privacy
              </span>
              <span className="cursor-default hover:text-foreground transition-colors">
                Terms
              </span>
              <span className="cursor-default hover:text-foreground transition-colors">
                Contact
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
