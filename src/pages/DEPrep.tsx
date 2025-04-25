
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import QuestionList from '../components/QuestionList';
import { fetchCategories, fetchQuestionsByCategory } from '../services/categoriesService';
import { Category, Question } from '../types';

const DEPrep: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    getCategories();
  }, []);
  
  // Fetch questions when a category is selected
  useEffect(() => {
    const getQuestions = async () => {
      if (!selectedCategory) return;
      
      setLoading(true);
      try {
        const questionsData = await fetchQuestionsByCategory(selectedCategory);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        toast.error("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    getQuestions();
  }, [selectedCategory]);
  
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
          <h2 className="text-2xl font-semibold mb-4">Want daily Data Engineering Q&amp;A delivered?</h2>
          <p className="mb-6 text-gray-300">
            Stay updated with the latest interview questions, knowledge nuggets, and tips for advancing your data engineering career.
          </p>
          <a 
            href="https://deprep.substack.com/" 
            className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors inline-block"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Subscribe on Substack
          </a>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        {!loading && !selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        ) : null}
        
        {!loading && selectedCategory ? (
          <div>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mb-8 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
            >
              ← Back to Categories
            </button>
            <QuestionList 
              questions={questions} 
              categoryTitle={selectedCategoryTitle || ""} 
            />
          </div>
        ) : null}
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
