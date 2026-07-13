import React, { useMemo, useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronLeft, Palette } from "lucide-react";
import ColorSwatch from "./ColorSwatch";
import ShoePreview from "./ShoePreview";
import DesignSummary from "./DesignSummary";
import { DEFAULT_SHOE_SELECTION, SHOE_MODELS, getAvailableColors, getModelByType, AVAILABLE_SIZES } from "../lib/shoeCatalog";
import { getVariantForSelection } from "../lib/shoeCatalog";

function ModelButton({ model, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all duration-150 ${
        selected
          ? "border-foreground bg-foreground text-background shadow-sm"
          : "border-border bg-background hover:border-foreground/40 hover:bg-accent/50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-70">Type {model.type}</p>
          <p className="font-semibold">{model.name}</p>
          <p className="text-xs opacity-70">{model.category}</p>
        </div>
        <Badge variant={selected ? "secondary" : "outline"} className="rounded-full px-2.5 text-[10px]">
          {model.colors.length} photos
        </Badge>
      </div>
    </button>
  );
}

export default function ShoeCustomizer({ onBack }) {
  const [design, setDesign] = useState(DEFAULT_SHOE_SELECTION);

  // Initialize design from URL query params if present (shareable links)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const modelType = params.get("modelType");
      const color = params.get("color");
      const size = params.get("size");
      if (modelType || color || size) {
        setDesign((prev) => ({
          modelType: modelType || prev.modelType,
          color: color || prev.color,
          size: size || prev.size,
        }));
        return;
      }
    } catch (e) {
      // ignore
    }

    // no URL params, restore last design from localStorage if available
    try {
      const last = JSON.parse(localStorage.getItem('solecraft.lastDesign') || 'null');
      if (last && last.modelType) setDesign((prev) => ({ ...prev, ...last }));
    } catch (e) {}
  }, []);

  const selectedModel = useMemo(() => getModelByType(design.modelType), [design.modelType]);
  const variant = useMemo(() => getVariantForSelection(design), [design.modelType, design.color]);
  const availableColors = useMemo(() => getAvailableColors(design.modelType), [design.modelType]);

  const applyModel = (modelType) => {
    setDesign((prev) => {
      const nextModel = getModelByType(modelType);
      const next = {
        modelType,
        color: nextModel.colors.includes(prev.color) ? prev.color : nextModel.defaultColor,
      };
      // reflect in URL
      try {
        const p = new URLSearchParams(window.location.search);
        p.set("modelType", next.modelType);
        p.set("color", next.color);
        if (prev.size) p.set("size", prev.size);
        const url = `${window.location.pathname}?${p.toString()}`;
        window.history.replaceState({}, "", url);
      } catch (e) {}
      return next;
    });
  };

  const applyColor = (color) => {
    setDesign((prev) => {
      const next = { ...prev, color };
      try {
        const p = new URLSearchParams(window.location.search);
        p.set("modelType", next.modelType);
        p.set("color", next.color);
        if (next.size) p.set("size", next.size);
        const url = `${window.location.pathname}?${p.toString()}`;
        window.history.replaceState({}, "", url);
      } catch (e) {}
      return next;
    });
  };

  const applySize = (size) => {
    setDesign((prev) => {
      const next = { ...prev, size };
      try {
        const p = new URLSearchParams(window.location.search);
        p.set("modelType", next.modelType);
        p.set("color", next.color);
        p.set("size", next.size);
        const url = `${window.location.pathname}?${p.toString()}`;
        window.history.replaceState({}, "", url);
      } catch (e) {}
      return next;
    });
  };

  // autosave last design to localStorage whenever design changes
  useEffect(() => {
    try {
      localStorage.setItem('solecraft.lastDesign', JSON.stringify(design));
    } catch (e) {}
  }, [design]);

  // keyboard support for size selector
  const sizeListRef = useRef(null);
  const handleSizeKeyDown = (e) => {
    const sizes = AVAILABLE_SIZES.map(String);
    const current = design.size || String(AVAILABLE_SIZES[0]);
    const idx = sizes.indexOf(String(current));
    if (idx === -1) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const next = sizes[Math.min(sizes.length - 1, idx + 1)];
      applySize(next);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const prev = sizes[Math.max(0, idx - 1)];
      applySize(prev);
      e.preventDefault();
    }
  };

  const reset = () => setDesign(DEFAULT_SHOE_SELECTION);

  const ControlPanel = () => (
    <div className="space-y-4 overflow-y-auto scrollbar-none h-full">
      <Card className="border-border/60">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-sm font-semibold">Shoe Type</CardTitle>
          <p className="text-xs text-muted-foreground">Choose one of the four supplied product photos.</p>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-2.5">
          {SHOE_MODELS.map((model) => (
            <ModelButton
              key={model.type}
              model={model}
              selected={design.modelType === model.type}
              onClick={() => applyModel(model.type)}
            />
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            Color
          </CardTitle>
          <p className="text-xs text-muted-foreground">Only colors with matching files are shown for the selected shoe type.</p>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex flex-wrap gap-3">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => applyColor(color)}
                className={`flex flex-col items-center gap-2 rounded-xl border px-2.5 py-2 text-xs font-medium transition-all duration-150 ${
                  design.color === color
                    ? "border-foreground bg-accent/60 text-foreground shadow-sm"
                    : "border-transparent text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                <ColorSwatch color={color} selected={design.color === color} />
                <span>{color}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-sm font-semibold">Size</CardTitle>
          <p className="text-xs text-muted-foreground">Choose your shoe size.</p>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div
            ref={sizeListRef}
            role="listbox"
            aria-label="Shoe sizes"
            tabIndex={0}
            onKeyDown={handleSizeKeyDown}
            className="flex flex-wrap gap-2"
          >
            {AVAILABLE_SIZES.map((s) => (
              <button
                key={s}
                role="option"
                aria-selected={design.size === String(s)}
                tabIndex={-1}
                onClick={() => applySize(String(s))}
                className={`px-3 py-2 rounded-lg text-sm transition-colors border ${design.size === String(s) ? 'bg-foreground text-background border-foreground' : 'bg-background text-muted-foreground hover:border-foreground/30'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MobileLayout = () => (
    <div className="lg:hidden space-y-4">
      <div className="h-80">
        <ShoePreview design={design} />
      </div>

      <Tabs defaultValue="customize">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="customize" className="mt-4">
          <ControlPanel />
        </TabsContent>
        <TabsContent value="summary" className="mt-4">
          <DesignSummary variant={variant} onReset={reset} />
        </TabsContent>
      </Tabs>
    </div>
  );

  const DesktopLayout = () => (
    <div className="hidden lg:grid lg:grid-cols-[320px_1fr_280px] gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      <div className="overflow-y-auto scrollbar-none pr-2">
        <ControlPanel />
      </div>

      <div className="flex flex-col gap-4">
        <ShoePreview design={design} />
        <Card className="border-border/60">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catalog mode</p>
              <p className="font-semibold">
                {selectedModel.name} · {design.color}
              </p>
              <p className="text-xs text-muted-foreground">Matching asset: {selectedModel.assets[design.color] || selectedModel.assets[selectedModel.defaultColor]}</p>
            </div>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {availableColors.length} photos
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-y-auto scrollbar-none">
        <DesignSummary variant={variant} onReset={reset} />
      </div>
    </div>
  );

  return (
    <section id="studio" className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2 gap-1.5 text-muted-foreground">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Design Studio</h1>
            <p className="text-sm text-muted-foreground">
              Pick a model and color from the supplied photo set. No extra knobs, just the catalog.
            </p>
          </div>

          <Badge variant="outline" className="gap-1.5 text-xs">
            Catalog Mode
          </Badge>
        </div>

        <DesktopLayout />
        <MobileLayout />
      </div>
    </section>
  );
}
