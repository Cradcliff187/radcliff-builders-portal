import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Admin hooks that fetch ALL content (including drafts)
// These are used in admin CRUD pages where we need to see unpublished content

export const useAdminArticles = () => {
  return useQuery({
    queryKey: ["admin_articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("insights_articles")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAdminProjects = () => {
  return useQuery({
    queryKey: ["admin_projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_images (
            id,
            image_url,
            caption,
            display_order
          )
        `)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAdminCaseStudies = () => {
  return useQuery({
    queryKey: ["admin_case_studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAdminResources = () => {
  return useQuery({
    queryKey: ["admin_resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook for content counts (used in dashboard)
export const useContentCounts = () => {
  return useQuery({
    queryKey: ["content_counts"],
    queryFn: async () => {
      const [articles, projects, caseStudies, resources] = await Promise.all([
        supabase.from("insights_articles").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("case_studies").select("*", { count: "exact", head: true }),
        supabase.from("resources").select("*", { count: "exact", head: true }),
      ]);

      return {
        articles: articles.count || 0,
        projects: projects.count || 0,
        caseStudies: caseStudies.count || 0,
        resources: resources.count || 0,
      };
    },
  });
};
