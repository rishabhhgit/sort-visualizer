# Sort Visualizer

A browser-based tool that visually demonstrates how 12 different sorting algorithms work, animated in real time.

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI components and state management |
| **Vite 8** | Dev server and production build |
| **Tailwind CSS 4** | Styling and layout |
| **JavaScript (ES2022+)** | All sorting logic and interactivity |
| **HTML5** | Single-page app shell |
| **CSS3** | Animations (glow, sweep, shimmer effects) |

---

## Features

- **12 Sorting Algorithms** — Bubble, Insertion, Selection, Merge, Quick, Heap, Shell, Radix, Counting, Bucket, Cocktail, Gnome
- **Real-time Animation** — Watch each comparison, swap, and placement happen step by step
- **Algorithm Explanations** — Click any algorithm to see a plain-English description of how it works
- **Interactive Controls** — Speed slider, array size (5–200), shuffle button
- **Color-coded Bars** — White = comparing, Red = swapping, Yellow = pivot, Green = sorted
- **Live Stats** — Tracks comparisons and swaps as the algorithm runs
- **Completion Sweep** — Green wave animation when sorting finishes
- **Glass Morphism UI** — Modern frosted-glass design

---

## How to Run

```bash
cd web
npm install
npm run dev
```
## Project Structure

```
web/
├── index.html              # App shell
├── package.json            # Dependencies
├── vite.config.js          # Vite + React + Tailwind config
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # State management and sorting logic
│   ├── Controls.jsx        # Algorithm selector, buttons, sliders, explanations
│   ├── Visualizer.jsx      # Bar chart rendering
│   ├── sorting.js          # All 12 sorting algorithms
│   └── index.css           # Tailwind + custom animations
└── public/
    └── favicon.svg         # App icon
```

---

## How It Works

### The Flow

```
User clicks "Sort"
  → App.jsx calls the selected sorting function from sorting.js
    → Sorting function runs step by step, calling onStep() after each action
      → onStep() updates React state (array positions, bar colors, counters)
        → Visualizer.jsx re-renders bars with new heights and colors
          → Browser paints the frame
            → Sorting function pauses (sleep), then repeats
  → When done, sweep animation runs left to right
```

### File Responsibilities

| File | What It Does |
|------|-------------|
| `main.jsx` | Mounts React to the HTML page |
| `App.jsx` | Holds all state, handles sort/shuffle/size changes, maps algorithms |
| `Controls.jsx` | Renders algorithm buttons, sliders, stats, and explanations |
| `Visualizer.jsx` | Renders the bar chart with color-coded states |
| `sorting.js` | Contains all 12 async sorting algorithms |
| `index.css` | Tailwind imports, custom keyframes, glass morphism styles |

### Sorting Algorithm Pattern

Every algorithm in `sorting.js` follows the same structure:

1. Copy the array (never modify the original)
2. Loop through the sorting logic
3. After each comparison or swap, call `onStep()` with the current state
4. Pause with `await sleep(delay)` so the browser can render
5. Return the sorted array

This makes the algorithms animate smoothly instead of running instantly.

---

## Algorithm Quick Reference

| Algorithm | Time | How It Works |
|-----------|------|-------------|
| Bubble | O(n²) | Compare neighbors, swap if wrong, largest bubbles to end |
| Insertion | O(n²) | Slide each element into place among sorted ones |
| Selection | O(n²) | Find smallest, swap to front, repeat |
| Merge | O(n log n) | Split in half, sort halves, merge back |
| Quick | O(n log n) | Pick pivot, partition smaller/bigger, recurse |
| Heap | O(n log n) | Build max-heap, repeatedly extract largest |
| Shell | O(n log²n) | Insertion sort with shrinking gaps |
| Radix | O(dn) | Sort digit by digit using counting sort |
| Counting | O(n+k) | Count occurrences, rebuild in order |
| Bucket | O(n+k) | Group into buckets, sort each, concatenate |
| Cocktail | O(n²) | Bubble sort that goes forward and backward |
| Gnome | O(n²) | Swap with previous or move forward |

---

## Color Legend

| Color | Meaning |
|-------|---------|
| Purple→Cyan gradient | Default (unsorted) |
| White | Being compared |
| Red | Being swapped |
| Yellow | Pivot element (Quick Sort) |
| Green | In final sorted position |
