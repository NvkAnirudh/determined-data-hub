
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import QuestionList from '../components/QuestionList';
import { categories, questions } from '../data/categories';

const DEPrep: React.FC = () => {
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
        <h1 className="text-5xl font-bold mb-12">DE Prep</h1>
        
        <div className="mb-10 p-6 card-container">
          <h2 className="text-2xl font-semibold mb-4">Want daily and weekly Data Engineering Q&amp;A delivered?</h2>
          <p className="mb-6 text-gray-300">
            Stay updated with the latest interview questions, knowledge nuggets, and tips for advancing your data engineering career.
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
      </main>
      
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} DEtermined. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DEPrep;
