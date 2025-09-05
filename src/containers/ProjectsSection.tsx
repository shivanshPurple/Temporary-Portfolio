import { useState, useEffect } from 'react';
import Accordion from '../blocks/Components/Accordion';
import data from '../data.json';
import { Project, Media, Link } from '../types';

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

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Projects
        </h2>
        <Accordion categories={categories} projects={projects} />
      </div>
    </section>
  );
};

export default ProjectsSection;
