
import { Project, Question } from "@/types";

export function searchItems(query: string, items: (Project | Question)[]): (Project | Question)[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return [];
  
  return items
    .filter(item => {
      // Get the title based on item type
      const itemTitle = 'title' in item ? item.title : item.title;
      const titleMatch = itemTitle.toLowerCase().includes(searchTerm);
      const descriptionMatch = 'description' in item && item.description?.toLowerCase().includes(searchTerm);
      const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      return titleMatch || descriptionMatch || tagsMatch;
    })
    .sort((a, b) => {
      // Get titles for sorting
      const aTitle = 'title' in a ? a.title : a.title;
      const bTitle = 'title' in b ? b.title : b.title;
      
      // Exact matches first
      if (aTitle.toLowerCase() === searchTerm) return -1;
      if (bTitle.toLowerCase() === searchTerm) return 1;
      
      // Then starts with matches
      if (aTitle.toLowerCase().startsWith(searchTerm) && !bTitle.toLowerCase().startsWith(searchTerm)) return -1;
      if (bTitle.toLowerCase().startsWith(searchTerm) && !aTitle.toLowerCase().startsWith(searchTerm)) return 1;
      
      // Then by date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
