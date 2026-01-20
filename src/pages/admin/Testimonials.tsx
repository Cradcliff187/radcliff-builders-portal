import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAdminTestimonials } from "@/hooks/useAdminCMS";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";
import DeleteDialog from "@/components/admin/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, CheckCircle, XCircle } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_title: string;
  company_description: string;
  industry: string | null;
  project_metrics: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const Testimonials = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const queryClient = useQueryClient();
  const { data: testimonials, isLoading } = useAdminTestimonials();

  const columns = [
    {
      key: "author_name",
      label: "Author",
      render: (item: Testimonial) => (
        <div>
          <p className="font-medium">{item.author_name}</p>
          <p className="text-sm text-muted-foreground">{item.author_title}</p>
        </div>
      ),
    },
    {
      key: "company_description",
      label: "Company",
      render: (item: Testimonial) => (
        <span className="text-sm">{item.company_description}</span>
      ),
    },
    {
      key: "industry",
      label: "Industry",
      render: (item: Testimonial) => (
        <span className="text-sm">{item.industry || "—"}</span>
      ),
    },
    {
      key: "published",
      label: "Status",
      render: (item: Testimonial) => (
        <div className="flex items-center gap-2">
          {item.published ? (
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
    {
      key: "display_order",
      label: "Order",
      render: (item: Testimonial) => (
        <span className="text-sm font-mono">{item.display_order}</span>
      ),
    },
  ];

  const handleCreate = () => {
    setSelectedTestimonial(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Testimonial) => {
    setSelectedTestimonial(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Testimonial) => {
    setSelectedTestimonial(item);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (selectedTestimonial) {
        const { error } = await supabase
          .from("testimonials")
          .update(data)
          .eq("id", selectedTestimonial.id);

        if (error) throw error;

        toast({
          title: "Testimonial updated",
          description: "The testimonial has been updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("testimonials")
          .insert([data]);

        if (error) throw error;

        toast({
          title: "Testimonial created",
          description: "The testimonial has been created successfully",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin_testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setIsFormOpen(false);
      setSelectedTestimonial(null);
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    if (!selectedTestimonial) return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", selectedTestimonial.id);

      if (error) throw error;

      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["admin_testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setIsDeleteOpen(false);
      setSelectedTestimonial(null);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Testimonials">
      <div className="mb-6">
        <Button
          onClick={handleCreate}
          variant="admin"
          className="rounded-none shadow-lg hover:shadow-xl uppercase tracking-wider"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <DataTable
        data={testimonials || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="uppercase tracking-wide">
              {selectedTestimonial ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <TestimonialForm
            testimonial={selectedTestimonial}
            onSuccess={handleSubmit}
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        title="Delete Testimonial"
        description={`Are you sure you want to delete the testimonial from ${selectedTestimonial?.author_name}? This action cannot be undone.`}
      />
    </AdminLayout>
  );
};

export default Testimonials;
