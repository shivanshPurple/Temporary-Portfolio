# Qwen Code - Temporary Portfolio Project

## Project Overview

This is a portfolio website built with React, TypeScript, and Vite. It showcases various projects organized by categories in an accordion-based layout. All components have been reorganized from `src/blocks` to `src/components` for better maintainability.

## Architecture

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Motion (for animations)
- **Component Structure**:
  - `src/containers/` - Main page sections (Hero, Projects, About, Contact)
  - `src/components/` - Reusable UI components
  - `src/context/` - React context providers
  - `src/assets/` - Static assets

## Key Components

### Accordion System

- **Location**: `src/components/Accordion/`
- **Files**:
  - `Accordion.tsx` - Main accordion container
  - `AccordionItem.tsx` - Individual accordion items
  - `index.ts` - Export file
- **Purpose**: Display projects organized by category in an expandable/collapsible interface
- **Features**:
  - Categories sorted alphabetically
  - "UNITY" category (representing game development) prioritized to appear first
  - Smooth toggle animation
  - Responsive grid layout for projects within each category

### Data Structure

- **Location**: `src/data.json`
- **Structure**: Array of project objects with:
  - `category`: Project category (e.g., "UNITY", "ANDROID JAVA")
  - `title`: Project title
  - `technologies`: Array of technologies used
  - `duration`: Project duration
  - `description`: Detailed project description
  - `media`: Array of media objects (images/videos)
  - `links`: Array of link objects

### Type Definitions

- **Location**: `src/types.ts`
- **Interfaces**:
  - `Media`: Media object with type ("image"|"video") and source
  - `Link`: Link object with text and URL
  - `Project`: Complete project structure

## Key Features Implemented

1. **Accordion-based Project Display**: Projects organized by category in expandable sections
2. **Category Prioritization**: "UNITY" category (game development) appears first
3. **Responsive Design**: Works on mobile and desktop
4. **Media Support**: Displays images and videos for projects
5. **Technology Tags**: Visual tags for technologies used in each project
6. **External Links**: Links to project details, videos, and websites
7. **Component Reorganization**: Moved all components from `src/blocks` to `src/components` for better organization
8. **Category-Specific Backgrounds**: Dynamic backgrounds that change based on the selected project category

## Lessons Learned

1. **TypeScript Integration**: Proper typing of JSON data imported from files
2. **Component Structure**: Building reusable, well-organized components
3. **State Management**: Using React useState for accordion open/close states
4. **Path Resolution**: Correct relative path imports in nested component structures
5. **Build Process**: Ensuring compatibility with Vite build process

## Future Enhancement Opportunities

1. **Search/Filter**: Add search and filtering capabilities
2. **Animation**: Re-implement smooth height animations for accordion items
3. **Project Details**: Create dedicated project detail pages
4. **Dark/Light Mode**: Implement theme switching
5. **Performance**: Optimize media loading with lazy loading
6. **Accessibility**: Improve keyboard navigation and screen reader support
7. **Component Organization**: All components have been reorganized from `src/blocks` to `src/components` for better maintainability
8. **Background Transitions**: Background transitions between categories could be further enhanced with more sophisticated animations

## Upgrade Plan - React Portfolio Conversion

### Overview

Convert the current HTML/CSS portfolio into a modern React application using the react-bits component library. This plan moves away from accordions to a cinematic, scroll-native experience with section-based storytelling, subtle motion, and rich media.

### High-level Concept

- **Cinematic, category-driven portfolio** with immersive section backgrounds, animated type, and interactive cards
- **Data-driven projects** from projects.json (already created), enabling filtering and future updates without code changes
- **Motion as progressive enhancement**; users with reduced-motion preference get a quiet, accessible version

### Tech Stack and Project Structure

- **React + TypeScript + Vite**
- **Tailwind CSS** (react-bits ts-tailwind components are first-class here)
- **React Router** (for optional deep links / project routes)
- **Project data**: src/data/projects.json (copy from root projects.json at build or import directly)

#### Directory Layout

```
src/ ├── components/ │ ├── reactbits/ # Drop-in components from MCP │ └── app/ # Compositions/wrappers, layout, cards, modals ├── pages/ │ ├── Home.tsx │ ├── Projects.tsx # Optional │ └── ProjectDetail.tsx # Optional routed modal ├── context/ │ └── PrefsContext.tsx # Reduced motion, theme └── styles/ └── tailwind.css
```

### Core UX Flow and Component Strategy

#### 1. Global: Navigation + Cursor + Base FX

