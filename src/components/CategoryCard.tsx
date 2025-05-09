
import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div 
      className="card-container card-hover cursor-pointer"
      onClick={() => onClick(category.id)}
    >
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{category.title}</h3>
        <p className="text-gray-400 text-sm">{category.description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
