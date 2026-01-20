import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_label: string;
  setting_group: string;
  display_order: number;
  updated_at: string;
}

// Fetch single setting with fallback (for frontend components)
export function useSiteSetting(key: string, fallback: string = "") {
  const { data, isLoading } = useQuery({
    queryKey: ["site_setting", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", key)
        .single();
      
      if (error) return fallback;
      return data?.setting_value || fallback;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes (settings rarely change)
  });
  
  return { value: data ?? fallback, isLoading };
}

// Fetch all settings (for admin panel)
export function useAllSiteSettings() {
  return useQuery({
    queryKey: ["site_settings_all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("setting_group")
        .order("display_order");
      
      if (error) throw error;
      return data as SiteSetting[];
    },
  });
}

// Update a setting
export function useUpdateSiteSetting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ setting_value: value })
        .eq("setting_key", key);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_settings_all"] });
      queryClient.invalidateQueries({ queryKey: ["site_setting"] });
    },
  });
}
