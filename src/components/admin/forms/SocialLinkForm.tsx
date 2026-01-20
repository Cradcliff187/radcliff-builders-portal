import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinkSchema, type SocialLinkFormData } from "@/lib/validations/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Linkedin, Facebook, Instagram, Youtube, Twitter, Globe, type LucideIcon } from "lucide-react";

interface SocialLinkFormProps {
  socialLink?: {
    id: string;
    platform: string;
    url: string;
    icon_name: string;
    published: boolean;
    display_order: number;
  };
  onSuccess: (data: SocialLinkFormData) => void;
}

const iconOptions = [
  { value: "Linkedin", label: "LinkedIn", Icon: Linkedin },
  { value: "Facebook", label: "Facebook", Icon: Facebook },
  { value: "Instagram", label: "Instagram", Icon: Instagram },
  { value: "Youtube", label: "YouTube", Icon: Youtube },
  { value: "Twitter", label: "Twitter/X", Icon: Twitter },
  { value: "Globe", label: "Website", Icon: Globe },
];

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Globe,
};

export default function SocialLinkForm({ socialLink, onSuccess }: SocialLinkFormProps) {
  const isEdit = !!socialLink;

  const form = useForm<SocialLinkFormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      platform: socialLink?.platform || "",
      url: socialLink?.url || "",
      icon_name: socialLink?.icon_name || "Globe",
      display_order: socialLink?.display_order || 0,
      published: socialLink?.published || false,
    },
  });

  const selectedIconName = form.watch("icon_name");
  const SelectedIcon = iconMap[selectedIconName] || Globe;

  const onSubmit = (data: SocialLinkFormData) => {
    onSuccess(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., LinkedIn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://linkedin.com/company/your-company" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Leave empty to save as draft without a URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.Icon className="w-4 h-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Preview:</span>
                <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-none">
                  <SelectedIcon className="w-5 h-5 text-white" />
                </div>
              </div>
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
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>
                Lower numbers appear first in the footer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-none border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Published</FormLabel>
                <FormDescription>
                  Only published links with valid URLs will appear in the footer
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-none">
          {isEdit ? "Update Social Link" : "Add Social Link"}
        </Button>
      </form>
    </Form>
  );
}
