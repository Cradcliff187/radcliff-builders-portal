import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCaseStudies } from "@/hooks/useAdminCMS";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import DeleteDialog from "@/components/admin/DeleteDialog";
import CaseStudyForm from "@/components/admin/forms/CaseStudyForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { CaseStudyFormData } from "@/lib/validations/cms";

type CaseStudy = {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export default function CaseStudies() {
  const { data: caseStudies, isLoading } = useAdminCaseStudies();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns: Column<CaseStudy>[] = [
    { key: "title", label: "Title" },
    { key: "industry", label: "Industry" },
    {
      key: "case_study_url",
      label: "URL",
      render: (caseStudy: any) => {
        const url = caseStudy.case_study_url;
        return url ? (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gold hover:underline flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            Link
          </a>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },
    {
      key: "published",
      label: "Status",
      render: (caseStudy) => (
        <div className="flex items-center gap-2">
          {caseStudy.published ? (
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
    setSelectedCaseStudy(null);
    setIsFormOpen(true);
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsFormOpen(true);
  };

  const handleDelete = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: CaseStudyFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedCaseStudy) {
        const { error } = await supabase
          .from("case_studies")
          .update({
            title: data.title,
            industry: data.industry,
            challenge: data.challenge,
            solution: data.solution,
            result: data.result,
            case_study_url: data.case_study_url || null,
            published: data.published,
          })
          .eq("id", selectedCaseStudy.id);

        if (error) throw error;

        toast({
          title: "Case study updated",
          description: "The case study has been updated successfully.",
        });
      } else {
        const { error } = await supabase.from("case_studies").insert({
          title: data.title,
          industry: data.industry,
          challenge: data.challenge,
          solution: data.solution,
          result: data.result,
          case_study_url: data.case_study_url || null,
          published: data.published,
        });

        if (error) throw error;

        toast({
          title: "Case study created",
          description: "The case study has been created successfully.",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin_case_studies"] });
      queryClient.invalidateQueries({ queryKey: ["case_studies"] });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving case study:", error);
      toast({
        title: "Error",
        description: "Failed to save case study. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedCaseStudy) return;

    try {
      const { error } = await supabase
        .from("case_studies")
        .delete()
        .eq("id", selectedCaseStudy.id);

      if (error) throw error;

      toast({
        title: "Case study deleted",
        description: "The case study has been deleted successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["admin_case_studies"] });
      queryClient.invalidateQueries({ queryKey: ["case_studies"] });
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting case study:", error);
      toast({
        title: "Error",
        description: "Failed to delete case study. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Manage Case Studies">
      <div className="mb-6">
        <Button
          onClick={handleCreate}
          variant="admin"
          className="rounded-none shadow-lg hover:shadow-xl uppercase tracking-wider"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Case Study
        </Button>
      </div>

      <DataTable
        data={caseStudies || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent 
          className="bg-white rounded-none max-w-2xl max-h-[90vh] overflow-y-auto"
          aria-describedby="case-study-form-description"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-bold text-navy uppercase tracking-wide">
              {selectedCaseStudy ? "Edit Case Study" : "Create Case Study"}
            </DialogTitle>
            <DialogDescription id="case-study-form-description" className="sr-only">
              Form to {selectedCaseStudy ? "edit an existing" : "create a new"} case study
            </DialogDescription>
          </DialogHeader>
          <CaseStudyForm
            initialData={
              selectedCaseStudy
                ? {
                    ...selectedCaseStudy,
                    industry: selectedCaseStudy.industry as "Healthcare" | "Professional" | "Retail" | "Commercial",
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
        title="Delete Case Study"
        description={`Are you sure you want to delete "${selectedCaseStudy?.title}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
