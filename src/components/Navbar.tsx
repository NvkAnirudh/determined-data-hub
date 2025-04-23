
import React from 'react';
import { Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-background border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">DEtermined</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center bg-black/40 rounded-md px-3 py-1.5">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400 text-sm">SEARCH</span>
            <span className="ml-3 px-1.5 py-0.5 text-[10px] rounded bg-gray-800 text-gray-400">⌘ K</span>
          </div>
          <a href="#de-prep" className="nav-link">DE PREP</a>
          <a href="#de-projects" className="nav-link">DE PROJECTS</a>
          <a href="#newsletter" className="nav-link">NEWSLETTER</a>
          <a href="#about-me" className="nav-link">ABOUT ME</a>
        </div>
        
        <div className="md:hidden">
          <button className="p-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
