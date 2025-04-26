
import React from 'react';
import Navbar from '../components/Navbar';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center">About!</h1>
        
        <div className="card-container p-8 max-w-3xl mx-auto">
          <p className="text-gray-300 text-lg mb-6">
          DEtermined is your comprehensive resource for data engineering excellence. We offer two main components:
          </p>
          
          <p className="text-gray-300 text-lg mb-6">
          <b>DE Prep:</b> A collection of curated data engineering interview questions organized by categories. Stay updated 
          with daily Q&A delivered via our Substack newsletter to advance your interview readiness and technical knowledge.
          </p>
          
          <p className="text-gray-300 text-lg">
          <b>DE Projects:</b> Hands-on data engineering projects with complete walkthroughs and code examples. Perfect for building 
          your portfolio and practical skills. Subscribe to our project-focused Substack for weekly updates and new project alerts.
          </p>

          <br></br>
          <p className="text-gray-300 text-lg mb-6">
          All our content is crafted by experienced data engineers to help you build practical skills and advance your career in data engineering.
          </p>
          
          
          <div className="mt-8 text-center">
            <a 
              href="https://substack.com/@anirudhnuti?utm_source=user-menu" 
              className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors inline-block"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Subscribe on Substack
            </a>
          </div>
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

export default About;
