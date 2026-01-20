import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// For public Footer - only published links with valid URLs
export const useSocialLinks = () => {
  return useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .eq("published", true)
        .neq("url", "")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as SocialLink[];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

// For admin - all links with realtime updates
export const useAdminSocialLinks = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('admin-social-links-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'social_links'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin_social_links"] });
          queryClient.invalidateQueries({ queryKey: ["social_links"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["admin_social_links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as SocialLink[];
    },
  });
};
