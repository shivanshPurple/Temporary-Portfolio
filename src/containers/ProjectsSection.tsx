import { useState, useEffect } from 'react';
import data from '../data.json';
import { Project, Media, Link } from '../types';

// Background components
import Hyperspeed from '../components/Hyperspeed';
import Orb from '../components/Orb';
import LiquidChrome from '../components/LiquidChrome';
import DotGrid from '../components/DotGrid';
import Silk from '../components/Silk';
import Dither from '../components/Dither';

// New components for grid layout
import Masonry from '../components/Masonry';
import InfiniteMenu from '../components/InfiniteMenu';
import TiltedCard from '../components/TiltedCard';
import SpotlightCard from '../components/SpotlightCard';
import GlareHover from '../components/GlareHover';
import ImageTrail from '../components/ImageTrail';
import GlassSurface from '../components/GlassSurface';
import ScrollReveal from '../components/ScrollReveal';
import FadeContent from '../components/FadeContent';
import Folder from '../components/Folder';

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
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [prevCategory, setPrevCategory] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setFilteredProjects(projects); // Initially show all projects
  }, [projects]);

  // Handle category filtering
  const handleCategoryFilter = (category: string | null) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true);
      setPrevCategory(selectedCategory);
      setSelectedCategory(category);
      
      // Filter projects based on category
      const filtered = category 
        ? projects.filter(project => project.category === category)
        : projects;
      
      setFilteredProjects(filtered);
      
      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        setPrevCategory(null);
      }, 300);
    }
  };

  // Handle project selection for modal
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Aggregate all technologies used across projects
  const aggregateTechnologies = (): string[] => {
    const allTechnologies = projects.flatMap(project => project.technologies);
    return Array.from(new Set(allTechnologies));
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

  // Determine which card component to use based on project media
  const renderProjectCard = (project: Project) => {
    // Check if project has media that would benefit from a spotlight card
    const hasMedia = project.media && project.media.length > 0;
    const hasImages = project.media && project.media.some(media => media.type === 'image');
    
    if (hasImages) {
      // Use SpotlightCard for projects with images
      return (
        <div 
          className="cursor-pointer h-full"
          onClick={() => handleProjectSelect(project)}
        >
          <SpotlightCard className="h-full">
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="px-2 py-1 bg-purple-600 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-600 text-xs rounded-full">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400">
                <span>Duration: {project.duration}</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      );
    } else {
      // Use TiltedCard for projects without images
      return (
        <div 
          className="cursor-pointer h-full"
          onClick={() => handleProjectSelect(project)}
        >
          <GlareHover>
            <TiltedCard
              imageSrc={hasMedia ? project.media[0].src : undefined}
              altText={project.title}
              captionText={project.title}
              containerHeight="100%"
            >
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 bg-purple-600 text-xs rounded-full"
                    >
                      {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-600 text-xs rounded-full">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400">
                <span>Duration: {project.duration}</span>
              </div>
            </div>
          </TiltedCard>
        </GlareHover>
      </div>
      );
    }
  };

  // Render project media
  const renderProjectMedia = (media: Media) => {
    switch (media.type) {
      case 'image':
        return (
          <img 
            src={media.src} 
            alt="Project media" 
            className="w-full h-auto rounded-lg"
          />
        );
      case 'video':
        return (
          <video 
            src={media.src} 
            controls 
            className="w-full rounded-lg"
          />
        );
      default:
        return null;
    }
  };

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
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Projects
          </h2>
        </ScrollReveal>
        
        {/* Category filtering menu */}
        <div className="mb-8">
          <InfiniteMenu
            items={categories.map(category => ({
              label: category,
              onClick: () => handleCategoryFilter(category === selectedCategory ? null : category)
            }))}
            activeItem={selectedCategory || 'All'}
          />
        </div>
        
        {/* Projects grid with fade animation */}
        <FadeContent>
          <Masonry
            items={filteredProjects.map((project, index) => ({
              id: index,
              content: renderProjectCard(project)
            }))}
            columnWidth={300}
            gap={20}
          />
        </FadeContent>
        
        {/* Tech stack visualization */}
        <div className="mt-16">
          <ScrollReveal>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Technologies Used
            </h3>
          </ScrollReveal>
          <div className="flex justify-center">
            <Folder 
              items={aggregateTechnologies().map((tech, index) => (
                <div 
                  key={index} 
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full"
                >
                  {tech}
                </div>
              ))}
              color="#5227FF"
              size={1.2}
            />
          </div>
        </div>
      </div>
      
      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <GlassSurface
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                <button 
                  className="text-white text-2xl hover:text-gray-300"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-4">{selectedProject.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-3 py-1 bg-purple-600 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-gray-400 mb-4">
                  <span>Duration: {selectedProject.duration}</span>
                </div>
                
                {selectedProject.media && selectedProject.media.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.media.map((media, mediaIndex) => (
                        <div key={mediaIndex} className="rounded-lg overflow-hidden">
                          {renderProjectMedia(media)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedProject.links && selectedProject.links.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GlassSurface>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
