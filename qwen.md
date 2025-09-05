# Qwen Code - Temporary Portfolio Project

## Project Overview
This is a portfolio website built with React, TypeScript, and Vite. It showcases various projects organized by categories in an accordion-based layout.

## Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Motion (for animations)
- **Component Structure**: 
  - `src/containers/` - Main page sections (Hero, Projects, About, Contact)
  - `src/blocks/` - Reusable UI components
  - `src/context/` - React context providers
  - `src/assets/` - Static assets

## Key Components

### Accordion System
- **Location**: `src/blocks/Components/Accordion/`
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