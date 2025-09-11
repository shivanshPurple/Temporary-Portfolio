import { useState, useEffect } from 'react';
import Accordion from '../components/Accordion';
import data from '../data.json';
import { Project, Media, Link } from '../types';

// Background components
import Hyperspeed from '../components/Hyperspeed';
import Orb from '../components/Orb';
import LiquidChrome from '../components/LiquidChrome';
import DotGrid from '../components/DotGrid';
import Silk from '../components/Silk';
import Dither from '../components/Dither';

// Transform the raw JSON data to match our Project interface
const transformProjectsData = (): Project[] => {
  return data.projects.map(project => ({
    category: project.category,
    title: project.title,
    technologies: project.technologies,
    duration: project.duration,
    description: project.description,
    media: project.media as Media[],
    links: project.links as Link[]
  }));
};

const ProjectsSection = () => {
  const [projects] = useState<Project[]>(transformProjectsData());
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [prevCategory, setPrevCategory] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(projects.map((project) => project.category))
    );
    
    // Sort categories to ensure consistent order
    uniqueCategories.sort();
    
    // Move "UNITY" category to the front if it exists (as it represents game dev)
    const gameDevIndex = uniqueCategories.indexOf("UNITY");
    if (gameDevIndex > -1) {
      const gameDevCategory = uniqueCategories.splice(gameDevIndex, 1)[0];
      uniqueCategories.unshift(gameDevCategory);
    }
    
    setCategories(uniqueCategories);
  }, [projects]);

  // Handle category change with transition
  const handleCategoryChange = (category: string | null) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true);
      setPrevCategory(selectedCategory);
      setSelectedCategory(category);
      
      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        setPrevCategory(null);
      }, 300);
    }
  };

  // Map categories to background components
  const categoryBackgroundMap: Record<string, React.ComponentType<any>> = {
    'UNITY': Hyperspeed,
    'ANDROID JAVA': Orb,
    'FLUTTER': LiquidChrome,
    'PYTHON': DotGrid,
    'GRAPHIC DESIGN': Silk,
    'CERTIFICATIONS/INTERNSHIPS': Dither
  };

  // Get the background components
  const CurrentBackground = selectedCategory ? categoryBackgroundMap[selectedCategory] : null;
  const PrevBackground = prevCategory ? categoryBackgroundMap[prevCategory] : null;

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative">
      {/* Background components with transition */}
      <div className="fixed inset-0 -z-10">
        {/* Previous background (fading out) */}
        {PrevBackground && (
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0">
            <PrevBackground />
          </div>
        )}
        
        {/* Current background (fading in) */}
        {CurrentBackground ? (
          <div className={`absolute inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <CurrentBackground />
          </div>
        ) : (
          // Fallback background when no category is selected
          <div className={`absolute inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
          </div>
        )}
        
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Projects
        </h2>
        <Accordion 
          categories={categories} 
          projects={projects} 
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
