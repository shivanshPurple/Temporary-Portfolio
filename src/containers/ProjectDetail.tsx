import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data.json';
import { Project, Media, Link } from '../types';

// Background components

// Components
import GlassSurface from '../components/GlassSurface';

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

// Map categories to background components

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [projects] = useState<Project[]>(transformProjectsData());
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Find project by slug
    if (slug) {
      const foundProject = projects.find(p => {
        const projectSlug = p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        return projectSlug === slug;
      });
      
      if (foundProject) {
        setProject(foundProject);
      } else {
        // Project not found, redirect to projects section
        navigate('/#projects');
      }
    }
  }, [slug, projects, navigate]);

  // Render project media
  const renderProjectMedia = (media: Media) => {
    switch (media.type) {
      case 'image':
        return (
          <div className="relative">
            <img 
              src={media.src} 
              alt="Project media" 
              className="w-full h-auto rounded-lg"
              loading="lazy"
              onLoad={(e) => {
                // Remove loading state when image is loaded
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const loader = parent.querySelector('.loading-placeholder');
                  if (loader) {
                    loader.remove();
                  }
                }
              }}
            />
            <div className="loading-placeholder absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="relative">
            <video 
              src={media.src} 
              controls 
              className="w-full rounded-lg"
              preload="metadata"
              onLoadedData={(e) => {
                // Remove loading state when video is loaded
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const loader = parent.querySelector('.loading-placeholder');
                  if (loader) {
                    loader.remove();
                  }
                }
              }}
            />
            <div className="loading-placeholder absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Project not found</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 relative">
      {/* Unified background for project detail */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80"></div>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <button
            onClick={() => navigate('/#projects')}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          >
            ← Back to Projects
          </button>
        </div>
        
        <GlassSurface className="rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                  {project.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4">{project.title}</h1>
              
              <p className="text-gray-300 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="text-sm text-gray-400 mb-6">
                <span>Duration: {project.duration}</span>
              </div>
              
              {project.media && project.media.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">Media</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.media.map((media, mediaIndex) => (
                      <div key={mediaIndex} className="rounded-lg overflow-hidden">
                        {renderProjectMedia(media)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {project.links && project.links.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Links</h2>
                  <div className="flex flex-wrap gap-4">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
    </section>
  );
};

export default ProjectDetail;