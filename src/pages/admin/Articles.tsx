import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminArticles } from "@/hooks/useAdminCMS";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import DeleteDialog from "@/components/admin/DeleteDialog";
import ArticleForm from "@/components/admin/forms/ArticleForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ArticleFormData } from "@/lib/validations/cms";

type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  read_time: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export default function Articles() {
  const { data: articles, isLoading } = useAdminArticles();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns: Column<Article>[] = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "date",
      label: "Date",
      render: (article) => format(new Date(article.date), "MMM dd, yyyy"),
    },
    { key: "read_time", label: "Read Time" },
    {
      key: "published",
      label: "Status",
      render: (article) => (
        <div className="flex items-center gap-2">
          {article.published ? (
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
    setSelectedArticle(null);
    setIsFormOpen(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setIsFormOpen(true);
  };

  const handleDelete = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedArticle) {
        const { error } = await supabase
          .from("insights_articles")
          .update({
            title: data.title,
            category: data.category,
            date: data.date.toISOString().split("T")[0],
            excerpt: data.excerpt,
            read_time: data.read_time,
            published: data.published,
          })
          .eq("id", selectedArticle.id);

        if (error) throw error;

        toast({
          title: "Article updated",
          description: "The article has been updated successfully.",
        });
      } else {
        const { error } = await supabase.from("insights_articles").insert({
          title: data.title,
          category: data.category,
          date: data.date.toISOString().split("T")[0],
          excerpt: data.excerpt,
          read_time: data.read_time,
          published: data.published,
        });

        if (error) throw error;

        toast({
          title: "Article created",
          description: "The article has been created successfully.",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin_articles"] });
      queryClient.invalidateQueries({ queryKey: ["insights_articles"] });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Error",
        description: "Failed to save article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedArticle) return;

    try {
      const { error } = await supabase
        .from("insights_articles")
        .delete()
        .eq("id", selectedArticle.id);

      if (error) throw error;

      toast({
        title: "Article deleted",
        description: "The article has been deleted successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["admin_articles"] });
      queryClient.invalidateQueries({ queryKey: ["insights_articles"] });
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Error",
        description: "Failed to delete article. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Manage Articles">
      <div className="mb-6">
        <Button
          onClick={handleCreate}
          className="bg-gold text-white hover:bg-gold/90 uppercase tracking-wider rounded-none shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Article
        </Button>
      </div>

      <DataTable
        data={articles || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-white rounded-none max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-bold text-navy uppercase tracking-wide">
              {selectedArticle ? "Edit Article" : "Create Article"}
            </DialogTitle>
          </DialogHeader>
          <ArticleForm
            initialData={
              selectedArticle
                ? {
                    ...selectedArticle,
                    date: new Date(selectedArticle.date),
                    category: selectedArticle.category as "Industry Insights" | "Best Practices" | "Case Studies",
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
        title="Delete Article"
        description={`Are you sure you want to delete "${selectedArticle?.title}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
