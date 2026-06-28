import React from "react";
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";
import { Sparkles } from "lucide-react";

const presetStyles = {
  Cyberpunk: { bg: "from-purple-950 to-violet-900", text: "text-purple-200", accent: "border-purple-700/50", dot: "#8b5cf6" },
  Minimalist: { bg: "from-stone-100 to-stone-50", text: "text-stone-600", accent: "border-stone-300/50", dot: "#78716c" },
  Retro: { bg: "from-amber-800 to-orange-900", text: "text-amber-200", accent: "border-amber-700/50", dot: "#f59e0b" },
  Nature: { bg: "from-green-900 to-emerald-800", text: "text-green-200", accent: "border-green-700/50", dot: "#22c55e" },
  Luxury: { bg: "from-zinc-900 to-yellow-950", text: "text-yellow-300", accent: "border-yellow-800/50", dot: "#d4a017" },
  Streetwear: { bg: "from-zinc-800 to-zinc-900", text: "text-zinc-200", accent: "border-zinc-700/50", dot: "#3f3f46" },
  Ocean: { bg: "from-blue-900 to-cyan-900", text: "text-cyan-200", accent: "border-cyan-700/50", dot: "#0ea5e9" },
  Sunset: { bg: "from-orange-800 to-pink-900", text: "text-orange-200", accent: "border-orange-700/50", dot: "#f97316" },
  Monochrome: { bg: "from-neutral-800 to-neutral-900", text: "text-neutral-300", accent: "border-neutral-600/50", dot: "#737373" },
};

export default function PresetCard({ preset, selected, onClick }) {
  const style = presetStyles[preset] || presetStyles.Minimalist;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full rounded-xl p-3 bg-gradient-to-br transition-all duration-200 text-left border",
        style.bg,
        style.accent,
        selected
          ? "ring-2 ring-primary ring-offset-2 scale-[1.02]"
          : "hover:scale-[1.02] hover:shadow-md"
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0"
          style={{ backgroundColor: style.dot }}
        >
          {selected && <Sparkles className="w-3 h-3 text-white" />}
        </div>
        <span className={cn("text-xs font-semibold", style.text)}>{preset}</span>
      </div>
    </button>
  );
}
