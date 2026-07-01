# SeaShell Hotel & Resort — Complete Design System Analysis

## 1. Brand Vibe & Aesthetic Direction

The SeaShell Hotel & Resort website embodies a **"Mediterranean Coastal Elegance"** aesthetic that draws heavily from the resort's physical architecture — terracotta-pink buildings, turquoise pools, and lush palm gardens set against the azure Gulf waters. The design language communicates **relaxed luxury** rather than overt opulence: it is warm, approachable, and sun-drenched.

The visual identity pivots on a distinctive **split-screen layout** that creates a magazine-like editorial experience. A fixed left panel anchors the brand with soft pastel tones and elegant serif typography, while the right side unfolds as a scrollable canvas of immersive photography. This duality — structured elegance on the left, free-flowing imagery on the right — mirrors the resort's promise of both comfort and escape. The overall mood is **serene, sunlit, and quietly sophisticated**, targeting families and couples seeking a premium yet unpretentious beach getaway.

The dusty cyan sidebar evokes sea glass and coastal skies, while the blush pink accents hint at Mediterranean terracotta and sunset warmth. Combined with the warm gray typography and abundant white space, the palette feels **fresh, breathable, and inherently vacation-like**.

---

## 2. Complete Color Palette

### 2.1 Core Brand Colors

| Role | Hex Code | Visual Description | Usage |
|------|----------|-------------------|-------|
| **Primary** | `#89C1D8` | Dusty Cyan / Sea Glass Blue | Fixed sidebar background, navigation menu, logo area, primary buttons (btn_primary2) |
| **Secondary** | `#FDEAE9` | Blush Pink / Pale Rose | "Book Your Stay" floating tab, room list headers, secondary buttons, hover accents |
| **Accent / CTAs** | `#e97a74` | Salmon / Coral | Active tab states, link hover colors, interactive highlights, menu active indicators |
| **Text Primary** | `#595955` | Warm Gray / Greige | Body text, headings (h2, h3), paragraphs, default link color |
| **Text Secondary** | `#000000` | Pure Black | Footer copyright, strong emphasis, dropdown menu text |
| **Background Light** | `#f2f2f2` | Soft Gray | Fixed left content panel (main_left_section) |
| **Background White** | `#ffffff` | Pure White | Main scrollable content area, cards, popups |
| **Border / Divider** | `#707070` | Medium Gray | Tab borders, separator lines, menu dividers |

### 2.2 Supporting Color Scale

| Hex Code | Description | Usage |
|----------|-------------|-------|
| `#d0edf9` | Light Cyan | Navigation hover state on mobile, active link tint |
| `#e7aba8` | Muted Rose | Button borders (btn_primary), hover fill |
| `#ff8c85` | Soft Salmon | Gradient/shadow accents (11 occurrences) |
| `#ECECEC` | Light Gray | Form backgrounds, input fields |
| `#E9E9E9` | Silver Gray | Subtle backgrounds, dividers |
| `#ebebeb` | Platinum | Top bar gradient overlay |
| `#e0dfdf` | Cool Gray | Light text, placeholder content |
| `#7A7A7A` | Neutral Gray | Dropdown hover backgrounds |
| `#7B7B7B` | Steel Gray | Secondary text, inactive states |
| `#999999` | Medium Gray | Strikethrough prices, disabled text |
| `#cccccc` | Light Gray | Borders, separators |
| `#333333` | Dark Gray | Footer link text |
| `#212529` | Bootstrap Dark | Default dark text fallback |

### 2.3 Functional / Alert Colors

| Hex Code | Description | Usage |
|----------|-------------|-------|
| `#FB7112` | Bright Orange | Promotional badges, highlights |
| `#F27D21` | Burnt Orange | Active/focus states, booking highlights |

### 2.4 Transparency Values

| Value | Usage |
|-------|-------|
| `rgba(255, 255, 255, 0.5)` | Inactive navigation links on sidebar |
| `rgba(0, 0, 0, 0.4)` | Hero image overlay gradient |
| `rgba(255, 255, 255, 0.2)` | Subtle border separators |

