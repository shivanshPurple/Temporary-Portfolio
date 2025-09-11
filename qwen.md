# Qwen Code - Temporary Portfolio Project

## Project Overview

This is a portfolio website built with React, TypeScript, and Vite. It showcases various projects organized by categories in a simple carousel layout with filtering chips. All components have been reorganized from `src/blocks` to `src/components` for better maintainability.

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

### Carousel System

- **Location**: `src/components/Carousel/`
- **Files**:
  - `Carousel.tsx` - Main carousel component
  - `Carousel.css` - Styling for the carousel
- **Purpose**: Display projects in a large, centered carousel layout
- **Features**:
  - Responsive design taking 80vw width and 65vh height
  - Touch and mouse navigation
  - Looping capability
  - 8-second autoplay with hover-pause functionality
  - Orange navigation arrows that appear on hover
  - Autoplay indicator (orange) that appears on hover
  - Smooth transitions between slides
  - Media modal system for detailed viewing

### Filtering System

- **Location**: `src/containers/ProjectsSection.tsx`
- **Purpose**: Allow users to filter projects by category
- **Features**:
  - Simple category chips for filtering
  - Visual indication of active filters
  - Clear all filters option

### Project Cards

- **Location**: `src/containers/ProjectsSection.tsx`
- **Purpose**: Split-layout project cards with description and media
- **Features**:
  - Two-column layout (description on left, media on right)
  - Adaptive layout that adjusts based on content availability
  - Media section collapses when no media is available
  - Images displayed directly in carousel
  - Videos shown as thumbnails with video icon overlay
  - Click to open media in full-screen modal
  - Clear project duration display with clock icon
  - Technology tags with consistent styling
  - Scrollable media section for projects with multiple media items
  - Media height constrained to fit within carousel boundaries

### Modal System

- **Location**: `src/containers/ProjectsSection.tsx`
- **Purpose**: Display media in a full-screen modal for detailed viewing
- **Features**:
  - Semi-transparent dark overlay background
  - Centered media display with maximum height constraints
  - Close button in top-right corner
  - Click outside modal or press ESC to close
  - Auto-play videos when opened in modal
  - Project title display above media
  - Responsive design that works on all screen sizes

### Media Handling

- **Location**: `src/containers/ProjectsSection.tsx`
- **Purpose**: Efficient media display and interaction within carousel
- **Features**:
  - Images displayed directly in carousel with proper scaling
  - Videos shown as thumbnails with video icon overlay in carousel
  - Media section automatically hides when no media is available
  - Scrollable media section for projects with multiple media items
  - Media height constrained to fit within carousel boundaries
  - Click to open any media in full-screen modal
  - Auto-play videos when opened in modal
  - Hover effects with maximize icon to indicate interactivity

- **Location**: `src/components/GlassSurface/`
- **Files**:
  - `GlassSurface.tsx` - Modal container
  - `GlassSurface.css` - Styling for the modal
- **Purpose**: Display detailed project information in a modal
- **Features**:
  - Semi-transparent background
  - Close button and keyboard navigation
  - Responsive layout for all screen sizes

## Simplified Architecture

After implementing the initial upgrade plan, the portfolio was further simplified to improve performance and maintainability:

### Benefits of Simplification

1. **Improved Performance**: Removed heavy WebGL backgrounds and complex animations
2. **Reduced Bundle Size**: Eliminated unused dependencies and components
3. **Easier Maintenance**: Simplified codebase with fewer components and dependencies
4. **Consistent User Experience**: Unified design approach across all sections
5. **Better Accessibility**: Streamlined navigation and interaction patterns
6. **Faster Development**: Simpler components are quicker to understand and modify
7. **Focus on Content**: Eliminated distractions to focus on project展示

### Current Component Architecture

- **Unified Background System**: Single gradient background with overlay for all sections
- **Simple Carousel Design**: Carousel component used for project displays
- **Chip-based Filtering**: Simple category filtering with chips above carousel
- **Streamlined State Management**: Reduced component state and simplified data flow

