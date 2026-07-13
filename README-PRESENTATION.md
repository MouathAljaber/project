Presentation Notes — SOLECRAFT Prototype

Quick start (run locally):

1. Install deps:

```
npm install
```

2. Dev server:

```
npm run dev
```

3. Production preview (what I'll demo):

```
npm run build
npm run preview
Open http://localhost:4173/
```

High-impact demo flow (3–5 min):

- Open the Studio (#studio) and show model + color selection updating the preview instantly.
- Pick a `size` and show keyboard navigation for sizes (left/right or arrow keys).
- Save a design (name it) → show saved-list, rename, reorder, and delete.
- Export saved designs JSON and re-import (demo dedupe logic by re-importing the same file).
- Click Share → copy link and open the link in a new tab to show deep-linking (model/color/size in URL).

Key features to highlight:

- Asset-driven photo preview: uses actual PNG assets for pixel-perfect previews.
- Deep-linking: URL query parameters (`modelType`, `color`, `size`) recreate designs without backend.
- Persistence: Autosave last design + named saved designs in localStorage.
- Save & Download: download a packaged PNG asset of the design (client-side download).
- Import/export JSON with dedupe: safe offline sharing of saved collections.
- Accessibility: keyboard navigation for controls, aria-live toasts, focusable saved items.
- Performance: lazy-loading and async decoding for images; small production bundle.

Talking points for judges/stakeholders:

- Why photos? Faster to validate aesthetic choices with curated real images.
- No-backend prototype: demonstrates UX and data flows quickly; backend can be added later.
- Extensible design: adding more models/colors is just adding assets + entries in `shoeCatalog.js`.
- Next steps: server-side persistence, user accounts, order flow, analytics.

Presentation checklist:

- Run `npm run preview` and copy the preview URL.
- Have the saved designs export file ready (I can generate one if you want).
- Optionally, I can produce a short video (30s) recording the demo.

Want me to (pick one):
- Generate a short export sample file of saved designs for the demo.
- Add a simple keyboard shortcut cheat-sheet overlay in the Studio.
- Produce a 30s screencast GIF of the demo flow.