---

## 3. Typography System

### 3.1 Font Families

| Role | Font Family | Type | Source | Usage |
|------|-------------|------|--------|-------|
| **Primary (Body & UI)** | **Poppins** | Sans-serif | Google Fonts (weights 100-900) | All headings, body text, buttons, navigation, labels |
| **Secondary (Display & Editorial)** | **Bembo** | Serif | Custom @font-face (Bembo + Bembo Std) | Welcome text, editorial paragraphs, elegant descriptions |
| **Accent / Decorative** | Mrs Saint Delafield | Script | Google Fonts | Decorative accents (if used) |
| **Legacy / Fallback** | Open Sans | Sans-serif | Google Fonts | Loaded but secondary to Poppins |
| **Legacy / Fallback** | Oswald | Sans-serif | Google Fonts | Loaded, used for layerslider |
| **Legacy / Fallback** | Roboto Condensed | Sans-serif | Google Fonts | Loaded for condensed text needs |
| **Legacy / Fallback** | Alegreya Sans | Sans-serif | Google Fonts | Loaded as alternative |
| **Legacy / Fallback** | PT Sans | Sans-serif | Google Fonts | Original body font, superseded |

### 3.2 Type Scale

| Element | Font | Size | Weight | Color | Additional |
|---------|------|------|--------|-------|------------|
| **Hero Title (H1)** | Poppins | 25px | 700 | `#fff` (white) | Centered, uppercase "SEASHELL" |
| **Hero Subtitle** | Poppins | ~14px | 400 | `#fff` | Letter-spaced: "HOTEL & RESORT" |
| **Section Heading (H2)** | Poppins | 80px | 400 | `#595955` | Text-transform: capitalize |
| **Section Heading (H2 small)** | Poppins | 40px | 700 | `#595955` | Used on inner pages |
| **Subsection Heading (H3)** | Poppins | 25px | 700 | `#595955` | Text-align: center, **underlined** |
| **Body Paragraph** | Bembo / Poppins | 16-20px | 400 | `#595955` | Line-height: 22-30px |
| **Welcome Text** | Bembo | 20px | 400 | `#595955` | Line-height: 30px, centered |
| **Navigation Links** | Poppins | 20px | 400 | `rgba(255,255,255,0.5)` | Active: `#d0edf9`, Hover: `#fff` |
| **Button Text** | Poppins | 18px | 600 | `#595955` | CTA tab text |
| **Button (Primary)** | Poppins | 16px | 400 | `#000` | White bg, rose border |
| **Footer Text** | Poppins | 12px | 400 | `#000` | Copyright, credits |
| **Tab Labels** | Poppins | 16px | 400 | `#595955` | Overview / Gallery tabs |

### 3.3 Typography Patterns

- **Headings are underlined** — h3 elements use `text-decoration: underline` as a consistent brand motif
- **Vertical text** — The sidebar displays "SEASHELL HOTEL & RESORT" using `writing-mode: vertical-rl` rotated 90 degrees
- **Mixed serif/sans-serif** — Bembo serif is reserved for editorial/welcome content; Poppins handles all UI and functional text
- **Light font weights** — The design favors 300-400 weights for elegance rather than heavy bolding

---

## 4. Layout & Spatial System

### 4.1 Overall Structure

The website uses a **fixed split-panel layout** on desktop:

```
+--------------------------------------------------+
| SIDEBAR | LEFT PANEL      | SCROLLABLE CONTENT   |
| 98px    | 35% width       | 65% width            |
| fixed   | fixed           | scrollable           |
| full-h  | full-h          | full-h               |
+--------------------------------------------------+
```

| Panel | Width | Position | Behavior | Background |
|-------|-------|----------|----------|------------|
| **Navigation Sidebar** | 98px min-width | Fixed, left: 0, full height | Always visible | `#89C1D8` (dusty cyan) |
| **Left Content Panel** | 35% (fixed) | Fixed, left: 98px, full height | Stays in place | `#f2f2f2` (soft gray) |
| **Right Content Panel** | calc(65% - 98px) | Relative, scrollable | Scrolls vertically | `#ffffff` (white) |
| **"Book Your Stay" Tab** | 56px width | Fixed, right: 0, top: 32% | Always visible | `#FDEAE9` (blush pink) |