- **Quick Access Dock** (appears all the time): Components/Dock for category jump shortcuts
- **Cursor Effects**: Animations/Fluid Glass. Respect prefers-reduced-motion.

#### 2. Hero/Intro (replaces old title area)

- **Background**: Backgrounds/Dark Veil (primary background)
- **Title Text**: Text Animations/Split Text for "Shivansh Saini"
- **Subtitle**: Text Animations/Shiny Text for the single-line intro
- **Micro-interactions**: Animations/Glare Hover on the portrait card
- **Optional**: Animations/Click Spark for celebratory clicks on CTA buttons

#### 3. About Me spotlight

- **Card**: Components/Spotlight Card housing portrait + short bio + CTA anchors
- **Background**: Backgrounds/Beams (very low intensity)
- **Text Accents**: Text Animations/True Focus for a single emphasized sentence

#### 4. Featured Projects (carousel)

- **Component**: Components/Carousel showcasing 4–6 favorite works (Unity RL, Stethoscope App, Crypto Manager, Reddit Feed, etc.)
- **Hover**: Animations/Glare Hover on slides for premium feel
- **Text**: Text Animations/Scroll Reveal on slide captions

#### 5. Projects Explorer (the main portfolio grid)

- **Filter Tabs/Chips**: Components/Infinite Menu for category filters (Unity, Android Java, Flutter, Python, Design, Certifications)
- **Grid Layout**: Components/Masonry for mixed media cards
- **Card Pattern**:
  - Tilt/Hover: Components/Tilted Card for primary cards
  - Alternate: Components/Spotlight Card for media-centric entries
  - Hover image fx: Animations/Image Trail on cursor move in the grid area (optional, desktop)
- **Scroll-in FX**: Text Animations/Scroll Reveal for section headings; Animations/Fade Content for card batches
- **Section Background by Category** (when a filter is active):
  - Unity: Backgrounds/Hyperspeed
  - Android Java: Backgrounds/Orb
  - Flutter: Backgrounds/Liquid Chrome
  - Python: Backgrounds/Dot Grid
  - Graphic Design: Backgrounds/Silk
  - Certifications: Backgrounds/Dither
- **Enhanced UX**: Smooth transitions between category backgrounds with overlay for text readability

#### 6. Project Details (modal + routed support)

- **Container**: Components/Glass Surface as the modal shell
- **Media**:
  - Components/Carousel inside modal to flip through video/image assets
- **Content Layout**: Components/Scroll Stack for description sections, duration, tech chips, links
- **Decorative motion**: Animations/Ribbons very subtle behind the modal (disabled on low-power)
- **Accessibility**: close via ESC, backdrop click, and Close button
- **Routing**: Optional /project/:slug route that opens this modal on top of the grid for shareability

#### 7. Skills/Tech Stack visualization

- **Grid**: Components/Chroma Grid showing tech icons inferred from projects.json (aggregate techs)
- **Text flair**: Text Animations/Variable Proximity for dynamic headings (disabled if reduced motion)

#### 8. Certifications/Experience

- **Cards**: Components/Card Swap for front/back certificate info (front: title/duration; back: link actions)
- **Download/View Link**: open PDFs (from media/)
- **Background**: Backgrounds/Iridescence to differentiate from projects

#### 9. Graphic Design Gallery

- **Gallery**: Components/Circular Gallery to show Blender/Illustrator reels
- **Background**: Backgrounds/Orb
- **Hover**: Animations/Glare Hover on thumbnails

#### 10. Footer + Contact

- **Marquee**: Text Animations/Scroll Velocity to cycle through key skills and roles
- **Background**: Backgrounds/Dot Grid
- **CTA Buttons**: Use Components/Dock for social/contact
- **If adding a form later**: consider Forms library set (plain CSS in repo list); for now link to email/LinkedIn/GitHub

### Data and Integration Details

#### Data Model

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

#### Integration Points

- **Source**: Use projects.json already in repo

- **Filtering**: compute unique categories from data; map multiple related (e.g., Certifications/Internships => "Certifications" tag)

- **Search** (optional): text search by title/tech

- **Media Handling**:

  - Videos: HTML5 video with muted loop previews in grid; full controls inside modal
  - Images: native `<img>` or next/image equivalent if later migrating
  - Iframes (YouTube): use responsive container

### Performance and Accessibility

#### Performance Optimizations

- Lazy load heavy backgrounds and media via intersection observers

