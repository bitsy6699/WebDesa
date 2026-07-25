# UX Review — Potential Detail Page

**Portal Potensi Desa Karamatwangi**
**Reviewed by:** Senior Product Designer
**Date:** July 2026
**Scope:** Storytelling, emotional flow, photography, visual hierarchy, mobile experience, readability, cognitive load

---

## Executive Summary

The Potential Detail page is the deepest page in the application. It is where a visitor commits to a single topic. This is the moment of highest intent — and the page treats it like a database record.

The homepage creates a cinematic journey (Welcome → Discover → Explore → Experience → Connect). The detail page should feel like opening a chapter of that story. Instead, it feels like opening a spreadsheet with a nice cover photo.

The bones are solid. The typography is clean. The interactions are smooth. But the emotional arc dies at the hero, and the rest of the page is an information dump disguised as an editorial layout.

---

## 1. Storytelling

### Current State

The page follows a linear information architecture:

```
Hero (emotional)
  ↓
Gallery (visual, but disconnected from narrative)
  ↓
Article text + Sidebar (informational, competing)
  ↓
Metadata renderer (technical)
  ↓
Related items (promotional)
  ↓
CTA (transactional)
```

This is a document structure, not a storytelling structure. Every section answers "what is this?" but none answer "why should I care?"

### Problems

**The story has no arc.** The hero creates emotional momentum — a beautiful image, a compelling title — then immediately deflates it with an aspect-ratio gallery container. The reader goes from "wow, this place looks amazing" to "oh, here are some photos" in one scroll. There is no narrative thread connecting the hero image to the article text to the gallery images.

**The article is orphaned.** The text sits in a two-column layout with a sticky sidebar that pulls attention away from the story. The sidebar says "here are facts about this page" while the article says "here is a story about this place." These are two different conversations happening simultaneously.

**The gallery interrupts.** Placed between the hero and the article, the gallery creates a visual speed bump. The reader has to process a full-width image carousel before reaching the story. This is the equivalent of showing someone a photo album before telling them why the photos matter.

**The metadata renderer is a wall.** After the article, a grid of key-value cards appears. This is the ACA dynamic metadata — technical information about the potential. It is presented as a data table, not as part of the story. It breaks the emotional spell.

### What Good Looks Like

National Geographic articles follow a proven structure:

```
Hero image + headline (emotional hook)
  ↓
Lead paragraph (the "why this matters")
  ↓
Supporting images woven INTO the narrative
  ↓
Deeper context (facts, data, quotes)
  ↓
Closing image or moment (emotional resolution)
  ↓
Related stories (continuation)
```

The detail page should feel like the reader is being told a story, not handed a dossier.

---

## 2. Emotional Flow

### Current State

```
Hero:        ████████████ (high emotion — beautiful image, bold title)
Gallery:     ████████     (moderate — visual, but passive consumption)
Article:     ██████       (declining — wall of text, no visual breaks)
Sidebar:     ████         (low — metadata, facts, buttons)
Metadata:    ███          (low — data cards, feels like a form)
Related:     ██████       (recovering — visual, but generic grid)
CTA:         ████████     (moderate — dark gradient, strong call)
```

The emotional trajectory is: **peak → decline → plateau → weak recovery**. There is no second peak. No moment of surprise. No "wow, I didn't expect that" feeling.

### Problems

**No emotional second act.** After the hero peak, the page descends into information delivery. The article text has no visual breathing room — no pull quotes, no inline images, no moments of pause. It is a single block of paragraphs.

**The sidebar is an emotional dead zone.** On desktop, the sticky sidebar is a glass card with metadata and buttons. It sits permanently in peripheral vision, quietly saying "don't forget, this is just a data page." It never contributes to the story.

**The CTA is abrupt.** After related items, the page suddenly shifts to a dark gradient banner with "Lihat Semua Potensi." This is a transactional moment in an otherwise informational page. It feels like a pop-up ad, not a natural conclusion.

### What Good Looks Like

```
Hero:        ████████████ (emotional peak — scene-setting)
Transition:  ████████████ (breathing moment — a quote, a fact, a whisper)
Gallery:     ████████████ (second peak — images that advance the story)
Article:     ████████████ (sustained — with visual rhythm)
Data:        ████████     (contextual — woven in, not dumped)
Related:     ████████████ (emotional resolution — "continue exploring")
CTA:         ████████████ (natural — feels like the next chapter, not an ad)
```

---

## 3. Photography

### Current State

The hero image is the primary storytelling device. It does the heavy lifting. Below it, the gallery repeats the visual information in a different format. The article has no images. The related section uses card thumbnails.

### Problems

**The hero and gallery compete.** The hero says "this is the place." The gallery says "here are more photos of the place." These are redundant statements. The gallery should either replace the hero (if the hero image is weak) or extend the story (if the hero image is strong).

