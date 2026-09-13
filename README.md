# Palette Studio

A modern, minimal color palette generator for designers and developers.

Palette Studio makes it easy to generate, customize, inspect, organize, and export color palettes for digital products and design systems.

> Built with a focus on clean UX, accessibility, smooth interactions, and a minimal Swiss-inspired visual language.

---

## ✨ Features

### Palette Generation

* Generate random color palettes
* Multiple harmony modes
* Random
* Analogous
* Complementary
* Triadic
* Monochromatic
* Preserve locked colors when regenerating

### Color Editing

* Select individual colors
* Edit color names
* Edit HEX values
* Native color picker
* Copy HEX values
* Lock / unlock colors
* Duplicate colors
* Delete colors
* Reorder colors with drag and drop

### Color Inspector

Inspect selected colors with:

* HEX
* RGB
* HSL
* OKLCH
* WCAG contrast information

### Palette Management

* Save palettes locally
* Load saved palettes
* Update saved palettes
* Delete saved palettes
* Rename palettes
* Import palettes

### Keyboard Shortcuts

| Shortcut | Action                       |
| -------- | ---------------------------- |
| `Space`  | Generate palette             |
| `C`      | Copy palette                 |
| `S`      | Save palette                 |
| `E`      | Export palette               |
| `I`      | Import palette               |
| `← / →`  | Navigate colors              |
| `L`      | Lock / unlock selected color |
| `Esc`    | Close active overlay         |

---

## 🎨 Design

Palette Studio follows a minimal Swiss-inspired design direction:

* Clean typography
* Generous spacing
* Neutral surfaces
* Subtle borders
* Minimal visual noise
* Smooth micro-interactions
* Functional motion
* Responsive layouts

### Brand Colors

| Color   | HEX       |
| ------- | --------- |
| Purple  | `#72199E` |
| Neutral | `#52605C` |
| Cyan    | `#0ECCD6` |
| Blue    | `#2920D3` |
| Pink    | `#E06BCC` |

---

## 🛠️ Tech Stack

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **Zustand**
* **Motion**
* **Culori**
* **Lucide React**
* **dnd-kit**

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── generator/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   │
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── Footer.tsx
│   │
│   ├── palette/
│   │   ├── PaletteHeader.tsx
│   │   ├── PaletteGrid.tsx
│   │   ├── ColorBlock.tsx
│   │   ├── DraggableColorBlock.tsx
│   │   ├── ColorSlotMenu.tsx
│   │   ├── SelectedColorPanel.tsx
│   │   ├── ColorEditor.tsx
│   │   ├── ColorInspector.tsx
│   │   ├── GeneratorToolbar.tsx
│   │   ├── CollectionsPanel.tsx
│   │   ├── ImportPaletteModal.tsx
│   │   └── ExportPaletteModal.tsx
│   │
│   └── ui/
│       └── Toast.tsx
│
├── hooks/
│   ├── usePaletteShortcuts.ts
│   ├── usePaletteModals.ts
│   └── useToast.ts
│
├── lib/
│   └── color/
│       ├── random.ts
│       ├── harmony.ts
│       └── utils.ts
│
├── store/
│   └── palette-store.ts
│
└── types/
    └── palette.ts
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js 20+
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/palette-studio.git
```

Navigate into the project:

```bash
cd palette-studio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📦 Available Scripts

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Create a production build.

```bash
npm run start
```

Start the production server.

```bash
npm run lint
```

Run ESLint.

---

## 💾 Data Storage

Palette Studio currently uses browser-based local storage for saved palette data.

No backend or database is required for the current version.

Saved palette state is persisted through Zustand.

---

## 🗺️ Roadmap

### Completed

* [x] Landing page
* [x] Palette generator
* [x] Color selection
* [x] Color locking
* [x] Color editing
* [x] Color naming
* [x] Duplicate colors
* [x] Delete colors
* [x] Drag and drop
* [x] Color inspector
* [x] RGB / HSL / OKLCH conversion
* [x] WCAG contrast calculation
* [x] Save palettes
* [x] Import palettes
* [x] Keyboard shortcuts
* [x] Responsive layout

### Planned

* [ ] Export CSS
* [ ] Export SCSS
* [ ] Export JSON
* [ ] Export Tailwind configuration
* [ ] Export SVG
* [ ] Export PNG
* [ ] Design token export
* [ ] Figma-friendly export
* [ ] Shareable palette URLs
* [ ] Advanced accessibility checks
* [ ] Design preview
* [ ] Dark mode
* [ ] Improved palette history
* [ ] More color harmony algorithms

---

## 🎯 Project Goals

Palette Studio is designed as both a useful design utility and a portfolio project demonstrating:

* Modern React architecture
* Next.js application development
* Type-safe TypeScript
* Client-side state management
* Color science and color-space conversion
* Accessibility-aware design
* Interactive UI development
* Drag-and-drop interfaces
* Responsive design
* UX-focused micro-interactions

---

## 📸 Screenshots

Screenshots will be added as the project reaches a more complete UI state.

---

## 📄 License

This project is currently intended as a personal portfolio project.

License details will be added when the project is published for broader use.

---

## 👤 Author

Built as a modern frontend portfolio project.

**Palette Studio** — Generate. Explore. Refine.
