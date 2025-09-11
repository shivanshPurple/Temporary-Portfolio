# Copilot Instructions for Temporary-Portfolio

## Project Overview

This is a personal portfolio website built with React 19, TypeScript, and Vite. It showcases projects in a cinematic, scroll-native experience with subtle animations. The site features a hero section, projects carousel with category filtering, about section, and contact. Data is driven by `src/data.json` for easy content updates without code changes. Styling uses Tailwind CSS with custom animations via GSAP and Framer Motion. All components are organized under `src/components/` (reorganized from previous `src/blocks/` for maintainability, as per qwen.md).

Key goals: Immersive user experience with dark theme, reduced motion support via `PrefsContext`, and responsive design. Avoid heavy WebGL; use lightweight backgrounds like `DarkVeil`. The project was simplified from an initial complex upgrade plan to improve performance, reduce bundle size, and focus on content (benefits: faster loads, easier maintenance, consistent UX).

## Architecture

- **Entry Point**: `src/main.tsx` renders `App.tsx` in strict mode.
- **Routing**: React Router for main sections (scroll-based) and `/project/:slug` modals. Main app uses scroll snap (`snap-y snap-mandatory`) for section navigation.
- **State Management**: Local `useState` in containers (e.g., `ProjectsSection.tsx` for filters/modals). Global prefs in `src/context/PrefsContext.tsx` for theme/reduced motion.
- **Data Flow**: Projects loaded from `src/data.json` into `ProjectsSection.tsx`. Filter by category, display in `Carousel.tsx`. Click opens modal with media/details. Data model follows `Project` interface in `types.ts`:
  ```typescript
  interface Project {
    category: string;
    title: string;
    technologies: string[];
    duration?: string;
    description?: string;
    media: { type: "video" | "image" | "iframe" | "external"; src: string }[];
    links: { text: string; url: string }[];
  }
  ```
- **Component Boundaries**:
  - `src/containers/`: Page sections (`HeroSection.tsx`, `ProjectsSection.tsx`, etc.) – compose UI, handle section logic.
  - `src/components/`: Reusable UI (e.g., `Carousel/`, `Dock/`, `GlassSurface/`). Subfolders for complex components (e.g., `DarkVeil/`).
  - `src/lib/utils.ts`: Shared utilities (e.g., class merging with `clsx`/`tailwind-merge`).
- **Styling**: Tailwind classes with `cva` for variants. Animations via `motion` (Framer Motion) and GSAP for precise control (e.g., scroll-triggered reveals).
- **Backgrounds/Effects**: Global fixed backgrounds (e.g., `DarkVeil.tsx` for subtle veil). Cursor effects like `TargetCursor.tsx` (disabled on reduced motion).

Example data flow in Projects: `data.json` → filter categories (exclude 'CERTIFICATIONS/INTERNSHIPS') → `Carousel` renders project cards (split layout: description left, media right) → click → modal shows media (auto-play videos) and details.

From qwen.md upgrade plan: Phased implementation (scaffolding → layout → data/cards → details → sections → polish). Current state reflects Phase 5: Simplified carousel-based projects explorer with chip filtering.

## Key Components and Patterns

- **Navigation**: Fixed `Dock.tsx` at bottom with icons (Lucide React) for smooth scroll to sections (e.g., `scrollIntoView`). No traditional navbar.
- **Projects Display** (`ProjectsSection.tsx`):
  - Category chips: Button array from unique categories in data.
  - `Carousel.tsx`: 80vw/65vh centered, touch/mouse nav, 8s autoplay (pause on hover), orange arrows/indicator on hover. Handles project cards with left: description/techs/duration, right: scrollable media (thumbnails + video icon for videos; collapses if empty).
  - Modal: Full-screen overlay (`bg-black bg-opacity-75`), `GlassSurface`-like container for details/media carousel. ESC/click outside/backdrop closes. Videos auto-play with controls.
- **Media Handling**: `Media` type in `types.ts`. Images: `<img object-contain>`. Videos: `<video muted loop>` in carousel previews, full in modal. Paths relative to `public/media/`. Multi-media: Scrollable section, click any to enlarge.
- **Animations**: Use `motion.div` for entrances (e.g., `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`). GSAP for scroll (e.g., `ScrollTrigger` in `ScrollStack.tsx`). Respect `reducedMotion` from context. Hover effects: `GlareHover` on cards.
- **Other Components** (from qwen.md mappings):
  - Hero: `Aurora` + `DarkVeil`; `SplitText` for title; `ShinyText` for subtitle; `GlareHover` on portrait.
  - About: `Spotlight Card` (if implemented); `Beams` background; `True Focus` text.
  - Featured/Projects: `Carousel`; `GlareHover`; `Scroll Reveal`.
  - Details: `GlassSurface`; inner `Carousel`; `ScrollStack` for content; subtle `Ribbons`.
  - Skills: `Chroma Grid`; `Variable Proximity` headings.
  - Certifications: `CardSwap` for front/back; `Iridescence` background.
  - Graphic Design: `Circular Gallery`; `Aurora` variant.
  - Footer: `Scroll Velocity` marquee; `Dot Grid` background.
