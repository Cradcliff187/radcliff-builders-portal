import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectSchema, ProjectFormData } from "@/lib/validations/cms";
import { uploadFile, deleteFile } from "@/lib/uploadHelpers";
import { ImagePlus, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import ProjectImageUploader, { UploadedImage } from "./ProjectImageUploader";
import ProjectImageGallery, { ProjectImage } from "./ProjectImageGallery";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData> & { 
    id?: string;
    project_images?: ProjectImage[];
  };
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProjectFormProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState(initialData?.image_url || "");
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
  const [unsavedImages, setUnsavedImages] = useState<UploadedImage[]>([]);
  const { toast } = useToast();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      industry: initialData?.industry || undefined,
      description: initialData?.description || "",
      image_url: initialData?.image_url || "",
      client_name: initialData?.client_name || "",
      location: initialData?.location || "",
      square_footage: initialData?.square_footage || undefined,
      project_value: initialData?.project_value || "",
      start_date: initialData?.start_date ? new Date(initialData.start_date) : undefined,
      completion_date: initialData?.completion_date ? new Date(initialData.completion_date) : undefined,
      challenges: initialData?.challenges || "",
      solutions: initialData?.solutions || "",
      outcomes: initialData?.outcomes || "",
      featured: initialData?.featured || false,
      published: initialData?.published || false,
      display_order: initialData?.display_order ?? 0,
    },
  });

  // Auto-generate slug from title
  const watchTitle = form.watch("title");
  useEffect(() => {
    if (watchTitle && !initialData?.slug) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      form.setValue("slug", slug);
    }
  }, [watchTitle, initialData?.slug, form]);

  // Load existing images when editing
  useEffect(() => {
    if (initialData?.project_images) {
      const sortedImages = [...initialData.project_images].sort(
        (a, b) => a.display_order - b.display_order
      );
      setProjectImages(sortedImages);
    }
  }, [initialData?.project_images]);

  const handleImagesUploaded = async (newImages: UploadedImage[]) => {
    if (initialData?.id) {
      // Existing project: Save to DB immediately
      try {
        const imagesToInsert = newImages.map((img, index) => ({
          project_id: initialData.id,
          image_url: img.image_url,
          caption: img.caption || "",
          display_order: projectImages.length + index,
        }));

        const { data, error } = await supabase
          .from("project_images")
          .insert(imagesToInsert)
          .select();

        if (error) throw error;

        if (data) {
          setProjectImages((prev) => [...prev, ...data]);
          toast({
            title: "Images Saved",
            description: `${data.length} image(s) added to project.`,
          });
        }
      } catch (error) {
        console.error("Error saving images:", error);
        toast({
          title: "Error",
          description: "Failed to save images. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // New project: Store temporarily
      setUnsavedImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleImageReorder = async (reorderedImages: ProjectImage[]) => {
    setProjectImages(reorderedImages);

    if (initialData?.id) {
      try {
        const updates = reorderedImages.map((img, index) =>
          supabase
            .from("project_images")
            .update({ display_order: index })
            .eq("id", img.id)
        );

        await Promise.all(updates);
      } catch (error) {
        console.error("Error reordering images:", error);
      }
    }
  };

  const handleImageDelete = async (imageId: string) => {
    const imageToDelete = projectImages.find((img) => img.id === imageId);
    if (!imageToDelete) return;

    try {
      // Delete from database
      const { error } = await supabase
        .from("project_images")
        .delete()
        .eq("id", imageId);

      if (error) throw error;

      // Delete from storage
      await deleteFile(imageToDelete.image_url);

      // Update state
      setProjectImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image.",
        variant: "destructive",
      });
    }
  };

  const handleCaptionUpdate = async (imageId: string, caption: string) => {
    try {
      const { error } = await supabase
        .from("project_images")
        .update({ caption })
        .eq("id", imageId);

      if (error) throw error;

      setProjectImages((prev) =>
        prev.map((img) => (img.id === imageId ? { ...img, caption } : img))
      );
    } catch (error) {
      console.error("Error updating caption:", error);
    }
  };

  const handleFormSubmit = async (data: ProjectFormData) => {
    await onSubmit(data);

    // If new project with unsaved images, save them now
    // Note: The parent component should provide the new project ID after creation
    // This is a limitation - for now, unsaved images won't be saved automatically
    // User should save project first, then upload images
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadFile(file, "projects");
      form.setValue("image_url", url);
      setImagePreview(url);
      toast({
        title: "Success",
        description: "Primary image uploaded successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed";
      setUploadError(errorMessage);
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!imagePreview) return;
    
    try {
      if (imagePreview !== initialData?.image_url) {
        await deleteFile(imagePreview);
      }
      form.setValue("image_url", "");
      setImagePreview("");
      setUploadError("");
      toast({
        title: "Image Removed",
        description: "Primary image has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove image.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="content">Project Story</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Regional Medical Center Expansion" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="regional-medical-center-expansion" {...field} />
                  </FormControl>
                  <FormDescription>Auto-generated from title. Must be unique.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
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
                  <FormLabel>Project Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the project comprehensively. Include key specifications, project scope, notable features, and context. Can include bullet points or narrative paragraphs."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Main project description displayed on cards and detail page. Supports both bullet points and narrative text (50-1000 characters).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {imagePreview && (
                        <div className="space-y-2">
                          <div className="relative aspect-video rounded-none overflow-hidden border">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveImage}
                            className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-none uppercase tracking-wider"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove Image
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={uploading}
                          size="icon"
                        >
                          <ImagePlus className="h-4 w-4" />
                        </Button>
                      </div>
                      {uploadError && (
                        <p className="text-sm text-red-600 font-medium">{uploadError}</p>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>Main project image (JPG, PNG, or WEBP • Max 5MB)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Featured</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Published</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="display_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6 mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-montserrat font-semibold text-navy uppercase tracking-wide mb-2">
                  Primary Image
                </h3>
                <p className="text-sm text-charcoal/60 mb-4">
                  This image is shown on project cards, as the hero image on the detail page, <strong>and appears first in the project gallery lightbox</strong>.
                </p>
                {imagePreview && (
                  <div className="relative aspect-video rounded-none overflow-hidden border mb-4 max-w-md">
                    <img
                      src={imagePreview}
                      alt="Primary preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {initialData?.id && (
                <>
                  <div>
                    <h3 className="text-lg font-montserrat font-semibold text-navy uppercase tracking-wide mb-2">
                      Additional Images ({projectImages.length})
                    </h3>
                    <p className="text-sm text-charcoal/60 mb-4">
                      Manage project gallery images. <strong>These appear after the primary image in the gallery.</strong> Drag to reorder, click to edit captions.
                    </p>
                    {projectImages.length > 0 && (
                      <div className="mb-6">
                        <ProjectImageGallery
                          images={projectImages}
                          onReorder={handleImageReorder}
                          onDelete={handleImageDelete}
                          onCaptionUpdate={handleCaptionUpdate}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-montserrat font-semibold text-navy uppercase tracking-wide mb-2">
                      Upload New Images
                    </h3>
                    <p className="text-sm text-charcoal/60 mb-4">
                      Add more images to the project gallery (up to 10 at once).
                    </p>
                    <ProjectImageUploader
                      projectId={initialData.id}
                      onImagesUploaded={handleImagesUploaded}
                    />
                  </div>
                </>
              )}

              {!initialData?.id && (
                <div className="bg-light-grey p-6 rounded-none border-2 border-charcoal/20">
                  <p className="text-charcoal text-center">
                    <strong>Save the project first</strong> to enable multi-image upload.
                    <br />
                    <span className="text-sm text-charcoal/60">
                      After creating the project, you can return to edit it and add gallery images.
                    </span>
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Project Details Tab */}
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="client_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Mercy Health System" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Cincinnati, OH" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="square_footage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Footage (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="50000"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="project_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Value (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="$2.5M" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completion_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completion Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* Project Story Tab */}
          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="bg-light-grey p-4 rounded-none border-l-4 border-gold mb-4">
              <p className="text-sm text-charcoal">
                <strong>Optional Project Narrative:</strong> Add storytelling content to showcase the project's challenges, solutions, and outcomes. 
                Empty sections won't display on the live project page. Minimum 50 characters required per field for content to appear.
              </p>
            </div>

            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>The Challenge (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the main challenges this project addressed..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solutions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Our Solution (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how RCG solved these challenges..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outcomes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Results & Outcomes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the successful outcomes and measurable results..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || uploading}>
            {isSubmitting ? "Saving..." : initialData?.id ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
