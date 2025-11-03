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
import { caseStudySchema, CaseStudyFormData } from "@/lib/validations/cms";

interface CaseStudyFormProps {
  initialData?: Partial<CaseStudyFormData> & { id?: string };
  onSubmit: (data: CaseStudyFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function CaseStudyForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: CaseStudyFormProps) {
  const form = useForm<CaseStudyFormData>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      title: initialData?.title || "",
      industry: initialData?.industry || undefined,
      challenge: initialData?.challenge || "",
      solution: initialData?.solution || "",
      result: initialData?.result || "",
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
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Industry
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-none bg-white">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white rounded-none z-[100]">
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
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Challenge
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
          name="solution"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Solution
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
          name="result"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-montserrat font-semibold uppercase tracking-wide">
                Result
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
