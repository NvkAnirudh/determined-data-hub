
import { Project, Question } from "@/types";

export function searchItems(query: string, items: (Project | Question)[]): (Project | Question)[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return [];
  
  return items
    .filter(item => {
      const titleMatch = ('title' in item ? item.title : item.question).toLowerCase().includes(searchTerm);
      const descriptionMatch = 'description' in item && item.description?.toLowerCase().includes(searchTerm);
      const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      return titleMatch || descriptionMatch || tagsMatch;
    })
    .sort((a, b) => {
      const aTitle = ('title' in a ? a.title : a.question).toLowerCase();
      const bTitle = ('title' in b ? b.title : b.question).toLowerCase();
      
      // Exact matches first
      if (aTitle === searchTerm) return -1;
      if (bTitle === searchTerm) return 1;
      
      // Then starts with matches
      if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm)) return -1;
      if (bTitle.startsWith(searchTerm) && !aTitle.startsWith(searchTerm)) return 1;
      
      // Then by date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
