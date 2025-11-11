import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema, type TeamMemberFormData } from "@/lib/validations/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface TeamMemberFormProps {
  teamMember?: any;
  onSuccess: (data: any) => void;
}

const TeamMemberForm = ({ teamMember, onSuccess }: TeamMemberFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const isEditMode = !!teamMember;

  const form = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      title: "",
      headshot_url: "",
      bio_short: "",
      bio_long: "",
      anchor_id: "",
      display_order: 0,
      published: false,
    },
  });

  useEffect(() => {
    if (teamMember) {
      form.reset({
        name: teamMember.name || "",
        title: teamMember.title || "",
        headshot_url: teamMember.headshot_url || "",
        bio_short: teamMember.bio_short || "",
        bio_long: teamMember.bio_long || "",
        anchor_id: teamMember.anchor_id || "",
        display_order: teamMember.display_order ?? 0,
        published: teamMember.published ?? false,
      });
    }
  }, [teamMember, form]);

  // Auto-generate anchor_id from name
  const handleNameChange = (name: string) => {
    if (!isEditMode || !form.getValues("anchor_id")) {
      const anchorId = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      form.setValue("anchor_id", anchorId);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `team/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("company-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("company-assets")
        .getPublicUrl(filePath);

      form.setValue("headshot_url", publicUrl);

      toast({
        title: "Image uploaded",
        description: "Headshot image uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: TeamMemberFormData) => {
    onSuccess(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleNameChange(e.target.value);
                  }}
                  placeholder="John Doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Vice President" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anchor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anchor ID *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="john-doe" />
              </FormControl>
              <FormDescription>
                Used for URL anchor links (e.g., /team#john-doe). Lowercase letters, numbers, and hyphens only.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headshot_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headshot Image *</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </div>
                  )}
                  {field.value && (
                    <div className="mt-2">
                      <img
                        src={field.value}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio_short"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Brief description (displayed on cards)"
                  rows={3}
                  maxLength={300}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/300 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio_long"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Bio *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Detailed biography (displayed in expanded view)"
                  rows={6}
                  maxLength={2000}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/2000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="display_order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  value={field.value || 0}
                />
              </FormControl>
              <FormDescription>
                Lower numbers appear first (0, 1, 2...)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Published</FormLabel>
                <FormDescription>
                  Make this team member visible on the public website
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={isUploading}>
            {isEditMode ? "Update Team Member" : "Create Team Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeamMemberForm;
