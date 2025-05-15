
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import QuestionList from '../components/QuestionList';
import AuthPrompt from '../components/AuthPrompt';
import { fetchCategories, fetchQuestionsByCategory } from '../services/categoriesService';
import { Category, Question, DifficultyLevel } from '../types';
import { trackEvent } from '../utils/analytics';
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEPrep: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');
  const { user } = useAuth();
  
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
        setFilteredQuestions(questionsData);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        toast.error("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    getQuestions();
  }, [selectedCategory]);
  
  // Apply difficulty filter when it changes
  useEffect(() => {
    if (difficultyFilter === 'all') {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter(q => q.difficulty === difficultyFilter));
    }
  }, [difficultyFilter, questions]);
  
  const selectedCategoryTitle = selectedCategory
    ? categories.find(c => c.id === selectedCategory)?.title
    : "";

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Reset difficulty filter when changing category
    setDifficultyFilter('all');
  };

  const handleSubscribeClick = () => {
    trackEvent(
      'click',
      'newsletter',
      'de_prep_subscribe'
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-5xl font-bold mb-12">DE Prep</h1>
        
        {!user && <AuthPrompt />}
        
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
            onClick={handleSubscribeClick}
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
            
            {user && (
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <h2 className="text-lg font-medium">Filter by difficulty:</h2>
                  <Select 
                    value={difficultyFilter} 
                    onValueChange={(value: string) => 
                      setDifficultyFilter(value as DifficultyLevel | 'all')
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="text-sm text-gray-400">
                  Showing {filteredQuestions.length} 
                  {difficultyFilter !== 'all' ? ` ${difficultyFilter}` : ''} 
                  {filteredQuestions.length === 1 ? ' question' : ' questions'}
                </div>
              </div>
            )}
            
            <QuestionList 
              questions={filteredQuestions} 
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
