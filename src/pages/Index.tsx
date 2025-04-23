
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
        {/* Removed Index heading */}
        
        <section id="de-prep" className="mb-20">
          <h2 className="section-title">DE Prep</h2>
          <p className="mb-6 text-gray-400">
            Want daily and weekly Data Engineering Q&amp;A delivered? <a href="https://substack.com" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">Subscribe on Substack</a>.
          </p>
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
          <p className="mb-6 text-gray-400">
            Want project walkthroughs and alerts? <a href="https://substack.com" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">Subscribe on Substack</a>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
        
        {/* Removed Newsletter section */}
        
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

