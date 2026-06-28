import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Sparkles, Eye, Palette, Type } from "lucide-react";

// eslint-disable-next-line no-unused-vars
function ShoeIllustration({
  primaryColor = "#1c1c1e",
}) {
  const P = primaryColor;
  const S = secondaryColor;
  const SL = soleColor;
  // simple inline helpers
  const dk = (hex, a = 0.18) => {
    try {
      const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${Math.round(r * (1 - a))},${Math.round(g * (1 - a))},${Math.round(b * (1 - a))})`;
    } catch {
      return hex;
    }
  };
  const lt = (hex, a = 0.25) => {
    try {
      const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${Math.round(r + (255 - r) * a)},${Math.round(g + (255 - g) * a)},${Math.round(b + (255 - b) * a)})`;
    } catch {
      return hex;
    }
  };

  return (
    <svg
      viewBox="0 0 540 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl"
    >
      <defs>
        <filter id="heroShadow" x="-5%" y="-5%" width="115%" height="130%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="16"
            floodColor="#000"
            floodOpacity="0.18"
          />
        </filter>
        <radialGradient id="heroAmb" cx="38%" cy="34%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.16" />
          <stop offset="100%" stopColor="black" stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id="heroSole" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lt(SL, 0.14)} />
          <stop offset="100%" stopColor={dk(SL, 0.22)} />
        </linearGradient>
        <linearGradient id="heroHighlight" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="272" cy="274" rx="228" ry="15" fill="#000" opacity="0.09" />

      {/* ── OUTSOLE ── */}
      <path
        d="M58 254 Q68 270 272 278 Q476 270 486 254 L480 244 Q384 260 272 264 Q160 260 64 244Z"
        fill={dk(SL, 0.35)}
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={i}
          x1={86 + i * 54}
          y1={262}
          x2={108 + i * 54}
          y2={270}
          stroke={dk(SL, 0.5)}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
        />
      ))}

      {/* ── MIDSOLE ── */}
      <path
        d="M64 246 Q76 262 272 268 Q468 262 478 246 L472 236 Q382 252 272 256 Q162 252 70 236Z"
        fill="url(#heroSole)"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx={120 + i * 68}
          cy={248}
          rx={10}
          ry={5}
          fill={dk(SL, 0.15)}
          opacity="0.4"
        />
      ))}
      <path
        d="M70 238 Q272 250 472 238"
        stroke="white"
        strokeWidth="2"
        opacity="0.22"
        fill="none"
      />

      {/* ── UPPER BODY ── */}
      <path
        d="M58 246 Q52 166 84 132 Q114 98 172 82 L280 70 Q374 62 424 92 Q472 122 476 178 Q480 216 474 248Z"
        fill={P}
        filter="url(#heroShadow)"
      />
      <path
        d="M58 246 Q52 166 84 132 Q114 98 172 82 L280 70 Q374 62 424 92 Q472 122 476 178 Q480 216 474 248Z"
        fill="url(#heroAmb)"
      />

      {/* ── TOE BOX ── */}
      <path
        d="M58 246 Q52 194 72 162 Q92 130 128 112 Q162 94 200 86 L200 204 Q148 210 108 234 Q80 246 60 250Z"
        fill={S}
        opacity="0.92"
      />
      <path
        d="M76 238 Q106 218 144 206 Q172 196 200 192"
        stroke={dk(S, 0.28)}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M72 222 Q100 202 138 190 Q166 180 200 176"
        stroke={dk(S, 0.28)}
        strokeWidth="1"
        strokeDasharray="5 4"
        fill="none"
        opacity="0.35"
      />

      {/* ── TONGUE ── */}
      <path
        d="M218 88 Q256 76 290 76 Q312 76 318 86 L326 194 Q280 208 240 196Z"
        fill={S}
        opacity="0.76"
      />
      <path
        d="M232 108 Q282 98 314 106"
        stroke={dk(S, 0.25)}
        strokeWidth="1.4"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M232 126 Q282 116 314 124"
        stroke={dk(S, 0.25)}
        strokeWidth="1.4"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M232 144 Q282 134 314 142"
        stroke={dk(S, 0.25)}
        strokeWidth="1.2"
        fill="none"
        opacity="0.38"
      />
      <rect
        x="264"
        y="156"
        width="44"
        height="28"
        rx="5"
        fill={P}
        opacity="0.52"
      />
      <text
        x="286"
        y="175"
        textAnchor="middle"
        fill={S}
        fontSize="10"
        fontFamily="sans-serif"
        fontWeight="800"
        opacity="0.72"
      >
        SC
      </text>

      {/* ── QUARTER PANEL ── */}
      <path
        d="M290 76 Q380 68 424 96 Q466 124 470 180 L406 200 Q358 182 290 176Z"
        fill={P}
        opacity="0.7"
      />
      <path
        d="M390 82 Q444 108 460 164 Q468 192 464 218 L452 222 Q452 198 444 168 Q428 130 390 104Z"
        fill={dk(P, 0.1)}
        opacity="0.4"
      />

      {/* ── HEEL COUNTER ── */}
      <path
        d="M426 96 Q472 130 470 184 Q472 220 464 248 Q446 252 436 228 Q430 196 428 158 Q426 124 426 96Z"
        fill={S}
        opacity="0.68"
      />
      <path
        d="M450 116 Q458 160 456 210 Q454 236 446 250"
        stroke={dk(S, 0.3)}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M438 112 Q444 156 442 206 Q440 232 434 248"
        stroke={lt(S, 0.2)}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.22"
      />

      {/* ── COLLAR ── */}
      <path
        d="M242 192 Q286 180 348 186 Q392 192 420 208 Q390 228 354 234 Q298 242 256 238 Q222 234 216 216Z"
        fill={S}
        opacity="0.6"
      />
      <path
        d="M232 202 Q286 192 344 198 Q386 202 414 214"
        stroke={lt(S, 0.2)}
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
      />

      {/* ── 3 STRIPES ── */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${308 + i * 18} 80 Q${322 + i * 18} 110 ${326 + i * 18} 146 Q${330 + i * 18} 174 ${324 + i * 18} 198`}
          stroke={lt(S, 0.15)}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
      ))}

      {/* ── HIGHLIGHT STREAK ── */}
      <path
        d="M90 148 Q190 112 310 96 Q380 86 434 100"
        stroke="white"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
        opacity="0.07"
      />

      {/* ── EYELETS ── */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <circle
            cx={240}
            cy={92 + i * 18}
            r={5}
            fill={dk(P, 0.18)}
            stroke={S}
            strokeWidth="2"
          />
          <circle
            cx={240}
            cy={92 + i * 18}
            r={2.5}
            fill={dk(P, 0.3)}
            opacity="0.7"
          />
          <circle
            cx={316}
            cy={92 + i * 18}
            r={5}
            fill={dk(P, 0.18)}
            stroke={S}
            strokeWidth="2"
          />
          <circle
            cx={316}
            cy={92 + i * 18}
            r={2.5}
            fill={dk(P, 0.3)}
            opacity="0.7"
          />
        </g>
      ))}

      {/* ── LACES ── */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line
            x1={245}
            y1={92 + i * 18}
            x2={311}
            y2={92 + i * 18}
            stroke="#f0ece6"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.96"
          />
          <line
            x1={245}
            y1={90 + i * 18}
            x2={311}
            y2={90 + i * 18}
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.32"
          />
        </g>
      ))}
      {/* lace bow */}
      <path
        d="M262 190 Q278 182 294 190"
        stroke="#f0ece6"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M266 190 Q256 202 248 198"
        stroke="#f0ece6"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M290 190 Q300 202 308 198"
        stroke="#f0ece6"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── BRAND ── */}
      <text
        x="136"
        y="174"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="700"
        opacity="0.14"
        letterSpacing="2.5"
        fontFamily="sans-serif"
      >
        SOLECRAFT
      </text>
    </svg>
  );
}

const floatingFeatures = [
  {
    icon: Eye,
    label: "Live Preview",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Sparkles,
    label: "Catalog Mode",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Palette,
    label: "Photo Assets",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: Type,
    label: "Simple Selection",
    color: "bg-green-50 text-green-600 border-green-100",
  },
];

export default function Hero({ onStartDesigning }) {
  return (
    <section className="relative min-h-screen hero-gradient flex items-center pt-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 noise-bg pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/80 text-xs font-medium text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-soft" />
              Introducing SOLECRAFT Studio
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-gradient">
                Design Shoes
                <br />
                That Are
                <br />
                <span className="text-gradient-warm">Truly Yours</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Create custom sneakers in minutes with an interactive design
                studio built for personal style, comfort, and creativity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={onStartDesigning} className="gap-2">
                  Start Designing
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("designs")?.scrollIntoView({ behavior: "smooth" })}
                  className="gap-2"
                >
                  View Inspiration
                </Button>
            </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold">10</p>
                  <p className="text-xs text-muted-foreground">Catalog Photos</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground">Base Models</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Color Filters</p>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative animate-slide-up">
              <div className="relative">
                <Card className="relative overflow-hidden border-border/50 shadow-2xl">
                  <CardContent className="p-0">
                    <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />

                      <img
                        src="/white-01.png"
                        alt="Classic Sneaker photo"
                        className="absolute inset-0 w-full h-full object-contain px-8 py-6"
                        style={{ zIndex: 1 }}
                      />

                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-black/8 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-zinc-700">Catalog Preview</span>
                      </div>

                      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-black/8 shadow-sm">
                        {['#f5f5f5', '#1a1a1a'].map((c, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full border border-black/10 shadow-sm"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                        <span className="text-xs text-zinc-600 font-medium">White · Black</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/50">
                      <div>
                        <p className="font-semibold text-sm">Classic Catalog</p>
                        <p className="text-xs text-muted-foreground">Classic Sneaker · Photo asset</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">Catalog Mode</Badge>
                    </div>
                  </CardContent>
                </Card>

                {floatingFeatures.map((feature, i) => {
                  const positions = [
                    "-top-4 -left-6",
                    "-top-4 -right-6",
                    "-bottom-4 -left-6",
                    "-bottom-4 -right-6",
                  ];
                  const delays = ["0s", "0.5s", "1s", "1.5s"];
                  return (
                    <div
                      key={feature.label}
                      className={`absolute ${positions[i]} animate-float hidden sm:flex`}
                      style={{ animationDelay: delays[i] }}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border shadow-lg bg-card/90 backdrop-blur-sm text-xs font-medium">
                        <feature.icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{feature.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
