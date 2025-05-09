"use client";

import { useSearchParams } from 'next/navigation';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, categoryUtils } from "@/services/categoryService";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCategoryStore } from "@/store/useCategoryStore";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  parent: z.string(),
  status: z.boolean().default(true),
  image: z.string().optional(),
  slug: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CategoryForm({ initialData }: { initialData?: Category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentFromUrl = searchParams.get('parent');
  const { categories, addCategory, updateCategory } = useCategoryStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      parent: initialData?.parent || parentFromUrl || "none",
      status: initialData?.status === "active",
      image: initialData?.image || "",
    },
  });

  const isValid = form.formState.isValid;

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      // Generate slug from name if not provided
      const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');
      
      const categoryData = {
        ...data,
        slug,
        parent: data.parent === "none" ? undefined : data.parent,
        status: data.status ? "active" : "inactive",
      };

      if (initialData) {
        await updateCategory(initialData._id, categoryData);
        toast.success('Category updated successfully');
      } else {
        await addCategory(categoryData);
        toast.success('Category created successfully');
      }
      router.push("/dashboard/categories");
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter category name" />
                </FormControl>
                <FormDescription>
                  This name will be displayed in the category list and menu.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe the purpose or content of this category"
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  Helpful for SEO and internal organization.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a parent category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">No Parent (Top Level)</SelectItem>
                    {categories
                      .filter(c => c._id !== initialData?._id)
                      .map(category => (
                        <SelectItem 
                          key={category._id} 
                          value={category._id}
                        >
                          {categoryUtils.getCategoryPath(categories, category._id).join(' > ')}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select a parent to create a subcategory.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image (Optional)</FormLabel>
                <FormControl>
                  <ImageUpload 
                    value={field.value ? [field.value] : []} 
                    onChange={(url) => field.onChange(url[0])}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormDescription>
                  Recommended size: 800x400 pixels
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>
                    Enable or disable this category
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={!isValid || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {initialData ? "Updating..." : "Creating..."}
              </>
            ) : (
              initialData ? "Update Category" : "Create Category"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
