
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchCommand } from './SearchCommand';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-background border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-bold text-xl">DEtermined.eng</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <SearchCommand />
          <Link to="/de-prep" className="nav-link">DE PREP</Link>
          <Link to="/de-projects" className="nav-link">DE PROJECTS</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
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
