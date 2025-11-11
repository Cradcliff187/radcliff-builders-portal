import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Hook for articles
export const useArticles = () => {
  return useQuery({
    queryKey: ["insights_articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("insights_articles")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook for all projects
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook for featured projects (homepage only)
export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ["featured_projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .eq("featured", true)
        .order("display_order", { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook for case studies
export const useCaseStudies = () => {
  return useQuery({
    queryKey: ["case_studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("published", true);
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook for resources
export const useResources = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("published", true);
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook for team members (public view)
export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};
