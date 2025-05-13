"use client";

import { Suspense } from 'react';
import { CategoryForm } from "@/components/categories/CategoryForm";

function CategoryFormWrapper() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold tracking-tight">Add New Category</h2>
      <CategoryForm />
    </div>
  );
}

export default function NewCategoryPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    }>
      <CategoryFormWrapper />
    </Suspense>
  );
}
