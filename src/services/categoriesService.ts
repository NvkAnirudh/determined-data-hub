
import { supabase } from "@/integrations/supabase/client";
import { Category, Question, DifficultyLevel } from "../types";

export async function fetchCategories(): Promise<Category[]> {
  // First, get categories
  const { data: categoriesData, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
    return [];
  }

  // Then, count questions for each category
  const categoriesWithCounts = await Promise.all(categoriesData.map(async (category) => {
    const { count, error: countError } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', category.id);
    
    if (countError) {
      console.error(`Error counting questions for category ${category.name}:`, countError);
      return {
        id: category.id,
        title: category.name,
        description: getCategoryDescription(category.name),
        questionCount: 0
      };
    }
    
    return {
      id: category.id,
      title: category.name,
      description: getCategoryDescription(category.name),
      questionCount: count || 0
    };
  }));
  
  return categoriesWithCounts;
}

export async function fetchQuestionsByCategory(categoryId: string): Promise<Question[]> {
  // If categoryId is empty, fetch all questions
  const query = supabase
    .from('questions')
    .select(`
      *,
      question_tags(
        tag_id,
        tags(name)
      )
    `);
  
  // Only filter by categoryId if it's provided
  if (categoryId) {
    query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
  
  return data.map(question => ({
    id: question.id,
    categoryId: question.category_id,
    title: question.question,
    date: formatDate(question.created_at),
    url: question.substack_link || 'https://determined.substack.com/',
    tags: question.question_tags.map((qt: any) => qt.tags.name),
    difficulty: (question.difficulty || 'medium') as DifficultyLevel,
  }));
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// Helper function to get category descriptions
function getCategoryDescription(name: string): string {
  const descriptions: Record<string, string> = {
    'ETL/ELT': 'Extract, Transform, Load data pipeline processes',
    'Data Warehousing': 'Storing and managing data for analytics',
    'Distributed Systems': 'Scalable data processing systems',
    'SQL': 'Structured Query Language fundamentals and advanced topics',
    'Data Modeling': 'Techniques for structuring data',
    'Big Data': 'Processing and analyzing large datasets'
  };
  
  return descriptions[name] || name;
}
