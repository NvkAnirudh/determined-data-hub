
import React from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const DEProjects: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-5xl font-bold mb-12">DE Projects</h1>
        
        <div className="mb-10 p-6 card-container">
          <h2 className="text-2xl font-semibold mb-4">Want project walkthroughs and alerts?</h2>
          <p className="mb-6 text-gray-300">
            Get notified when new data engineering projects are added, complete with step-by-step tutorials and code examples.
          </p>
          <a 
            href="https://substack.com" 
            className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors inline-block"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Subscribe on Substack
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
      
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} DEtermined. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DEProjects;