## Lessons Learned

1. **TypeScript Integration**: Proper typing of JSON data imported from files
2. **Component Structure**: Building reusable, well-organized components
3. **State Management**: Using React useState for component state management
4. **Path Resolution**: Correct relative path imports in nested component structures
5. **Build Process**: Ensuring compatibility with Vite build process
6. **Component Simplification**: Benefits of simplifying complex UI systems for better performance and maintainability
7. **Dependency Management**: Importance of regularly auditing and cleaning up unused dependencies
8. **Consistent Design Systems**: Value of unified design approaches across different sections of an application
9. **User Experience Focus**: Simpler designs often provide better user experiences
10. **Performance Optimization**: Removing unnecessary features can significantly improve performance

## Future Enhancement Opportunities

1. **Enhanced Filtering**: Improve filtering UI with better visual design and multi-select capabilities
2. **Project Details**: Create dedicated project detail pages with more comprehensive information
3. **Dark/Light Mode**: Implement theme switching for user preference
4. **Performance**: Optimize media loading with lazy loading and progressive enhancement
5. **Accessibility**: Improve keyboard navigation and screen reader support
6. **Component Organization**: All components have been reorganized from `src/blocks` to `src/components` for better maintainability
7. **Enhanced Carousel**: Add more sophisticated carousel features and transitions
8. **Interactive Elements**: Implement more interactive elements and effects
9. **Mobile Optimization**: Further optimize for mobile devices and touch interactions
10. **Search Functionality**: Add search capabilities to find specific projects
11. **Social Sharing**: Add social sharing buttons for projects
12. **Analytics Integration**: Add analytics to track project views and user engagement

## Upgrade Plan - React Portfolio Conversion

### Overview

Convert the current HTML/CSS portfolio into a modern React application using the react-bits component library. This plan moves away from accordions to a cinematic, scroll-native experience with section-based storytelling, subtle motion, and rich media.

### High-level Concept

- **Cinematic, category-driven portfolio** with immersive section backgrounds, animated type, and interactive cards
- **Data-driven projects** from projects.json (already created), enabling filtering and future updates without code changes

### Tech Stack and Project Structure

- **React + TypeScript + Vite**
- **Tailwind CSS** (react-bits ts-tailwind components are first-class here)
- **React Router** (for optional deep links / project routes)
- **Project data**: src/data/projects.json (copy from root projects.json at build or import directly)

#### Directory Layout

```
src/ ├── components/ │ ├── reactbits/ # Drop-in components from MCP │ └── app/ # Compositions/wrappers, layout, cards, modals ├── pages/ │ ├── Home.tsx │ ├── Projects.tsx # Optional │ └── ProjectDetail.tsx # Optional routed modal ├── context/ │ └── PrefsContext.tsx # Theme support └── styles/ └── tailwind.css
```

### Core UX Flow and Component Strategy

#### 1. Global: Navigation + Cursor + Base FX

- **Quick Access Dock** (appears all the time): Components/Dock for category jump shortcuts
- **Cursor Effects**: Animations/Fluid Glass.

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

- **Filter Tabs/Chips**: Simple category filtering chips above carousel (single-select)
- **Display**: Large carousel component taking 80vw width and 65vh height, centered on screen
- **Card Pattern**: Split-layout project cards with description on left and media on right
- **Media Handling**: 
  - Images displayed directly in carousel
  - Videos shown as thumbnails with video icon overlay
  - Click to open media in full-screen modal
  - Auto-play videos in modal
- **Navigation**: 
  - Orange navigation arrows that appear on hover
  - Autoplay indicator (orange) that appears on hover
  - 8-second autoplay delay for better viewing experience
- **Adaptive Layout**: 
  - Media section collapses when no media is available
  - Description section reduces size for content-light projects
  - Scrollable media section for projects with multiple items

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
- **Text flair**: Text Animations/Variable Proximity for dynamic headings

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

