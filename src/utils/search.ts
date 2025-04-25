
import { Project, Question } from "@/types";

export function searchItems(query: string, items: (Project | Question)[]): (Project | Question)[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return [];
  
  return items
    .filter(item => {
      // Get the title - both Project and Question types have a title property
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      
      // Check for description (only Projects have this)
      const descriptionMatch = 'description' in item && item.description?.toLowerCase().includes(searchTerm);
      
      // Check tags
      const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      return titleMatch || descriptionMatch || tagsMatch;
    })
    .sort((a, b) => {
      // Both types have title property
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      
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