### 4.2 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| **xs** | 5-8px | Tight padding, icon gaps |
| **sm** | 10-15px | Button padding, small margins |
| **md** | 20-30px | Section gaps, card padding |
| **lg** | 35-45px | Content area padding |
| **xl** | 60px | Left panel content padding (60px 45px) |
| **xxl** | 100-180px | Top offset for hero sections |

### 4.3 Z-Index Hierarchy

| Layer | Z-Index | Element |
|-------|---------|---------|
| Background | 1 | Left panel, hero images |
| Content | 2 | Banner overlay, content areas |
| Navigation | 99 | Fixed sidebar |
| Dropdown Menu | 10 | Navigation dropdowns |
| CTA Tab | 4 | "Book Your Stay" floating tab |
| Popup/Modal | 999 | Booking popup overlay |

---

## 5. UI Component Library

### 5.1 Buttons

| Button Type | Background | Border | Text Color | Hover State | Usage |
|-------------|-----------|--------|-----------|-------------|-------|
| **btn_light_pink** | `#FDEAE9` | none | `#595955` | same | "Book Your Stay" CTA tab |
| **btn_primary** | `#ffffff` | 2px solid `#e7aba8` | `#000000` | bg: `#e7aba8` | Primary actions, "About Us" |
| **btn_primary2** | `#89C1D8` | none | `#ffffff` | bg: `#000000` | Strong CTAs, submit buttons |
| **btn_second** | `#fdeae9` | none | `#000000` | same | Secondary actions |
| **btn_prink** | `#FDEAE9` | 2px solid `#FDEAE9` | `#000000` | same | Pink-accent buttons |

### 5.2 Navigation

- **Sidebar nav**: Full-height fixed panel (98px) with logo, hamburger menu, and vertical brand name
- **Hamburger menu**: Three white lines, opens slide-out panel from left (295px width)
- **Slide-out menu**: Same cyan background (`#89C1D8`), links in white at 50% opacity, active at `#d0edf9`
- **Dropdown menus**: White background (`#fff`), black text (`#000`), no border-radius

### 5.3 Cards & Content Boxes

- **Room/chalet cards**: White background, header in `#FDEAE9` (blush pink), body with flex layout
- **Image containers**: Full-bleed photography with no border-radius
- **Tab containers**: Border-top and border-bottom in `#707070`, 50% width tabs with right border separator

### 5.4 Form Elements

- **Inputs**: Background `#ECECEC`, no border, 16px text
- **Select dropdowns**: Custom styled with Select2 library
- **Date pickers**: jQuery UI themed components

---

## 6. Visual Effects & Imagery

### 6.1 Photography Style

- **Hero images**: Full-bleed aerial photography of the resort showing pools, gardens, and architecture
- **Content images**: Large-format hotel photography, room interiors, food photography
- **Aspect ratios**: Wide landscape for hero, mixed ratios for gallery grid
- **Treatment**: Natural, warm, sunlit; no heavy filters; authentic resort imagery

### 6.2 Decorative Elements

- **Golden flower motif**: Yellow/gold floral decorative element in hero section (top-right corner)
- **Gradient overlay**: Black-to-transparent gradient on hero (`linear-gradient(to bottom, #000 0%, rgba(255,255,255,0) 100%)`)
- **No border-radius**: Sharp corners throughout — cards, buttons, images all use 0px border-radius
- **No drop shadows**: Clean flat design with minimal shadow usage (only subtle box-shadow: `0px 3px 15px 0px rgba(0,0,0,0.3)` on mobile nav)

---

## 7. Responsive Breakpoints

