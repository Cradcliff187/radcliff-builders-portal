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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { articleSchema, ArticleFormData } from "@/lib/validations/cms";

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData> & { id?: string };
  onSubmit: (data: ArticleFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ArticleForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ArticleFormProps) {
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || undefined,
      date: initialData?.date || new Date(),
      excerpt: initialData?.excerpt || "",
      read_time: initialData?.read_time || "",
      article_url: initialData?.article_url || "",
      content: initialData?.content || "",
      published: initialData?.published || false,
    },
  });

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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Category
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-none bg-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white rounded-none z-[100]">
                  <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                  <SelectItem value="Best Practices">Best Practices</SelectItem>
                  <SelectItem value="Case Studies">Case Studies</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal rounded-none bg-white",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white rounded-none" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="read_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Read Time (e.g., "5 min")
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="5 min" className="rounded-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Excerpt
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
          name="article_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Article URL (Optional)
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/full-article" className="rounded-none" />
              </FormControl>
              <p className="text-sm text-muted-foreground">Leave blank to host content internally</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Full Content (Optional)
              </FormLabel>
              <FormControl>
                <Textarea {...field} rows={8} placeholder="Full article content for internal hosting" className="rounded-none" />
              </FormControl>
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
            disabled={isSubmitting}
            className="bg-gold text-white hover:bg-gold/90 uppercase tracking-wider rounded-none shadow-lg hover:shadow-xl transition-all"
          >
            {isSubmitting ? "Saving..." : initialData?.id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
