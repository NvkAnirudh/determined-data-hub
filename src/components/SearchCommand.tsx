
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { fetchQuestionsByCategory, fetchCategories } from '@/services/categoriesService';
import { Project, Question } from '@/types';
import { searchItems } from '@/utils/search';
import { toast } from 'sonner';

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<(Project | Question)[]>([]);
  const [query, setQuery] = useState('');
  const [allItems, setAllItems] = useState<(Project | Question)[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const pages = [
    { title: 'Home', href: '/' },
    { title: 'DE Prep', href: '/de-prep' },
    { title: 'DE Projects', href: '/de-projects' },
    { title: 'About Me', href: '/about' },
  ];

  // Fetch all searchable content when the component mounts
  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      try {
        const [projects, questions, categoriesList] = await Promise.all([
          fetchProjects(),
          fetchQuestionsByCategory(''), // Empty string to fetch all questions
          fetchCategories(),
        ]);
        
        // Create a map of category IDs to their names for easier lookup
        const categoryMap: Record<string, string> = {};
        categoriesList.forEach(category => {
          categoryMap[category.id] = category.title;
        });
        setCategories(categoryMap);
        
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

  // Handle search input changes
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = searchItems(query, allItems);
    setSearchResults(results);
  }, [query, allItems]);

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

  const handleSelect = (item: Project | Question | { href: string }) => {
    setOpen(false);
    
    if ('href' in item) {
      navigate(item.href);
    } else if ('url' in item) {
      // For items with direct URLs (like projects or questions with substack links)
      if ('categoryId' in item) {
        // It's a question - navigate to the DE Prep page
        navigate(`/de-prep?q=${encodeURIComponent(query)}&categoryId=${item.categoryId}`);
      } else {
        // It's a project - navigate to the DE Projects page
        navigate(`/de-projects?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const getItemTitle = (item: Project | Question): string => {
    return item.title;
  };

  const getItemDescription = (item: Project | Question): string => {
    if ('description' in item) {
      // It's a project
      return `Project - ${item.description?.substring(0, 100)}${item.description?.length > 100 ? '...' : ''}`;
    } else if ('categoryId' in item) {
      // It's a question
      return `Question - ${categories[item.categoryId] || 'General'}`;
    }
    return '';
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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder={loading ? "Loading..." : "Search anything..."} 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {!query && (
            <CommandGroup heading="Pages">
              {pages.map((page) => (
                <CommandItem
                  key={page.href}
                  onSelect={() => handleSelect(page)}
                >
                  {page.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults.length > 0 && (
            <CommandGroup heading="Search Results">
              {searchResults.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                  className="flex flex-col items-start"
                >
                  <div className="font-medium">{getItemTitle(item)}</div>
                  <div className="text-sm text-gray-500 mt-1">{getItemDescription(item)}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
