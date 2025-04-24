
import { supabase } from "@/integrations/supabase/client";
import { Project } from "../types";

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_tags(
        tag_id,
        tags(name)
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description || '',
    date: formatDate(project.created_at),
    url: project.substack_link || 'https://determined.substack.com/',
    tags: project.project_tags.map((pt: any) => pt.tags.name)
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
