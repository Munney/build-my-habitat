# HabitatBuilder Color System

This document defines the exact color palette and typography system for HabitatBuilder.

## 🎨 Color Palette

### 🟢 Emerald (Leopard Gecko)
- **emerald-400** → `#34D399` - Icons, highlights, inline accents
- **emerald-500** → `#10B981` - Buttons, borders
- **emerald-600** → `#059669` - Primary button background (hover → emerald-500)

✅ These work very well on dark slate.

### 🔵 Blue (Betta Fish)
- **blue-400** → `#60A5FA` - Betta accents, icons
- **blue-500** → `#3B82F6` - Betta buttons, borders
- **blue-600** → `#2563EB` - Betta primary button background (hover → blue-500)

Clean, readable, aquatic without being neon.

### 🟦 Cyan / Sky (Logo + Selection)
- **cyan-400** → `#22D3EE` - Logo gradient endpoint
- **sky-500** → `#0EA5E9` - Selection highlights, subtle accents

👍 Logo gradient from emerald-400 → cyan-400 is strong and modern.

### 🌑 Dark Base (Core UI)
- **slate-950** → `#020617` - Main background
- **slate-900** → `#0F172A` - Card background base (use with opacity: `rgba(15, 23, 42, 0.6)`)
- **slate-800** → `#1E293B` - Deep section background
- **slate-700** → `#334155` - Borders / dividers

### Text Colors
- **white** → `#FFFFFF` - Primary headings
- **slate-200** → `#E5E7EB` - Secondary body text
- **slate-300** → `#CBD5E1` - Muted / helper text
- **slate-400** → `#94A3B8` - Muted / helper text

🚫 **Never use text darker than slate-400** for any instructional text.

### 🟣 Purple (Process emphasis)
- **purple-400** → `#C084FC`
- **purple-500** → `#A855F7`

Use only for:
- "How it works" step emphasis
- Non-critical progression cues

### 🟡 Amber (Warnings)
- **amber-400** → `#FBBF24`
- **amber-500** → `#F59E0B`

Perfect for:
- Caution notes
- Habitat warnings
- "Important" callouts

### 🔴 Red (Errors only)
- **red-400** → `#F87171`
- **red-500** → `#EF4444`

**Never use red for anything that isn't actually a problem.**

## 🎨 Background System

### Layered Organic Gradient
Instead of a flat dark background, we use a subtle multi-stop gradient that mimics natural environments at night:

- **Emerald radial glow** (top): `rgba(16, 185, 129, 0.08)` - Reptile warmth
- **Blue radial glow** (bottom): `rgba(14, 165, 233, 0.06)` - Aquatic calm
- **Base**: `#020617` (slate-950)

**Why this works:**
- Extremely low opacity (not decorative)
- Feels alive, not sterile
- Still reads as dark, professional UI
- Most users won't consciously notice it — they'll just feel more comfortable

## 🧊 Warmer Card Styling

**Replaces cold glassmorphism with warmer, grounded feel.**

**Use `.card-warm` class for:**
- Homepage cards
- Builder UI elements
- Navigation elements
- Interactive components

**Card styling:**
- Background: `rgba(30, 41, 59, 0.6)` (slate-800 with 60% opacity)
- Border: `rgba(255, 255, 255, 0.08)` (softer border)
- Shadow: `0 10px 30px rgba(0, 0, 0, 0.35)` (soft depth)

This feels warmer and more grounded than frosted glass.

**⚠️ Important: Use lighter `slate-800` cards for instructional content (guides, articles)!**

## ✨ Micro Organic Accents

### Section Dividers
Use subtle gradient lines instead of flat borders for section dividers:

**Class**: `.section-divider`
- Creates a faint gradient line: `linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent)`
- Height: 1px
- Margin: 2rem vertical

**Usage:**
```html
<hr className="section-divider" />
```

This adds subtle organic warmth without being decorative.

## 📝 Typography

### Font Pairing: Inter + Source Serif 4

**Best Overall Pairing** (Top Recommendation)
- **Headings (H1–H3)**: Source Serif 4 (500–600 weight)
- **Body text**: Inter (400 weight)
- **UI labels**: Inter (500 weight)

**Why:**
- Inter is the gold standard for tools and dashboards
- Source Serif adds quiet authority for educational content
- Feels like a research platform, not a blog

**Usage:**
- Headings automatically use Source Serif 4 via CSS
- Body text uses Inter (default, 400 weight)
- UI elements (buttons, inputs, labels) use Inter (500 weight)

This pairing says: serious, modern, instructional, technical but friendly.

## 🎯 Usage Guidelines

1. **Species Differentiation**
   - Leopard Gecko → Emerald colors
   - Betta Fish → Blue colors

2. **Button States**
   - Normal: `emerald-600` or `blue-600`
   - Hover: `emerald-500` or `blue-500`

3. **Glassmorphism Cards**
   - Background: `bg-white/5`
   - Border: `border-white/10`
   - Backdrop: `backdrop-blur-md`

4. **Text Hierarchy**
   - Headings: `text-white`
   - Body: `text-slate-200`
   - Muted: `text-slate-300` or `text-slate-400`

5. **Backgrounds**
   - Main: `bg-[#020617]` or `bg-slate-950`
   - UI Cards (homepage, builder): Use glassmorphism (`bg-white/5` with `backdrop-blur-md`)
   - Instructional Content (guides, articles, explanations): Use lighter cards (`bg-slate-800` with `border-slate-700`)

6. **Instructional Content Strategy**
   - **Keep dark mode for**: Homepage, builder UI
   - **Use lighter slate cards (`slate-800`) for**: Explanations, recommendations, article text blocks, guides
   - **Why**: Reduces eye strain and increases trust for long-form reading content

## 📦 Implementation

Colors are defined in `app/globals.css` using Tailwind v4's `@theme` directive.
Fonts are loaded in `app/layout.js` and applied globally via CSS variables.

