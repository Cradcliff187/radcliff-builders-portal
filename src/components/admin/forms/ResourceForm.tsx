import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resourceSchema, ResourceFormData } from "@/lib/validations/cms";
import { uploadFile } from "@/lib/uploadHelpers";
import { Upload, FileText } from "lucide-react";

interface ResourceFormProps {
  initialData?: Partial<ResourceFormData> & { id?: string };
  onSubmit: (data: ResourceFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ResourceForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ResourceFormProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(initialData?.file_url || "");

  const form = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      type: initialData?.type || undefined,
      file_url: initialData?.file_url || "",
      published: initialData?.published || false,
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadFile(file, "resources");
      setUploadedFileUrl(url);
      form.setValue("file_url", url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Title
              </FormLabel>
              <FormControl>
                <Input {...field} className="rounded-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-none bg-white">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white rounded-none z-[100]">
                  <SelectItem value="Guide">Guide</SelectItem>
                  <SelectItem value="Checklist">Checklist</SelectItem>
                  <SelectItem value="Whitepaper">Whitepaper</SelectItem>
                  <SelectItem value="Template">Template</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Description
              </FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} className="rounded-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                PDF File
              </FormLabel>
              <div className="space-y-4">
                {uploadedFileUrl && (
                  <div className="flex items-center gap-2 p-3 bg-light-grey rounded-none border border-navy/20">
                    <FileText className="h-5 w-5 text-navy" />
                    <span className="text-sm text-charcoal truncate flex-1">
                      {uploadedFileUrl.split("/").pop()}
                    </span>
                    <a
                      href={uploadedFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold/80 text-sm font-medium uppercase tracking-wider"
                    >
                      View
                    </a>
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="rounded-none"
                  />
                  {uploading && (
                    <p className="text-sm text-gold mt-2">Uploading...</p>
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                  Published
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="bg-white border-charcoal text-charcoal hover:bg-light-grey uppercase tracking-wider rounded-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || uploading}
            className="bg-gold text-white hover:bg-gold/90 uppercase tracking-wider rounded-none shadow-lg hover:shadow-xl transition-all"
          >
            {isSubmitting ? "Saving..." : initialData?.id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
