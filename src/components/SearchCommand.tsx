
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from 'lucide-react';
import { fetchProjects } from '@/services/projectsService';
import { fetchQuestionsByCategory } from '@/services/categoriesService';
import { Project, Question } from '@/types';
import { searchItems } from '@/utils/search';
import { toast } from 'sonner';

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [allItems, setAllItems] = useState<(Project | Question)[]>([]);
  const [searchResults, setSearchResults] = useState<{ questions: Question[], projects: Project[] }>({ 
    questions: [], 
    projects: [] 
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch all searchable content when the component mounts
  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      try {
        const [projects, questions] = await Promise.all([
          fetchProjects(),
          fetchQuestionsByCategory(''), // Empty string to fetch all questions
        ]);
        
        setAllItems([...projects, ...questions]);
      } catch (error) {
        console.error('Error fetching search content:', error);
        toast.error('Failed to load search content');
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  // Update search results when the dialog is opened or when the query changes
  useEffect(() => {
    // When open and no query, show all items
    if (open) {
      if (!query.trim()) {
        const allQuestions = allItems.filter(item => !('description' in item)) as Question[];
        const allProjects = allItems.filter(item => 'description' in item) as Project[];
        setSearchResults({ 
          questions: allQuestions, 
          projects: allProjects 
        });
      } else {
        // When there is a query, filter items
        const results = searchItems(query, allItems);
        setSearchResults(results);
      }
    }
  }, [query, allItems, open]);

  // Toggle search dialog with keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: Project | Question) => {
    setOpen(false);
    
    if ('description' in item) {
      // It's a project - navigate to projects page
      const isAlreadyOnProjectsPage = location.pathname === '/de-projects';
      navigate(`/de-projects${isAlreadyOnProjectsPage ? '?refresh=true' : ''}`);
    } else {
      // It's a question - navigate directly to the question detail page
      navigate(`/de-prep/question/${item.id}`);
    }
    
    // Add a small delay to ensure the navigation has completed
    setTimeout(() => {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight');
        setTimeout(() => element.classList.remove('highlight'), 2000);
      }
    }, 100);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center bg-black/40 rounded-md px-3 py-1.5"
      >
        <Search className="h-4 w-4 text-gray-400 mr-2" />
        <span className="text-gray-400 text-sm">SEARCH</span>
        <span className="ml-3 px-1.5 py-0.5 text-[10px] rounded bg-gray-800 text-gray-400">⌘ K</span>
      </button>
      <CommandDialog 
        open={open} 
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
          if (newOpen) {
            // Reset query when opening
            setQuery('');
          }
        }}
      >
        <CommandInput 
          placeholder={loading ? "Loading..." : "Search questions and projects..."} 
          value={query}
          onValueChange={setQuery}
          autoFocus
        />
        <CommandList>
          {loading && <div className="py-6 text-center text-sm">Loading content...</div>}
          
          <CommandEmpty>No results found.</CommandEmpty>
          
          {searchResults.questions.length > 0 && (
            <CommandGroup heading="Questions">
              {searchResults.questions.map((question) => (
                <CommandItem
                  key={question.id}
                  onSelect={() => handleSelect(question)}
                >
                  <div className="flex flex-col">
                    <div className="font-medium">{question.title}</div>
                    <div className="text-sm text-gray-500">
                      {question.tags.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults.projects.length > 0 && (
            <CommandGroup heading="Projects">
              {searchResults.projects.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => handleSelect(project)}
                >
                  <div className="flex flex-col">
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-500">
                      {project.description?.substring(0, 60)}
                      {project.description && project.description.length > 60 ? '...' : ''}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
