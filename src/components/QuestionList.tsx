import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Question } from '../types';
import { useAuth } from '@/contexts/AuthContext';

interface QuestionListProps {
  questions: Question[];
  categoryTitle: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, categoryTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleQuestionClick = (question: Question) => {
    // Save the current scroll position before navigating
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    sessionStorage.setItem('lastVisitedCategoryId', question.categoryId);
    
    navigate(`/de-prep/question/${question.id}`, {
      state: { fromList: true }
    });
  };

  const getDifficultyColor = (difficulty: string | undefined) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 hover:bg-green-400';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-400';
      case 'hard': return 'bg-red-500 hover:bg-red-400';
      default: return 'bg-gray-500 hover:bg-gray-400';
    }
  };

  // Restore scroll position when returning to the list
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      // Only use the stored position once
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">{categoryTitle} Questions</h3>
      
      {questions.length === 0 ? (
        <p className="text-gray-400">No questions found for this category.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <div 
              key={question.id}
              id={question.id}
              className="card-container p-6 cursor-pointer transition-all duration-300 rounded-lg hover:shadow-md"
              onClick={() => handleQuestionClick(question)}
            >
              <h4 className="text-lg font-medium mb-1">{question.title}</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-gray-400 text-sm">{question.date}</span>
                {user && question.difficulty && (
                  <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty || 'medium'}
                  </Badge>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {question.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionList;