**No images in the article.** The longest section of the page — the article text — has zero visual content. For a page about a physical place (a village, a farm, a tourist spot), this is a missed opportunity. The text describes a place but never shows it.

**Thumbnails are too small to appreciate.** The gallery thumbnails (w-24 h-16) are too small to be meaningful. They serve as navigation controls, not as visual storytelling. On mobile, they require horizontal scrolling, which violates the "avoid horizontal scrolling" principle.

**No image captions or context.** Images are presented without context. What is this photo? When was it taken? Who is in it? The images are decoration, not documentation.

### What Good Looks Like

- Hero image sets the scene (emotional)
- Article is punctuated with 2-3 inline images that advance the narrative (e.g., a close-up of the product, a landscape shot, a person at work)
- Gallery is either eliminated (hero + article images are sufficient) or transformed into a "behind the scenes" section with captions
- Related items use hero-quality images, not tiny thumbnails

---

## 4. Visual Hierarchy

### Current State

The page has **six competing focal points** at the top:

1. Hero title (large, white, bold)
2. Category pill (uppercase, white/85)
3. Location text (white/85)
4. Quick-info glass card (white text on glass)
5. Gallery (full-width, dominant)
6. First-letter drop cap (6xl, extrabold, primary)

After the hero, the hierarchy collapses into a flat structure:

- Article text (2/3 width)
- Sidebar (1/3 width, sticky)
- Metadata grid (full width)
- Related grid (full width)
- CTA banner (full width)

### Problems

**Too many signals in the hero.** The hero simultaneously communicates: title, category, location, quick-info metadata (category, location, date), and breadcrumb. This is five layers of information in one visual block. The eye bounces between the title, the category pill, and the glass card.

**The sidebar fights the article.** On desktop, the sidebar is sticky and permanently visible. It competes with the article for attention. The glass card has its own hierarchy (eyebrow → publisher name → metadata rows → buttons) that mirrors the hero's hierarchy. It is a mini-page inside the page.

**The metadata renderer is a full-width speed bump.** After the article, a2-column grid of metadata cards appears at full width. This is visually heavy and breaks the reading flow. The reader has to process 8-12 data cards before reaching the related section.

**No visual breathing room.** Between the article and the related section, there is no pause. The content blocks stack directly on top of each other with consistent spacing, creating a monotonous rhythm.

### What Good Looks Like

One clear focal point per viewport. The hero is the only thing the eye should process at the top. The article is the only thing the eye should process in the middle. The related section is the only thing the eye should process at the bottom. Each section should have a clear "this is what you should look at now" signal.

---

## 5. Mobile Experience

### Current State

On mobile:
- Hero stacks vertically (title → category pill → location → quick-info card)
- Gallery becomes full-width with horizontal thumbnail scroll
- Article and sidebar stack (article first, sidebar below)
- Related items stack (1 column)
- CTA is full-width

### Problems

**The hero is too tall on mobile.** The hero is `min-h-[460px]` on mobile. This is almost the full viewport. The user has to scroll past 460px of hero before seeing any content. On a 667px iPhone, that is 69% of the screen dedicated to the hero alone.

