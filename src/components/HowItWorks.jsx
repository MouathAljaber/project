import React from "react";
import { Card, CardContent } from "./ui/card";

import { Footprints, Sliders, Eye } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Footprints,
    title: "Choose Your Base",
    description:
      "Select one of the four supplied shoe photos in the catalog.",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Customize Every Detail",
    description:
      "Switch only between the model-specific colorways that have matching image files.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    number: "03",
    icon: Eye,
    title: "Preview Your Design",
    description:
      "See the selected PNG update instantly and keep the flow simple.",
    accent: "bg-green-50 text-green-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
            Process
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Three simple steps to pick from the provided shoe catalog.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-border via-primary/20 to-border" />

          {steps.map((step, index) => (
            <Card
              key={step.number}
              className="relative border-border/60 hover-lift bg-card group"
            >
              <CardContent className="p-8 space-y-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.accent}`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-5xl font-black text-foreground/5 leading-none">
                    {step.number}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
