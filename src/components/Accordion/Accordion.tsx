import { useState } from 'react';
import AccordionItem from './AccordionItem';
import { Project } from '../../types';

interface AccordionProps {
  categories: string[];
  projects: Project[];
  onCategoryChange?: (category: string | null) => void;
}

const Accordion = ({ categories, projects, onCategoryChange }: AccordionProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    if (onCategoryChange) {
      onCategoryChange(newCategory);
    }
  };

  return (
    <div className="w-full space-y-4">
      {categories.map((category) => {
        const categoryProjects = projects.filter(
          (project) => project.category === category
        );
        
        return (
          <AccordionItem
            key={category}
            category={category}
            projects={categoryProjects}
            isOpen={activeCategory === category}
            onClick={() => toggleCategory(category)}
          />
        );
      })}
    </div>
  );
};

export default Accordion;