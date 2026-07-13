import React from "react";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";

export default function ColorSwatch({ color, label, selected, onClick, size = "md" }) {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const colorMap = {
    Black: "#1a1a1a",
    White: "#f5f5f5",
    Cream: "#f0e8d8",
    Red: "#c0392b",
    Blue: "#2980b9",
    "Navy Blue": "#1b2a4a",
    Green: "#27ae60",
    Purple: "#8e44ad",
    Grey: "#7f8c8d",
    Gold: "#d4a017",
    Pink: "#e91e8c",
    Gum: "#c4956a",
    Transparent: "linear-gradient(135deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0), linear-gradient(135deg, #e0e0e0 25%, white 25%, white 75%, #e0e0e0 75%, #e0e0e0)",
  };

  const bgColor = colorMap[color] || color;
  const isTransparent = color === "Transparent";

  return (
    <div
      role="img"
      aria-label={label || color}
      title={label || color}
      className={cn(
        "relative rounded-full transition-all duration-200 flex items-center justify-center group",
        sizeClasses[size],
        selected ? "swatch-ring scale-110" : "hover:scale-110 border-2 border-transparent"
      )}
      style={
        isTransparent
          ? {
              backgroundImage: bgColor,
              backgroundSize: "8px 8px",
              backgroundPosition: "0 0, 4px 4px",
              border: selected ? "2px solid #1a1a1a" : "2px solid #e5e5e5",
            }
          : {
              backgroundColor: bgColor,
              border: selected ? "2px solid #1a1a1a" : "2px solid transparent",
            }
      }
    >
      {selected && (
        <Check className={cn("w-3 h-3", ["White", "Cream", "Transparent"].includes(color) ? "text-foreground" : "text-white")} />
      )}
    </div>
  );
}
