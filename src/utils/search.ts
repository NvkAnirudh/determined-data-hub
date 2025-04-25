
import { Project, Question } from "@/types";

type SearchResult = {
  questions: Question[];
  projects: Project[];
};

export function searchItems(query: string, items: (Project | Question)[]): SearchResult {
  const searchTerm = query.toLowerCase().trim();
  
  // If there's no search term, return empty arrays
  if (!searchTerm) {
    return { 
      questions: items.filter(item => !('description' in item)) as Question[],
      projects: items.filter(item => 'description' in item) as Project[]
    };
  }
  
  const results = items.reduce<SearchResult>(
    (acc, item) => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = 'description' in item && item.description?.toLowerCase().includes(searchTerm);
      const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      if (titleMatch || descriptionMatch || tagsMatch) {
        if ('description' in item) {
          acc.projects.push(item as Project);
        } else {
          acc.questions.push(item as Question);
        }
      }
      
      return acc;
    },
    { questions: [], projects: [] }
  );
  
  // Sort results by title match priority
  const sortByTitle = (a: Project | Question, b: Project | Question) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    
    if (aTitle === searchTerm) return -1;
    if (bTitle === searchTerm) return 1;
    
    if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm)) return -1;
    if (bTitle.startsWith(searchTerm) && !aTitle.startsWith(searchTerm)) return 1;
    
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  };

  results.questions.sort(sortByTitle);
  results.projects.sort(sortByTitle);
  
  return results;
}
