
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import QuestionList from '../components/QuestionList';
import ProjectCard from '../components/ProjectCard';
import { categories, questions } from '../data/categories';
import { projects } from '../data/projects';

const Index: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredQuestions = selectedCategory 
    ? questions.filter(q => q.categoryId === selectedCategory)
    : [];
  
  const selectedCategoryTitle = selectedCategory
    ? categories.find(c => c.id === selectedCategory)?.title
    : "";

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-5xl font-bold mb-16">Index</h1>
        
        <section id="de-prep" className="mb-20">
          <h2 className="section-title">DE Prep</h2>
          
          {!selectedCategory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard 
                  key={category.id}
                  category={category}
                  onClick={handleCategoryClick}
                />
              ))}
            </div>
          ) : (
            <div>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="mb-8 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
              >
                ← Back to Categories
              </button>
              <QuestionList 
                questions={filteredQuestions} 
                categoryTitle={selectedCategoryTitle || ""} 
              />
            </div>
          )}
        </section>
        
        <section id="de-projects" className="mb-20">
          <h2 className="section-title">DE Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
        
        <section id="newsletter" className="mb-20">
          <h2 className="section-title">Newsletter</h2>
          <div className="card-container p-8">
            <h3 className="text-2xl font-medium mb-4">Subscribe to DEtermined</h3>
            <p className="text-gray-400 mb-6">
              Get the latest data engineering content delivered to your inbox.
              Daily questions and weekly project walkthroughs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <button className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
        
        <section id="about-me">
          <h2 className="section-title">About Me</h2>
          <div className="card-container p-8">
            <p className="text-gray-300 mb-4">
              I'm a data engineer passionate about building efficient data systems and sharing knowledge 
              with the community. Through DEtermined, I provide daily newsletter content on data engineering 
              topics and weekly project walkthroughs.
            </p>
            <p className="text-gray-300">
              Join me on this journey to become a better data engineer.
            </p>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} DEtermined. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
