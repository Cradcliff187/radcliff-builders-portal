import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminResources } from "@/hooks/useAdminCMS";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import DeleteDialog from "@/components/admin/DeleteDialog";
import ResourceForm from "@/components/admin/forms/ResourceForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, CheckCircle, XCircle, FileText } from "lucide-react";
import { ResourceFormData } from "@/lib/validations/cms";
import { deleteFile } from "@/lib/uploadHelpers";

type Resource = {
  id: string;
  title: string;
  description: string;
  type: string;
  file_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export default function Resources() {
  const { data: resources, isLoading } = useAdminResources();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns: Column<Resource>[] = [
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    {
      key: "file_url",
      label: "File",
      render: (resource) =>
        resource.file_url ? (
          <a
            href={resource.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold hover:text-gold/80"
          >
            <FileText className="h-4 w-4" />
            View
          </a>
        ) : (
          <span className="text-gray-400">No file</span>
        ),
    },
    {
      key: "published",
      label: "Status",
      render: (resource) => (
        <div className="flex items-center gap-2">
          {resource.published ? (
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
  ];

  const handleCreate = () => {
    setSelectedResource(null);
    setIsFormOpen(true);
  };

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource);
    setIsFormOpen(true);
  };

  const handleDelete = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: ResourceFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedResource) {
        const { error } = await supabase
          .from("resources")
          .update({
            title: data.title,
            description: data.description,
            type: data.type,
            file_url: data.file_url || null,
            published: data.published,
          })
          .eq("id", selectedResource.id);

        if (error) throw error;

        toast({
          title: "Resource updated",
          description: "The resource has been updated successfully.",
        });
      } else {
        const { error } = await supabase.from("resources").insert({
          title: data.title,
          description: data.description,
          type: data.type,
          file_url: data.file_url || null,
          published: data.published,
        });

        if (error) throw error;

        toast({
          title: "Resource created",
          description: "The resource has been created successfully.",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin_resources"] });
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving resource:", error);
      toast({
        title: "Error",
        description: "Failed to save resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedResource) return;

    try {
      // Delete file from storage if exists
      if (selectedResource.file_url) {
        await deleteFile(selectedResource.file_url);
      }

      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", selectedResource.id);

      if (error) throw error;

      toast({
        title: "Resource deleted",
        description: "The resource has been deleted successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["admin_resources"] });
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast({
        title: "Error",
        description: "Failed to delete resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Manage Resources">
      <div className="mb-6">
        <Button
          onClick={handleCreate}
          variant="admin"
          className="rounded-none shadow-lg hover:shadow-xl uppercase tracking-wider"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Resource
        </Button>
      </div>

      <DataTable
        data={resources || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent 
          className="bg-white rounded-none max-w-2xl max-h-[90vh] overflow-y-auto"
          aria-describedby="resource-form-description"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-bold text-navy uppercase tracking-wide">
              {selectedResource ? "Edit Resource" : "Create Resource"}
            </DialogTitle>
            <DialogDescription id="resource-form-description" className="sr-only">
              Form to {selectedResource ? "edit an existing" : "create a new"} resource
            </DialogDescription>
          </DialogHeader>
          <ResourceForm
            initialData={
              selectedResource
                ? {
                    ...selectedResource,
                    type: selectedResource.type as "Guide" | "Checklist" | "Whitepaper" | "Template",
                    file_url: selectedResource.file_url || undefined,
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
        title="Delete Resource"
        description={`Are you sure you want to delete "${selectedResource?.title}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
