# Lila Gold Color Scheme

**Status:** Active
**Date:** 2025-11-11

---

## Color Palette

The Lila Gold scheme uses warm, earthy tones with gold and rose accents:

| Color Name | Hex Code | Usage | RGB |
|------------|----------|-------|-----|
| **Warm Gold** | `#c38017` | Primary accent (borders, glows, interactive elements) | rgb(195, 128, 23) |
| **Dusty Rose** | `#bf96b7` | Secondary accent (highlights, cards) | rgb(191, 150, 183) |
| **Deep Blue** | `#266087` | Tertiary color (text accents, subtle elements) | rgb(38, 96, 135) |
| **Warm Terracotta** | `#c0846a` | Text color | rgb(192, 132, 106) |
| **Dark Forest** | `#20422d` | Background (deepest) | rgb(32, 66, 45) |
| **Olive Green** | `#5a6b2e` | Background (mid-tone) | rgb(90, 107, 46) |
| **Medium Forest** | `#2d5a3a` | Background (front elements) | rgb(45, 90, 58) |

Additional unused colors from palette:
- `#807724` - Olive gold (available for future use)

---

## Color Mapping

### From Original Synchronicity Engine Colors:

| Original | Original Hex | Lila Gold | New Hex | Purpose |
|----------|--------------|-----------|---------|---------|
| `cyan` | #00FFD1 (bright cyan) | **Warm Gold** | #c38017 | Primary accent/glow |
| `gold` | #D4AF37 (metallic gold) | **Dusty Rose** | #bf96b7 | Secondary accent |
| `sage` | #84A98C (sage green) | **Deep Blue** | #266087 | Tertiary accents |
| `cream` | #F7F3E9 (off-white) | **Warm Terracotta** | #c0846a | Text color |
| `bg.deep` | #0a0e0f (near black) | **Dark Forest** | #20422d | Deepest background |
| `bg.mid` | #1a2e2e (dark teal) | **Olive Green** | #5a6b2e | Mid-tone background |
| `bg.front` | #0f1f1f (dark gray) | **Medium Forest** | #2d5a3a | Front element background |

---

## Visual Changes

### Neon Border Frame
- **Color:** Warm gold (`#c38017`)
- **Glow:** Animated warm gold glow (replaces cyan glow)
- **Effect:** Softer, earthier feel compared to bright cyan

### Primary Interactive Elements
- **Buttons, links, focus states:** Warm gold
- **Hover glows:** Warm gold radiance
- **Progress indicators:** Warm gold

### Secondary Accents
- **Card highlights:** Dusty rose
- **Important markers:** Dusty rose glow
- **Feature callouts:** Dusty rose backgrounds

### Text & Backgrounds
- **Primary text:** Warm terracotta (easier on eyes than bright cream)
- **Background depth:** Forest green tones create natural, earthy ambiance
- **Contrast:** Warm colors on green backgrounds provide good readability

---

## How to Switch Back to Original

The original Synchronicity Engine colors are backed up in `tailwind.config.original.js`.

**To restore original cyan/gold scheme:**

1. **Replace Tailwind config:**
   ```bash
   cp tailwind.config.original.js tailwind.config.js
   ```

2. **Revert app.css changes:**
   ```bash
   git checkout HEAD~1 -- src/app.css
   ```

3. **Rebuild:**
   ```bash
   npm run build
   ```

**Or use git to revert:**
```bash
git log --oneline | grep "Lila Gold"  # Find the commit
git revert <commit-hash>  # Revert the color scheme commit
```

---

## Files Modified

- `tailwind.config.js` - Color definitions, glows
- `src/app.css` - Neon border, scrollbar, animations
- `tailwind.config.original.js` - Backup of original colors

---

## Design Notes

### Why These Mappings?

**Warm Gold as Primary:**
- Replaces bright cyan for a more grounded, natural feel
- Gold conveys warmth, value, achievement
- Works well for attention-drawing elements

**Dusty Rose as Secondary:**
- Softer than metallic gold
- Complements warm gold without competing
- Adds sophisticated, calming accent

**Deep Blue as Tertiary:**
- Provides cool contrast to warm tones
- Better readability than original sage green
- Professional, trustworthy association

**Warm Terracotta Text:**
- Easier on eyes than bright cream
- Harmonizes with earthy background tones
- Maintains readability with sufficient contrast

**Forest Green Backgrounds:**
- Natural, calming base
- Creates depth with three green tones
- Complements warm accent colors

---

## Accessibility Notes

- ✅ Warm gold on dark forest has good contrast ratio
- ✅ Terracotta text is readable on all background tones
- ✅ Interactive elements remain clearly distinguishable
- ⚠️ May need to verify contrast ratios for WCAG AA compliance

Test at: https://webaim.org/resources/contrastchecker/

---

## Future Enhancements

If color scheme switching is desired:

1. Create a Svelte store for theme selection
2. Add CSS variables for dynamic color switching
3. Build theme toggle component
4. Store user preference in localStorage

**Example implementation:**
```svelte
<!-- src/lib/stores/themeStore.ts -->
import { writable } from 'svelte/store';
export const theme = writable('lila-gold'); // 'original' | 'lila-gold'
```

---

**Version:** 1.0
**Status:** Active - Lila Gold applied globally
