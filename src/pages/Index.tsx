import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Index: React.FC = () => {
  return <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-5xl mb-8 font-bold text-slate-800">DEtermined</h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl text-center">
            Your go-to resource for data engineering knowledge, projects, and community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <Link to="/de-prep" className="card-container card-hover p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">DE Prep</h2>
              <p className="text-gray-400">
                Practice with Q&A for data engineering interviews and knowledge.
              </p>
            </Link>
            
            <Link to="/de-projects" className="card-container card-hover p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">DE Projects</h2>
              <p className="text-gray-400">
                Browse practical data engineering projects with walkthroughs.
              </p>
            </Link>
            
            <Link to="/about" className="card-container card-hover p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-400">
                Learn more about DEtermined.
              </p>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} DEtermined. All rights reserved.</p>
        </div>
      </footer>
    </div>;
};
export default Index;