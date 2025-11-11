import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminPartnerLogos } from "@/hooks/useAdminCMS";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Plus, ExternalLink } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import DeleteDialog from "@/components/admin/DeleteDialog";
import PartnerLogoForm from "@/components/admin/forms/PartnerLogoForm";
import { PartnerLogoFormData } from "@/lib/validations/cms";
import { deleteFile } from "@/lib/uploadHelpers";

interface PartnerLogo {
  id: string;
  name: string;
  image_url: string;
  alt_text: string;
  website_url: string | null;
  priority: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function PartnerLogos() {
  const { data: partnerLogos, isLoading } = useAdminPartnerLogos();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<PartnerLogo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = () => {
    setSelectedLogo(null);
    setIsFormOpen(true);
  };

  const handleEdit = (logo: PartnerLogo) => {
    setSelectedLogo(logo);
    setIsFormOpen(true);
  };

  const handleDelete = (logo: PartnerLogo) => {
    setSelectedLogo(logo);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: PartnerLogoFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedLogo) {
        // Update existing logo
        const { error } = await supabase
          .from("partner_logos")
          .update({
            name: data.name,
            image_url: data.image_url,
            alt_text: data.alt_text,
            website_url: data.website_url || null,
            priority: data.priority,
            published: data.published,
          })
          .eq("id", selectedLogo.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Partner logo updated successfully",
        });
      } else {
        // Create new logo
        const { error } = await supabase
          .from("partner_logos")
          .insert({
            name: data.name,
            image_url: data.image_url,
            alt_text: data.alt_text,
            website_url: data.website_url || null,
            priority: data.priority,
            published: data.published,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Partner logo created successfully",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin_partner_logos"] });
      queryClient.invalidateQueries({ queryKey: ["partner_logos"] });
      setIsFormOpen(false);
      setSelectedLogo(null);
    } catch (error) {
      console.error("Error saving partner logo:", error);
      toast({
        title: "Error",
        description: "Failed to save partner logo",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedLogo) return;

    try {
      // Delete image from storage
      if (selectedLogo.image_url) {
        try {
          await deleteFile(selectedLogo.image_url);
        } catch (error) {
          console.error("Failed to delete image:", error);
        }
      }

      // Delete from database
      const { error } = await supabase
        .from("partner_logos")
        .delete()
        .eq("id", selectedLogo.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Partner logo deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["admin_partner_logos"] });
      queryClient.invalidateQueries({ queryKey: ["partner_logos"] });
      setIsDeleteOpen(false);
      setSelectedLogo(null);
    } catch (error) {
      console.error("Error deleting partner logo:", error);
      toast({
        title: "Error",
        description: "Failed to delete partner logo",
        variant: "destructive",
      });
    }
  };

  const columns = [
    {
      key: "image_url",
      label: "Logo",
      render: (logo: PartnerLogo) => (
        <img
          src={logo.image_url}
          alt={logo.alt_text}
          className="h-12 w-auto object-contain"
        />
      ),
    },
    { key: "name", label: "Name" },
    {
      key: "website_url",
      label: "Website",
      render: (logo: PartnerLogo) =>
        logo.website_url ? (
          <a
            href={logo.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: "published",
      label: "Status",
      render: (logo: PartnerLogo) => (
        <div className="flex items-center gap-2">
          {logo.published ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">Published</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Draft</span>
            </>
          )}
        </div>
      ),
    },
    { 
      key: "priority", 
      label: "Priority",
      render: (logo: PartnerLogo) => (
        <span className="text-sm text-gray-600">{logo.priority}</span>
      ),
    },
  ];

  return (
    <AdminLayout title="Manage Partner Logos">
      <div className="mb-6">
        <Button
          onClick={handleCreate}
          variant="admin"
          className="rounded-none shadow-lg hover:shadow-xl uppercase tracking-wider"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Partner Logo
        </Button>
      </div>

      <DataTable
        data={partnerLogos || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-bold text-navy uppercase tracking-wide">
              {selectedLogo ? "Edit Partner Logo" : "Add Partner Logo"}
            </DialogTitle>
          </DialogHeader>
          <PartnerLogoForm
            initialData={selectedLogo || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        title="Delete Partner Logo"
        description={`Are you sure you want to delete "${selectedLogo?.name}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
