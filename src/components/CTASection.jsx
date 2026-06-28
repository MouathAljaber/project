import React from "react";
import { Button } from "./ui/button";
import { Zap, ArrowRight } from "lucide-react";

export default function CTASection({ onStartDesigning }) {
  return (
    <section className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-background rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-background rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-background/20 bg-background/10 text-sm font-medium">
          <Zap className="w-4 h-4" />
          Design Studio is Live
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Ready to create<br />your own pair?
        </h2>

        <p className="text-lg text-background/70 max-w-md mx-auto leading-relaxed">
          Open the design studio and start building a shoe that matches your style. Your style, built from the sole up.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Button
            size="xl"
            onClick={onStartDesigning}
            className="bg-background text-foreground hover:bg-background/90 gap-2 group rounded-2xl"
          >
            Launch Design Studio
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="xl"
            variant="outline"
            onClick={() => document.getElementById('designs')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-background/30 text-background hover:bg-background/10 rounded-2xl"
          >
            View Gallery
          </Button>
        </div>

        <div className="pt-8 flex items-center justify-center gap-8 text-background/50 text-sm">
          <span>No signup required</span>
          <span className="w-1 h-1 bg-background/30 rounded-full" />
          <span>Free to use</span>
          <span className="w-1 h-1 bg-background/30 rounded-full" />
          <span>Instant preview</span>
        </div>
      </div>
    </section>
  );
}
