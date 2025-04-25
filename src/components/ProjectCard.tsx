
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handleProjectClick = () => {
    window.open(project.url, '_blank');
  };

  return (
    <div 
      id={project.id}
      className="card-container card-hover cursor-pointer"
      onClick={handleProjectClick}
    >
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">{project.date}</p>
          <div className="flex flex-wrap gap-2 justify-end">
            {project.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