**The quick-info card wastes mobile real estate.** On mobile, the quick-info glass card stacks below the category pill and location, taking up an additional ~120px. This means the user scrolls ~580px before reaching the gallery. The "Sekilas Potensi" card is useful on desktop (where it sits in the hero's bottom-right), but on mobile it is a speed bump.

**Gallery thumbnails require horizontal scrolling.** The thumbnail strip (`overflow-x-auto`) creates a horizontal scroll zone on mobile. This violates the "avoid horizontal scrolling" principle from AGENTS.md. Users must swipe horizontally to see all thumbnails, which is a thumb-unfriendly gesture.

**The sidebar loses its purpose on mobile.** The sticky sidebar becomes a regular stacked section below the article. It is no longer a "reference panel" — it is just another block of content. The "Dipublikasikan Oleh" label, metadata rows, and share/back buttons are presented sequentially, which feels like a form, not a page.

**The2×2 metadata cards (if they existed) would stack to 1 column.** The4-item grid would become a long vertical list of metadata, further extending the page length.

**Touch targets are small.** The gallery arrow buttons are `w-9 h-9` (36px), which is below the 44px minimum touch target. The thumbnail buttons are `w-24 h-16` which is fine for tapping but the active state scaling may cause accidental taps on adjacent thumbnails.

### What Good Looks Like

- Hero is a brief scene-setter (200-280px max on mobile)
- Content begins within one thumb-scroll of the hero
- No horizontal scrolling anywhere
- Gallery is either eliminated or transformed into a vertical scroll of full-bleed images
- Sidebar content is integrated into the article flow or collapsed into a expandable section
- All touch targets are 44px minimum

---

## 6. Readability

### Current State

The article text is the strongest element:

- Line height: 1.9 (generous)
- Font size: 17px
- First-letter drop cap: 6xl, extrabold, primary
- Paragraph spacing: `space-y-6`
- Max width: 3xl (768px)

### What Works

**The first-letter drop cap is excellent.** It signals "this is a story" and creates a visual entry point. The primary color tie-in is subtle and effective.

**The line height is generous.** 1.9 is higher than the typical 1.5-1.7, which is appropriate for long-form reading on screen. It creates breathing room between lines.

**The max width is correct.** 768px is the optimal reading width for body text. It keeps lines at 60-75 characters, which is the舒适 zone for sustained reading.

### Problems

**Body text color is too light.** `text-neutral-500` on a white/light background may not meet WCAG AA contrast requirements for body text. The text should be darker for sustained reading comfort.

**No visual breaks in long paragraphs.** The article is rendered as pure text paragraphs. For a page about a physical place, this is a missed opportunity. Long paragraphs without visual breaks create cognitive fatigue.

**The drop cap only appears on the first paragraph.** If the description has multiple paragraphs, only the first gets the drop cap treatment. This is correct behavior, but it means subsequent paragraphs feel visually flat in comparison.

**No blockquotes or pull quotes.** The article has no mechanism for highlighting key information. A pull quote from the text could serve as a visual anchor and emotional peak within the reading experience.

---

## 7. Cognitive Load

### Current State

The page presents the following information blocks simultaneously:

1. Hero: title, category, location, breadcrumb, quick-info (5 items)
2. Gallery: main image + thumbnails (navigation + visual)
3. Article: multi-paragraph text (reading)
4. Sidebar: publisher, metadata, share, back (4 items)
5. Metadata renderer: dynamic key-value pairs (variable, 4-12 items)
6. Related: 3 card items (scanning)
7. CTA: title, description, 2 buttons (3 items)

**Total: 7 distinct information blocks with 20+ individual data points.**

### Problems

**No progressive disclosure.** All information is presented at once. There is no mechanism for the user to drill down or expand sections. The sidebar metadata, hero metadata, and metadata renderer all show different slices of the same data, creating redundancy and confusion.

**Three different metadata presentations.** The same data (category, location, date) appears in:
1. Hero quick-info glass card
2. Sidebar metadata rows
3. Metadata renderer (if applicable)

This triple representation creates cognitive overhead: "Which one is the canonical source? Am I missing something?"

**The sidebar is a decision point.** The sidebar asks the user to make two decisions: "Do you want to share this?" and "Do you want to go back?" These are competing with the primary task: reading the article. The sidebar should support the reading experience, not interrupt it with action buttons.

**The related section is premature.** Before the user has finished reading the current article, the page presents three alternative articles. This is like a waiter bringing the dessert menu before the appetizer is finished. It suggests the current content is not worth finishing.

---

## Prioritized Improvements

Ranked by impact × feasibility. Items are grouped into three tiers.

### Tier 1 — High Impact, Should Do Next

| # | Improvement | Why | Impact |
|---|-------------|-----|--------|
| 1 | **Remove the2×2 info cards section** | This section duplicates the hero metadata (category, location, date, gallery count). It adds ~120px of scrolling for zero new information. Removing it eliminates redundancy and shortens the page. | Reduces cognitive load, shortens scroll depth |
| 2 | **Move gallery AFTER the article** | The gallery currently sits between the hero and the article, interrupting the narrative flow. Moving it after the article creates: Hero → Story → Visual evidence → Related. This is the natural storytelling order: hook → context → proof → continuation. | Improves emotional flow, creates narrative arc |
| 3 | **Collapse sidebar into article on mobile** | On mobile, the sidebar is not sticky — it is just a stacked section. Instead of showing it as a separate block, integrate its content into the article: add a thin metadata bar below the hero (category, date, location) and move share/back to a floating action button or the CTA section. | Improves mobile experience, reduces scroll depth |
| 4 | **Reduce hero height on mobile** | The hero is 460px on mobile — almost the full viewport. Reduce to 280-320px. Show only title + category pill. Move the quick-info card and location to below the hero or eliminate them (they duplicate sidebar data). | Improves mobile experience, faster content access |

### Tier 2 — Medium Impact, Plan for Sprint

| # | Improvement | Why | Impact |
|---|-------------|-----|--------|
| 5 | **Add 2-3 inline images to the article** | The article is the longest section and has zero visual content. For a page about a physical place, this is a missed opportunity. Add 2-3 images that advance the narrative: a landscape shot, a close-up of the product/activity, a person at work. These should be full-bleed or wide within the article column. | Improves visual hierarchy, storytelling, emotional flow |
| 6 | **Replace gallery thumbnails with a vertical image strip** | The horizontal thumbnail scroll violates the "avoid horizontal scrolling" principle. Replace with a vertical stack of full-width images below the article, each with a caption. This creates a "photo essay" section that extends the story. | Improves mobile experience, eliminates horizontal scroll |
| 7 | **Unify metadata into one authoritative location** | Currently, category/location/date appear in three places (hero, sidebar, metadata renderer). Choose one: the sidebar on desktop, a metadata bar below the hero on mobile. Remove the duplicates. | Reduces cognitive load, eliminates confusion |
| 8 | **Add a pull quote from the article** | Extract a compelling sentence from the article and render it as a large, styled pull quote (Playfair Display italic, primary color accent). This creates a visual anchor within the text and reinforces the storytelling tone. | Improves readability, emotional flow |
| 9 | **Transform CTA into "Continue the Journey"** | The current CTA ("Masih Banyak Potensi Desa yang Bisa Dijelajahi") is transactional. Reframe as a narrative continuation: "Setiap potensi memiliki cerita. Temukan cerita lainnya." Use the light variant to feel like a gentle invitation, not a hard sell. | Improves emotional flow, storytelling |

### Tier 3 — Lower Impact, Future Consideration

| # | Improvement | Why | Impact |
|---|-------------|-----|--------|
| 10 | **Add reading time estimate** | Show "4 menit baca" below the hero title. This sets expectations and respects the reader's time. | Improves UX, reduces bounce rate |
| 11 | **Add scroll progress indicator** | A thin primary-colored line at the top of the viewport that fills as the user scrolls. This creates a sense of progress and encourages completion. | Improves engagement, reduces abandonment |
| 12 | **Transform related section into "Cerita Serupa"** | Rename from "Potensi Lainnya" to "Cerita Serupa" (Similar Stories). Add a one-line description for each related item. Frame as story continuation, not a product catalog. | Improves storytelling, emotional resolution |
| 13 | **Lightbox for gallery images** | Instead of inline gallery, open images in a full-screen lightbox with swipe navigation, pinch-to-zoom, and image captions. This keeps the article page clean and gives images the respect they deserve. | Improves photography experience, reduces page length |
| 14 | **Add "Back to top" floating button** | After scrolling past the hero, show a subtle floating button that returns to the top. On long articles, this improves navigation. | Improves mobile navigation |

---

## Emotional Arc — Current vs. Proposed

### Current

```
┌─────────────────────────────────────────────────┐
│ HERO          │  "This place is beautiful"      │  ████████████ peak
├─────────────────────────────────────────────────┤
│ GALLERY       │  "Here are some photos"          │  ████████     decline
├─────────────────────────────────────────────────┤
│ ARTICLE       │  "Here is some text"             │  ██████       plateau
├─────────────────────────────────────────────────┤
│ SIDEBAR       │  "Here are some facts"           │  ████         low
├─────────────────────────────────────────────────┤
│ METADATA      │  "Here is some data"             │  ███          lowest
├─────────────────────────────────────────────────┤
│ RELATED       │  "Here are more cards"           │  ██████       weak recovery
├─────────────────────────────────────────────────┤
│ CTA           │  "Click here"                    │  ████████     moderate
└─────────────────────────────────────────────────┘
```

### Proposed (after Tier 1 + 2 improvements)

```
┌─────────────────────────────────────────────────┐
│ HERO          │  "This place is beautiful"      │  ████████████ peak
├─────────────────────────────────────────────────┤
│ META BAR      │  "Category · Date · Location"   │  ████████████ sustained (contextual)
├─────────────────────────────────────────────────┤
│ ARTICLE       │  "Let me tell you a story"      │  ████████████ sustained (with images)
│  + pull quote │  "A moment of reflection"       │  ████████████ micro-peak
│  + inline img │  "This is what it looks like"   │  ████████████ visual peak
├─────────────────────────────────────────────────┤
│ GALLERY       │  "See more of this place"       │  ████████████ second peak (proof)
├─────────────────────────────────────────────────┤
│ RELATED       │  "Continue your journey"        │  ████████████ emotional resolution
├─────────────────────────────────────────────────┤
│ CTA           │  "Every potensi has a story"    │  ████████████ invitation
└─────────────────────────────────────────────────┘
```

---

## Summary

The Potential Detail page has strong foundations — clean typography, smooth interactions, good semantic structure. But it treats a storytelling opportunity like a data display problem.

The single highest-impact change is **reordering the page**: Hero → Meta → Article (with images) → Gallery → Related → CTA. This one structural shift would transform the page from a document into a narrative.

The second highest-impact change is **collapsing the sidebar on mobile** and **reducing the hero height**. Together, these would cut the mobile scroll depth by ~40% and get users to the story faster.

Everything else — pull quotes, reading time, scroll progress, lightbox — is refinement. The structural changes are what turn this from a good page into a premium experience.

---

*End of UX review.*
