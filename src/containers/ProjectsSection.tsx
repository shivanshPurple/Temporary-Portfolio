import { useState, useEffect } from "react";
import data from "../data.json";
import { Project, Media, Link } from "../types";
import ProjectCarousel from "../components/ProjectCarousel";
import {
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
  FiVideo,
  FiImage,
  FiLink,
  FiExternalLink,
  FiX,
  FiClock,
} from "react-icons/fi";

// Transform the raw JSON data to match our Project interface
const transformProjectsData = (): Project[] => {
  return data.projects.map((project) => ({
    category: project.category,
    title: project.title,
    technologies: project.technologies,
    duration: project.duration,
    description: project.description,
    media: project.media as Media[],
    links: project.links as Link[],
  }));
};

const ProjectsSection = () => {
  const [projects] = useState<Project[]>(transformProjectsData());
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{
    media: Media;
    projectTitle: string;
  } | null>(null);

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

  // Filter projects based on selected category
  useEffect(() => {
    let result = projects;

    // Filter by category if one is selected
    if (selectedCategory) {
      result = result.filter(
        (project) => project.category === selectedCategory
      );
    }

    setFilteredProjects(result);
  }, [projects, selectedCategory]);

  // Handle category selection (single select)
  const handleCategorySelect = (category: string) => {
    // If the same category is clicked again, deselect it (show all)
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // Clear category selection
  const clearCategorySelection = () => {
    setSelectedCategory(null);
  };

  // Close media modal
  const closeMediaModal = () => {
    setSelectedMedia(null);
  };

  // Open media in modal
  const openMediaModal = (media: Media, projectTitle: string) => {
    setSelectedMedia({ media, projectTitle });
  };

  // Map project categories to icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "UNITY":
        return <FiCode className="h-4 w-4 text-white" />;
      case "ANDROID JAVA":
        return <FiFileText className="h-4 w-4 text-white" />;
      case "FLUTTER":
        return <FiLayers className="h-4 w-4 text-white" />;
      case "PYTHON":
        return <FiLayout className="h-4 w-4 text-white" />;
      case "GRAPHIC DESIGN":
        return <FiImage className="h-4 w-4 text-white" />;
      case "CERTIFICATIONS/INTERNSHIPS":
        return <FiExternalLink className="h-4 w-4 text-white" />;
      default:
        return <FiCode className="h-4 w-4 text-white" />;
    }
  };

  // Render links
  const renderLinks = (links: Link[]) => {
    if (!links || links.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="font-semibold text-gray-200 mb-2 flex items-center">
          <FiLink className="mr-2" />
          Links
        </h4>
        <div className="flex flex-wrap gap-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition-colors"
            >
              <span>{link.text}</span>
              <FiExternalLink className="ml-1" size={12} />
            </a>
          ))}
        </div>
      </div>
    );
  };

  // Render project card content for carousel
  const renderProjectCard = (project: Project) => {
    const hasMedia = project.media && project.media.length > 0;
    const hasDescription =
      project.description && project.description.trim().length > 0;

    // Determine layout based on content
    const showDescription = hasDescription;
    const showMedia = hasMedia;

    // Calculate column widths
    let descriptionWidth = "w-1/2";
    let mediaWidth = "w-1/2";

    if (!showDescription && showMedia) {
      // No description, only media - give media full width
      mediaWidth = "w-full";
    } else if (showDescription && !showMedia) {
      // Only description, no media - give description full width
      descriptionWidth = "w-full";
    }
    // If both exist, keep 50/50 split

    return (
      <div className="bg-gray-800 rounded-xl h-full flex">
        {/* Left side - Description (conditionally shown) */}
        {showDescription && (
          <div className={descriptionWidth + " p-6 flex flex-col"}>
            {/* Header with category and icon */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#060010] mr-3">
                  {getCategoryIcon(project.category)}
                </span>
                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                  {project.category}
                </span>
              </div>
              {project.duration && (
                <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded flex items-center">
                  <FiClock className="mr-1" />
                  {project.duration}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 mb-4 flex-grow">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-200 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 8).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 8 && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded-full">
                    +{project.technologies.length - 8} more
                  </span>
                )}
              </div>
            </div>

            {/* Links */}
            {renderLinks(project.links)}
          </div>
        )}

        {/* Right side - Media (only show if media exists) */}
        {showMedia && (
          <div
            className={
              mediaWidth + " p-6 bg-gray-900 rounded-r-xl flex flex-col"
            }
          >
            <h4 className="font-semibold text-gray-200 mb-4 flex items-center">
              <FiImage className="mr-2" />
              Media
            </h4>

            <div className="flex-grow overflow-y-auto rounded-lg max-h-[50vh] flex flex-col items-center justify-center">
              {project.media.map((media, index) => (
                <div key={index} className="mb-4 flex justify-center">
                  {media.type === "image" ? (
                    <div
                      className="relative cursor-pointer group flex justify-center"
                      onClick={() => openMediaModal(media, project.title)}
                    >
                      <img
                        src={`/${media.src}`} // Fixed: Add leading '/' for public/ path
                        alt={project.title}
                        className="max-w-full max-h-[40vh] h-auto w-auto object-contain"
                      />
                    </div>
                  ) : media.type === "video" ? (
                    <div
                      className="relative cursor-pointer group flex justify-center"
                      onClick={() => openMediaModal(media, project.title)}
                    >
                      {/* Display thumbnail as image if available, otherwise show video */}
                      {media.poster ? (
                        <div className="relative">
                          <img
                            src={`/${media.poster}`}
                            alt={`${project.title} thumbnail`}
                            className="max-w-full max-h-[30vh] h-auto w-auto object-contain"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gray-500 bg-opacity-30 rounded-full p-2">
                              <FiVideo className="text-white text-4xl opacity-80" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <video
                          src={`/${media.src}`}
                          muted
                          loop
                          preload="auto"
                          className="max-w-full max-h-[30vh] h-auto w-auto object-contain"
                          onError={(e) => {
                            const video = e.currentTarget as HTMLVideoElement;
                            const fallback = video.parentElement?.querySelector(
                              ".video-fallback"
                            ) as HTMLElement;
                            if (fallback) {
                              video.style.display = "none";
                              fallback.style.display = "flex";
                            }
                          }}
                          onMouseEnter={(e) => {
                            const video = e.currentTarget as HTMLVideoElement;
                            video.play().catch(() => {});
                          }}
                          onMouseLeave={(e) => {
                            const video = e.currentTarget as HTMLVideoElement;
                            video.pause();
                            video.currentTime = 0;
                          }}
                        />
                      )}
                      {/* Fallback div for thumbnail: Hidden by default */}
                      <div
                        className="thumbnail-fallback absolute inset-0 rounded bg-gray-700 hidden items-center justify-center"
                      >
                        <FiVideo className="text-white text-4xl" />
                      </div>
                      {/* Fallback div for video: Hidden by default, shown only on load error */}
                      <div
                        className="video-fallback absolute inset-0 rounded bg-gray-700 hidden items-center justify-center"
                      >
                        <FiVideo className="text-white text-4xl" />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Projects</h2>

        {/* Category filtering chips (single select) */}
        <div className="mb-8 flex flex-wrap gap-2 items-center justify-center">
          <span className="text-white font-medium">Filter by:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 flex items-center ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              {getCategoryIcon(category)}
              <span className="ml-1">{category}</span>
            </button>
          ))}
          {selectedCategory && (
            <button
              onClick={clearCategorySelection}
              className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full hover:bg-gray-600 transition-colors duration-300 flex items-center"
            >
              <FiX className="mr-1" size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Full width carousel container centered vertically */}
      <div className="w-full flex-grow flex items-center justify-center px-4">
        <div className="w-[80vw] h-[65vh] max-w-[80vw] max-h-[65vh]">
          {filteredProjects.length > 0 ? (
            <div className="w-full h-full">
              <ProjectCarousel
                items={filteredProjects.map((project, index) => ({
                  id: index,
                  content: renderProjectCard(project),
                }))}
                autoplay={true}
                autoplayDelay={8000}
                pauseOnHover={true}
                loop={true}
              />
            </div>
          ) : (
            <div className="text-center text-white py-12 bg-gray-800 rounded-xl w-full h-full flex items-center justify-center">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  No Projects Found
                </h3>
                <p className="text-gray-400">
                  Try selecting a different category
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add some bottom padding for spacing */}
      <div className="py-8"></div>

      {/* Media Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeMediaModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-75 transition-colors"
              onClick={closeMediaModal}
            >
              <FiX size={24} />
            </button>

            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white text-xl font-bold mb-2 text-center">
                {selectedMedia.projectTitle}
              </h3>

              {selectedMedia.media.type === "image" ? (
                <img
                  src={`/${selectedMedia.media.src}`} // Fixed: Add leading '/' for public/ path
                  alt={selectedMedia.projectTitle}
                  className="max-w-full max-h-[70vh] h-auto w-auto object-contain"
                />
              ) : selectedMedia.media.type === "video" ? (
                <div className="relative">
                  <video
                    src={`/${selectedMedia.media.src}`} // Fixed: Add leading '/' for public/ path
                    controls
                    autoPlay
                    className="max-w-full max-h-[70vh] h-auto w-auto"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
