import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, type TestimonialFormData } from "@/lib/validations/cms";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

interface TestimonialFormProps {
  testimonial?: any;
  onSuccess: (data: any) => void;
}

const industries = ["Healthcare", "Professional", "Retail", "Commercial"] as const;

const TestimonialForm = ({ testimonial, onSuccess }: TestimonialFormProps) => {
  const isEditMode = !!testimonial;

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      quote: "",
      author_name: "",
      author_title: "",
      company_description: "",
      industry: undefined,
      project_metrics: "",
      display_order: 0,
      published: true,
    },
  });

  useEffect(() => {
    if (testimonial) {
      form.reset({
        quote: testimonial.quote || "",
        author_name: testimonial.author_name || "",
        author_title: testimonial.author_title || "",
        company_description: testimonial.company_description || "",
        industry: testimonial.industry || undefined,
        project_metrics: testimonial.project_metrics || "",
        display_order: testimonial.display_order ?? 0,
        published: testimonial.published ?? true,
      });
    }
  }, [testimonial, form]);

  const onSubmit = (data: TestimonialFormData) => {
    // Clean up empty strings to null for optional fields
    const cleanedData = {
      ...data,
      industry: data.industry || null,
      project_metrics: data.project_metrics || null,
    };
    onSuccess(cleanedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter the testimonial quote..."
                  rows={5}
                  maxLength={1000}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/1000 characters (min 50)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="author_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Sarah M." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Title *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Regional Director of Facilities" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Description *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Multi-Site Healthcare System" />
              </FormControl>
              <FormDescription>
                Describe the company or organization (no specific names)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="project_metrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Metrics</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="4 projects completed" />
                </FormControl>
                <FormDescription>
                  Optional: quantifiable results
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                Lower numbers appear first in the carousel (1, 2, 3...)
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
                  Show this testimonial on the public website
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="submit">
            {isEditMode ? "Update Testimonial" : "Create Testimonial"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TestimonialForm;