| Breakpoint | Key Changes |
|------------|-------------|
| **1920px+** | Large desktop, expanded left panel positioning (110px offset) |
| **1400-1920px** | Standard desktop layout |
| **1200px** | Navigation font size reduces to 15px |
| **992-1170px** | Left offset adjusts to 30px |
| **991px (Tablet)** | Sidebar becomes horizontal top bar (100px height); left panel becomes relative; right panel becomes full-width |
| **830px** | Inner banner max-width becomes 100% |
| **767px (Mobile)** | Left panel padding reduces; h2 headings reduce to 48px; footer stacks vertically |
| **575px** | Further padding reductions; navigation becomes full-width |
| **480px** | Smallest mobile optimizations |

---

## 8. Design Tokens Summary (For Frontend Implementation)

```css
:root {
  /* Brand Colors */
  --color-primary: #89C1D8;        /* Dusty Cyan - sidebar, nav */
  --color-secondary: #FDEAE9;      /* Blush Pink - CTA, accents */
  --color-accent: #e97a74;         /* Salmon - active, hover */
  --color-accent-muted: #e7aba8;   /* Muted Rose - borders */
  --color-accent-light: #d0edf9;   /* Light Cyan - hover tint */
  
  /* Text Colors */
  --color-text-primary: #595955;   /* Warm Gray - body, headings */
  --color-text-secondary: #000000; /* Black - footer, strong */
  --color-text-muted: #7B7B7B;     /* Steel Gray - inactive */
  --color-text-light: #ffffff;     /* White - on dark bg */
  
  /* Background Colors */
  --color-bg-light: #f2f2f2;       /* Soft Gray - left panel */
  --color-bg-white: #ffffff;       /* White - main content */
  --color-bg-form: #ECECEC;        /* Light Gray - inputs */
  
  /* Border Colors */
  --color-border: #707070;         /* Medium Gray - dividers */
  --color-border-light: #cccccc;   /* Light Gray - subtle */
  
  /* Typography */
  --font-primary: 'Poppins', sans-serif;
  --font-secondary: 'Bembo', serif;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Spacing */
  --sidebar-width: 98px;
  --left-panel-width: 35%;
  --right-panel-width: calc(65% - 98px);
  --panel-padding: 60px 45px;
  
  /* Border Radius */
  --radius-none: 0px;              /* Sharp corners throughout */
  --radius-circle: 40px;           /* Only for social icons */
  
  /* Shadows */
  --shadow-nav: 0px 3px 15px 0px rgba(0, 0, 0, 0.3);
  --shadow-none: none;             /* Flat design preference */
}
```

---

## 9. Key Design Characteristics for Replication

To successfully replicate this website's frontend UI, prioritize these distinctive characteristics:

1. **Split-panel layout** — The fixed left sidebar + fixed left content panel + scrollable right content is the defining structural feature. On desktop, the left 35% never moves while the right 65% scrolls.

2. **Dusty cyan + blush pink palette** — This unexpected color pairing (cool sea-glass blue with warm pale rose) creates the Mediterranean coastal identity. Do not substitute with brighter or more saturated alternatives.

3. **Poppins + Bembo type pairing** — The sans-serif/serif combination is essential: Poppins for all UI and functional text (clean, modern, geometric), Bembo for editorial/welcome text (elegant, classic, human).

4. **Underlined headings** — All h3-level section headings use `text-decoration: underline` as a consistent brand motif. This is not accidental — it is a deliberate design signature.

5. **Zero border-radius** — The entire design uses sharp corners. No rounded cards, no pill buttons, no soft edges. This contributes to the editorial, magazine-like aesthetic.

6. **Vertical text element** — The rotated "SEASHELL HOTEL & RESORT" text on the sidebar using `writing-mode: vertical-rl` is a distinctive brand element.

7. **Floating CTA tab** — The "BOOK YOUR STAY" tab fixed to the right edge with vertical text and blush pink background is a signature conversion element.

8. **Photography-first approach** — Images are full-bleed, large-format, and warm-toned. The design lets photography breathe with minimal UI overlay.

9. **Flat design with no shadows** — Except for the mobile navigation dropdown, the design avoids drop shadows, maintaining a clean, flat, editorial aesthetic.

10. **Warm gray over pure black** — Body text uses `#595955` (warm gray with a subtle green undertone) rather than pure black, which softens the reading experience and complements the pastel palette.
