# Motion Guidelines Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Motion Philosophy & Principles

Animations on the Karamatwangi platform should act as a subtle guide rather than visual decoration. The website must feel **calm, elegant, premium, and natural**, reflecting the peaceful mountain landscape.

### 1.1. Core Principles
- **Natural Motion:** Movements mimic real-world physics. Transitions use smooth easing (spring-like deceleration) rather than linear or jarring speed changes.
- **Meaningful Motion:** Animations only occur in response to user actions (e.g. clicks, hovers, scrolls) or to clarify structure (e.g., dropdown expansions).
- **Consistent Motion:** Components across public and admin pages utilize the same duration tokens and easing curves to maintain a coherent user experience.
- **Accessible Motion:** Respect users with vestibular sensitivities by disabling non-essential transitions when system-level reduced-motion flags are active.
- **Performance First:** Optimize for 60 FPS on low-end mobile devices by avoiding layout triggers (e.g. animating height/width) and focusing on GPU-accelerated attributes (opacity, transforms).

---

## 2. Motion Tokens

All CSS transitions and Framer Motion declarations must reference these standard tokens:

### 2.1. Duration Tokens
- `duration-fast` = `150ms` (hover states, small toggles, button clicks).
- `duration-normal` = `300ms` (dropdowns, mobile drawer entry, search suggest displays).
- `duration-slow` = `500ms` (page layout animations, large modal displays).

### 2.2. Easing Tokens
- `ease-default` = `cubic-bezier(0.4, 0, 0.2, 1)` (smooth, balanced deceleration).
- `ease-in` = `cubic-bezier(0.4, 0, 1, 1)` (accelerates quickly, used for items leaving the viewport).
- `ease-out` = `cubic-bezier(0, 0, 0.2, 1)` (decelerates slowly, used for items entering the viewport).
- `ease-spring` = `[stiffness: 300, damping: 25]` (Framer Motion spring configuration for tactile micro-interactions).

### 2.3. Spatial Tokens
- `distance-sm` = `4px` / `8px` (button lifts, category chip translations).
- `distance-md` = `16px` / `24px` (modal entrances, scroll-reveal fades).
- `distance-lg` = `100%` (off-screen drawer slide transitions).

---

## 3. UI Component Motion Rules

### 3.1. Public Website Components
- **Page Transitions:** Page layout swaps animate via a subtle fade and vertical lift: `opacity: 0` to `1`, `translateY(16px)` to `0px` with `duration-slow`.
- **Navbar:** Transparent navbar transitions to solid color using CSS color transitions (`duration-normal`). Hamburger trigger morphs path elements into a close icon.
- **Unified Card Hover:** Cards scale slightly (`1.02`), lift vertically (`-4px`), and transition to `--shadow-lg` elevation over `duration-fast`.
- **Category Filter Chips:** Toggling selection triggers a tiny scale shrink (`0.95`) on press, shifting to active colors with a spring bounce.
- **Buttons & Inputs:** Focus indicator rings fade in (`duration-fast`). Loading states replace button text with a rotating spinner using infinite linear spins.
- **Interactive Map:**
  - *Marker Hover:* Pin expands slightly (`scale(1.1)`) and lifts off the canvas.
  - *Marker Popup:* Card popups zoom in from the pin center (`scale(0.95)` to `1`) and fade in.
  - *Filter Transition:* Filter changes fade markers out and in dynamically without jerky redraws.
- **Scroll Reveal (Scroll Animation):** Content cards fade and slide up when they intersect 80% of the viewport height, utilizing a staggered delay sequence for adjacent grid items.

### 3.2. Back-Office CMS Components
- **Sidebar:** Left navigation drawer expands and collapses smoothly (duration-normal).
- **Toast Notifications:** Toast banners slide in from the screen edge (`translateX(100%)` to `0`) and slide out on auto-dismiss.
- **Import Wizard Progress:** Linear progress bar loads smoothly using a CSS width transition (`ease-out`).

---

## 4. Scroll Behavior Specifications

- **Fade-In:** Opacity changes from `0` to `1` on scroll intersection.
- **Slide-Up:** Combines fade with vertical translation (`translateY(24px)` to `0`) to create a smooth reveal.
- **Stagger:** When rendering a list of search cards or category links, apply a incremental delay (e.g. `50ms` per item) to make the content appear sequentially:

```
Item 1 (Delay: 0ms)  → Fade & Slide Up
Item 2 (Delay: 50ms) → Fade & Slide Up
Item 3 (Delay: 100ms)→ Fade & Slide Up
```

- **Parallax:** Hero section background image scrolls at a 0.5x speed ratio relative to the page scroll speed.

---

## 5. Framer Motion Presets

Developers and AI coding assistants must use these standard Framer Motion configurations:

### 5.1. Page Layout Entrance
```typescript
export const pageTransitionPreset = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.5, ease: [0, 0, 0.2, 1] }
};
```

### 5.2. Unified Card Hover
```typescript
export const cardHoverPreset = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};
```

### 5.3. Modal Backdrop & Entrance
```typescript
export const modalPresets = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  content: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
};
```

### 5.4. Stagger Grid Parent & Child
```typescript
export const staggerGridContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const staggerGridChild = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};
```

---

## 6. Accessibility & Performance Rules

- ** vestibular System Support:** Wrap all motion elements in media queries checking for reduced-motion flags:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- **Framer Motion hook:** Implement `useReducedMotion()` from Framer Motion to bypass layout animation coordinates.
- **Performance targets:** Ensure all custom animations utilize CSS properties `transform` and `opacity` to keep CPU work low and prevent heavy repaint passes.
- **Offscreen Discard:** Pause scroll-reveal animations and map rendering loops when components slide completely outside the viewport boundary to reduce background memory consumption.

---

## 7. Future ACA Modularity
Future categories (Tourism, Agriculture, Livestock) activated through the Adaptive Content Architecture automatically inherit this motion system. By loading content into the standard TPL-03 DetailTemplate or TPL-02 ExplorerTemplate, new lists and coordinates will slide, fade, stagger, and hover identically without requiring new Framer Motion setup.
