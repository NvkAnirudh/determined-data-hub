
import React from 'react';
import { Question } from '../data/categories';

interface QuestionListProps {
  questions: Question[];
  categoryTitle: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, categoryTitle }) => {
  const handleQuestionClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">{categoryTitle} Questions</h3>
      <div className="space-y-4">
        {questions.map((question) => (
          <div 
            key={question.id}
            className="card-container p-6 cursor-pointer"
            onClick={() => handleQuestionClick(question.url)}
          >
            <h4 className="text-lg font-medium mb-1">{question.title}</h4>
            <p className="text-gray-400 text-sm">{question.date}</p>
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
    </div>
  );
};

export default QuestionList;
