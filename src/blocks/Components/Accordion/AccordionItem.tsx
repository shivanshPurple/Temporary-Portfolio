import { Project } from '../../../types';

interface AccordionItemProps {
  category: string;
  projects: Project[];
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ category, projects, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex justify-between items-center"
        onClick={onClick}
      >
        <h3 className="text-xl font-bold text-white">{category}</h3>
        <span className="text-white text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      {isOpen && (
        <div className="overflow-hidden">
          <div className="p-4 bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                  <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-2 py-1 bg-purple-600 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 mb-3">
                    <span>Duration: {project.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.media.map((media, mediaIndex) => (
                      <div key={mediaIndex} className="w-full">
                        {media.type === 'image' && (
                          <img 
                            src={media.src} 
                            alt={project.title} 
                            className="w-full h-auto rounded"
                          />
                        )}
                        {media.type === 'video' && (
                          <video 
                            src={media.src} 
                            controls 
                            className="w-full rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {project.links && project.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.links.map((link, linkIndex) => (
                        <a 
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 text-sm underline"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;