- Provide a "Reduce Motion" toggle that:

  - Disables background shaders/heavy canvases (Galaxy, Liquid Chrome)
  - Switches to static gradient or Dark Veil
  - Disables cursor effects, Scroll Velocity

#### Accessibility Features

- Keyboard navigation: modal trap focus
- Color contrast: ensure readable text over animated backgrounds (use Dark Veil overlays and backdrop blur)
- Screen reader support: proper ARIA labels on interactive elements
- Reduced motion: comprehensive support throughout

### Styling and Theming

#### Design System

- **Default to dark theme**; add a theme toggle in Dock
- **Tailwind custom colors** aligned with "purple/neon" accent brand
- **Use spacing rhythm** across sections with container max-w and consistent paddings
- **Typography**: Preserve Poppins-ExtraBold.ttf for headings

### Implementation Roadmap (Phased)

#### Phase 0: Scaffolding

- Initialize Vite + React + TS; install Tailwind; set up base config and fonts
- Add react-bits components you plan to use (co-locate under src/components/reactbits)
- Add PrefsContext (reduced-motion/theme)

#### Phase 1: Layout + Navigation

- Build App layout with Dock
- Add Dark Veil background and Split Text hero with subtitle
- Wire reduced-motion to switch out backgrounds/cursor effects

#### Phase 2: Data and Cards

- Import projects.json; define Project type
- Build Masonry grid with filters (Infinite Menu)
- Create Card variants (Tilted Card and Spotlight Card)
- Implement lazy loading and hover FX (Glare Hover/Image Trail)

#### Phase 3: Project Details

- Modal shell (Glass Surface) with Carousel
- Scroll Stack content; deep linking /project/:slug

#### Phase 4: Sections

- About (Spotlight Card), Skills (Chroma Grid), Certifications (Card Swap), Graphic Design (Circular Gallery)
- Footer marquee (Scroll Velocity) and links

#### Phase 5: Polish & QA

- Performance passes, reduce-motion checks, mobile breakpoints, contrast, focus states
- Optional: add Blob Cursor/Click Spark gated by prefs
- Deploy (GitHub Pages/Netlify) + GH Actions CI

### Exact Component-to-Section Mapping Reference

| Section        | Components Used                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| Global         | Dock, Blob Cursor/Target Cursor, Click Spark                                                                  |
| Hero           | Aurora + Dark Veil; Split Text; Shiny/Gradient Text; Glare Hover                                              |
| About          | Spotlight Card; Beams/Light Rays; True Focus                                                                  |
| Featured       | Carousel; Glare Hover; Scroll Reveal                                                                          |
| Projects       | Infinite Menu (filters); Masonry (grid); Tilted Card/Spotlight Card; Image Trail; Fade Content; Scroll Reveal |
| Details        | Glass Surface/Fluid Glass; Carousel/Rolling Gallery; Scroll Stack; Ribbons                                    |
| Skills         | Chroma Grid; Variable Proximity                                                                               |
| Certifications | Card Swap; Light Rays/Iridescence                                                                             |
| Graphic Design | Circular Gallery/Rolling Gallery; Orb/Aurora variant                                                          |
| Footer         | Scroll Velocity; Dot Grid                                                                                     |

### Risks and Mitigations

#### Performance Risks

- **Heavy backgrounds on low-end devices**: gate with reduced-motion; provide static gradient fallbacks
- **Video auto-play policies**: ensure autoplay muted; provide poster frames
- **Component overlap/z-index with backgrounds**: use overlays/backdrop blur consistently

#### Technical Risks

- **Component compatibility**: test react-bits versions early; pin exact versions
- **Bundle size**: lazy load components; tree-shake unused ones
- **Browser support**: ensure fallbacks for older browsers

### Hand-off Considerations

#### Documentation

- Pin exact version tags of react-bits components used
- Tailwind config and plugin list documented
- Component wrappers (e.g., SafeBackground) to centralize reduced-motion logic
- All components have been reorganized from `src/blocks` to `src/components` for better maintainability

#### Future Extensibility

- Modular component structure for easy additions
- Data-driven approach allows content updates without code changes
- Router setup ready for additional pages/routes

# MOST IMPORTANT PART.

- Update qwen.md file after every successful task completion.
- When doing git commit message, use the following format: "[qwen] feat|fix|docs|style|refactor|test|chore: <description>".
- Note: All components have been reorganized from `src/blocks` to `src/components` for better maintainability.

## Qwen Added Memories
- I will automatically update the qwen.md file after every successful task completion without requiring manual prompting. This is now part of my standard workflow.
