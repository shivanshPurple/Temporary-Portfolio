```markdown
# React Portfolio Conversion Plan

## Overview

Convert the current HTML/CSS portfolio into a modern React application using the react-bits component library. This plan moves away from accordions to a cinematic, scroll-native experience with section-based storytelling, subtle motion, and rich media.

## High-level Concept

- **Cinematic, category-driven portfolio** with immersive section backgrounds, animated type, and interactive cards
- **Data-driven projects** from projects.json (already created), enabling filtering and future updates without code changes
- **Motion as progressive enhancement**; users with reduced-motion preference get a quiet, accessible version

## Tech Stack and Project Structure

- **React + TypeScript + Vite**
- **Tailwind CSS** (react-bits ts-tailwind components are first-class here)
- **React Router** (for optional deep links / project routes)
- **Project data**: src/data/projects.json (copy from root projects.json at build or import directly)

### Directory Layout
```

src/ ├── components/ │ ├── reactbits/ # Drop-in components from MCP │ └── app/ # Compositions/wrappers, layout, cards, modals ├── pages/ │ ├── Home.tsx │ ├── Projects.tsx # Optional │ └── ProjectDetail.tsx # Optional routed modal ├── context/ │ └── PrefsContext.tsx # Reduced motion, theme └── styles/ └── tailwind.css

````javascript

## Core UX Flow and Component Strategy

### 1. Global: Navigation + Cursor + Base FX
- **Top Navigation**: Components/Gooey Nav for a playful sticky nav (Home, Projects, Categories, Design, Certificates, Contact)
- **Quick Access Dock** (desktop only): Components/Dock for category jump shortcuts
- **Cursor Effects**: Animations/Blob Cursor (or Animations/Target Cursor). Respect prefers-reduced-motion.

### 2. Hero/Intro (replaces old title area)
- **Background**: Backgrounds/Aurora (primary) + subtle Backgrounds/Dark Veil overlay for contrast
- **Title Text**: Text Animations/Split Text for "Shivansh Saini"
- **Subtitle**: Text Animations/Shiny Text or Gradient Text for the single-line intro
- **Micro-interactions**: Animations/Glare Hover on the portrait card
- **Optional**: Animations/Click Spark for celebratory clicks on CTA buttons

### 3. About Me spotlight
- **Card**: Components/Spotlight Card housing portrait + short bio + CTA anchors
- **Background**: Backgrounds/Beams or Light Rays (very low intensity)
- **Text Accents**: Text Animations/True Focus for a single emphasized sentence

### 4. Featured Projects (carousel)
- **Component**: Components/Carousel showcasing 4–6 favorite works (Unity RL, Stethoscope App, Crypto Manager, Reddit Feed, etc.)
- **Hover**: Animations/Glare Hover on slides for premium feel
- **Text**: Text Animations/Scroll Reveal on slide captions

### 5. Projects Explorer (the main portfolio grid)
- **Filter Tabs/Chips**: Components/Infinite Menu for category filters (Unity, Android Java, Flutter, Python, Design, Certifications)
- **Grid Layout**: Components/Masonry for mixed media cards
- **Card Pattern**:
  - Tilt/Hover: Components/Tilted Card for primary cards
  - Alternate: Components/Spotlight Card for media-centric entries
  - Hover image fx: Animations/Image Trail on cursor move in the grid area (optional, desktop)
- **Scroll-in FX**: Text Animations/Scroll Reveal for section headings; Animations/Fade Content for card batches
- **Section Background by Category** (when a filter is active):
  - Unity: Backgrounds/Threads or Grid Distortion
  - Android Java: Backgrounds/Grid Motion
  - Flutter: Backgrounds/Liquid Chrome or Waves
  - Python: Backgrounds/Dot Grid
  - Graphic Design: Backgrounds/Silk
  - Certifications: Backgrounds/Light Rays or Dither

### 6. Project Details (modal + routed support)
- **Container**: Components/Glass Surface or Fluid Glass as the modal shell
- **Media**:
  - Components/Carousel inside modal to flip through video/image assets
  - For long-form media: Components/Rolling Gallery
- **Content Layout**: Components/Scroll Stack for description sections, duration, tech chips, links
- **Decorative motion**: Animations/Ribbons very subtle behind the modal (disabled on low-power)
- **Accessibility**: close via ESC, backdrop click, and Close button
- **Routing**: Optional /project/:slug route that opens this modal on top of the grid for shareability

### 7. Skills/Tech Stack visualization
- **Grid**: Components/Chroma Grid showing tech icons inferred from projects.json (aggregate techs)
- **Text flair**: Text Animations/Variable Proximity for dynamic headings (disabled if reduced motion)

### 8. Certifications/Experience
- **Cards**: Components/Card Swap for front/back certificate info (front: title/duration; back: link actions)
- **Download/View Link**: open PDFs (from media/)
- **Background**: Backgrounds/Light Rays or Iridescence to differentiate from projects

### 9. Graphic Design Gallery
- **Gallery**: Components/Circular Gallery or Rolling Gallery to show Blender/Illustrator reels
- **Background**: Backgrounds/Orb or Aurora variant
- **Hover**: Animations/Glare Hover on thumbnails

