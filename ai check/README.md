# Ferrari Immersive Experience

An exceptional Ferrari website featuring premium 3D experiences, scroll-driven storytelling, and cinematic design.

## Tech Stack

- **Vite** - Build tool and dev server
- **Three.js** - WebGL 3D rendering
- **GSAP** - Premium animations and ScrollTrigger
- **Lenis** - Smooth scrolling
- **Sass** - Modular SCSS architecture

## Project Structure

```
src/
├── scss/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── base/
│   │   └── _base.scss
│   ├── components/
│   │   ├── _hero.scss
│   │   ├── _gallery.scss
│   │   ├── _button.scss
│   │   ├── _loader.scss
│   │   ├── _heritage.scss
│   │   ├── _innovation.scss
│   │   └── _racing.scss
│   ├── layout/
│   │   ├── _header.scss
│   │   └── _footer.scss
│   └── main.scss
└── js/
    ├── main.ts
    ├── loader.ts
    ├── smooth-scroll.ts
    ├── navigation.ts
    ├── hero-3d.ts
    ├── gallery-3d.ts
    └── animations.ts
```

## Features

- 3D hero section with rotating car model
- Interactive 3D model showcases in gallery
- Scroll-triggered animations
- Premium luxury design with Ferrari red accents
- Responsive layout for all devices
- Accessibility compliance (WCAG AA)
- Performance optimized with code splitting

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```