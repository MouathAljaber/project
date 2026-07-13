import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Save, Share2, RotateCcw, CheckCircle, Link, Download } from "lucide-react";
import { getVariantForSelection } from "../lib/shoeCatalog";
import showToast from "../lib/toast";

const colorDots = {
  Black: "#1a1a1a",
  White: "#f5f5f5",
  Cream: "#f0e8d8",
  Red: "#c0392b",
  Blue: "#2980b9",
  Green: "#27ae60",
  Purple: "#8e44ad",
  Grey: "#7f8c8d",
  Gold: "#d4a017",
  Pink: "#e91e8c",
  Gum: "#c4956a",
  Transparent: "#e8e8e8",
};

function SummaryRow({ label, value, colorKey }) {
  return (
    <div className="flex items-center justify-between py-2.5 gap-3">
      <span className="text-xs text-muted-foreground font-medium shrink-0">{label}</span>
      <div className="flex items-center gap-2 min-w-0">
        {colorKey && colorDots[colorKey] && (
          <div
            className="w-3.5 h-3.5 rounded-full border border-border shrink-0"
            style={{ backgroundColor: colorDots[colorKey] }}
          />
        )}
        <span className="text-xs font-semibold text-right truncate">{value || "—"}</span>
      </div>
    </div>
  );
}

export default function DesignSummary({ design, variant: variantProp, onReset }) {
  const [saveOpen, setSaveOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const variant = variantProp || getVariantForSelection(design);
  const [saved, setSaved] = useState([]);

  // load saved designs from localStorage
  React.useEffect(() => {
    try {
      const key = 'solecraft.savedDesigns';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      setSaved(existing.slice().reverse());
    } catch (e) {
      setSaved([]);
    }
  }, [saveOpen]);

  const summaryItems = [
    { label: "Type", value: variant.type },
    { label: "Model", value: variant.name },
    { label: "Color", value: variant.color, colorKey: variant.color },
    { label: "File", value: variant.file },
  ];

  return (
    <>
      <div className="space-y-4">
        {/* Summary Card */}
        <Card className="border-border/60">
          <CardHeader className="pb-3 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Design Summary</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="divide-y divide-border/40">
              {summaryItems.map((item) => (
                <SummaryRow key={item.label} {...item} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="space-y-2.5">
          <Button className="w-full gap-2 rounded-xl" onClick={() => setSaveOpen(true)}>
            <Save className="w-4 h-4" />
            Save Design
          </Button>
          <Button variant="outline" className="w-full gap-2 rounded-xl" onClick={() => setShareOpen(true)}>
            <Share2 className="w-4 h-4" />
            Share Design
          </Button>
          <Button variant="ghost" className="w-full gap-2 rounded-xl text-muted-foreground" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </Button>
        </div>

        {/* Design name preview */}
        <Card className="border-border/40 bg-secondary/30">
          <CardContent className="p-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground">Your Selection</p>
            <p className="font-bold text-sm">{variant.name}</p>
            <p className="text-xs text-muted-foreground">{variant.color} · {variant.file}</p>
          </CardContent>
        </Card>

        {/* Saved designs (local) */}
        <Card className="border-border/40">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-sm font-semibold">Saved Designs</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {saved.length === 0 ? (
              <p className="text-xs text-muted-foreground">No saved designs yet. Save one from the dialog.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {saved.slice(0, 6).map((s, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.name} · {s.color}</p>
                      <p className="text-xs text-muted-foreground truncate">{new Date(s.savedAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={s.src} download={s.file} className="text-xs text-foreground hover:underline">Download</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Save Dialog */}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle>Design Saved!</DialogTitle>
            <DialogDescription>
              Your shoe selection has been saved successfully. This is a prototype action — no data is stored.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-secondary/50 rounded-xl p-4 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium">{variant.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Color</span>
              <span className="font-medium">{variant.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">File</span>
              <span className="font-medium">{variant.file}</span>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                try {
                  // persist to localStorage
                  const key = 'solecraft.savedDesigns';
                  const existing = JSON.parse(localStorage.getItem(key) || '[]');
                  existing.push({ type: variant.type, name: variant.name, color: variant.color, file: variant.file, src: variant.src, savedAt: Date.now() });
                  localStorage.setItem(key, JSON.stringify(existing));

                  // trigger a download
                  const link = document.createElement('a');
                  link.href = variant.src;
                  link.download = variant.file || 'design.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  showToast('Design saved locally and download started');
                } catch (e) {
                  showToast('Unable to save/download');
                }
                setSaveOpen(false);
              }}
              className="w-full rounded-xl gap-2"
            >
              <Download className="w-4 h-4" />
              Download Concept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onOpenChange={(open) => { setShareOpen(open); if (!open) setCopied(false); }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-3">
              <Link className="w-6 h-6 text-blue-600" />
            </div>
            <DialogTitle>Share Your Design</DialogTitle>
            <DialogDescription>
              A share link has been generated. This is a prototype action — no real link is created.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 bg-secondary rounded-xl p-3">
            <code className="text-xs text-muted-foreground flex-1 truncate">{typeof window !== 'undefined' ? window.location.href : ''}</code>
            <Button
              size="sm"
              variant={copied ? "secondary" : "outline"}
              className="shrink-0 rounded-lg text-xs h-7"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  showToast('Link copied to clipboard');
                } catch (e) {
                  // fallback
                  try {
                    const el = document.createElement('textarea');
                    el.value = window.location.href;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                    setCopied(true);
                    showToast('Link copied to clipboard');
                  } catch (err) {
                    showToast('Unable to copy link');
                  }
                }
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareOpen(false)} className="w-full rounded-xl">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