### 10. Footer + Contact
- **Marquee**: Text Animations/Scroll Velocity to cycle through key skills and roles
- **Background**: Backgrounds/Dot Grid
- **CTA Buttons**: Use Tailwind-styled buttons or Components/Dock for social/contact
- **If adding a form later**: consider Forms library set (plain CSS in repo list); for now link to email/LinkedIn/GitHub

## Data and Integration Details

### Data Model
```typescript
interface Project {
  category: string;
  title: string;
  technologies: string[];
  duration?: string;
  description?: string;
  media: { type: 'video'|'image'|'iframe'|'external'; src: string }[];
  links: { text: string; url: string }[];
}
````

### Integration Points

- **Source**: Use projects.json already in repo

- **Filtering**: compute unique categories from data; map multiple related (e.g., Certifications/Internships => "Certifications" tag)

- **Search** (optional): text search by title/tech

- **Media Handling**:

  - Videos: HTML5 video with muted loop previews in grid; full controls inside modal
  - Images: native `<img>` or next/image equivalent if later migrating
  - Iframes (YouTube): use responsive container

## Performance and Accessibility

### Performance Optimizations

- Lazy load heavy backgrounds and media via intersection observers

- Provide a "Reduce Motion" toggle that:

  - Disables background shaders/heavy canvases (Galaxy, Liquid Chrome)
  - Switches to static gradient or Dark Veil
  - Disables cursor effects, Scroll Velocity

### Accessibility Features

- Keyboard navigation: Gooey Nav focus rings, modal trap focus
- Color contrast: ensure readable text over animated backgrounds (use Dark Veil overlays and backdrop blur)
- Screen reader support: proper ARIA labels on interactive elements
- Reduced motion: comprehensive support throughout

## Styling and Theming

### Design System

- **Default to dark theme**; add a theme toggle in Dock
- **Tailwind custom colors** aligned with "purple/neon" accent brand
- **Use spacing rhythm** across sections with container max-w and consistent paddings
- **Typography**: Preserve Poppins-ExtraBold.ttf for headings

## Implementation Roadmap (Phased)

### Phase 0: Scaffolding

- Initialize Vite + React + TS; install Tailwind; set up base config and fonts
- Add react-bits components you plan to use (co-locate under src/components/reactbits)
- Add PrefsContext (reduced-motion/theme)

### Phase 1: Layout + Navigation

- Build App layout with Gooey Nav and optional Dock
- Add Aurora background and Split Text hero with subtitle
- Wire reduced-motion to switch out backgrounds/cursor effects

### Phase 2: Data and Cards

- Import projects.json; define Project type
- Build Masonry grid with filters (Infinite Menu)
- Create Card variants (Tilted Card and Spotlight Card)
- Implement lazy loading and hover FX (Glare Hover/Image Trail)

### Phase 3: Project Details

- Modal shell (Glass Surface / Fluid Glass) with Carousel/Rolling Gallery
- Scroll Stack content; deep linking /project/:slug

### Phase 4: Sections

- About (Spotlight Card), Skills (Chroma Grid), Certifications (Card Swap), Graphic Design (Circular/Rolling Gallery)
- Footer marquee (Scroll Velocity) and links

### Phase 5: Polish & QA

- Performance passes, reduce-motion checks, mobile breakpoints, contrast, focus states
- Optional: add Blob Cursor/Click Spark gated by prefs
- Deploy (GitHub Pages/Netlify) + GH Actions CI

## Exact Component-to-Section Mapping Reference

| Section | Components Used | |---------|----------------| | Global | Gooey Nav, Dock, Blob Cursor/Target Cursor, Click Spark | | Hero | Aurora + Dark Veil; Split Text; Shiny/Gradient Text; Glare Hover | | About | Spotlight Card; Beams/Light Rays; True Focus | | Featured | Carousel; Glare Hover; Scroll Reveal | | Projects | Infinite Menu (filters); Masonry (grid); Tilted Card/Spotlight Card; Image Trail; Fade Content; Scroll Reveal | | Details | Glass Surface/Fluid Glass; Carousel/Rolling Gallery; Scroll Stack; Ribbons | | Skills | Chroma Grid; Variable Proximity | | Certifications | Card Swap; Light Rays/Iridescence | | Graphic Design | Circular Gallery/Rolling Gallery; Orb/Aurora variant | | Footer | Scroll Velocity; Dot Grid |

## Risks and Mitigations

### Performance Risks

- **Heavy backgrounds on low-end devices**: gate with reduced-motion; provide static gradient fallbacks
- **Video auto-play policies**: ensure autoplay muted; provide poster frames
- **Component overlap/z-index with backgrounds**: use overlays/backdrop blur consistently

### Technical Risks

- **Component compatibility**: test react-bits versions early; pin exact versions
- **Bundle size**: lazy load components; tree-shake unused ones
- **Browser support**: ensure fallbacks for older browsers

## Hand-off Considerations

### Documentation

- Pin exact version tags of react-bits components used
- Tailwind config and plugin list documented
- Component wrappers (e.g., SafeBackground) to centralize reduced-motion logic

### Future Extensibility

- Modular component structure for easy additions
- Data-driven approach allows content updates without code changes
- Router setup ready for additional pages/routes
