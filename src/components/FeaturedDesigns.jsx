import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

/* colour helpers */
const p = (hex) => {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
};
const rgb = (r, g, b) =>
  `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
const dk = (hex, t = 0.22) => {
  const [r, g, b] = p(hex);
  return rgb(r * (1 - t), g * (1 - t), b * (1 - t));
};
const lt = (hex, t = 0.28) => {
  const [r, g, b] = p(hex);
  return rgb(r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t);
};

/* ── Compact sneaker SVG used across all 6 gallery cards ──────── */
function GallerySneaker({ M, S, SL, type = "classic" }) {
  const isHigh = type === "hightop";
  const isSkate = type === "skate";
  const isRun = type === "running";

  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient
          id={`gu_${M.replace("#", "")}`}
          x1="0%"
          y1="0%"
          x2="55%"
          y2="100%"
        >
          <stop offset="0%" stopColor={lt(M, 0.3)} />
          <stop offset="45%" stopColor={M} />
          <stop offset="100%" stopColor={dk(M, 0.32)} />
        </linearGradient>
        <linearGradient
          id={`gs_${SL.replace("#", "")}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={lt(SL, 0.14)} />
          <stop offset="100%" stopColor={dk(SL, 0.3)} />
        </linearGradient>
        <filter id="gd">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="10"
            floodColor="#000"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      {/* shadow */}
      <ellipse cx="204" cy="228" rx="172" ry="12" fill="#000" opacity="0.09" />

      {/* outsole */}
      <path
        d="M56 210 Q64 224 204 230 Q344 224 352 210 L348 202 Q282 216 204 220 Q126 216 60 202Z"
        fill={dk(SL, 0.38)}
      />
      {/* midsole */}
      <path
        d="M60 204 Q68 218 204 222 Q340 218 348 204 L344 196 Q280 210 204 214 Q128 210 64 196Z"
        fill={`url(#gs_${SL.replace("#", "")})`}
      />

      {/* upper */}
      {isHigh ? (
        <>
          {/* ankle shaft */}
          <path
            d="M134 96 L188 74 Q196 48 222 42 Q252 36 272 56 Q288 72 288 98 L286 138 Q264 122 234 116 Q212 110 196 118 L178 124 Q160 110 148 90Z"
            fill={`url(#gu_${M.replace("#", "")})`}
            filter="url(#gd)"
          />
          <path
            d="M222 42 Q258 38 286 66 Q298 84 288 98 L286 134 Q268 118 234 112 L234 42Z"
            fill={dk(M, 0.18)}
            opacity="0.55"
          />
          {/* lower body */}
          <path
            d="M52 204 Q48 138 66 112 Q84 86 114 74 L136 130 L134 204Z"
            fill={`url(#gu_${M.replace("#", "")})`}
            filter="url(#gd)"
          />
          <path
            d="M134 130 Q196 116 286 136 L284 204 Q204 214 134 210Z"
            fill={M}
            opacity="0.88"
          />
        </>
      ) : (
        <path
          d="M52 204 Q48 132 70 104 Q92 76 132 64 L250 52 Q316 46 348 70 Q380 94 380 140 Q382 172 378 206Z"
          fill={`url(#gu_${M.replace("#", "")})`}
          filter="url(#gd)"
        />
      )}

      {/* toe cap */}
      <path
        d={
          isHigh
            ? "M52 204 Q48 170 60 148 Q72 126 94 112 Q114 98 138 90 L138 166 Q104 172 78 188 Q60 198 54 208Z"
            : "M52 204 Q48 162 64 138 Q78 114 104 100 Q126 88 150 82 L150 158 Q110 164 82 182 Q62 194 54 208Z"
        }
        fill={lt(S, 0.06)}
        opacity="0.90"
      />
      <path
        d={
          isHigh
            ? "M66 196 Q88 180 114 170 Q130 164 138 160"
            : "M66 196 Q90 178 118 166 Q136 160 150 156"
        }
        stroke={dk(S, 0.3)}
        strokeWidth="1.2"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.60"
      />

      {/* tongue */}
      <path
        d={
          isHigh
            ? "M178 120 Q206 110 230 110 Q246 110 250 118 L256 196 Q224 206 200 198Z"
            : "M162 64 Q188 56 210 56 Q226 56 230 64 L236 152 Q208 162 184 152Z"
        }
        fill={dk(S, 0.04)}
        opacity="0.88"
      />

      {/* running swoosh */}
      {isRun && (
        <path
          d="M110 80 Q192 62 272 80 Q308 90 324 112 Q286 96 214 92 Q150 90 118 114Z"
          fill={S}
          opacity="0.50"
        />
      )}

      {/* heel */}
      <path
        d={
          isHigh
            ? "M286 100 Q318 124 316 172 Q318 196 312 212 Q300 216 294 196 Q292 172 290 142Z"
            : "M348 72 Q378 96 376 144 Q378 174 372 206 Q358 210 350 190 Q346 162 344 128Z"
        }
        fill={lt(S, 0.1)}
        opacity="0.72"
      />

      {/* collar */}
      <path
        d={
          isHigh
            ? "M188 192 Q212 184 248 188 Q270 192 282 202 Q262 214 240 218 Q208 224 190 220 Q172 214 170 204Z"
            : "M186 148 Q212 140 248 144 Q272 148 288 158 Q264 172 240 176 Q204 182 184 178 Q164 172 162 160Z"
        }
        fill={dk(S, 0.06)}
        opacity="0.72"
      />
      <path
        d={isHigh ? "M180 198 Q220 190 276 198" : "M168 154 Q216 146 282 154"}
        stroke={lt(S, 0.35)}
        strokeWidth="1.5"
        fill="none"
        opacity="0.40"
      />

      {/* skate triple-stitch */}
      {isSkate &&
        [0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M66 ${196 - i * 16} Q90 ${178 - i * 16} 118 ${166 - i * 16} Q136 ${160 - i * 16} 150 ${156 - i * 16}`}
            stroke={dk(S, 0.3)}
            strokeWidth="1.2"
            strokeDasharray="4 3"
            fill="none"
            opacity={0.55 - i * 0.15}
          />
        ))}

      {/* eyelets + laces */}
      {Array.from({ length: isHigh ? 6 : 5 }).map((_, i) => (
        <g key={i}>
          <circle
            cx={isHigh ? 196 : 170}
            cy={(isHigh ? 124 : 68) + i * (isHigh ? 12 : 17)}
            r={4}
            fill={dk(M, 0.28)}
            stroke={lt(S, 0.22)}
            strokeWidth="1.5"
          />
          <circle
            cx={isHigh ? 248 : 228}
            cy={(isHigh ? 124 : 68) + i * (isHigh ? 12 : 17)}
            r={4}
            fill={dk(M, 0.28)}
            stroke={lt(S, 0.22)}
            strokeWidth="1.5"
          />
          <line
            x1={isHigh ? 200 : 174}
            y1={(isHigh ? 124 : 68) + i * (isHigh ? 12 : 17)}
            x2={isHigh ? 244 : 224}
            y2={(isHigh ? 124 : 68) + i * (isHigh ? 12 : 17)}
            stroke="#F5F5F3"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.96"
          />
          <line
            x1={isHigh ? 200 : 174}
            y1={(isHigh ? 121 : 65) + i * (isHigh ? 12 : 17)}
            x2={isHigh ? 244 : 224}
            y2={(isHigh ? 121 : 65) + i * (isHigh ? 12 : 17)}
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.35"
          />
        </g>
      ))}

      {/* highlight streak */}
      <path
        d={
          isHigh
            ? "M78 112 Q160 82 250 70 Q298 62 320 76"
            : "M78 112 Q164 80 258 66 Q316 58 360 76"
        }
        stroke="white"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
        opacity="0.06"
      />

      {/* SC brand */}
      <text
        x={isHigh ? "88" : "100"}
        y={isHigh ? "168" : "156"}
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="700"
        opacity="0.10"
        letterSpacing="2"
        fontFamily="sans-serif"
      >
        SOLECRAFT
      </text>
    </svg>
  );
}

/* ── Catalogue ─────────────────────────────────────────────────── */
const DESIGNS = [
  {
    id: "midnight-runner",
    name: "Midnight Runner",
    desc: "Dark energy, sleek silhouette",
    type: "02",
    color: "Black",
    src: "/black-02.png",
    bg: "#181820",
    badges: ["Sport", "Premium"],
    bv: ["default", "secondary"],
  },
  {
    id: "desert-cream",
    name: "Desert Cream",
    desc: "Warm tones, minimal edge",
    type: "01",
    color: "White",
    src: "/white-01.png",
    bg: "#F7F0E6",
    badges: ["Minimal", "Casual"],
    bv: ["secondary", "outline"],
  },
  {
    id: "ocean-pulse",
    name: "Ocean Pulse",
    desc: "Cool depths, fluid motion",
    type: "02",
    color: "White",
    src: "/white-02.png",
    bg: "#E8F0FE",
    badges: ["Sport", "Bold"],
    bv: ["default", "secondary"],
  },
  {
    id: "retro-court",
    name: "Retro Court",
    desc: "Vintage vibes, modern craft",
    type: "03",
    color: "Black",
    src: "/black-03.png",
    bg: "#FFF3F2",
    badges: ["Retro", "Classic"],
    bv: ["secondary", "outline"],
  },
  {
    id: "urban-shadow",
    name: "Urban Shadow",
    desc: "Street edge, muted palette",
    type: "04",
    color: "Black",
    src: "/black-04.png",
    bg: "#EFEFEF",
    badges: ["Streetwear", "Bold"],
    bv: ["default", "secondary"],
  },
  {
    id: "soft-minimal",
    name: "Soft Minimal",
    desc: "Pure calm, clean lines",
    type: "01",
    color: "White",
    src: "/white-01.png",
    bg: "#F5F5F3",
    badges: ["Minimal", "Premium"],
    bv: ["secondary", "outline"],
  },
];

const TYPE_LABEL = {
  "01": "Classic Sneaker",
  "02": "Running Shoe",
  "03": "High-Top Sneaker",
  "04": "Skate Shoe",
};

export default function FeaturedDesigns({ onStartDesigning }) {
  return (
    <section id="designs" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
              Gallery
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Featured Designs
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            Community-loved concepts crafted in the SOLECRAFT studio. Your
            design could be next.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESIGNS.map((d) => (
            <Card
              key={d.id}
              className="border-border/50 hover-lift overflow-hidden group cursor-pointer bg-card"
            >
              <CardContent className="p-0">
                {/* ── shoe preview ── */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    backgroundColor: d.bg,
                    height: d.type === "03" ? "196px" : "168px",
                  }}
                >
                  {/* dot grid */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(0,0,0,0.09) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* shoe photo */}
                  <div
                    className="absolute inset-0 flex items-center justify-center px-5 py-3
                                  transition-transform duration-500 group-hover:scale-105"
                  >
                    <img src={d.src} alt={d.name} className="h-full w-full object-contain" />
                  </div>

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

                  {/* type pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full
                                     bg-white/90 backdrop-blur-sm border border-black/8
                                     text-zinc-700 shadow-sm"
                    >
                      {TYPE_LABEL[d.type]}
                    </span>
                  </div>

                  {/* arrow on hover */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-xl bg-white/90 backdrop-blur-sm border border-black/8 shadow-sm"
                      onClick={onStartDesigning}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* ── info ── */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-base">{d.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {d.desc}
                      </p>
                    </div>
                    {/* color swatches */}
                    <div className="flex gap-1 flex-shrink-0 pt-0.5">
                      {[d.color, d.color, d.color].map((c, i) => (
                        <div
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-black/12 shadow-sm"
                          style={{ backgroundColor: c === "Black" ? "#1a1a1a" : "#f5f5f5" }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {d.badges.map((b, i) => (
                      <Badge
                        key={b}
                        variant={d.bv[i]}
                        className="text-xs rounded-full px-2.5"
                      >
                        {b}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={onStartDesigning}
            className="gap-2 group"
          >
            Create Your Own Design
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
