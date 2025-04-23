
import React from 'react';
import Navbar from '../components/Navbar';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-5xl font-bold mb-12">About Me</h1>
        
        <div className="card-container p-8 max-w-3xl mx-auto">
          <p className="text-gray-300 text-lg mb-6">
            I'm a data engineer passionate about building efficient data systems and sharing knowledge 
            with the community. Through DEtermined, I provide daily newsletter content on data engineering 
            topics and weekly project walkthroughs.
          </p>
          
          <p className="text-gray-300 text-lg mb-6">
            My background spans across various data technologies, cloud platforms, and big data frameworks.
            I've worked with companies of all sizes to implement data solutions that scale and deliver insights.
          </p>
          
          <p className="text-gray-300 text-lg">
            Join me on this journey to become a better data engineer. Connect with me on social media or 
            subscribe to my Substack newsletter for regular updates.
          </p>
          
          <div className="mt-8 text-center">
            <a 
              href="https://substack.com" 
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
