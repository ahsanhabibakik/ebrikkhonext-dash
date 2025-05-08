"use client";

import { CategoryForm } from "@/components/categories/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold tracking-tight">Add New Category</h2>
      <CategoryForm />
    </div>
  );
}
