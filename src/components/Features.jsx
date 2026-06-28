import React from "react";
import { Card, CardContent } from "./ui/card";
import { Palette, Eye, Sparkles, Gem, Type, Layers } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Photo Catalog",
    description: "Choose from the supplied sneaker photos instead of a freeform SVG builder.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Eye,
    title: "Live Shoe Preview",
    description: "Watch the selected product photo update instantly as you switch model or color.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Sparkles,
    title: "Limited Options",
    description: "Only the provided models and colorways are exposed, so the UI stays tight and accurate.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Gem,
    title: "Four Base Models",
    description: "Classic, running, high-top, and skate silhouettes map directly to the asset set.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Type,
    title: "Asset-Driven",
    description: "Each selection points to a real PNG file from the public folder.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Palette,
    title: "Minimal Flow",
    description: "A clean selector keeps the catalog easy to scan on desktop and mobile.",
    color: "bg-sky-50 text-sky-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">Capabilities</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Built for Creators</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            A focused photo-based catalog with only the supported shoe types and colorways.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 hover-lift bg-card group cursor-default">
              <CardContent className="p-7 space-y-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${feature.color} transition-transform group-hover:scale-110`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-base">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
