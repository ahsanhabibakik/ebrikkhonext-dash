"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { useParams } from "next/navigation";

export default function EditCategoryPage() {
  const { id } = useParams();
  const { categories, fetchCategories } = useCategoryStore();
  const [category, setCategory] = useState(null);

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
