"use client";

import { Suspense, useEffect, useState } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { useParams } from "next/navigation";
import type { Category } from "@/services/categoryService";

function EditCategoryContent() {
  const { id } = useParams();
  const { categories, fetchCategories } = useCategoryStore();
  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      const foundCategory = categories.find(c => c._id === id);
      setCategory(foundCategory);
    }
  }, [categories, id]);

  if (!category) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold tracking-tight">Edit Category</h2>
      <CategoryForm initialData={category} />
    </div>
  );
}

export default function EditCategoryPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    }>
      <EditCategoryContent />
    </Suspense>
  );
}
