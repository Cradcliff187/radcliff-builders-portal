import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminSocialLinks } from "@/hooks/useSocialLinks";
import { type SocialLinkFormData } from "@/lib/validations/cms";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import DeleteDialog from "@/components/admin/DeleteDialog";
import SocialLinkForm from "@/components/admin/forms/SocialLinkForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Linkedin, Facebook, Instagram, Youtube, Twitter, Globe, type LucideIcon } from "lucide-react";

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

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Globe,
};

const SocialLinks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: socialLinks, isLoading } = useAdminSocialLinks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SocialLink | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    {
      key: "platform",
      label: "Platform",
      render: (link: SocialLink) => {
        const Icon = iconMap[link.icon_name] || Globe;
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-navy flex items-center justify-center rounded-none">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">{link.platform}</span>
          </div>
        );
      },
    },
    {
      key: "url",
      label: "URL",
      render: (link: SocialLink) =>
        link.url ? (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline truncate max-w-[200px] inline-block"
          >
            {link.url}
          </a>
        ) : (
          <span className="text-muted-foreground italic">Not set</span>
        ),
    },
    {
      key: "published",
      label: "Status",
      render: (link: SocialLink) => (
        <Badge
          variant={link.published ? "default" : "secondary"}
          className="rounded-none"
        >
          {link.published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "display_order",
      label: "Order",
    },
  ];

  const handleCreate = () => {
    setSelectedLink(null);
    setIsFormOpen(true);
  };

  const handleEdit = (link: SocialLink) => {
    setSelectedLink(link);
    setIsFormOpen(true);
  };

  const handleDelete = (link: SocialLink) => {
    setSelectedLink(link);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: SocialLinkFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedLink) {
        // Update existing
        const { error } = await supabase
          .from("social_links")
          .update({
            platform: data.platform,
            url: data.url || "",
            icon_name: data.icon_name,
            display_order: data.display_order,
            published: data.published,
          })
          .eq("id", selectedLink.id);

        if (error) throw error;

        toast({
          title: "Social link updated",
          description: `${data.platform} has been updated successfully.`,
        });
      } else {
        // Create new
        const { error } = await supabase.from("social_links").insert({
          platform: data.platform,
          url: data.url || "",
          icon_name: data.icon_name,
          display_order: data.display_order,
          published: data.published,
        });

        if (error) throw error;

        toast({
          title: "Social link added",
          description: `${data.platform} has been added successfully.`,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin_social_links"] });
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
      setIsFormOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save social link",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedLink) return;

    try {
      const { error } = await supabase
        .from("social_links")
        .delete()
        .eq("id", selectedLink.id);

      if (error) throw error;

      toast({
        title: "Social link deleted",
        description: `${selectedLink.platform} has been deleted.`,
      });

      queryClient.invalidateQueries({ queryKey: ["admin_social_links"] });
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
      setIsDeleteOpen(false);
      setSelectedLink(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete social link",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Social Links">
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreate} className="rounded-none">
          <Plus className="w-4 h-4 mr-2" />
          Add Social Link
        </Button>
      </div>

      <DataTable
        data={socialLinks || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg rounded-none">
          <DialogHeader>
            <DialogTitle>
              {selectedLink ? "Edit Social Link" : "Add Social Link"}
            </DialogTitle>
          </DialogHeader>
          <SocialLinkForm
            socialLink={selectedLink || undefined}
            onSuccess={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        title="Delete Social Link"
        description={`Are you sure you want to delete ${selectedLink?.platform}? This action cannot be undone.`}
      />
    </AdminLayout>
  );
};

export default SocialLinks;
