---
applyTo: "src/**/*.tsx"
---

# Casurina Website — Component & Page Conventions

## Component Structure

- Start every component file with `"use client"`
- Use named `export default function` declarations (not arrow-function assignments)
- Keep state local with React hooks (`useState`, `useRef`, `useEffect`) — no Redux or Context API

```tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ComponentName() {
  const [state, setState] = useState(false);
  return <motion.div>...</motion.div>;
}
```

## Styling

- Use **Tailwind CSS 4** utility classes for all styling — no CSS modules or styled-components
- Use the project's custom theme colors: `amber`, `stone`, `brown`, `forest`, `fire`
- Use `font-display` class for serif headings (Playfair Display)
- Use responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`) for all breakpoints
- Prefer `backdrop-blur` + semi-transparent backgrounds for glass effects

## Animation

- Use **Framer Motion** for all animations via `motion.*` components
- Use the project's standard easing: `[0.23, 1, 0.32, 1]`
- Use `useScroll()` + `useTransform()` for scroll-driven animations
- Use `AnimatePresence` for enter/exit transitions
- Use `useInView()` for reveal-on-scroll effects

## Icons & Assets

- Use **Lucide React** for all icons — do not use other icon libraries
- Import icons individually: `import { Menu, X } from "lucide-react"`

## Imports

- Use the `@/*` path alias for all `src/` imports (e.g., `@/data/business`)
- Import business data from `@/data/business` and services from `@/data/services`

## Data

- Keep all business/content data in `src/data/` as typed exports with TypeScript interfaces
- Never hardcode business info (phone, address, hours) — import from `businessInfo`
