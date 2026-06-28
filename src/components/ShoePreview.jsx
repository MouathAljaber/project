import React, { useMemo } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import ShoeAssetImage from "./ShoeAssetImage";
import { getVariantForSelection } from "../lib/shoeCatalog";

export default function ShoePreview({ design, variant: variantProp }) {
  const variant = useMemo(
    () => variantProp || getVariantForSelection(design),
    [variantProp, design?.modelType, design?.color],
  );

  return (
    <Card className="h-full overflow-hidden border-border/60 bg-gradient-to-br from-white via-background to-secondary/20">
      <CardContent className="relative flex h-full items-center justify-center p-6">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(0,0,0,0.05) 0, transparent 45%)",
          }}
        />

        <div className="absolute left-4 top-4 z-10 flex gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
            Type {variant.type}
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
            {variant.color}
          </Badge>
        </div>

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <ShoeAssetImage
            src={variant.src}
            alt={`${variant.name} in ${variant.color}`}
            className="flex h-full w-full items-center justify-center"
            imgClassName="max-h-[460px] w-full max-w-[760px] object-contain drop-shadow-2xl"
            fallback={
              <div className="rounded-3xl border border-dashed border-border bg-background/80 px-8 py-10 text-center">
                <p className="text-sm font-semibold">Image missing</p>
                <p className="text-xs text-muted-foreground">{variant.file}</p>
              </div>
            }
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
          <div>
            <p className="text-sm font-semibold text-foreground">{variant.name}</p>
            <p className="text-xs text-muted-foreground">
              {variant.category} · {variant.color}
            </p>
          </div>
          <p className="text-xs font-medium text-muted-foreground">{variant.file}</p>
        </div>
      </CardContent>
    </Card>
  );
}