- **Responsive**: Tailwind breakpoints (e.g., `lg:grid-cols-2` in modals). Mobile: Stack layouts, touch-friendly carousel.
- **Accessibility**: ARIA labels on interactive elements (e.g., carousel arrows). Keyboard nav for modals (trap focus). Contrast: White/orange on dark backgrounds. Screen reader: Proper labels for media/modals.

Example pattern in `ProjectsSection.tsx`:

```tsx
const filteredProjects = useMemo(
  () =>
    selectedCategory === "ALL"
      ? projectsData.projects
      : projectsData.projects.filter((p) => p.category === selectedCategory),
  [selectedCategory]
);
<Carousel items={filteredProjects} onItemClick={setSelectedProject} />;
{
  selectedProject && (
    <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
  );
}
```

Lessons from qwen.md: Proper JSON typing, reusable components, local state management, Vite compatibility, simplification for performance (e.g., unified gradient backgrounds, no heavy effects).

## Developer Workflows

- **Development**: `npm run dev` starts Vite dev server (hot reload). Use `reducedMotion: true` in prefs for testing animations off.
- **Build/Preview**: `npm run build` (TypeScript + Vite), then `npm run preview`. Outputs to `dist/`.
- **Linting**: `npm run lint` with ESLint (flat config in `eslint.config.js`). Focuses on React hooks/refresh.
- **TypeScript**: Strict mode (`tsconfig.json`). Types in `src/types.ts` (e.g., `Project` must match `data.json` schema).
- **Adding Projects**: Update `src/data.json` (add to `projects` array following schema). Restart dev server. For filtering, ensure category matches chip logic.
- **Debugging**: Check console for GSAP/Motion warnings. Use VS Code TypeScript debugger. For scroll issues, inspect `snap-container` class. Media paths: Verify relative to `public/`.
- **Testing**: No formal tests; manual via dev server. Verify: Filtering works (e.g., 'ALL' shows all except hidden), modals handle multi-media/empty sections, autoplay pauses on hover.
- **Performance**: Lazy load media via intersection observers. Mute autoplay videos. Fallbacks for low-end: Static gradients over animated backgrounds.

Commands not obvious: Toggle reduced motion via `PrefsContext` or add UI toggle in `Dock`. Custom Tailwind: Extend in `tailwind.config.js` (purple/neon accents, Poppins font).

From qwen.md: Update `qwen.md` after successful tasks (append to memories/lessons). Audit dependencies regularly (e.g., remove unused like `ogl`).

## Conventions and Patterns

- **File Naming**: PascalCase for components (e.g., `HeroSection.tsx`). CSS co-located (e.g., `Carousel.css`).
- **Imports**: Relative paths (e.g., `../components/Carousel`). Data: `import projectsData from '../data.json' assert { type: 'json' }` (ES modules).
- **Hooks**: Custom hooks in components (e.g., for carousel logic). Memoize filtered data to avoid re-renders.
- **Error Handling**: Graceful fallbacks (e.g., hide media if empty array). No try-catch; rely on TypeScript for prop validation.
- **Dependencies**: Pin versions (e.g., React 19, GSAP 3.13). Install via `npm i`. Use `lenis` for smooth scroll if re-enabled.
- **Git**: Commits follow `[qwen] feat|fix|docs|style|refactor|test|chore: <description>` (e.g., "[qwen] feat: add new project to data.json"). Branch from `master`. After commits, update `qwen.md` with changes/lessons.

Differing from common: No Redux/Context for projects (local state suffices). Scroll-based routing over multi-page. Data in static JSON, not API (for portfolio simplicity). Single-select filtering (no multi-select yet).

## Integration Points and Dependencies

- **External**: Lucide icons (`lucide-react`), GSAP (`@gsap/react`), Framer Motion (`motion`), Lenis (smooth scroll, optional). Media in `public/media/` (videos/images/PDFs).
- **Cross-Component**: `PrefsContext` wraps app; consume via `usePrefs()`. Events: `onItemClick` prop for carousel-to-modal. Routing: `useParams` in `ProjectDetail.tsx` matches slug to project title.
- **Fonts**: Import Poppins-ExtraBold.ttf in `index.css` for headings.
- **Build Integrations**: Vite with `@vitejs/plugin-react-swc` for fast builds. Tailwind via `@tailwindcss/vite` plugin. No server-side rendering.
- **Risks/Mitigations** (from qwen.md): Performance – lazy load media/backgrounds; fallbacks for videos (muted autoplay). Compatibility – pin react-bits versions if adding more (currently minimal). Bundle – tree-shake unused (e.g., `react-router` for modals only).

Future Opportunities (from qwen.md): Enhanced filtering (multi-select), project detail pages, dark/light mode toggle, lazy media loading, search, social sharing. Reference `qwen.md` for full upgrade plan and component mappings.

Reference files: `App.tsx` (structure), `ProjectsSection.tsx` (data/filtering/modal), `src/components/Dock/Dock.tsx` (nav), `src/data.json` (content), `qwen.md` (history/roadmap).
