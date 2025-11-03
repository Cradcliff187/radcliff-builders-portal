import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminProjects } from "@/hooks/useAdminCMS";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import DeleteDialog from "@/components/admin/DeleteDialog";
import ProjectForm from "@/components/admin/forms/ProjectForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, CheckCircle, XCircle, Star } from "lucide-react";
import { ProjectFormData } from "@/lib/validations/cms";
import { deleteFile } from "@/lib/uploadHelpers";

type Project = {
  id: string;
  title: string;
  industry: string;
  description: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  project_images?: {
    id: string;
    image_url: string;
    caption: string;
    display_order: number;
  }[];
};

export default function Projects() {
  const { data: projects, isLoading } = useAdminProjects();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns: Column<Project>[] = [
    {
      key: "image_url",
      label: "Images",
      render: (project) => {
        const imageCount = project.project_images?.length || 0;
        return (
          <div className="flex items-center gap-2">
            <img
              src={project.image_url}
              alt={project.title}
              className="h-12 w-20 object-cover rounded-none"
            />
            {imageCount > 0 && (
              <span className="bg-navy text-white text-xs font-bold px-2 py-1 rounded-none">
                +{imageCount}
              </span>
            )}
          </div>
        );
      },
    },
    { key: "title", label: "Title" },
    { key: "industry", label: "Industry" },
    {
      key: "featured",
      label: "Featured",
      render: (project) =>
        project.featured ? (
          <Star className="h-5 w-5 text-gold fill-gold" />
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    {
      key: "published",
      label: "Status",
      render: (project) => (
        <div className="flex items-center gap-2">
          {project.published ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">Published</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400">Draft</span>
            </>
          )}
        </div>
      ),
    },
    { key: "display_order", label: "Order" },
  ];

  const handleCreate = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedProject) {
        const { error } = await supabase
          .from("projects")
          .update({
            title: data.title,
            slug: data.slug,
            industry: data.industry,
            description: data.description,
            image_url: data.image_url,
            client_name: data.client_name || null,
            location: data.location || null,
            square_footage: data.square_footage || null,
            project_value: data.project_value || null,
            start_date: data.start_date ? data.start_date.toISOString().split('T')[0] : null,
            completion_date: data.completion_date ? data.completion_date.toISOString().split('T')[0] : null,
            challenges: data.challenges || null,
            solutions: data.solutions || null,
            outcomes: data.outcomes || null,
            featured: data.featured,
            published: data.published,
            display_order: data.display_order,
          })
          .eq("id", selectedProject.id);

        if (error) throw error;

        toast({
          title: "Project updated",
          description: "The project has been updated successfully.",
        });
      } else {
        const { error } = await supabase.from("projects").insert({
          title: data.title,
          slug: data.slug,
          industry: data.industry,
          description: data.description,
          image_url: data.image_url,
          client_name: data.client_name || null,
          location: data.location || null,
          square_footage: data.square_footage || null,
          project_value: data.project_value || null,
          start_date: data.start_date ? data.start_date.toISOString().split('T')[0] : null,
          completion_date: data.completion_date ? data.completion_date.toISOString().split('T')[0] : null,
          challenges: data.challenges || null,
          solutions: data.solutions || null,
          outcomes: data.outcomes || null,
          featured: data.featured,
          published: data.published,
          display_order: data.display_order,
        });

        if (error) throw error;

        toast({
          title: "Project created",
          description: "The project has been created successfully.",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin_projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["featured_projects"] });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedProject) return;

    try {
      // Delete image from storage
      if (selectedProject.image_url) {
        await deleteFile(selectedProject.image_url);
      }

      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", selectedProject.id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "The project has been deleted successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["admin_projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["featured_projects"] });
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Manage Projects">
      <div className="mb-6">
        <Button
          onClick={handleCreate}
          variant="admin"
          className="rounded-none shadow-lg hover:shadow-xl uppercase tracking-wider"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </Button>
      </div>

      <DataTable
        data={projects || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent 
          className="bg-white rounded-none max-w-2xl max-h-[90vh] overflow-y-auto"
          aria-describedby="project-form-description"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-bold text-navy uppercase tracking-wide">
              {selectedProject ? "Edit Project" : "Create Project"}
            </DialogTitle>
            <DialogDescription id="project-form-description" className="sr-only">
              Form to {selectedProject ? "edit an existing" : "create a new"} project
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            initialData={
              selectedProject
                ? {
                    ...selectedProject,
                    industry: selectedProject.industry as "Healthcare" | "Education" | "Retail" | "Commercial",
                    display_order: selectedProject.display_order ?? 0,
                  }
                : undefined
            }
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${selectedProject?.title}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
