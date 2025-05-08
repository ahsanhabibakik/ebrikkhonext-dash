"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { CategoryTree } from "@/components/categories/CategoryTree";

export default function CategoryStructurePage() {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold tracking-tight">Category Structure</h2>
      <p className="text-muted-foreground">
        Manage your category hierarchy and organization
      </p>
      <CategoryTree categories={categories} />
    </div>
  );
}
