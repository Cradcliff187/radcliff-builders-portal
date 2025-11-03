import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProjects } from "@/hooks/useCMSContent";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import DeleteDialog from "@/components/admin/DeleteDialog";
import ProjectForm from "@/components/admin/forms/ProjectForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
};

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns: Column<Project>[] = [
    {
      key: "image_url",
      label: "Image",
      render: (project) => (
        <img
          src={project.image_url}
          alt={project.title}
          className="h-12 w-20 object-cover rounded-none"
        />
      ),
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
            industry: data.industry,
            description: data.description,
            image_url: data.image_url,
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
          industry: data.industry,
          description: data.description,
          image_url: data.image_url,
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
          className="bg-gold text-white hover:bg-gold/90 uppercase tracking-wider rounded-none shadow-lg hover:shadow-xl transition-all"
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
        <DialogContent className="bg-white rounded-none max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-bold text-navy uppercase tracking-wide">
              {selectedProject ? "Edit Project" : "Create Project"}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            initialData={
              selectedProject
                ? {
                    ...selectedProject,
                    industry: selectedProject.industry as any,
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
