import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerLogoSchema, type PartnerLogoFormData } from "@/lib/validations/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, X, Upload } from "lucide-react";
import { useState } from "react";
import { uploadFile, deleteFile } from "@/lib/uploadHelpers";

interface PartnerLogoFormProps {
  initialData?: Partial<PartnerLogoFormData> & { id?: string };
  onSubmit: (data: PartnerLogoFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function PartnerLogoForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  isLoading = false 
}: PartnerLogoFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PartnerLogoFormData>({
    resolver: zodResolver(partnerLogoSchema),
    defaultValues: {
      name: initialData?.name || "",
      image_url: initialData?.image_url || "",
      alt_text: initialData?.alt_text || "",
      website_url: initialData?.website_url || "",
      priority: initialData?.priority || 0,
      published: initialData?.published || false,
    },
  });

  const published = watch("published");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = async () => {
    if (imagePreview && imagePreview.startsWith("http")) {
      try {
        await deleteFile(imagePreview);
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }
    setImageFile(null);
    setImagePreview(null);
    setValue("image_url", "");
  };

  const onFormSubmit = async (data: PartnerLogoFormData) => {
    try {
      let finalImageUrl = data.image_url;

      if (imageFile) {
        setUploading(true);
        const timestamp = Date.now();
        const fileName = `partner-${timestamp}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        finalImageUrl = await uploadFile(imageFile, `partners/${fileName}`);
        
        // Delete old image if updating
        if (initialData?.image_url && initialData.image_url !== finalImageUrl) {
          try {
            await deleteFile(initialData.image_url);
          } catch (error) {
            console.error("Failed to delete old image:", error);
          }
        }
      }

      await onSubmit({ ...data, image_url: finalImageUrl });
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Partner Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Partner Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="e.g., Mercy Health"
          className="rounded-none"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Logo Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Logo Image *</Label>
        <div className="space-y-3">
          {imagePreview ? (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Logo preview"
                className="h-32 w-auto object-contain border border-border rounded-none"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="rounded-none"
              />
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
        {errors.image_url && (
          <p className="text-sm text-red-600">{errors.image_url.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Recommended: PNG with transparent background, max 5MB
        </p>
      </div>

      {/* Alt Text */}
      <div className="space-y-2">
        <Label htmlFor="alt_text">Alt Text (for accessibility) *</Label>
        <Input
          id="alt_text"
          {...register("alt_text")}
          placeholder="e.g., Mercy Health - Healthcare Partner"
          className="rounded-none"
        />
        {errors.alt_text && (
          <p className="text-sm text-red-600">{errors.alt_text.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Descriptive text for screen readers (min 10 characters)
        </p>
      </div>

      {/* Website URL */}
      <div className="space-y-2">
        <Label htmlFor="website_url">Website URL (optional)</Label>
        <Input
          id="website_url"
          {...register("website_url")}
          placeholder="https://www.example.com"
          className="rounded-none"
        />
        {errors.website_url && (
          <p className="text-sm text-red-600">{errors.website_url.message}</p>
        )}
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label htmlFor="priority">Display Priority *</Label>
        <Input
          id="priority"
          type="number"
          {...register("priority", { valueAsNumber: true })}
          placeholder="0"
          className="rounded-none"
        />
        {errors.priority && (
          <p className="text-sm text-red-600">{errors.priority.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Lower numbers appear first (0 = highest priority)
        </p>
      </div>

      {/* Published Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="published"
          checked={published}
          onCheckedChange={(checked) => setValue("published", checked as boolean)}
        />
        <Label
          htmlFor="published"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Published (visible on website)
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading || uploading}
          className="rounded-none uppercase tracking-wider"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || uploading}
          className="bg-navy text-white hover:bg-navy/90 rounded-none uppercase tracking-wider"
        >
          {(isLoading || uploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {uploading ? "Uploading..." : initialData?.id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
