import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProjectDetail = (slug: string) => {
  return useQuery({
    queryKey: ["project_detail", slug],
    queryFn: async () => {
      const { data: project, error } = await supabase
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
        .eq("slug", slug)
        .eq("published", true)
        .single();
      
      if (error) throw error;
      
      // Sort images by display_order
      if (project?.project_images) {
        project.project_images.sort((a: any, b: any) => a.display_order - b.display_order);
      }
      
      return project;
    },
  });
};
