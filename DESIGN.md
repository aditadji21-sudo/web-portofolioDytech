---
name: Precision Tech UI
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#ffe083'
  on-secondary: '#3c2f00'
  secondary-container: '#eec200'
  on-secondary-container: '#645000'
  tertiary: '#ffb4ab'
  on-tertiary: '#690005'
  tertiary-container: '#d52022'
  on-tertiary-container: '#ffecea'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffe083'
  secondary-fixed-dim: '#eec200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#93000b'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style
The design system is engineered for a high-performance IT hardware e-commerce environment. It evokes a sense of technical precision, reliability, and cutting-edge innovation. The brand personality is "The Expert Engineer"—knowledgeable, efficient, and sophisticated.

The visual style is **Corporate / Modern** with subtle **Glassmorphism** accents to signify transparency and high-end hardware. The interface prioritizes clarity and high-quality product photography, using ample whitespace to let technical specifications breathe. It avoids unnecessary decoration, focusing instead on structural integrity and sleek, tactile interactions that mirror the premium feel of custom PC builds and enthusiast-grade laptops.

## Colors
The palette is derived directly from the core brand identity, optimized for a high-tech "Dark Mode" first experience to reduce eye strain and make hardware photography pop.

- **Primary (Electric Blue):** Used for primary actions, progress indicators, and technical highlights. It represents the "energy" of the hardware.
- **Secondary (Cyber Yellow):** Reserved for high-priority call-to-outs, stock alerts, and promotional badges (e.g., "Sale" or "New").
- **Tertiary (Pulse Red):** Used sparingly for critical alerts, price drops, and "Low Stock" warnings.
- **Neutrals:** A deep slate and obsidian scale provides the foundation, ensuring high legibility and a premium "pro" aesthetic. Surfaces use subtle tonal shifts to indicate hierarchy rather than heavy borders.

## Typography
The typography system uses a tri-font strategy to balance brand character with technical utility:

1.  **Manrope** is used for headlines to provide a modern, geometric, and authoritative voice.
2.  **Inter** is utilized for body copy and interface elements, chosen for its exceptional legibility at small sizes and neutral, functional tone.
3.  **JetBrains Mono** is introduced for technical specifications, serial numbers, and "tech-data" labels, reinforcing the hardware/engineering theme.

On mobile devices, headline sizes scale down to maintain a balanced information density, while body text remains consistent to ensure accessibility.

## Layout & Spacing
This design system employs a **Fluid Grid** model with an 8px base unit. 

- **Desktop:** A 12-column grid with a maximum container width of 1280px. Gutters are fixed at 24px to provide a structured, professional look for dense product listings.
- **Tablet:** 8-column grid with 20px gutters. 
- **Mobile:** 4-column grid with 16px margins. 

The vertical rhythm follows a strict 8px increment rule. Components are spaced according to "Stack" variables to ensure consistency across the e-commerce journey, from product discovery to the checkout flow. High-end products (e.g., flagship laptops) should use increased whitespace (stack-lg) to communicate premium value.

## Elevation & Depth
To achieve a "high-tech" look, this design system utilizes **Tonal Layering** and **Ambient Shadows**.

- **Level 0 (Background):** The deepest neutral color (#0F172A).
- **Level 1 (Cards/Surface):** A slightly lighter shade with a subtle 1px inner border (10% white) to define edges without high-contrast outlines.
- **Level 2 (Modals/Popovers):** Elevated surfaces featuring a 15% opacity primary color tint in the shadow. Shadows are highly diffused (24px - 48px blur) to mimic the soft glow of RGB hardware lighting.
- **Glassmorphism:** Navigation bars and filter sidebars use a backdrop blur (20px) with a semi-transparent slate fill (70% opacity) to create a sense of depth and material quality.

## Shapes
The shape language is "Sleek Industrial." We use a **Rounded** (8px/0.5rem) base corner radius for most UI elements, which strikes a balance between the precision of sharp hardware and the approachability of modern software.

- **Standard Buttons & Inputs:** 8px (Rounded).
- **Product Cards:** 16px (Rounded-lg) to soften the large visual area of hardware images.
- **Status Tags/Chips:** Full pill (32px) to differentiate them from functional buttons.

## Components
- **Buttons:** Primary buttons use a solid Electric Blue fill with white text. Secondary buttons use a ghost style with a subtle white border. Interaction states (Hover/Active) should feature a slight "glow" effect using an outer shadow.
- **Input Fields:** Dark backgrounds with a 1px border. On focus, the border transitions to Primary Blue with a soft 4px outer glow. Labels use JetBrains Mono for a "terminal-inspired" look.
- **Product Cards:** Minimalist design. Hardware images should be on a clean, slightly lighter neutral background. Prices are bolded in white, and "Add to Cart" appears on hover to keep the initial view clean.
- **Technical Specs List:** Alternating row highlights (Zebra striping) using subtle tonal shifts. Use JetBrains Mono for the data values.
- **Progress Steppers:** Used in the checkout process, featuring the Cyber Yellow for the "Active" state to ensure the user knows exactly where they are in the transaction.
- **Hardware Badges:** Small, high-contrast labels (e.g., "RTX 4090", "DDR5") using label-sm and a subtle Primary Blue background.