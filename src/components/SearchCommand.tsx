
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { projects } from '../data/projects';
import { Search } from 'lucide-react';

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

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

  const pages = [
    { title: 'Home', href: '/' },
    { title: 'DE Prep', href: '/de-prep' },
    { title: 'DE Projects', href: '/de-projects' },
    { title: 'About Me', href: '/about' },
  ];

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
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.href}
                onSelect={() => {
                  navigate(page.href);
                  setOpen(false);
                }}
              >
                {page.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Projects">
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => {
                  window.open(project.url, '_blank');
                  setOpen(false);
                }}
              >
                {project.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
