
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const { user } = useAuth();
  
  return (
    <div 
      className="card-container card-hover cursor-pointer rounded-lg"
      onClick={() => onClick(category.id)}
    >
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{category.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{category.description}</p>
        {user && (
          <div className="text-sm text-gray-500">
            {category.questionCount !== undefined ? `${category.questionCount} questions` : 'Loading...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