#### Accessibility Features

- Keyboard navigation: modal trap focus
- Color contrast: ensure readable text over animated backgrounds (use Dark Veil overlays and backdrop blur)
- Screen reader support: proper ARIA labels on interactive elements

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
- Add PrefsContext (theme)

#### Phase 1: Layout + Navigation

- Build App layout with Dock
- Add Dark Veil background and Split Text hero with subtitle

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
| Projects       | Carousel; Category filtering chips                                                                            |
| Details        | Glass Surface/Fluid Glass; Carousel/Rolling Gallery; Scroll Stack; Ribbons                                    |
| Skills         | Chroma Grid; Variable Proximity                                                                               |
| Certifications | Card Swap; Light Rays/Iridescence                                                                             |
| Graphic Design | Circular Gallery/Rolling Gallery; Aurora variant                                                              |
| Footer         | Scroll Velocity; Dot Grid                                                                                     |

### Risks and Mitigations

#### Performance Risks

- **Heavy backgrounds on low-end devices**: provide static gradient fallbacks
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
- All components have been reorganized from `src/blocks` to `src/components` for better maintainability

#### Future Extensibility

- Modular component structure for easy additions
- Data-driven approach allows content updates without code changes
- Router setup ready for additional pages/routes

# MOST IMPORTANT PART.

- Update qwen.md file after every successful task completion.
- When doing git commit message, use the following format: "[qwen] feat|fix|docs|style|refactor|test|chore: <description>".
- Note: All components have been reorganized from `src/blocks` to `src/components` for better maintainability.

## Thumbnail Generation

Completed thumbnail generation for all video files using ffmpeg:
- Created a thumbnail generation script using Node.js and ffmpeg
- Generated thumbnails for all 17 video files in the media directory
- Updated package.json with a script to run thumbnail generation
- Fixed inconsistencies between generated thumbnail filenames and references in data.json
- Verified that thumbnails are properly displayed in the carousel
- Fixed issue with thumbnails not displaying by changing approach to show thumbnails as images instead of video posters
- Fixed issue with thumbnails being generated in the wrong directory (needed to be in public/media not media)
- Updated thumbnail styling to maintain original aspect ratio while constraining to available space in carousel
- Removed rounded corners from media elements for a cleaner look
- Removed fullscreen icon and kept only video icon for better visual consistency
- Vertically centered all media elements for improved presentation
- Removed "Video: filename" labels beside thumbnails for cleaner display
- Added subtle translucent grey background to video icons for better visibility
- Fixed description area to reduce width instead of hiding when empty
- Reset carousel index to 0 when filters are applied for better user experience
- Updated thumbnail generation to capture frames from the middle of videos instead of the beginning

## Content Updates

Enhanced portfolio content with more detailed sections:
- Created comprehensive About Me section with skills and background information
- Updated Contact section with Instagram handle (@shivansh-purple) and email (shivanshsaini17@gmail.com)

## Vercel Deployment

Configured thumbnail generation for Vercel deployments:
- Created build-time thumbnail generation script that runs during Vercel deployment
- Added prebuild script to package.json to automatically attempt thumbnail generation
- Provided fallback instructions for environments without ffmpeg
- Created comprehensive documentation for Vercel deployment (THUMBNAIL_VERCEL.md)
- Added API endpoint for potential future serverless thumbnail generation

## Bug Fixes

Resolved several issues in the portfolio:
- Fixed FiGamepad icon error in About section by replacing with available FiCpu icon
- Fixed carousel pause/play functionality on mouse enter/exit by improving hover detection and autoplay indicator visibility
- Updated autoplay indicator to show at all times with color-coded states (orange pause when mouse is inside, green play when mouse is outside)

## Qwen Added Memories
- I will automatically update the qwen.md file after every successful task completion without requiring manual prompting. This is now part of my standard workflow.
